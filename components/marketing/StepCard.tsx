export function StepCard({
  number,
  title,
  description,
  media,
}: {
  number: number;
  title: string;
  description: string;
  media: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 py-14 first:pt-0 last:pb-0 lg:grid-cols-2 lg:gap-16">
      <div className={number % 2 === 0 ? "lg:order-2" : undefined}>
        <span className="font-display text-4xl font-semibold text-sage">
          {String(number).padStart(2, "0")}
        </span>
        <h3 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className={`flex justify-center ${number % 2 === 0 ? "lg:order-1" : ""}`}>{media}</div>
    </div>
  );
}
