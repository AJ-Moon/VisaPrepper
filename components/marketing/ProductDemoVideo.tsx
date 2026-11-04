export function ProductDemoVideo() {
  return (
    <div className="home-enter rounded-[1.65rem] border border-primary/20 bg-surface p-1.5 shadow-xl shadow-primary/15 sm:rounded-[2rem] sm:p-2.5">
      <video
        className="block aspect-video w-full rounded-[1.2rem] bg-black object-contain sm:rounded-[1.4rem]"
        src="/video/visaprepper-ai-video-interview.mp4"
        poster="/images/video/visaprepper-ai-video-interview-poster.jpg"
        muted
        playsInline
        controls
        preload="none"
        aria-label="Visa Prepper AI video interview demonstration"
      >
        Your browser does not support embedded video.
      </video>
    </div>
  );
}
