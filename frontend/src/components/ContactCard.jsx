export default function ContactCard({
  label,
  value,
  href,
  onClick
}) {

  const external = href.startsWith('http');

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onClick={onClick}
      className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/30 transition group"
    >

      <div>

        <div className="text-[10px] uppercase tracking-wider text-slate-400">
          {label}
        </div>

        <div className="text-sm font-semibold text-slate-700 mt-1 group-hover:text-blue-600 transition">
          {value}
        </div>

      </div>

      <span className="text-blue-500 group-hover:translate-x-1 transition">
        →
      </span>

    </a>
  );
}
