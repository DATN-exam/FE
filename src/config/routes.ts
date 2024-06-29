export const ROUTES_ADMIN = {
  AUTH: {
    LOGIN: '/admin/auth/login',
    PROFILE: '/admin/auth/profile',
  },
  HOME: '/admin',
  DASHBOARD: '/admin/dashboard',
  TEACHER: '/admin/teachers',
  STUDENT: '/admin/students',
  TEACER_REGISTRATION: '/admin/teachers/registration',
}

export const ROUTES_SITE = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY: '/auth/verify',
    LOGIN_GOOGLE_CALLBACK: '/auth/google/callback',
    PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },
  HOME: '/',
  ACTIVITY: '/activity',
  CLASROOM: {
    INDEX: '/classroom/:classroomId',
    EXAM: '/classroom/:classroomId/exams/:id',
    DO_EXAM: '/classroom/:classroomId/exams/:id/do',
    SHOW_RESULT: '/classroom/:classroomId/exams/:id/show-result',
  },
}

export const ROUTES_TEACHER = {
  HOME: '/teacher',
  DASHBOARD: '/teacher/dashboard',
  CLASSROOM: {
    INDEX: '/teacher/classrooms',
    UPDATE: '/teacher/classrooms/:id',
    STUDENTS: '/teacher/classrooms/:id/students',
    KEYS: '/teacher/classrooms/:id/keys',
    EXAMS: '/teacher/classrooms/:id/exams',
    SHOW_RESULT: '/teacher/classroom/:classroomId/exams/:idExam/show-result/:idHistory',
  },
  SET_QUESTION: {
    INDEX: '/teacher/set-question',
    UPDATE: '/teacher/set-question/:id',
    QUESTIONS: '/teacher/set-question/:id/questions',
  },
}
