"use client";
import { useState, type FormEvent } from "react";

export default function CallbackRequest({ brand, phone }: { brand: string; phone: string }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    setBusy(true); setStatus("");
    try {
      const response = await fetch("https://www.hvacrgroup.com.au/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, callback: true, name: data.get("name"), phone: data.get("phone"), preferredTime: data.get("preferredTime"), website: data.get("website"), pageUrl: window.location.href }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to request a callback.");
      setSent(true); setStatus("Callback requested. Our team will contact you. Your preferred time is a request, not a confirmed booking.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to send. Please call us."); }
    finally { setBusy(false); }
  }
  return <details id="request-callback" className="my-6 rounded-lg border border-border bg-white p-5 text-slate-900">
    <summary className="cursor-pointer py-2 text-lg font-semibold">Prefer us to call you?</summary>
    <p className="my-3 text-sm">Request a callback for a non-urgent enquiry. For urgent help, <a className="underline" href={`tel:${phone.replace(/[^+0-9]/g, "")}`}>call {phone}</a>.</p>
    {!sent && <form onSubmit={submit} className="space-y-3">
      <label className="block">Name<input name="name" autoComplete="name" required maxLength={160} className="mt-1 block w-full rounded border border-slate-300 p-3 text-base" /></label>
      <label className="block">Phone<input name="phone" type="tel" autoComplete="tel" required minLength={8} maxLength={40} className="mt-1 block w-full rounded border border-slate-300 p-3 text-base" /></label>
      <label className="block">Preferred callback time (optional)<input name="preferredTime" maxLength={160} placeholder="For example, Monday morning" className="mt-1 block w-full rounded border border-slate-300 p-3 text-base" /></label>
      <div hidden aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
      <button disabled={busy} className="rounded bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-60">{busy ? "Sending…" : "Request callback"}</button>
    </form>}
    {status && <p role={sent ? "status" : "alert"} className="mt-3 text-sm">{status}</p>}
  </details>;
}
