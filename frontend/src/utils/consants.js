// src/utils/constants.js

// User Roles
export const ROLES = {
  CLIENT: 'client',
  FREELANCER: 'freelancer',
  ADMIN: 'admin',
};

// Job Status
export const JOB_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  APPLICATIONS_RECEIVED: 'applications_received',
  SHORTLISTED: 'shortlisted',
  HIRED: 'hired',
  IN_PROGRESS: 'in_progress',
  SUBMITTED: 'submitted',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  CLOSED: 'closed',
};

// Application Status
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  SHORTLISTED: 'shortlisted',
  INTERVIEW: 'interview',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

// Project Status
export const PROJECT_STATUS = {
  IN_PROGRESS: 'in_progress',
  SUBMITTED: 'submitted',
  REVISION_REQUESTED: 'revision_requested',
  APPROVED: 'approved',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Experience Levels
export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Expert' },
];

// Project Types
export const PROJECT_TYPES = [
  { value: 'fixed', label: 'Fixed Price' },
  { value: 'hourly', label: 'Hourly' },
];

// Categories
export const CATEGORIES = [
  { value: 'web_development', label: 'Web Development' },
  { value: 'mobile_development', label: 'Mobile Development' },
  { value: 'design_creative', label: 'Design & Creative' },
  { value: 'writing_translation', label: 'Writing & Translation' },
  { value: 'video_animation', label: 'Video & Animation' },
  { value: 'digital_marketing', label: 'Digital Marketing' },
  { value: 'data_science', label: 'Data Science' },
  { value: 'ai_machine_learning', label: 'AI & Machine Learning' },
  { value: 'devops_cloud', label: 'DevOps & Cloud' },
  { value: 'blockchain_crypto', label: 'Blockchain & Crypto' },
  { value: 'customer_support', label: 'Customer Support' },
  { value: 'sales_marketing', label: 'Sales & Marketing' },
];

// Skills
export const SKILLS = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'PHP',
  'Ruby',
  'Go',
  'React',
  'Angular',
  'Vue.js',
  'Node.js',
  'Express.js',
  'Django',
  'Flask',
  'Spring Boot',
  'Laravel',
  'Ruby on Rails',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'AWS',
  'Azure',
  'GCP',
  'Docker',
  'Kubernetes',
  'Jenkins',
  'Git',
  'Figma',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
  'InDesign',
  'Sketch',
  'SEO',
  'Content Writing',
  'Copywriting',
  'Video Editing',
  'Motion Graphics',
  'UI/UX Design',
  'Graphic Design',
  'Product Design',
  'Project Management',
  'Agile',
  'Scrum',
  'DevOps',
  'Machine Learning',
  'Data Science',
  'Blockchain',
  'Smart Contracts',
  'Solidity',
];

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  APPLICATION: 'application',
  OFFER: 'offer',
  MESSAGE: 'message',
  PROJECT: 'project',
  REVIEW: 'review',
  SYSTEM: 'system',
};

// File Upload Config
export const FILE_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'application/x-zip-compressed',
  ],
  MAX_FILES: 10,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [5, 10, 20, 50, 100],
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_TIME: 'MMM DD, YYYY HH:mm',
  API: 'YYYY-MM-DD',
  API_TIME: 'YYYY-MM-DD HH:mm:ss',
};

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  HOW_IT_WORKS: '/how-it-works',
  BROWSE_JOBS: '/browse-jobs',
  BROWSE_FREELANCERS: '/browse-freelancers',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  ROLE_SELECTION: '/role-selection',
  
  CLIENT: {
    DASHBOARD: '/client/dashboard',
    POST_JOB: '/client/post-job',
    MY_JOBS: '/client/my-jobs',
    JOB_DETAILS: '/client/job/:id',
    APPLICATIONS: '/client/applications',
    SHORTLISTED: '/client/shortlisted',
    PROJECTS: '/client/projects',
    PROFILE: '/client/profile',
    SETTINGS: '/client/settings',
    MESSAGES: '/client/messages',
  },
  
  FREELANCER: {
    DASHBOARD: '/freelancer/dashboard',
    FIND_JOBS: '/freelancer/find-jobs',
    JOB_DETAILS: '/freelancer/job/:id',
    APPLY: '/freelancer/apply/:id',
    MY_APPLICATIONS: '/freelancer/my-applications',
    PROJECTS: '/freelancer/projects',
    PROFILE: '/freelancer/profile',
    PORTFOLIO: '/freelancer/portfolio',
    SETTINGS: '/freelancer/settings',
    MESSAGES: '/freelancer/messages',
  },
  
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    JOBS: '/admin/jobs',
    REPORTS: '/admin/reports',
    CATEGORIES: '/admin/categories',
    SETTINGS: '/admin/settings',
  },
};