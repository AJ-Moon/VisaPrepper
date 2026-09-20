"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play, Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { APPROVED_TESTIMONIALS } from "@/lib/content/testimonials";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const readMotion = () => window.matchMedia(motionQuery).matches;
const serverMotion = () => true;
const PIXELS_PER_SECOND = 22;

export function Testimonials() {
  const viewport = useRef<HTMLDivElement>(null);
  const firstSet = useRef<HTMLUListElement>(null);
  const hovering = useRef(false);
  const focused = useRef(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, readMotion, serverMotion);

  useEffect(() => {
    const el = viewport.current;
    const group = firstSet.current;
    if (!el || !group || paused || reducedMotion) return;
    let frame = 0;
    let previous = 0;
    let position = el.scrollLeft;
    let visible = false;

    function tick(now: number) {
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (!hovering.current && !focused.current) {
        const distance = group!.offsetWidth;
        if (distance > 0) {
          position = (position + elapsed * PIXELS_PER_SECOND / 1000) % distance;
          el!.scrollLeft = position;
        }
      } else {
        position = el!.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    }
    function syncPlayback() {
      cancelAnimationFrame(frame);
      previous = 0;
      position = el!.scrollLeft;
      if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      cancelAnimationFrame(frame);
    };
  }, [paused, reducedMotion]);

  function move(direction: number) {
    const el = viewport.current;
    const group = firstSet.current;
    if (!el || !group) return;
    setPaused(true);
    const step = (group.firstElementChild?.getBoundingClientRect().width ?? 320) + 20;
    const distance = group.offsetWidth;
    const target = el.scrollLeft + step * direction;
    el.scrollTo({
      left: reducedMotion ? Math.max(0, target) : (target + distance) % distance,
      behavior: "auto",
    });
  }

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="min-w-0 scroll-mt-24 bg-surface-muted py-14 sm:py-20">
      <Container>
        <p className="text-sm font-semibold text-primary">From our customers</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 id="testimonials-heading" className="font-display text-3xl font-semibold sm:text-4xl">A little practice. A clearer answer.</h2>
            <p className="mt-4 text-lg text-muted-foreground">Applicants share what helped them feel more prepared.</p>
          </div>
          <div className="flex items-center gap-2" aria-label="Testimonial controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous testimonial" aria-controls="testimonial-track" className="rounded-full border bg-surface p-3"><ArrowLeft aria-hidden="true" className="h-5 w-5" /></button>
            <button type="button" onClick={() => setPaused(value => !value)} disabled={reducedMotion} aria-label={reducedMotion ? "Automatic scrolling off: reduced motion" : paused ? "Play testimonials" : "Pause testimonials"} aria-controls="testimonial-track" className="inline-flex min-h-11 items-center gap-2 rounded-full border bg-surface px-4 py-3 text-sm font-semibold disabled:opacity-60">
              {paused || reducedMotion ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
              {reducedMotion ? "Motion off" : paused ? "Play" : "Pause"}
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Next testimonial" aria-controls="testimonial-track" className="rounded-full border bg-surface p-3"><ArrowRight aria-hidden="true" className="h-5 w-5" /></button>
          </div>
        </div>
        <p id="testimonial-help" className="mt-5 text-sm text-muted-foreground">Pause to read, or swipe to explore. Use the arrows to see more.</p>
      </Container>
      <div className="mx-auto mt-7 max-w-[1440px] px-5 sm:px-8">
        <div ref={viewport} id="testimonial-track" tabIndex={0} role="region" aria-label="Customer testimonials" aria-describedby="testimonial-help"
          className="testimonial-viewport rounded-2xl"
          onPointerEnter={event => { if (event.pointerType === "mouse") hovering.current = true; }}
          onPointerLeave={() => { hovering.current = false; }}
          onPointerDown={() => setPaused(true)}
          onFocus={() => { focused.current = true; }}
          onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) focused.current = false; }}
          onWheel={() => setPaused(true)}
          onKeyDown={event => { if (["ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(event.key)) setPaused(true); }}
        >
          <div className="flex w-max items-stretch">
            {[false, true].map(copy => (
              <ul key={String(copy)} ref={copy ? undefined : firstSet} aria-label={copy ? undefined : "Applicant reviews"} aria-hidden={copy || undefined} inert={copy || undefined} data-review-set={copy ? "duplicate" : "original"} className={copy ? "testimonial-set testimonial-copy" : "testimonial-set"}>
                {APPROVED_TESTIMONIALS.map(review => (
                  <li key={review.id} data-review-id={review.id} className="testimonial-card flex flex-col rounded-2xl border bg-surface p-6 sm:p-7">
                    <Quote className="h-6 w-6 text-primary/45" aria-hidden="true" />
                    <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground">“{review.quote}”</blockquote>
                    <div className="mt-7 border-t pt-5">
                      <p className="font-semibold">{review.displayName}<span className="font-normal text-muted-foreground"> · {review.country}</span></p>
                      <p className="mt-2 text-sm font-medium text-primary">{review.visaCategory}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <Container><p className="mt-6 text-sm text-muted-foreground">Individual experiences vary. Preparation does not guarantee a visa. <Link href="/visa-types" className="underline">Check current availability</Link> before choosing your interview.</p></Container>
    </section>
  );
}

