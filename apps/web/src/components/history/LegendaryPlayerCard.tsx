import { useEffect, useState } from "react";
import type { LegendaryPlayer } from "../../data/HistoryMockData";

type LegendaryPlayerCardProps = {
  player: LegendaryPlayer;
  onOpenProfile: (player: LegendaryPlayer) => void;
};

function LegendaryPlayerCard({
  player,
  onOpenProfile,
}: LegendaryPlayerCardProps) {
  const [showFallback, setShowFallback] = useState(!player.image);

  useEffect(() => {
    setShowFallback(!player.image);
  }, [player.id, player.image]);

  return (
    <article className="grid overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:grid-cols-[0.44fr_0.56fr]">
      <div className="relative min-h-[230px] overflow-hidden bg-[linear-gradient(135deg,#153865_0%,#4B92DB_100%)]">
        {!showFallback && player.image ? (
          <img
            alt={player.name}
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={() => setShowFallback(true)}
            src={player.image}
          />
        ) : null}
        {!showFallback ? (
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,35,64,0.06)_0%,rgba(12,35,64,0.22)_100%)]" />
        ) : null}
      </div>

      <div className="flex min-h-[230px] flex-col justify-between gap-6 p-6 md:p-7">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#edf4fd] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0C2340]">
              {player.position}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
              {player.era}
            </span>
          </div>

          <h3 className="text-[24px] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#0C2340]">
            {player.name}
          </h3>

          <p className="line-clamp-2 max-w-[26ch] text-[14px] leading-relaxed text-slate-500">
            {player.shortDescription}
          </p>
        </div>

        <button
          aria-label={`Open profile for ${player.name}`}
          className="mt-auto h-10 w-fit rounded-xl border border-slate-200 bg-white px-4 text-[12px] font-bold text-[#0C2340] transition hover:border-[#0C2340] hover:bg-slate-50"
          onClick={() => onOpenProfile(player)}
          type="button"
        >
          View Profile
        </button>
      </div>
    </article>
  );
}

export default LegendaryPlayerCard;
