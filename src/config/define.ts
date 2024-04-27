export const SORT_TYPE = {
  ASC: 'asc',
  DESC: 'desc',
}

export const DEBOUNCE = {
  TIME_OUT: 300,
}

export const PAGINATION = {
  PAGE_RANGE_DISPLAY: 2,
}

export const DEFAULT_PAGINATION_OBJECT = {
  currentPage: 1,
  lastPage: 0,
  total: 0,
  perPage: 10,
  from: 0,
  to: 0,
}

export const DATE_FORMAT = {
  DATE_DASH: 'yyyy-MM-dd',
  DATE_SLASH: 'yyyy/MM/dd',
}

export const ROLE = {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
}

export const AUTH_VERIFY_STATUS = {
  LOADING: 'loading',
  NOT_VERIFIED: 'not-verified',
  VERIFIED: 'verified',
}

export enum UserStatus {
  WaitVerify = 'WAIT_VERIFY',
  Active = 'ACTIVE',
  Block = 'BLOCK',
  AdminBlock = 'ADMIN_BLOCK',
}

export enum TeacherRegistrationStatus {
  Wait = 'WAIT',
  Accept = 'ACCEPT',
  Deny = 'DENY',
  Cancel = 'CANCEL',
}

export const TEACHER_REGISTRATION_STATUS_LIST_OPTIONS = [
  {
    id: 1,
    name: 'Chờ xác nhận',
    value: TeacherRegistrationStatus.Wait,
    badgeColor: 'bg-yellow-100',
  },
  {
    id: 2,
    name: 'Đã xác nhận',
    value: TeacherRegistrationStatus.Accept,
    badgeColor: 'bg-green-100',
  },
  {
    id: 3,
    name: 'Từ chối',
    value: TeacherRegistrationStatus.Deny,
    badgeColor: 'bg-red-200',
  },
  {
    id: 4,
    name: 'Đã hủy',
    value: TeacherRegistrationStatus.Cancel,
    badgeColor: 'bg-red-100',
  },
]

export const TEACHER_STATUS_LIST_OPTIONS = [
  {
    id: 2,
    name: 'Đang hoạt động',
    value: UserStatus.Active,
    badgeColor: 'bg-green-200',
  },
  {
    id: 4,
    name: 'Bị khóa',
    value: UserStatus.AdminBlock,
    badgeColor: 'bg-red-200',
  },
]

export const STUDENT_STATUS_LIST_OPTIONS = [
  {
    id: 1,
    name: 'Chờ xác nhận',
    value: UserStatus.WaitVerify,
    badgeColor: 'bg-yellow-100',
  },
  {
    id: 2,
    name: 'Đang hoạt động',
    value: UserStatus.Active,
    badgeColor: 'bg-green-200',
  },
  {
    id: 3,
    name: 'Riêng tư',
    value: UserStatus.Block,
    badgeColor: 'bg-fuchsia-400',
  },
  {
    id: 4,
    name: 'Bị khóa',
    value: UserStatus.AdminBlock,
    badgeColor: 'bg-red-200',
  },
]

export const THEMES = {
  light: {
    iconClassName: 'fa-solid fa-sun-bright',
    text: 'Sáng',
  },
  dark: {
    iconClassName: 'fa-solid fa-moon-stars',
    text: 'Tối',
  },
  system: {
    iconClassName: 'fa-solid fa-circle-half-stroke',
    text: 'Mặc định hệ thống',
  },
}
