import { DepthCard } from "@/components/marketing/ScrollEffects";

export function ProductDemoVideo() {
  return (
    <DepthCard className="w-full">
      <video
        className="aspect-video w-full rounded-3xl bg-black object-cover shadow-2xl shadow-primary/15"
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
    </DepthCard>
  );
}
