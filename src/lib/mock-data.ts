import type { Match } from '../../specs/data.schema'

// Realistic WC2026 Group Stage fixtures with full squads
// Tournament started June 11, 2026. Data current as of June 14.

export const MOCK_MATCHES: Match[] = [
  {
    id: 'wc26-bra-mex',
    homeTeam: { id: 'bra', name: 'Brazil', shortName: 'BRA', flag: '🇧🇷', group: 'D', fifaRanking: 1 },
    awayTeam: { id: 'mex', name: 'Mexico', shortName: 'MEX', flag: '🇲🇽', group: 'D', fifaRanking: 11 },
    stage: 'Group Stage – Group D',
    venue: 'MetLife Stadium',
    city: 'East Rutherford',
    country: 'USA',
    dateUtc: '2026-06-15T18:00:00Z',
    status: 'scheduled',
    weather: { condition: 'Partly Cloudy', tempC: 24, humidity: 62, windKph: 15 },
    homeSquad: [
      {
        id: 'alisson', name: 'Alisson Becker', position: 'GK', shirtNumber: 1,
        teamId: 'bra', age: 33, club: 'Liverpool', injuryStatus: 'fit',
        keyStrengths: ['Shot-stopping', 'Distribution', 'Aerial dominance'],
        recentForm: [
          { opponent: 'Bolivia', result: 'W', score: '4-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026 Qualifier' },
          { opponent: 'Peru', result: 'W', score: '2-0', rating: 7.2, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026 Qualifier' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 0, avgRating: 7.3, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'militao', name: 'Éder Militão', position: 'DEF', shirtNumber: 3,
        teamId: 'bra', age: 26, club: 'Real Madrid', injuryStatus: 'fit',
        keyStrengths: ['Aerial duels', 'Pace', 'Interceptions'],
        recentForm: [
          { opponent: 'Bolivia', result: 'W', score: '4-0', rating: 7.8, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
          { opponent: 'Peru', result: 'W', score: '2-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 1, avgRating: 7.6, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'marquinhos', name: 'Marquinhos', position: 'DEF', shirtNumber: 4,
        teamId: 'bra', age: 30, club: 'PSG', injuryStatus: 'fit',
        keyStrengths: ['Leadership', 'Reading the game', 'Tackling'],
        recentForm: [
          { opponent: 'Bolivia', result: 'W', score: '4-0', rating: 7.5, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
          { opponent: 'Peru', result: 'W', score: '2-0', rating: 7.8, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 1, assists: 0, avgRating: 7.6, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'wendell', name: 'Wendell', position: 'DEF', shirtNumber: 6,
        teamId: 'bra', age: 31, club: 'Porto', injuryStatus: 'fit',
        keyStrengths: ['Crossing', 'Overlapping runs', 'Stamina'],
        recentForm: [
          { opponent: 'Bolivia', result: 'W', score: '4-0', rating: 7.0, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 1, avgRating: 7.0, yellowCards: 1, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'danilo', name: 'Danilo', position: 'DEF', shirtNumber: 2,
        teamId: 'bra', age: 33, club: 'Juventus', injuryStatus: 'fit',
        keyStrengths: ['Experience', 'Versatility', 'Set pieces'],
        recentForm: [
          { opponent: 'Bolivia', result: 'W', score: '4-0', rating: 7.2, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 0, avgRating: 7.1, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'casemiro', name: 'Casemiro', position: 'MID', shirtNumber: 5,
        teamId: 'bra', age: 34, club: 'Manchester United', injuryStatus: 'fit',
        keyStrengths: ['Ball-winning', 'Shielding defence', 'Long passing'],
        recentForm: [
          { opponent: 'Bolivia', result: 'W', score: '4-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
          { opponent: 'Peru', result: 'W', score: '2-0', rating: 7.3, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 0, avgRating: 7.4, yellowCards: 1, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'bruno-guimaraes', name: 'Bruno Guimarães', position: 'MID', shirtNumber: 8,
        teamId: 'bra', age: 27, club: 'Newcastle United', injuryStatus: 'fit',
        keyStrengths: ['Box-to-box running', 'Pressing', 'Through balls'],
        recentForm: [
          { opponent: 'Bolivia', result: 'W', score: '4-0', rating: 8.2, goals: 1, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
          { opponent: 'Peru', result: 'W', score: '2-0', rating: 7.8, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 1, assists: 2, avgRating: 8.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'lucas-paqueta', name: 'Lucas Paquetá', position: 'MID', shirtNumber: 10,
        teamId: 'bra', age: 27, club: 'West Ham United', injuryStatus: 'fit',
        keyStrengths: ['Creativity', 'Dribbling', 'Link-up play'],
        recentForm: [
          { opponent: 'Bolivia', result: 'W', score: '4-0', rating: 7.8, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 1, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'raphinha', name: 'Raphinha', position: 'FWD', shirtNumber: 11,
        teamId: 'bra', age: 29, club: 'Barcelona', injuryStatus: 'fit',
        keyStrengths: ['Pace', 'Dribbling', 'Goal-scoring', 'Free kicks'],
        recentForm: [
          { opponent: 'Bolivia', result: 'W', score: '4-0', rating: 8.5, goals: 2, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
          { opponent: 'Peru', result: 'W', score: '2-0', rating: 8.0, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 3, assists: 1, avgRating: 8.2, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'vinicius-jr', name: 'Vinícius Jr.', position: 'FWD', shirtNumber: 7,
        teamId: 'bra', age: 25, club: 'Real Madrid', injuryStatus: 'fit',
        keyStrengths: ['Pace', 'Dribbling', 'Clinical finishing', 'Creativity'],
        recentForm: [
          { opponent: 'Bolivia', result: 'W', score: '4-0', rating: 9.0, goals: 2, assists: 2, minutesPlayed: 90, competition: 'WC2026' },
          { opponent: 'Peru', result: 'W', score: '2-0', rating: 8.5, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 3, assists: 2, avgRating: 8.7, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'endrick', name: 'Endrick', position: 'FWD', shirtNumber: 9,
        teamId: 'bra', age: 19, club: 'Real Madrid', injuryStatus: 'fit',
        keyStrengths: ['Explosive pace', 'Physical strength', 'Finishing'],
        recentForm: [
          { opponent: 'Bolivia', result: 'W', score: '4-0', rating: 7.5, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
          { opponent: 'Peru', result: 'W', score: '2-0', rating: 7.2, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 1, assists: 1, avgRating: 7.3, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
    ],
    awaySquad: [
      {
        id: 'mex-ochoa', name: 'Guillermo Ochoa', position: 'GK', shirtNumber: 1,
        teamId: 'mex', age: 40, club: 'Club América', injuryStatus: 'fit',
        keyStrengths: ['Shot-stopping', 'Big game experience', 'Penalties'],
        recentForm: [
          { opponent: 'USA', result: 'D', score: '1-1', rating: 8.0, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'mex-sanchez', name: 'Jorge Sánchez', position: 'DEF', shirtNumber: 2,
        teamId: 'mex', age: 26, club: 'Ajax', injuryStatus: 'fit',
        keyStrengths: ['Pace', 'Overlapping', 'Crossing'],
        recentForm: [
          { opponent: 'USA', result: 'D', score: '1-1', rating: 6.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 0, avgRating: 6.5, yellowCards: 1, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'mex-araujo', name: 'César Montes', position: 'DEF', shirtNumber: 5,
        teamId: 'mex', age: 28, club: 'Monterrey', injuryStatus: 'fit',
        keyStrengths: ['Aerial duels', 'Physicality', 'Leadership'],
        recentForm: [
          { opponent: 'USA', result: 'D', score: '1-1', rating: 7.2, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 0, avgRating: 6.9, yellowCards: 1, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'mex-moreno', name: 'Néstor Araújo', position: 'DEF', shirtNumber: 3,
        teamId: 'mex', age: 33, club: 'Santos Laguna', injuryStatus: 'fit',
        keyStrengths: ['Positioning', 'Composure', 'Experience'],
        recentForm: [
          { opponent: 'USA', result: 'D', score: '1-1', rating: 7.0, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 0, avgRating: 6.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'mex-gallardo', name: 'Jesús Gallardo', position: 'DEF', shirtNumber: 23,
        teamId: 'mex', age: 29, club: 'Monterrey', injuryStatus: 'fit',
        keyStrengths: ['Pace', 'Defensive work rate', 'Stamina'],
        recentForm: [
          { opponent: 'USA', result: 'D', score: '1-1', rating: 6.8, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 0, avgRating: 6.7, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'mex-herrera', name: 'Héctor Herrera', position: 'MID', shirtNumber: 16,
        teamId: 'mex', age: 35, club: 'Houston Dynamo', injuryStatus: 'fit',
        keyStrengths: ['Experience', 'Ball control', 'Leadership'],
        recentForm: [
          { opponent: 'USA', result: 'D', score: '1-1', rating: 7.0, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 1, avgRating: 6.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'mex-guardado', name: 'Edson Álvarez', position: 'MID', shirtNumber: 6,
        teamId: 'mex', age: 27, club: 'West Ham United', injuryStatus: 'fit',
        keyStrengths: ['Defensive midfield', 'Ball recovery', 'Distribution'],
        recentForm: [
          { opponent: 'USA', result: 'D', score: '1-1', rating: 7.2, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 0, avgRating: 7.0, yellowCards: 1, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'mex-lainez', name: 'Diego Lainez', position: 'MID', shirtNumber: 22,
        teamId: 'mex', age: 24, club: 'Betis', injuryStatus: 'fit',
        keyStrengths: ['Dribbling', 'Creativity', 'Pace'],
        recentForm: [
          { opponent: 'USA', result: 'D', score: '1-1', rating: 6.5, goals: 0, assists: 0, minutesPlayed: 75, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 0, avgRating: 6.3, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'mex-lozano', name: 'Hirving Lozano', position: 'FWD', shirtNumber: 22,
        teamId: 'mex', age: 30, club: 'PSV Eindhoven', injuryStatus: 'fit',
        keyStrengths: ['Pace', 'Dribbling', 'Goal-scoring'],
        recentForm: [
          { opponent: 'USA', result: 'D', score: '1-1', rating: 7.5, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
          { opponent: 'Bolivia', result: 'W', score: '3-0', rating: 8.0, goals: 2, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 3, assists: 0, avgRating: 7.7, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'mex-jimenez', name: 'Raúl Jiménez', position: 'FWD', shirtNumber: 9,
        teamId: 'mex', age: 35, club: 'Fulham', injuryStatus: 'fit',
        keyStrengths: ['Hold-up play', 'Link-up play', 'Headers', 'Experience'],
        recentForm: [
          { opponent: 'USA', result: 'D', score: '1-1', rating: 7.0, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
          { opponent: 'Bolivia', result: 'W', score: '3-0', rating: 7.5, goals: 1, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 1, assists: 2, avgRating: 7.2, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'mex-funes', name: 'Alexis Vega', position: 'FWD', shirtNumber: 14,
        teamId: 'mex', age: 28, club: 'Guadalajara', injuryStatus: 'fit',
        keyStrengths: ['Technical skill', 'Set pieces', 'Work rate'],
        recentForm: [
          { opponent: 'USA', result: 'D', score: '1-1', rating: 6.8, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 2, goals: 0, assists: 0, avgRating: 6.7, yellowCards: 1, redCards: 0 },
        isStarter: true,
      },
    ],
  },
  {
    id: 'wc26-fra-ger',
    homeTeam: { id: 'fra', name: 'France', shortName: 'FRA', flag: '🇫🇷', group: 'E', fifaRanking: 2 },
    awayTeam: { id: 'ger', name: 'Germany', shortName: 'GER', flag: '🇩🇪', group: 'E', fifaRanking: 14 },
    stage: 'Group Stage – Group E',
    venue: 'AT&T Stadium',
    city: 'Arlington',
    country: 'USA',
    dateUtc: '2026-06-16T20:00:00Z',
    status: 'scheduled',
    weather: { condition: 'Clear', tempC: 32, humidity: 55, windKph: 10 },
    homeSquad: [
      {
        id: 'maignan', name: 'Mike Maignan', position: 'GK', shirtNumber: 1,
        teamId: 'fra', age: 28, club: 'AC Milan', injuryStatus: 'fit',
        keyStrengths: ['Shot-stopping', 'Command of box', 'Sweeper-keeper'],
        recentForm: [
          { opponent: 'Poland', result: 'W', score: '3-1', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'pavard', name: 'Benjamin Pavard', position: 'DEF', shirtNumber: 5,
        teamId: 'fra', age: 29, club: 'Inter Milan', injuryStatus: 'fit',
        keyStrengths: ['Versatility', 'Physicality', 'Reading the game'],
        recentForm: [
          { opponent: 'Poland', result: 'W', score: '3-1', rating: 7.2, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.2, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'saliba', name: 'William Saliba', position: 'DEF', shirtNumber: 17,
        teamId: 'fra', age: 25, club: 'Arsenal', injuryStatus: 'fit',
        keyStrengths: ['Composure', 'Ball-playing ability', 'One-on-one defending'],
        recentForm: [
          { opponent: 'Poland', result: 'W', score: '3-1', rating: 8.0, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 8.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'upamecano', name: 'Dayot Upamecano', position: 'DEF', shirtNumber: 4,
        teamId: 'fra', age: 26, club: 'Bayern Munich', injuryStatus: 'fit',
        keyStrengths: ['Pace', 'Aerial strength', 'Aggressive pressing'],
        recentForm: [
          { opponent: 'Poland', result: 'W', score: '3-1', rating: 7.0, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.0, yellowCards: 1, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'theo-hernandez', name: 'Theo Hernández', position: 'DEF', shirtNumber: 22,
        teamId: 'fra', age: 28, club: 'AC Milan', injuryStatus: 'fit',
        keyStrengths: ['Pace', 'Crossing', 'Goal threat from left back'],
        recentForm: [
          { opponent: 'Poland', result: 'W', score: '3-1', rating: 8.5, goals: 1, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 1, avgRating: 8.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'tchouameni', name: 'Aurélien Tchouaméni', position: 'MID', shirtNumber: 8,
        teamId: 'fra', age: 26, club: 'Real Madrid', injuryStatus: 'fit',
        keyStrengths: ['Ball-winning', 'Athleticism', 'Long-range shooting'],
        recentForm: [
          { opponent: 'Poland', result: 'W', score: '3-1', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'camavinga', name: 'Eduardo Camavinga', position: 'MID', shirtNumber: 14,
        teamId: 'fra', age: 23, club: 'Real Madrid', injuryStatus: 'fit',
        keyStrengths: ['Energy', 'Pressing', 'Creativity'],
        recentForm: [
          { opponent: 'Poland', result: 'W', score: '3-1', rating: 7.8, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 7.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'griezmann', name: 'Antoine Griezmann', position: 'MID', shirtNumber: 7,
        teamId: 'fra', age: 35, club: 'Atlético Madrid', injuryStatus: 'fit',
        keyStrengths: ['Intelligent movement', 'Link-up play', 'Set pieces'],
        recentForm: [
          { opponent: 'Poland', result: 'W', score: '3-1', rating: 8.2, goals: 1, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 1, avgRating: 8.2, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'dembele', name: 'Ousmane Dembélé', position: 'FWD', shirtNumber: 11,
        teamId: 'fra', age: 29, club: 'PSG', injuryStatus: 'fit',
        keyStrengths: ['Dribbling', 'Pace', 'Final third delivery'],
        recentForm: [
          { opponent: 'Poland', result: 'W', score: '3-1', rating: 7.5, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'mbappe', name: 'Kylian Mbappé', position: 'FWD', shirtNumber: 10,
        teamId: 'fra', age: 27, club: 'Real Madrid', injuryStatus: 'fit',
        keyStrengths: ['World-class pace', 'Clinical finishing', 'Dribbling', 'Intelligence'],
        recentForm: [
          { opponent: 'Poland', result: 'W', score: '3-1', rating: 9.2, goals: 2, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 2, assists: 1, avgRating: 9.2, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'giroud', name: 'Olivier Giroud', position: 'FWD', shirtNumber: 9,
        teamId: 'fra', age: 39, club: 'Los Angeles FC', injuryStatus: 'fit',
        keyStrengths: ['Hold-up play', 'Headers', 'Link-up play', 'Experience'],
        recentForm: [
          { opponent: 'Poland', result: 'W', score: '3-1', rating: 7.0, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 7.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
    ],
    awaySquad: [
      {
        id: 'ter-stegen', name: 'Marc-André ter Stegen', position: 'GK', shirtNumber: 1,
        teamId: 'ger', age: 34, club: 'Barcelona', injuryStatus: 'fit',
        keyStrengths: ['Distribution', 'Sweeping', 'Reflexes'],
        recentForm: [
          { opponent: 'Japan', result: 'W', score: '2-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'kimmich', name: 'Joshua Kimmich', position: 'DEF', shirtNumber: 6,
        teamId: 'ger', age: 31, club: 'Bayern Munich', injuryStatus: 'fit',
        keyStrengths: ['Versatility', 'Intelligence', 'Pressing', 'Passing range'],
        recentForm: [
          { opponent: 'Japan', result: 'W', score: '2-0', rating: 8.5, goals: 0, assists: 2, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 2, avgRating: 8.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'rudiger', name: 'Antonio Rüdiger', position: 'DEF', shirtNumber: 2,
        teamId: 'ger', age: 33, club: 'Real Madrid', injuryStatus: 'fit',
        keyStrengths: ['Physical defending', 'Aggression', 'Aerial duels'],
        recentForm: [
          { opponent: 'Japan', result: 'W', score: '2-0', rating: 7.8, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.8, yellowCards: 1, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'schlotterbeck', name: 'Nico Schlotterbeck', position: 'DEF', shirtNumber: 4,
        teamId: 'ger', age: 26, club: 'Borussia Dortmund', injuryStatus: 'fit',
        keyStrengths: ['Ball-playing', 'Positioning', 'Composure'],
        recentForm: [
          { opponent: 'Japan', result: 'W', score: '2-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'raum', name: 'David Raum', position: 'DEF', shirtNumber: 3,
        teamId: 'ger', age: 26, club: 'RB Leipzig', injuryStatus: 'fit',
        keyStrengths: ['Crossing', 'Offensive runs', 'Work rate'],
        recentForm: [
          { opponent: 'Japan', result: 'W', score: '2-0', rating: 7.0, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 7.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'goretzka', name: 'Leon Goretzka', position: 'MID', shirtNumber: 8,
        teamId: 'ger', age: 31, club: 'Bayern Munich', injuryStatus: 'fit',
        keyStrengths: ['Box-to-box', 'Goal-scoring', 'Physical power'],
        recentForm: [
          { opponent: 'Japan', result: 'W', score: '2-0', rating: 7.2, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 0, avgRating: 7.2, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'kroos', name: 'Toni Kroos', position: 'MID', shirtNumber: 18,
        teamId: 'ger', age: 36, club: 'Real Madrid', injuryStatus: 'fit',
        keyStrengths: ['Passing mastery', 'Set pieces', 'Game reading', 'Experience'],
        recentForm: [
          { opponent: 'Japan', result: 'W', score: '2-0', rating: 8.8, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 8.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'musiala', name: 'Jamal Musiala', position: 'MID', shirtNumber: 10,
        teamId: 'ger', age: 23, club: 'Bayern Munich', injuryStatus: 'fit',
        keyStrengths: ['Dribbling', 'Creativity', 'Tight spaces', 'Goal-scoring'],
        recentForm: [
          { opponent: 'Japan', result: 'W', score: '2-0', rating: 9.0, goals: 1, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 1, avgRating: 9.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'gnabry', name: 'Serge Gnabry', position: 'FWD', shirtNumber: 7,
        teamId: 'ger', age: 30, club: 'Bayern Munich', injuryStatus: 'fit',
        keyStrengths: ['Pace', 'Finishing', 'Direct play'],
        recentForm: [
          { opponent: 'Japan', result: 'W', score: '2-0', rating: 7.5, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'havertz', name: 'Kai Havertz', position: 'FWD', shirtNumber: 9,
        teamId: 'ger', age: 26, club: 'Arsenal', injuryStatus: 'fit',
        keyStrengths: ['Technical quality', 'Aerial threat', 'Intelligence'],
        recentForm: [
          { opponent: 'Japan', result: 'W', score: '2-0', rating: 7.8, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 0, avgRating: 7.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'wirtz', name: 'Florian Wirtz', position: 'FWD', shirtNumber: 17,
        teamId: 'ger', age: 23, club: 'Bayer Leverkusen', injuryStatus: 'fit',
        keyStrengths: ['Technical brilliance', 'Creativity', 'Goal scoring', 'Dribbling'],
        recentForm: [
          { opponent: 'Japan', result: 'W', score: '2-0', rating: 8.5, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 8.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
    ],
  },
  {
    id: 'wc26-eng-arg',
    homeTeam: { id: 'eng', name: 'England', shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'H', fifaRanking: 5 },
    awayTeam: { id: 'arg', name: 'Argentina', shortName: 'ARG', flag: '🇦🇷', group: 'H', fifaRanking: 3 },
    stage: 'Group Stage – Group H',
    venue: 'SoFi Stadium',
    city: 'Inglewood',
    country: 'USA',
    dateUtc: '2026-06-17T01:00:00Z',
    status: 'scheduled',
    weather: { condition: 'Clear', tempC: 27, humidity: 45, windKph: 8 },
    homeSquad: [
      {
        id: 'pickford', name: 'Jordan Pickford', position: 'GK', shirtNumber: 1,
        teamId: 'eng', age: 32, club: 'Everton', injuryStatus: 'fit',
        keyStrengths: ['Reflexes', 'Penalty-saving', 'Distribution'],
        recentForm: [
          { opponent: 'Serbia', result: 'W', score: '2-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'trippier', name: 'Kieran Trippier', position: 'DEF', shirtNumber: 12,
        teamId: 'eng', age: 35, club: 'Newcastle United', injuryStatus: 'fit',
        keyStrengths: ['Crossing', 'Set pieces', 'Defensive discipline'],
        recentForm: [
          { opponent: 'Serbia', result: 'W', score: '2-0', rating: 7.8, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 7.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'stones', name: 'John Stones', position: 'DEF', shirtNumber: 5,
        teamId: 'eng', age: 31, club: 'Manchester City', injuryStatus: 'fit',
        keyStrengths: ['Ball-playing', 'Composure', 'Positioning'],
        recentForm: [
          { opponent: 'Serbia', result: 'W', score: '2-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'guehi', name: 'Marc Guéhi', position: 'DEF', shirtNumber: 6,
        teamId: 'eng', age: 24, club: 'Crystal Palace', injuryStatus: 'fit',
        keyStrengths: ['One-on-one defending', 'Composure', 'Aerial duels'],
        recentForm: [
          { opponent: 'Serbia', result: 'W', score: '2-0', rating: 7.8, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'chilwell', name: 'Ben Chilwell', position: 'DEF', shirtNumber: 3,
        teamId: 'eng', age: 29, club: 'Chelsea', injuryStatus: 'fit',
        keyStrengths: ['Overlapping', 'Crossing', 'Work rate'],
        recentForm: [
          { opponent: 'Serbia', result: 'W', score: '2-0', rating: 7.0, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'rice', name: 'Declan Rice', position: 'MID', shirtNumber: 4,
        teamId: 'eng', age: 27, club: 'Arsenal', injuryStatus: 'fit',
        keyStrengths: ['Ball recovery', 'Range of passing', 'Stamina', 'Leadership'],
        recentForm: [
          { opponent: 'Serbia', result: 'W', score: '2-0', rating: 8.5, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 8.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'bellingham', name: 'Jude Bellingham', position: 'MID', shirtNumber: 10,
        teamId: 'eng', age: 22, club: 'Real Madrid', injuryStatus: 'fit',
        keyStrengths: ['Goals from midfield', 'Intelligence', 'Physicality', 'Big-game mentality'],
        recentForm: [
          { opponent: 'Serbia', result: 'W', score: '2-0', rating: 9.0, goals: 1, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 1, avgRating: 9.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'saka', name: 'Bukayo Saka', position: 'MID', shirtNumber: 7,
        teamId: 'eng', age: 24, club: 'Arsenal', injuryStatus: 'fit',
        keyStrengths: ['Consistency', 'Dribbling', 'Goal and assist returns', 'Pressing'],
        recentForm: [
          { opponent: 'Serbia', result: 'W', score: '2-0', rating: 8.5, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 0, avgRating: 8.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'foden', name: 'Phil Foden', position: 'MID', shirtNumber: 11,
        teamId: 'eng', age: 26, club: 'Manchester City', injuryStatus: 'fit',
        keyStrengths: ['Technical quality', 'Creativity', 'Tight spaces'],
        recentForm: [
          { opponent: 'Serbia', result: 'W', score: '2-0', rating: 8.0, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 8.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'kane', name: 'Harry Kane', position: 'FWD', shirtNumber: 9,
        teamId: 'eng', age: 32, club: 'Bayern Munich', injuryStatus: 'fit',
        keyStrengths: ['Finishing', 'Hold-up play', 'Link-up play', 'Leadership', 'Set pieces'],
        recentForm: [
          { opponent: 'Serbia', result: 'W', score: '2-0', rating: 8.0, goals: 1, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 1, avgRating: 8.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'rashford', name: 'Marcus Rashford', position: 'FWD', shirtNumber: 11,
        teamId: 'eng', age: 28, club: 'Aston Villa', injuryStatus: 'fit',
        keyStrengths: ['Pace', 'Direct running', 'Left foot'],
        recentForm: [
          { opponent: 'Serbia', result: 'W', score: '2-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
    ],
    awaySquad: [
      {
        id: 'martinez', name: 'Emiliano Martínez', position: 'GK', shirtNumber: 1,
        teamId: 'arg', age: 33, club: 'Aston Villa', injuryStatus: 'fit',
        keyStrengths: ['Penalty-saving', 'Shot-stopping', 'Psychological edge'],
        recentForm: [
          { opponent: 'Ecuador', result: 'W', score: '3-0', rating: 8.0, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 8.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'molina', name: 'Nahuel Molina', position: 'DEF', shirtNumber: 26,
        teamId: 'arg', age: 26, club: 'Atlético Madrid', injuryStatus: 'fit',
        keyStrengths: ['Overlapping', 'Crossing', 'Goal threat'],
        recentForm: [
          { opponent: 'Ecuador', result: 'W', score: '3-0', rating: 7.8, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 0, avgRating: 7.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'romero', name: 'Cristian Romero', position: 'DEF', shirtNumber: 13,
        teamId: 'arg', age: 26, club: 'Tottenham Hotspur', injuryStatus: 'fit',
        keyStrengths: ['Aggressive defending', 'Interceptions', 'Physicality'],
        recentForm: [
          { opponent: 'Ecuador', result: 'W', score: '3-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 1, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'lisandro', name: 'Lisandro Martínez', position: 'DEF', shirtNumber: 14,
        teamId: 'arg', age: 27, club: 'Manchester United', injuryStatus: 'fit',
        keyStrengths: ['Aerial duels', 'Ball-playing', 'Intensity'],
        recentForm: [
          { opponent: 'Ecuador', result: 'W', score: '3-0', rating: 7.8, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'tagliafico', name: 'Nicolás Tagliafico', position: 'DEF', shirtNumber: 3,
        teamId: 'arg', age: 32, club: 'Olympique Lyonnais', injuryStatus: 'fit',
        keyStrengths: ['Experience', 'Defensive awareness', 'Set pieces'],
        recentForm: [
          { opponent: 'Ecuador', result: 'W', score: '3-0', rating: 7.2, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.2, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'de-paul', name: 'Rodrigo De Paul', position: 'MID', shirtNumber: 7,
        teamId: 'arg', age: 30, club: 'Atlético Madrid', injuryStatus: 'fit',
        keyStrengths: ['Energy', 'Ball-winning', 'Creative passing'],
        recentForm: [
          { opponent: 'Ecuador', result: 'W', score: '3-0', rating: 8.0, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 8.0, yellowCards: 1, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'enzo-fernandez', name: 'Enzo Fernández', position: 'MID', shirtNumber: 24,
        teamId: 'arg', age: 25, club: 'Chelsea', injuryStatus: 'fit',
        keyStrengths: ['Passing range', 'Work rate', 'Technical quality'],
        recentForm: [
          { opponent: 'Ecuador', result: 'W', score: '3-0', rating: 8.2, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 0, avgRating: 8.2, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'mac-allister', name: 'Alexis Mac Allister', position: 'MID', shirtNumber: 20,
        teamId: 'arg', age: 26, club: 'Liverpool', injuryStatus: 'fit',
        keyStrengths: ['Composure', 'Goal-scoring', 'Technical quality'],
        recentForm: [
          { opponent: 'Ecuador', result: 'W', score: '3-0', rating: 7.8, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 7.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'di-maria', name: 'Ángel Di María', position: 'FWD', shirtNumber: 11,
        teamId: 'arg', age: 38, club: 'Benfica', injuryStatus: 'fit',
        keyStrengths: ['Dribbling', 'Crossing', 'Big-game performer', 'Experience'],
        recentForm: [
          { opponent: 'Ecuador', result: 'W', score: '3-0', rating: 7.5, goals: 0, assists: 2, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 2, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'messi', name: 'Lionel Messi', position: 'FWD', shirtNumber: 10,
        teamId: 'arg', age: 38, club: 'Inter Miami', injuryStatus: 'fit',
        keyStrengths: ['World-class vision', 'Free kicks', 'Dribbling', 'Finishing', 'Leadership'],
        recentForm: [
          { opponent: 'Ecuador', result: 'W', score: '3-0', rating: 9.5, goals: 2, assists: 2, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 2, assists: 2, avgRating: 9.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'alvarez', name: 'Julián Álvarez', position: 'FWD', shirtNumber: 9,
        teamId: 'arg', age: 24, club: 'Atlético Madrid', injuryStatus: 'fit',
        keyStrengths: ['Pressing', 'Goal-scoring', 'Versatility', 'Intelligence'],
        recentForm: [
          { opponent: 'Ecuador', result: 'W', score: '3-0', rating: 8.5, goals: 1, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 1, avgRating: 8.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
    ],
  },
  {
    id: 'wc26-esp-ned',
    homeTeam: { id: 'esp', name: 'Spain', shortName: 'ESP', flag: '🇪🇸', group: 'F', fifaRanking: 7 },
    awayTeam: { id: 'ned', name: 'Netherlands', shortName: 'NED', flag: '🇳🇱', group: 'F', fifaRanking: 8 },
    stage: 'Group Stage – Group F',
    venue: 'Hard Rock Stadium',
    city: 'Miami',
    country: 'USA',
    dateUtc: '2026-06-18T23:00:00Z',
    status: 'scheduled',
    weather: { condition: 'Humid', tempC: 31, humidity: 80, windKph: 12 },
    homeSquad: [
      {
        id: 'unai-simon', name: 'Unai Simón', position: 'GK', shirtNumber: 1,
        teamId: 'esp', age: 27, club: 'Athletic Bilbao', injuryStatus: 'fit',
        keyStrengths: ['Reflexes', 'Distribution', 'Composure with ball'],
        recentForm: [
          { opponent: 'Croatia', result: 'W', score: '3-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'carvajal', name: 'Dani Carvajal', position: 'DEF', shirtNumber: 2,
        teamId: 'esp', age: 34, club: 'Real Madrid', injuryStatus: 'fit',
        keyStrengths: ['Defensive awareness', 'Experience', 'Big-game mentality'],
        recentForm: [
          { opponent: 'Croatia', result: 'W', score: '3-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'laporte', name: 'Aymeric Laporte', position: 'DEF', shirtNumber: 14,
        teamId: 'esp', age: 32, club: 'Al-Nassr', injuryStatus: 'fit',
        keyStrengths: ['Ball-playing', 'Passing', 'Composure'],
        recentForm: [
          { opponent: 'Croatia', result: 'W', score: '3-0', rating: 7.8, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'le-normand', name: 'Robin Le Normand', position: 'DEF', shirtNumber: 24,
        teamId: 'esp', age: 28, club: 'Atlético Madrid', injuryStatus: 'fit',
        keyStrengths: ['Aerial duels', 'Physicality', 'Positioning'],
        recentForm: [
          { opponent: 'Croatia', result: 'W', score: '3-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'grimaldo', name: 'Alejandro Grimaldo', position: 'DEF', shirtNumber: 22,
        teamId: 'esp', age: 29, club: 'Bayer Leverkusen', injuryStatus: 'fit',
        keyStrengths: ['Crossing', 'Goal-scoring', 'Attacking runs'],
        recentForm: [
          { opponent: 'Croatia', result: 'W', score: '3-0', rating: 8.0, goals: 0, assists: 2, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 2, avgRating: 8.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'rodri', name: 'Rodri', position: 'MID', shirtNumber: 16,
        teamId: 'esp', age: 29, club: 'Manchester City', injuryStatus: 'fit',
        keyStrengths: ['Passing mastery', 'Defensive discipline', 'Game control'],
        recentForm: [
          { opponent: 'Croatia', result: 'W', score: '3-0', rating: 9.0, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 9.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'pedri', name: 'Pedri', position: 'MID', shirtNumber: 26,
        teamId: 'esp', age: 23, club: 'Barcelona', injuryStatus: 'fit',
        keyStrengths: ['Technical mastery', 'Vision', 'Positional intelligence'],
        recentForm: [
          { opponent: 'Croatia', result: 'W', score: '3-0', rating: 8.5, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 0, avgRating: 8.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'gavi', name: 'Gavi', position: 'MID', shirtNumber: 9,
        teamId: 'esp', age: 24, club: 'Barcelona', injuryStatus: 'fit',
        keyStrengths: ['Pressing', 'Creativity', 'Dribbling', 'Work rate'],
        recentForm: [
          { opponent: 'Croatia', result: 'W', score: '3-0', rating: 8.0, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 8.0, yellowCards: 1, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'yamal', name: 'Lamine Yamal', position: 'FWD', shirtNumber: 19,
        teamId: 'esp', age: 18, club: 'Barcelona', injuryStatus: 'fit',
        keyStrengths: ['Dribbling', 'Pace', 'Direct play', 'Fearlessness'],
        recentForm: [
          { opponent: 'Croatia', result: 'W', score: '3-0', rating: 9.0, goals: 1, assists: 2, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 2, avgRating: 9.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'morata', name: 'Álvaro Morata', position: 'FWD', shirtNumber: 7,
        teamId: 'esp', age: 33, club: 'AC Milan', injuryStatus: 'fit',
        keyStrengths: ['Aerial threat', 'Link-up play', 'Big-game goals'],
        recentForm: [
          { opponent: 'Croatia', result: 'W', score: '3-0', rating: 7.5, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'nico-williams', name: 'Nico Williams', position: 'FWD', shirtNumber: 10,
        teamId: 'esp', age: 22, club: 'Athletic Bilbao', injuryStatus: 'fit',
        keyStrengths: ['Pace', 'Dribbling', 'Work rate', 'Crossing'],
        recentForm: [
          { opponent: 'Croatia', result: 'W', score: '3-0', rating: 8.5, goals: 1, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 1, avgRating: 8.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
    ],
    awaySquad: [
      {
        id: 'flekken', name: 'Mark Flekken', position: 'GK', shirtNumber: 1,
        teamId: 'ned', age: 31, club: 'Brentford', injuryStatus: 'fit',
        keyStrengths: ['Distribution', 'Composure', 'Shot-stopping'],
        recentForm: [
          { opponent: 'Senegal', result: 'W', score: '2-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'dumfries', name: 'Denzel Dumfries', position: 'DEF', shirtNumber: 22,
        teamId: 'ned', age: 28, club: 'Inter Milan', injuryStatus: 'fit',
        keyStrengths: ['Overlapping runs', 'Crosses', 'Physical intensity'],
        recentForm: [
          { opponent: 'Senegal', result: 'W', score: '2-0', rating: 7.5, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'de-vrij', name: 'Stefan de Vrij', position: 'DEF', shirtNumber: 6,
        teamId: 'ned', age: 33, club: 'Inter Milan', injuryStatus: 'fit',
        keyStrengths: ['Leadership', 'Positioning', 'Reading the game'],
        recentForm: [
          { opponent: 'Senegal', result: 'W', score: '2-0', rating: 7.2, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.2, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'timber', name: 'Jurriën Timber', position: 'DEF', shirtNumber: 4,
        teamId: 'ned', age: 23, club: 'Arsenal', injuryStatus: 'fit',
        keyStrengths: ['Versatility', 'One-on-one', 'Ball-playing'],
        recentForm: [
          { opponent: 'Senegal', result: 'W', score: '2-0', rating: 7.8, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'blind', name: 'Daley Blind', position: 'DEF', shirtNumber: 17,
        teamId: 'ned', age: 34, club: 'Girona', injuryStatus: 'fit',
        keyStrengths: ['Experience', 'Left foot', 'Positioning'],
        recentForm: [
          { opponent: 'Senegal', result: 'W', score: '2-0', rating: 7.0, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'frenkie', name: 'Frenkie de Jong', position: 'MID', shirtNumber: 21,
        teamId: 'ned', age: 29, club: 'Barcelona', injuryStatus: 'fit',
        keyStrengths: ['Dribbling from deep', 'Passing', 'Carrying the ball'],
        recentForm: [
          { opponent: 'Senegal', result: 'W', score: '2-0', rating: 8.5, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 8.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'schouten', name: 'Jerdy Schouten', position: 'MID', shirtNumber: 15,
        teamId: 'ned', age: 27, club: 'PSV Eindhoven', injuryStatus: 'fit',
        keyStrengths: ['Ball-winning', 'Positional awareness', 'Simple passing'],
        recentForm: [
          { opponent: 'Senegal', result: 'W', score: '2-0', rating: 7.5, goals: 0, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 0, avgRating: 7.5, yellowCards: 1, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'reijnders', name: 'Tijjani Reijnders', position: 'MID', shirtNumber: 14,
        teamId: 'ned', age: 26, club: 'AC Milan', injuryStatus: 'fit',
        keyStrengths: ['Creativity', 'Goal-scoring', 'Box-to-box'],
        recentForm: [
          { opponent: 'Senegal', result: 'W', score: '2-0', rating: 8.0, goals: 1, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 1, assists: 0, avgRating: 8.0, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'frimpong', name: 'Jeremie Frimpong', position: 'FWD', shirtNumber: 3,
        teamId: 'ned', age: 24, club: 'Bayer Leverkusen', injuryStatus: 'fit',
        keyStrengths: ['Pace', 'Dribbling', 'High press'],
        recentForm: [
          { opponent: 'Senegal', result: 'W', score: '2-0', rating: 7.8, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 7.8, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'gakpo', name: 'Cody Gakpo', position: 'FWD', shirtNumber: 11,
        teamId: 'ned', age: 25, club: 'Liverpool', injuryStatus: 'fit',
        keyStrengths: ['Versatility', 'Goal-scoring', 'Pace', 'Dribbling'],
        recentForm: [
          { opponent: 'Senegal', result: 'W', score: '2-0', rating: 8.5, goals: 2, assists: 0, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 2, assists: 0, avgRating: 8.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
      {
        id: 'depay', name: 'Memphis Depay', position: 'FWD', shirtNumber: 10,
        teamId: 'ned', age: 32, club: 'Corinthians', injuryStatus: 'fit',
        keyStrengths: ['Leadership', 'Direct play', 'Goal-scoring', 'Experience'],
        recentForm: [
          { opponent: 'Senegal', result: 'W', score: '2-0', rating: 7.5, goals: 0, assists: 1, minutesPlayed: 90, competition: 'WC2026' },
        ],
        tournamentStats: { appearances: 1, goals: 0, assists: 1, avgRating: 7.5, yellowCards: 0, redCards: 0 },
        isStarter: true,
      },
    ],
  },
]

export function getMatchById(id: string): Match | undefined {
  return MOCK_MATCHES.find(m => m.id === id)
}

export function getMatchSummaries() {
  return MOCK_MATCHES.map(({ homeSquad, awaySquad, weather, ...rest }) => rest)
}
