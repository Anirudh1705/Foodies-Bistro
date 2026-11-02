"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Outlet } from "@/types";
import { directionsUrl, hoursSummary } from "@/lib/outlets";

export interface OutletMapProps {
  outlets: Outlet[];
  selectedSlug?: string | null;
  nearestSlug?: string | null;
  onSelect?: (slug: string) => void;
  userLocation?: { lat: number; lng: number } | null;
  className?: string;
  /** Allow zoom/drag. Default true. */
  interactive?: boolean;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const pinHtml = (active: boolean, nearest: boolean) => {
  const fill = nearest ? "#e66a32" : active ? "#191919" : "#526b4d";
  return `<svg width="38" height="48" viewBox="0 0 38 48" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 4px 6px rgba(0,0,0,.35))">
    <path d="M19 47C19 47 3 29.5 3 18a16 16 0 1 1 32 0c0 11.5-16 29-16 29z" fill="${fill}" stroke="#fff" stroke-width="2.5"/>
    <circle cx="19" cy="18" r="6" fill="#fff"/></svg>`;
};

/** Leaflet + OpenStreetMap tiles. Client-only (loaded via OutletMapLazy). */
export default function OutletMap({ outlets, selectedSlug, nearestSlug, onSelect, userLocation, className, interactive = true }: OutletMapProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // create map once
  useEffect(() => {
    if (!elRef.current || mapRef.current) return;
    const map = L.map(elRef.current, {
      scrollWheelZoom: false,
      zoomControl: interactive,
      dragging: interactive,
      doubleClickZoom: interactive,
      touchZoom: interactive,
      keyboard: interactive,
    }).setView([28.5, 77.45], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, [interactive]);

  // (re)draw markers
  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    const points: L.LatLngExpression[] = [];

    outlets.forEach((o) => {
      const active = o.slug === selectedSlug;
      const nearest = o.slug === nearestSlug;
      const marker = L.marker([o.latitude, o.longitude], {
        title: o.name,
        alt: o.name,
        zIndexOffset: active || nearest ? 1000 : 0,
        icon: L.divIcon({ className: "outlet-pin", html: pinHtml(active, nearest), iconSize: [38, 48], iconAnchor: [19, 46], popupAnchor: [0, -42] }),
      });
      marker.bindPopup(
        `<div style="min-width:180px"><strong style="font-size:15px">${esc(o.name)}</strong><br/>
         <span style="color:#555">${esc(o.locality)}, ${esc(o.city)}</span><br/>
         <span style="color:#555;font-size:12px">${esc(hoursSummary(o))}</span>
         ${o.coordinatesVerified ? "" : '<br/><em style="color:#c9531f;font-size:11px">Approximate pin — exact location to be confirmed</em>'}
         <div style="margin-top:8px;display:flex;gap:10px;font-weight:600">
           <a href="/outlets/${esc(o.slug)}" style="color:#c9531f">Details</a>
           <a href="${esc(directionsUrl(o))}" target="_blank" rel="noopener noreferrer" style="color:#c9531f">Directions ↗</a>
         </div></div>`,
      );
      marker.on("click", () => onSelectRef.current?.(o.slug));
      marker.addTo(layer);
      if (active) marker.openPopup();
      points.push([o.latitude, o.longitude]);
    });

    if (userLocation) {
      L.circleMarker([userLocation.lat, userLocation.lng], { radius: 8, color: "#fff", weight: 3, fillColor: "#2563eb", fillOpacity: 1 })
        .bindTooltip("You are here")
        .addTo(layer);
      points.push([userLocation.lat, userLocation.lng]);
    }

    if (points.length === 1) map.setView(points[0], 15);
    else if (points.length > 1) map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 15 });
  }, [outlets, selectedSlug, nearestSlug, userLocation]);

  return <div ref={elRef} className={className ?? "h-full w-full"} role="region" aria-label="Map of outlet locations" />;
}
