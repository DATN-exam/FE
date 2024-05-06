export type TClassroomKey = {
  id: number | null
  name: string | null
  classroom_id: number | null
  status: string | null
  quantity: number | null
  remaining: number | null
  expired: string | null
}

export type ClassroomKeyPayload = {
  name: string | null
  status: string | null
  quantity: number | null
  expired: string | null
  classroom_id: string | null
}
