export default function LanguageBar({ name, level, width }) {

  return (
    <div>

      <div className="flex justify-between text-xs mb-2">

        <span className="font-semibold text-slate-700">
          {name}
        </span>

        <span className="text-slate-400">
          {level}
        </span>

      </div>

      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-400"
          style={{ width }}
        />

      </div>

    </div>
  );
}
