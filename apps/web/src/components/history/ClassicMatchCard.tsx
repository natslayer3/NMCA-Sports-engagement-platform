import { useEffect, useState } from "react" ;
import type { ClassicMatch } from "../../data/HistoryMockData";

type ClassicMatchCardProps = {
  match: ClassicMatch;
};

function ClassicMatchCard({ match }: ClassicMatchCardProps) {
  const [showFallback, setShowFallback] = useState(!match.imageUrl);

  useEffect(() => {
    setShowFallback(!match.imageUrl);
  }, [match.id, match.imageUrl]);

  return (
    <article className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
      <div className="w-28 shrink-0 md:w-32">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[linear-gradient(135deg,#173a67_0%,#4B92DB_100%)]">
          {!showFallback && match.imageUrl ? (
            <img
              alt={match.title}
              className="absolute inset-0 h-full w-full object-cover object-center"
              onError={() => setShowFallback(true)}
              src={match.imageUrl}
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,35,64,0.06)_0%,rgba(12,35,64,0.2)_100%)]" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center space-y-3">
        <div className="space-y-1">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            {match.season}
          </span>
          <h3 className="text-base font-semibold leading-tight text-slate-900 md:text-lg">
            {match.title}
          </h3>
          <p className="text-[11px] font-medium text-slate-500 md:text-sm">
            vs {match.opponent}
          </p>
          <div className="text-base font-bold leading-none tracking-tight text-slate-900 md:text-lg">
            {match.score}
          </div>
          <p className="line-clamp-2 max-w-[52ch] text-[11px] leading-relaxed text-slate-500">
            {match.description}
          </p>
        </div>

        <a
          className="mt-2 inline-flex w-fit items-center gap-2 self-start rounded-full bg-[#0B2545] px-3.5 py-2 text-[13px] font-semibold text-white shadow-[0_6px_14px_rgba(11,37,69,0.14)] transition-all hover:bg-[#0a1f3a] hover:shadow-[0_10px_18px_rgba(11,37,69,0.18)]"
          href={match.youtubeUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            aria-hidden="true"
            className="h-9.5 w-5.5 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M6 4.5v11l9-5.5-9-5.5Z" />
          </svg>
          {match.buttonLabel}
        </a>
      </div>
    </article>
  );
}

export default ClassicMatchCard;
