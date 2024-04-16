export type TApiResponseError = {
  message?: string
  response?: {
    data: {
      message?: string
      errors?: {
        [key: string]: string[]
      }
    }
  }
  data?: {
    message?: string
    errors?: {
      [key: string]: string[]
    }
  }
} & string
