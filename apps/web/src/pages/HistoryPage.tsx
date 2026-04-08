import { useState } from "react";
import ClassicMatchCard from "../components/history/ClassicMatchCard";
import LegendaryPlayerCard from "../components/history/LegendaryPlayerCard";
import LegendaryPlayerModal from "../components/history/LegendaryPlayerModal";
import TimelineItem from "../components/history/TimelineItem";
import TimelineStoryModal from "../components/history/TimelineStoryModal";
import Navbar from "../components/layout/Navbar";
import {
  classicMatches,
  historyStats,
  legendaryPlayers,
  timelineEvents,
} from "../data/HistoryMockData";
import type { LegendaryPlayer, TimelineEvent } from "../data/HistoryMockData";
import "../styles/history.css";

function HistoryPage() {
  const [showAllMatches, setShowAllMatches] = useState(false);
  const [selectedTimelineEvent, setSelectedTimelineEvent] =
    useState<TimelineEvent | null>(null);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] =
    useState<LegendaryPlayer | null>(null);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);

  const visiblePlayers = legendaryPlayers.slice(0, 6);
  const visibleMatches = showAllMatches
    ? classicMatches
    : classicMatches.slice(0, 4);

  function handleOpenTimelineStory(event: TimelineEvent) {
    setSelectedTimelineEvent(event);
    setIsTimelineModalOpen(true);
  }

  function handleCloseTimelineStory() {
    setIsTimelineModalOpen(false);
    setSelectedTimelineEvent(null);
  }

  function handleOpenPlayerProfile(player: LegendaryPlayer) {
    setSelectedPlayer(player);
    setIsPlayerModalOpen(true);
  }

  function handleClosePlayerProfile() {
    setIsPlayerModalOpen(false);
    setSelectedPlayer(null);
  }

  return (
    <div className="history-page">
      <main className="history-container">
        <Navbar />

        <section className="history-hero">
          <div className="history-hero-text">
            <h1 className="history-title">History of the Tennessee Titans</h1>
            <p className="history-subtitle">
              From the Houston Oilers to Tennessee Titans -- A legacy of excellence
            </p>
          </div>
        </section>

        <section className="history-section">
          <div className="history-stats-grid">
            {historyStats.map((stat) => (
              <article key={stat.id} className="history-stat-card">
                <span className="history-stat-value">{stat.value}</span>
                <span className="history-stat-label">{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="history-section-block mt-2">
          <h2 className="history-section-title">Historical Timeline</h2>
          <div className="history-timeline-list">
            {timelineEvents.map((event) => (
              <TimelineItem
                key={event.id}
                event={event}
                onOpenStory={handleOpenTimelineStory}
              />
            ))}
          </div>
        </section>

        <section className="history-section-block mt-6 px-6 py-8 md:px-8 md:py-9">
          <h2 className="history-section-title">Legendary Players</h2>
          <div className="mt-8 grid gap-6 lg:gap-7 md:grid-cols-2 lg:grid-cols-3">
            {visiblePlayers.map((player) => (
              <LegendaryPlayerCard
                key={player.id}
                player={player}
                onOpenProfile={handleOpenPlayerProfile}
              />
            ))}
          </div>
        </section>

        <section className="history-section-block mt-5 px-6 py-8 md:px-8 md:py-10">
          <h2 className="history-section-title">Classic Matches Archive</h2>
          <div className="mt-10 grid gap-7 lg:grid-cols-2 lg:gap-8">
            {visibleMatches.map((match) => (
              <ClassicMatchCard key={match.id} match={match} />
            ))}
          </div>
          {classicMatches.length > 4 ? (
            <div className="mt-10 flex justify-center">
              <button
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#cfd6e1] bg-white px-6 text-[13px] font-bold text-[#0C2340] transition hover:border-[#0C2340] hover:bg-slate-50"
                type="button"
                onClick={() => setShowAllMatches((current) => !current)}
              >
                {showAllMatches ? "Show Less Replays" : "View More Replays"}
              </button>
            </div>
          ) : null}
        </section>

        <section className="history-footer-cta">
          <h2 className="history-footer-title">Building a Legacy</h2>
          <p className="history-footer-text">
            From the Oilers to the Titans, our history is filled with unforgettable
            moments and legends.
          </p>
        </section>

        <TimelineStoryModal
          event={selectedTimelineEvent}
          isOpen={isTimelineModalOpen}
          onClose={handleCloseTimelineStory}
        />
        <LegendaryPlayerModal
          isOpen={isPlayerModalOpen}
          onClose={handleClosePlayerProfile}
          player={selectedPlayer}
        />
      </main>
    </div>
  );
}

export default HistoryPage;
