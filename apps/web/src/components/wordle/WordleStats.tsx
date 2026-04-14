import { wordleLeaderboardMock } from "../../data/wordleLeaderboardMock";

function WordleStats() {
  return (
    <section className="wordle-leaderboard-box">
      <div className="wordle-leaderboard-header">
        <p className="wordle-leaderboard-kicker">TOP 5</p>
        <h3 className="wordle-leaderboard-title">Leaderboard</h3>
        <p className="wordle-leaderboard-copy">
          Vista temporal con mock data para luego conectarlo a base de datos.
        </p>
      </div>

      <div className="wordle-leaderboard-list">
        {wordleLeaderboardMock.map((player, index) => (
          <article key={player.id} className="wordle-leaderboard-item">
            <div className="wordle-leaderboard-rank">#{index + 1}</div>

            <div className="wordle-leaderboard-player">
              <p className="wordle-leaderboard-name">{player.username}</p>
              <p className="wordle-leaderboard-meta">
                {player.wins} wins · streak {player.streak}
              </p>
            </div>

            <div className="wordle-leaderboard-stat">
              <span className="wordle-leaderboard-stat-label">AVG</span>
              <strong>{player.averageGuesses.toFixed(1)}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WordleStats;
