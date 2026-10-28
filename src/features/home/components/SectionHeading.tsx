interface SectionHeadingProps {
  tag?: string;
  title: string;
}

export function SectionHeading({ tag, title }: SectionHeadingProps) {
  return (
    <>
      {tag && <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-sand">{tag}</span>}
      <h2 className="mb-4 text-2xl">{title}</h2>
    </>
  );
}
