import type { RosterCard } from "../types";

/** Patrón público de headshots NFL en ESPN CDN (mismo que devuelve la API). */
const ESPN_NFL_HEADSHOT = (espnId: number) =>
  `https://a.espncdn.com/i/headshots/nfl/players/full/${espnId}.png`;

export function resolveHeadshotForRosterCard(card: RosterCard): string | null {
  return resolveHeadshotFromRow(card as unknown as Record<string, unknown>);
}

export function normalizeHeadshotUrl(url: string | null | undefined): string | null {
  if (url == null) return null;
  const u = String(url).trim();
  if (!u) return null;
  if (u.startsWith("//")) return `https:${u}`;
  if (u.startsWith("http://")) return `https://${u.slice(7)}`;
  return u;
}

/** Une snake_case / camelCase del API y aplica fallback por espn id si hace falta. */
export function resolveHeadshotFromRow(row: Record<string, unknown>): string | null {
  const raw =
    (row.headshot_url as string | undefined) ??
    (row.headshotUrl as string | undefined) ??
    null;
  const normalized = normalizeHeadshotUrl(raw);
  if (normalized) return normalized;

  const id = Number(row.espn_athlete_id ?? row.espnAthleteId);
  if (Number.isFinite(id) && id > 0) {
    return ESPN_NFL_HEADSHOT(id);
  }
  return null;
}
