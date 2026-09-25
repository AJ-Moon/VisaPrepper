import { DepthCard } from "@/components/marketing/ScrollEffects";

export function ProductDemoVideo() {
  return (
    <DepthCard>
      <figure className="overflow-hidden rounded-3xl border border-primary/15 bg-charcoal-800 p-2 shadow-2xl shadow-primary/15 sm:p-3">
        <div className="flex items-center justify-between gap-3 px-3 py-2 text-primary-foreground">
          <figcaption className="text-sm font-semibold">See the full AI video interview</figcaption>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">55 sec</span>
        </div>
        <video
          className="aspect-video w-full rounded-2xl bg-black object-cover"
          src="/video/visaprepper-ai-video-interview.mp4"
          poster="/images/video/visaprepper-ai-video-interview-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label="Visa Prepper AI video interview demonstration"
        >
          Your browser does not support embedded video.
        </video>
        <p className="px-3 pb-2 pt-3 text-xs text-on-charcoal-muted">The video starts muted. Use the controls to hear the sound.</p>
      </figure>
    </DepthCard>
  );
}
