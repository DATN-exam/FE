export type TNotification = {
  id: string | null
  data: TDataNotification | null
  read_at: string | null
  time_ago: string | null
  created_at: string | null
  updated_at: string | null
}

export type TDataNotification = {
  message: string | null
  url: string | null
}
