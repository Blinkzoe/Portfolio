export default function SectionHeader({
  eyebrow,
  title,
  description
}) {

  return (
    <div>

      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
        {eyebrow}
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
        {title}
      </h1>

      <p className="text-sm text-slate-400 mt-3 max-w-2xl leading-relaxed">
        {description}
      </p>

    </div>
  );
}
