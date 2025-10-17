// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  REVIEWER = 'reviewer',
  EDITOR = 'editor',
  VIEWER = 'viewer'
}

// Campaign related types
export interface Campaign {
  id: string;
  title: string;
  description: string;
  status: CampaignStatus;
  ownerId: string;
  progress: number;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum CampaignStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Project related types
export interface Project {
  id: string;
  campaignId: string;
  type: ProjectType;
  title: string;
  content: string;
  status: ProjectStatus;
  templateId?: string;
  assignedTo?: string;
  scheduledAt?: Date;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  LINK = 'link',
  CAROUSEL = 'carousel'
}

export enum ProjectStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  FAILED = 'failed'
}

// Report related types
export interface Report {
  id: string;
  projectId?: string;
  campaignId?: string;
  type: ReportType;
  data: ReportData;
  generatedAt: Date;
  createdAt: Date;
}

export enum ReportType {
  PERFORMANCE = 'performance',
  ENGAGEMENT = 'engagement',
  ANALYTICS = 'analytics',
  SUMMARY = 'summary'
}

export interface ReportData {
  metrics: Record<string, number>;
  charts?: ChartData[];
  summary?: string;
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'doughnut';
  data: any[];
  options?: Record<string, any>;
}

// Audit Log related types
export interface AuditLog {
  id: string;
  userId: string;
  entityType: AuditEntityType;
  entityId: string;
  action: AuditAction;
  oldValue?: any;
  newValue?: any;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export enum AuditEntityType {
  USER = 'user',
  CAMPAIGN = 'campaign',
  PROJECT = 'project',
  REPORT = 'report',
  SYSTEM = 'system'
}

export enum AuditAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LOGIN = 'login',
  LOGOUT = 'logout',
  PUBLISH = 'publish',
  APPROVE = 'approve',
  REJECT = 'reject'
}

// API related types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Authentication related types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

// Facebook API related types
export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  category: string;
  tasks: string[];
}

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url: string;
  full_picture?: string;
}

export interface FacebookInsights {
  post_impressions: number;
  post_clicks: number;
  post_reactions_total: number;
  post_shares: number;
  post_comments: number;
}

// Template related types
export interface Template {
  id: string;
  name: string;
  type: ProjectType;
  content: string;
  variables: TemplateVariable[];
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'image' | 'number' | 'date';
  defaultValue?: string;
  required: boolean;
  description?: string;
}
