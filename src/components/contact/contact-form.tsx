"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Field = "name" | "email" | "phone" | "subject" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const empty: Values = { name: "", email: "", phone: "", subject: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  const digits = v.phone.replace(/\D/g, "");
  if (!/^[+\d\s()-]+$/.test(v.phone) || digits.length < 10 || digits.length > 13) e.phone = "Enter a valid phone number (10–13 digits).";
  if (v.subject.trim().length < 3) e.subject = "Please add a short subject.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}

/**
 * DEMO FORM — no backend is configured, so nothing is sent anywhere.
 * To go live, replace the body of `onSubmit` with a call to your email/CRM endpoint.
 */
export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const set = (f: Field, val: string) => {
    const next = { ...values, [f]: val };
    setValues(next);
    if (touched[f]) setErrors(validate(next));
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    if (Object.keys(errs).length) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 700)); // simulated — replace with a real request
    setStatus("done");
    setValues(empty);
    setTouched({});
  };

  const input = (f: Field) =>
    cn(
      "w-full rounded-2xl border-2 bg-white px-4 text-[15px] outline-none transition-colors placeholder:text-charcoal/35 focus:border-accent",
      errors[f] && touched[f] ? "border-red-500" : "border-charcoal/10",
    );

  const err = (f: Field) =>
    errors[f] && touched[f] ? (
      <p id={`${f}-err`} className="mt-1.5 text-sm text-red-700">{errors[f]}</p>
    ) : null;

  const common = (f: Field) => ({
    id: f,
    name: f,
    value: values[f],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(f, e.target.value),
    onBlur: () => {
      setTouched((t) => ({ ...t, [f]: true }));
      setErrors(validate(values));
    },
    "aria-invalid": !!(errors[f] && touched[f]),
    "aria-describedby": errors[f] && touched[f] ? `${f}-err` : undefined,
    className: input(f),
  });

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
      <p className="mb-6 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-charcoal/80">
        <strong>Demo form:</strong> no email or backend is connected yet, so messages are <u>not</u> sent. Please call or email us directly using the details on this page.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">Name</label>
          <input type="text" autoComplete="name" placeholder="Your full name" {...common("name")} className={cn(input("name"), "h-12")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">Email</label>
          <input type="email" autoComplete="email" placeholder="you@example.com" {...common("email")} className={cn(input("email"), "h-12")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">Phone</label>
          <input type="tel" autoComplete="tel" placeholder="+91 98765 43210" {...common("phone")} className={cn(input("phone"), "h-12")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold">Subject</label>
          <input type="text" placeholder="How can we help?" {...common("subject")} className={cn(input("subject"), "h-12")} />
          {err("subject")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">Message</label>
          <textarea rows={5} placeholder="Tell us a little more…" {...common("message")} className={cn(input("message"), "resize-y py-3")} />
          {err("message")}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          <Send className="size-4" aria-hidden /> {status === "submitting" ? "Submitting…" : "Submit (demo)"}
        </Button>
        <div aria-live="polite" role="status">
          <AnimatePresence mode="wait">
            {status === "done" && (
              <motion.p key="ok" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm font-medium text-sage">
                <CircleCheck className="size-5" aria-hidden /> Form validated successfully. (Demo — nothing was sent.)
              </motion.p>
            )}
            {status === "error" && (
              <motion.p key="err" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm font-medium text-red-700">
                <CircleAlert className="size-5" aria-hidden /> Please fix the highlighted fields.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
