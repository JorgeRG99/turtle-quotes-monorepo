export interface StatsApiResponse {
    rank: number;
    wpm: number;
    accuracy: number;
    totalTime: number;
    totalErrors: number;
    errorRate: number;
    username: string;
  }