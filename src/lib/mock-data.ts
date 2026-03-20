// Shared mock data for all design variations

export interface Player {
  id: number;
  x: number;
  y: number;
  position: string;
  name: string;
  stamina: number;
  sprints: number;
  distance: number;
  status: 'optimal' | 'warning' | 'critical';
  rating: number;
  trend: 'up' | 'down' | 'stable';
  fatigue: number;
  impact: number;
  keyStat: string;
}

export interface Pass {
  from: number;
  to: number;
  weight: number;
}

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'card' | 'sub' | 'chance';
  team: 'home' | 'away';
  title: string;
  description: string;
  xg?: number;
}

export interface XGDataPoint {
  minute: number;
  home: number;
  away: number;
}

// Home Team players in 4-3-3 formation
export const players: Player[] = [
  { id: 1, x: 8, y: 30, position: 'GK', name: 'J. Martinez', stamina: 92, sprints: 2, distance: 3.2, status: 'optimal', rating: 7.1, trend: 'stable', fatigue: 15, impact: 45, keyStat: '3 Saves' },
  { id: 2, x: 22, y: 12, position: 'LB', name: 'T. Smith', stamina: 68, sprints: 18, distance: 8.4, status: 'warning', rating: 7.3, trend: 'up', fatigue: 55, impact: 71, keyStat: '12 Crosses' },
  { id: 3, x: 22, y: 48, position: 'RB', name: 'R. Johnson', stamina: 85, sprints: 14, distance: 7.8, status: 'optimal', rating: 7.8, trend: 'stable', fatigue: 30, impact: 76, keyStat: '5 Key Passes' },
  { id: 4, x: 18, y: 24, position: 'CB', name: 'M. Bright', stamina: 91, sprints: 5, distance: 5.9, status: 'optimal', rating: 7.9, trend: 'stable', fatigue: 25, impact: 78, keyStat: '8 Interceptions' },
  { id: 5, x: 18, y: 36, position: 'CB', name: 'L. Williamson', stamina: 78, sprints: 8, distance: 7.1, status: 'optimal', rating: 8.2, trend: 'up', fatigue: 40, impact: 82, keyStat: '100% Aerial Duels Won' },
  { id: 6, x: 35, y: 30, position: 'CDM', name: 'K. Walsh', stamina: 35, sprints: 31, distance: 9.4, status: 'critical', rating: 9.1, trend: 'up', fatigue: 85, impact: 88, keyStat: '94% Pass Accuracy' },
  { id: 7, x: 45, y: 15, position: 'LCM', name: 'M. Kerr', stamina: 85, sprints: 12, distance: 6.5, status: 'optimal', rating: 7.2, trend: 'stable', fatigue: 30, impact: 65, keyStat: '5 Shots, 3 On Target' },
  { id: 8, x: 45, y: 45, position: 'RCM', name: 'A. Hemp', stamina: 62, sprints: 18, distance: 7.8, status: 'warning', rating: 6.8, trend: 'down', fatigue: 72, impact: 45, keyStat: '12 Ball Recoveries' },
  { id: 9, x: 55, y: 30, position: 'CAM', name: 'J. Rodriguez', stamina: 75, sprints: 15, distance: 7.2, status: 'optimal', rating: 8.0, trend: 'up', fatigue: 45, impact: 85, keyStat: '3 Key Passes' },
  { id: 10, x: 75, y: 15, position: 'LW', name: 'S. Hansen', stamina: 42, sprints: 24, distance: 8.2, status: 'warning', rating: 8.4, trend: 'up', fatigue: 65, impact: 92, keyStat: '2 Goals, 1 Assist' },
  { id: 11, x: 75, y: 45, position: 'RW', name: 'C. Williams', stamina: 88, sprints: 10, distance: 6.8, status: 'optimal', rating: 7.5, trend: 'stable', fatigue: 25, impact: 70, keyStat: '4 Successful Dribbles' },
  { id: 12, x: 85, y: 30, position: 'ST', name: 'D. Martinez', stamina: 55, sprints: 20, distance: 7.5, status: 'warning', rating: 8.8, trend: 'up', fatigue: 60, impact: 95, keyStat: '1 Goal, 2 Assists' },
];

// Passing pattern data
export const passes: Pass[] = [
  { from: 4, to: 6, weight: 3 },
  { from: 5, to: 6, weight: 2 },
  { from: 6, to: 9, weight: 4 },
  { from: 6, to: 7, weight: 2 },
  { from: 6, to: 8, weight: 2 },
  { from: 9, to: 10, weight: 3 },
  { from: 9, to: 11, weight: 3 },
  { from: 9, to: 12, weight: 5 },
  { from: 7, to: 10, weight: 2 },
  { from: 8, to: 11, weight: 2 },
  { from: 2, to: 7, weight: 1.5 },
  { from: 3, to: 8, weight: 1.5 },
];

// Match events
export const matchEvents: MatchEvent[] = [
  { minute: 62, type: 'chance', team: 'home', title: 'Big Chance - Hansen', description: 'Shot from close range saved by keeper', xg: 0.45 },
  { minute: 58, type: 'card', team: 'home', title: 'Yellow Card - Walsh', description: 'Tactical foul to stop counter' },
  { minute: 51, type: 'goal', team: 'home', title: 'GOAL - D. Martinez', description: 'Long range strike from edge of box', xg: 0.12 },
  { minute: 45, type: 'sub', team: 'away', title: 'Substitution - Calgary', description: '#14 Off • #22 On' },
  { minute: 34, type: 'goal', team: 'away', title: 'GOAL - Calgary', description: 'Counter attack finished at back post', xg: 0.68 },
  { minute: 18, type: 'goal', team: 'home', title: 'GOAL - Williams', description: 'Header from corner kick', xg: 0.38 },
];

// xG timeline data
export const xgData: XGDataPoint[] = [
  { minute: 0, home: 0, away: 0 },
  { minute: 10, home: 0.15, away: 0.08 },
  { minute: 20, home: 0.32, away: 0.21 },
  { minute: 30, home: 0.55, away: 0.35 },
  { minute: 40, home: 0.78, away: 0.52 },
  { minute: 45, home: 0.95, away: 0.64 },
  { minute: 50, home: 1.05, away: 0.71 },
  { minute: 60, home: 1.28, away: 0.89 },
  { minute: 70, home: 1.52, away: 1.12 },
  { minute: 80, home: 1.72, away: 1.38 },
  { minute: 90, home: 1.84, away: 1.51 },
];

// Match info
export const matchInfo = {
  homeTeam: { name: 'U of S', short: 'US', score: 2 },
  awayTeam: { name: 'Calgary', short: 'CG', score: 1 },
  minute: 62,
  second: 34,
  period: 'Second Half',
  momentum: 62,
};