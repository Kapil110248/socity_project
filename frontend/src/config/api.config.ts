export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
    UPLOAD_PHOTO: '/auth/profile/photo',
    ALL_USERS: '/auth/all',
    STATS: '/auth/stats',
    B2C_STATS: '/auth/b2c-stats',
    USER_ACTIVITY: (id: number | string) => `/auth/${id}/activity`,
    DELETE_USER: (id: number | string) => `/auth/${id}`,
    UPDATE_STATUS: (id: number | string) => `/auth/${id}/status`,
  },
  SOCIETY: {
    LIST: '/society',
    CREATE: '/society',
    UPDATE: (id: number | string) => `/society/${id}`,
    DELETE: (id: number | string) => `/society/${id}`,
    GET: (id: number | string) => `/society/${id}`,
    ALL: '/society/all', // Dropdown list
  },
  EMERGENCY: {
    LOGS: '/emergency/logs',
    BARCODES: '/emergency/barcodes',
    UPDATE_BARCODE_STATUS: (id: string) => `/emergency/barcodes/${id}/status`,
    RESET_BARCODES: '/emergency/barcodes/reset',
  },
  SERVICE: {
    CATEGORIES: '/services/categories',
    CATEGORY_DETAILS: (id: string) => `/services/categories/${id}`,
    INQUIRIES: '/services/inquiries',
    ASSIGN_VENDOR: (id: string) => `/services/inquiries/${id}/assign`,
  },
  COMPLAINT: {
    LIST: '/complaints',
    CREATE: '/complaints',
    UPDATE_STATUS: (id: number | string) => `/complaints/${id}/status`,
    ADD_COMMENT: (id: number | string) => `/complaints/${id}/comments`,
  },
  VENDOR: {
    LIST: '/vendors',
    CREATE: '/vendors',
    UPDATE: (id: number | string) => `/vendors/${id}`,
    DELETE: (id: number | string) => `/vendors/${id}`,
  },
  BILLING: {
    INVOICES: '/billing/invoices',
    GENERATE: '/billing/invoices/generate',
    STATS: '/billing/stats',
  },
  PAYOUT: {
    LIST: '/payouts',
    UPDATE_STATUS: (id: number | string) => `/payouts/${id}/status`,
  }
};
