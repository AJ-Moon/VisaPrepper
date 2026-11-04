"use client";
import { trapModalFocus } from "@/lib/utils/dialog";
import { useRef } from "react";
import { X } from "lucide-react";
import WhatsAppButton, { WhatsAppIcon } from "@/components/ui/WhatsAppButton";

export default function WhatsAppHelp() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  return <>
    <div className="help-rail fixed bottom-0 start-0 z-40 px-4 pt-2 sm:px-6">
      <button ref={trigger} type="button" onClick={() => dialog.current?.showModal()} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/40 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" aria-haspopup="dialog"><WhatsAppIcon />WhatsApp help</button>
    </div>
    <dialog onKeyDown={trapModalFocus} ref={dialog} aria-labelledby="help-title" className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border bg-background p-6 text-foreground shadow-xl backdrop:bg-black/40" onClose={() => trigger.current?.focus()}>
      <div className="flex items-start justify-between gap-3"><h2 id="help-title" className="font-display text-xl font-semibold">Help getting started</h2><button autoFocus type="button" className="rounded-full p-2" aria-label="Close help" onClick={() => dialog.current?.close()}><X size={19} aria-hidden="true"/></button></div>
      <p className="mt-4 text-sm leading-relaxed">Ask us about getting started or using VisaPrepper. Do not send passports, bank statements or payment details through WhatsApp. Use the secure app for documents.</p>
      <div className="mt-5"><WhatsAppButton /></div>
    </dialog>
  </>;
}
