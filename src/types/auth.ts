export type LoginPayloads = {
  email: string | null
  password: string | null
}

export type TAuthAdminProfile = {
  id: number | null
  email: string | null
  role: string | null
  first_name: string | null
  last_name: string | null
  dob: string | Date | null
  ward_id: number | null
  address: string | null
  avatar: string | null
  description: string | null
}

export type RegisterPayloads = {
  first_name: string | null
  last_name: string | null
  dob: string | null
  email: string | null
  password: string | null
}
