import { SessionData } from "./session-data"
import { StatsApiResponse } from "./stast-api"

export interface TurtleApiResponse {
    error?: string[] | {
        status: number,
        message: string
    },
    message?: string,
    data?: {
        token?: string,
        user?: SessionData,
        stats?: StatsApiResponse[]
    }
  }
  