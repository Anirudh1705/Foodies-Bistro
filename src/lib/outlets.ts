import { outlets } from "@/data/outlets";
import type { Outlet, OpeningSlot } from "@/types";

export const getActiveOutlets = (): Outlet[] => outlets.filter((o) => o.activeStatus);

export const getOutletBySlug = (slug: string): Outlet | undefined =>
  getActiveOutlets().find((o) => o.slug === slug);

export const getCities = (): string[] =>
  Array.from(new Set(getActiveOutlets().map((o) => o.city))).sort();

/* ---------- time & hours (all outlets operate on IST) ---------- */

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 && h < 24 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function formatDays(days: number[]): string {
  const sorted = [...days].sort((a, b) => a - b);
  if (sorted.length === 7) return "Every day";
  // Order Mon..Sun for readability
  const order = [1, 2, 3, 4, 5, 6, 0];
  const present = order.filter((d) => sorted.includes(d));
  const idx = present.map((d) => order.indexOf(d));
  const contiguous = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
  if (present.length > 2 && contiguous) {
    return `${DAY_NAMES[present[0]]}–${DAY_NAMES[present[present.length - 1]]}`;
  }
  return present.map((d) => DAY_NAMES[d]).join(", ");
}

export const formatSlot = (slot: OpeningSlot) => `${formatTime(slot.open)} – ${formatTime(slot.close)}`;

/** Compact one-liner, e.g. "10:00 AM – 11:00 PM" or "Mon–Thu 10:30 AM – 11:00 PM". */
export function hoursSummary(outlet: Outlet): string {
  if (outlet.openingHours.length === 1) return formatSlot(outlet.openingHours[0]);
  return outlet.openingHours.map((s) => `${formatDays(s.days)} ${formatSlot(s)}`).join(" · ");
}

function istParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = DAY_NAMES.indexOf(get("weekday"));
  const hour = Number(get("hour")) % 24;
  return { day, minutes: hour * 60 + Number(get("minute")) };
}

export interface OutletStatus {
  isOpen: boolean;
  label: string;
}

export function getOutletStatus(outlet: Outlet, now: Date = new Date()): OutletStatus {
  const { day, minutes } = istParts(now);
  const prevDay = (day + 6) % 7;
  let openNow: OpeningSlot | undefined;

  for (const slot of outlet.openingHours) {
    const open = toMinutes(slot.open);
    const close = toMinutes(slot.close);
    const overnight = close <= open;
    if (slot.days.includes(day) && (overnight ? minutes >= open : minutes >= open && minutes < close)) {
      openNow = slot;
      break;
    }
    // Still inside yesterday's overnight slot
    if (overnight && slot.days.includes(prevDay) && minutes < close) {
      openNow = slot;
      break;
    }
  }

  if (openNow) return { isOpen: true, label: `Open now · closes ${formatTime(openNow.close)}` };

  // find next opening today
  const todaySlots = outlet.openingHours
    .filter((s) => s.days.includes(day) && toMinutes(s.open) > minutes)
    .sort((a, b) => toMinutes(a.open) - toMinutes(b.open));
  if (todaySlots.length) return { isOpen: false, label: `Closed · opens ${formatTime(todaySlots[0].open)}` };
  return { isOpen: false, label: "Closed now" };
}

/* ---------- location ---------- */

export function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(bLat - aLat);
  const dLng = rad(bLng - aLng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(aLat)) * Math.cos(rad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export const formatDistance = (km: number) => (km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`);

/** Google Maps directions. Uses coordinates only when verified; otherwise the written address. */
export function directionsUrl(outlet: Outlet): string {
  const destination = outlet.coordinatesVerified
    ? `${outlet.latitude},${outlet.longitude}`
    : `${outlet.name}, ${outlet.completeAddress}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
