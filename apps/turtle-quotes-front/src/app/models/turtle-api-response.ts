import { User } from "./user"

export interface TurtleApiResponse {
    error?: string[] | {
        status: number,
        message: string
    },
    message?: string,
    data?: {
        token?: string,
        user?: User
    }
  }
  