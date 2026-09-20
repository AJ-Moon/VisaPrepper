"use client";
import { useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/layout/CtaButton";
import { Logo } from "@/components/ui/Logo";
import { PRIMARY_NAV, EXTERNAL_LOGIN_URL } from "@/lib/config/site";
export function SiteHeader() {
 const dialog=useRef<HTMLDialogElement>(null);
 function close(){dialog.current?.close();}
 return <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
  <Container className="flex min-h-18 items-center justify-between gap-3 py-3">
   <Link href="/" aria-label="Visa Prepper home"><Logo className="max-[360px]:[&>span:last-child]:hidden"/></Link>
   <nav aria-label="Primary" className="hidden items-center gap-4 xl:flex">{PRIMARY_NAV.map(link=><Link key={link.href} href={link.href} className="text-sm font-medium hover:underline">{link.label}</Link>)}</nav>
   <div className="hidden items-center gap-4 xl:flex"><a href={EXTERNAL_LOGIN_URL} className="text-sm font-medium">Log In</a><CtaButton/></div>
   <div className="flex items-center gap-2 xl:hidden"><CtaButton label="Start Preparing" className="px-3 text-sm"/><button type="button" aria-label="Open menu" onClick={()=>dialog.current?.showModal()} className="rounded-full p-3"><Menu className="h-5 w-5" aria-hidden="true"/></button></div>
  </Container>
  <dialog ref={dialog} aria-label="Main navigation" className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-background p-6 text-foreground" onClick={e=>{if((e.target as HTMLElement).closest("a"))close();}}>
    <div className="flex items-center justify-between"><Logo/><button onClick={close} aria-label="Close menu" className="rounded-full p-3"><X aria-hidden="true"/></button></div>
    <nav aria-label="Mobile primary" className="mt-8 flex flex-col gap-2">{PRIMARY_NAV.map(link=><Link key={link.href} href={link.href} className="rounded-xl p-3 text-xl hover:bg-sage-soft">{link.label}</Link>)}<a href={EXTERNAL_LOGIN_URL} className="p-3 text-xl">Log In</a><Link href="/blog" className="p-3 text-xl">Free guides</Link></nav>
    <div className="mt-6"><CtaButton size="lg"/></div>
  </dialog>
 </header>;
}
