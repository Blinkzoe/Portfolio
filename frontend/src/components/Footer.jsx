import { trackAction } from '../utils/tracking';

export default function Footer() {

  return (
    <footer className="border-t border-slate-200 bg-white mt-16">

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">

        <div className="flex flex-col md:flex-row justify-between gap-5">

          <div>

            <div className="font-bold text-sm text-slate-800">
              Orlando Zoé Morales Lomelí
            </div>

            <div className="text-xs text-slate-400 mt-1">
              Data Engineer & Software Engineer
            </div>

          </div>

          <div className="flex gap-5 text-xs">

            <a
              href="https://www.linkedin.com/in/orlando-morales-820790178/"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackAction('Footer: LinkedIn')}
              className="text-slate-400 hover:text-blue-500 transition"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/Blinkzoe/"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackAction('Footer: GitHub')}
              className="text-slate-400 hover:text-blue-500 transition"
            >
              GitHub
            </a>

            <span className="text-slate-300">
              © {new Date().getFullYear()}
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}
