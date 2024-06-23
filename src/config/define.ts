export const SORT_TYPE = {
  ASC: 'asc',
  DESC: 'desc',
}

export const DEBOUNCE = {
  TIME_OUT: 300,
}

export const PAGINATION = {
  MARGIN_RANGE_DISPLAY: 3,
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
  DATE_DASH: 'YYYY-MM-DD',
  DATE_DASH_REGISTER: 'yyyy-mm-dd',
  DATE_SLASH: 'yyyy/MM/dd',
  DATE_TIME_DASH: 'YYYY-MM-DD HH:mm:ss',
  TIME_DASH: 'HH:mm:ss',
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

export enum ClassroomStatus {
  Active = 'ACTIVE',
  Block = 'BLOCK',
  AdminBlock = 'ADMIN_BLOCK',
}

export enum ClassroomStudentStatus {
  Active = 'ACTIVE',
  Block = 'BLOCK',
}

export enum ClassroomKeyStatus {
  Active = 'ACTIVE',
  InActive = 'INACTIVE',
}

export enum SetQuestionStatus {
  Active = 'ACTIVE',
  Block = 'BLOCK',
}

export enum QuestionStatus {
  Active = 'ACTIVE',
  Block = 'BLOCK',
}

export enum QuestionType {
  Multiple = 'MULTIPLE',
  Essay = 'ESSAY',
}

export enum QuestionLevel {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD',
}

export enum ExamStatus {
  Happened = 'HAPPENED',
  Upcoming = 'UPCOMING',
  Happening = 'HAPPENING',
}

export enum ExamHistoryType {
  Test = 'HAPPENED',
  Experiment = 'EXPERIMENT',
}

export const EXAM_STATUS_LIST_OPTIONS = [
  {
    id: 1,
    name: 'Đang diễn ra',
    value: ExamStatus.Happening,
    badgeColor: 'bg-green-200',
  },
  {
    id: 2,
    name: 'Đã kết thúc',
    value: ExamStatus.Happened,
    badgeColor: 'bg-red-200',
  },
  {
    id: 3,
    name: 'Sắp diễn ra',
    value: ExamStatus.Upcoming,
    badgeColor: 'bg-red-400',
  },
]

export const CLASSROOM_STATUS_LIST_OPTIONS = [
  {
    id: 1,
    name: 'Đang hoạt động',
    value: ClassroomStatus.Active,
    badgeColor: 'bg-green-200',
  },
  {
    id: 2,
    name: 'Khóa',
    value: ClassroomStatus.Block,
    badgeColor: 'bg-red-200',
  },
  {
    id: 3,
    name: 'Bị khóa',
    value: ClassroomStatus.AdminBlock,
    badgeColor: 'bg-red-400',
  },
]

export const CLASSROOM_STATUS_TEACHER_CREATE_LIST_OPTIONS = [
  {
    id: 1,
    name: 'Hoạt động',
    value: ClassroomStatus.Active,
    badgeColor: 'bg-green-200',
  },
  {
    id: 2,
    name: 'Khóa',
    value: ClassroomStatus.Block,
    badgeColor: 'bg-red-200',
  },
]

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

export const CLASSROOM_STUDENT_LIST_OPTIONS = [
  {
    id: 1,
    name: 'Hoạt động',
    value: ClassroomStudentStatus.Active,
    badgeColor: 'bg-green-200',
  },
  {
    id: 2,
    name: 'Đã khóa',
    value: ClassroomStudentStatus.Block,
    badgeColor: 'bg-red-200',
  },
]

export const CLASSROOM_KEY_LIST_OPTIONS = [
  {
    id: 1,
    name: 'Hoạt động',
    value: ClassroomKeyStatus.Active,
    badgeColor: 'bg-green-200',
  },
  {
    id: 2,
    name: 'Ngưng hoạt động',
    value: ClassroomKeyStatus.InActive,
    badgeColor: 'bg-red-200',
  },
]

export const SET_QUESTION_LIST_OPTIONS = [
  {
    id: 1,
    name: 'Hoạt động',
    value: SetQuestionStatus.Active,
    badgeColor: 'bg-green-200',
  },
  {
    id: 2,
    name: 'Khóa',
    value: SetQuestionStatus.Block,
    badgeColor: 'bg-red-200',
  },
]

export const QUESTION_STATUS_LIST_OPTIONS = [
  {
    id: 1,
    name: 'Hoạt động',
    value: QuestionStatus.Active,
    badgeColor: 'bg-green-200',
  },
  {
    id: 2,
    name: 'Khóa',
    value: QuestionStatus.Block,
    badgeColor: 'bg-red-200',
  },
]

export const QUESTION_TYPE_LIST_OPTIONS = [
  {
    id: 1,
    name: 'Trắc nghiệm',
    value: QuestionType.Multiple,
  },
  {
    id: 2,
    name: 'Tự luận',
    value: QuestionType.Essay,
  },
]

export const QUESTION_LEVEL_LIST_OPTIONS = [
  {
    id: 1,
    name: 'Dễ',
    value: QuestionLevel.Easy,
    badgeColor: 'bg-green-200',
  },
  {
    id: 2,
    name: 'Trung bình',
    value: QuestionLevel.Medium,
    badgeColor: 'bg-orange-200',
  },
  {
    id: 3,
    name: 'Khó',
    value: QuestionLevel.Hard,
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
