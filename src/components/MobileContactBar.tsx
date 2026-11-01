"use client";
import { useEffect } from "react";
import Link from "next/link";
export default function MobileContactBar({phone,label="Request Service"}:{phone:string;label?:string}) {
  useEffect(() => {
    let style: HTMLStyleElement | undefined;
    const install = () => {
      const shadow = document.getElementById("hvacr-outreach-agent")?.shadowRoot;
      if (!shadow) return false;
      style = document.createElement("style");
      style.textContent = "@media(max-width:767px){.oa-wrap{bottom:calc(88px + env(safe-area-inset-bottom))!important}.oa-panel{max-height:calc(100dvh - 170px)}}";
      shadow.appendChild(style); return true;
    };
    const observer = new MutationObserver(() => { if (install()) observer.disconnect(); });
    if (!install()) observer.observe(document.body, {childList:true,subtree:true});
    const timer = setTimeout(() => observer.disconnect(), 20000);
    return () => { clearTimeout(timer); observer.disconnect(); style?.remove(); };
  }, []);
  return <><div className="h-24 md:hidden" aria-hidden="true" /><nav aria-label="Quick contact" className="mobile-contact-actions fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-2 border-t border-slate-200 bg-white p-2 pb-[max(.5rem,env(safe-area-inset-bottom))] shadow-lg md:hidden">
    <a href={`tel:${phone.replace(/[^+0-9]/g, "")}`} className="flex min-h-12 items-center justify-center rounded bg-slate-900 px-1 text-center text-sm font-semibold text-white">Call Now</a>
    <a href="sms:+61409793629" className="flex min-h-12 items-center justify-center rounded border border-slate-300 px-1 text-sm font-semibold text-slate-900">Text Us</a>
    <Link href="/contact" className="flex min-h-12 items-center justify-center rounded border border-slate-300 px-1 text-center text-sm font-semibold text-slate-900">{label}</Link>
  </nav></>;
}
