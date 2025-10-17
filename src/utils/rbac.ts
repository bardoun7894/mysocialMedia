import { UserRole } from '../types';

// Permission definitions
export enum Permission {
  // User management
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_LIST = 'user:list',
  
  // Campaign management
  CAMPAIGN_CREATE = 'campaign:create',
  CAMPAIGN_READ = 'campaign:read',
  CAMPAIGN_UPDATE = 'campaign:update',
  CAMPAIGN_DELETE = 'campaign:delete',
  CAMPAIGN_LIST = 'campaign:list',
  CAMPAIGN_PUBLISH = 'campaign:publish',
  
  // Project management
  PROJECT_CREATE = 'project:create',
  PROJECT_READ = 'project:read',
  PROJECT_UPDATE = 'project:update',
  PROJECT_DELETE = 'project:delete',
  PROJECT_LIST = 'project:list',
  PROJECT_APPROVE = 'project:approve',
  PROJECT_REJECT = 'project:reject',
  
  // Report management
  REPORT_CREATE = 'report:create',
  REPORT_READ = 'report:read',
  REPORT_UPDATE = 'report:update',
  REPORT_DELETE = 'report:delete',
  REPORT_LIST = 'report:list',
  REPORT_EXPORT = 'report:export',
  
  // Analytics
  ANALYTICS_VIEW = 'analytics:view',
  ANALYTICS_EXPORT = 'analytics:export',
  
  // Settings
  SETTINGS_READ = 'settings:read',
  SETTINGS_UPDATE = 'settings:update',
  
  // System
  SYSTEM_AUDIT = 'system:audit',
  SYSTEM_BACKUP = 'system:backup',
  SYSTEM_RESTORE = 'system:restore',
}

// Role permissions mapping
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    // User management
    Permission.USER_CREATE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.USER_DELETE,
    Permission.USER_LIST,
    
    // Campaign management
    Permission.CAMPAIGN_CREATE,
    Permission.CAMPAIGN_READ,
    Permission.CAMPAIGN_UPDATE,
    Permission.CAMPAIGN_DELETE,
    Permission.CAMPAIGN_LIST,
    Permission.CAMPAIGN_PUBLISH,
    
    // Project management
    Permission.PROJECT_CREATE,
    Permission.PROJECT_READ,
    Permission.PROJECT_UPDATE,
    Permission.PROJECT_DELETE,
    Permission.PROJECT_LIST,
    Permission.PROJECT_APPROVE,
    Permission.PROJECT_REJECT,
    
    // Report management
    Permission.REPORT_CREATE,
    Permission.REPORT_READ,
    Permission.REPORT_UPDATE,
    Permission.REPORT_DELETE,
    Permission.REPORT_LIST,
    Permission.REPORT_EXPORT,
    
    // Analytics
    Permission.ANALYTICS_VIEW,
    Permission.ANALYTICS_EXPORT,
    
    // Settings
    Permission.SETTINGS_READ,
    Permission.SETTINGS_UPDATE,
    
    // System
    Permission.SYSTEM_AUDIT,
    Permission.SYSTEM_BACKUP,
    Permission.SYSTEM_RESTORE,
  ],
  
  [UserRole.REVIEWER]: [
    // Campaign management
    Permission.CAMPAIGN_READ,
    Permission.CAMPAIGN_LIST,
    Permission.CAMPAIGN_PUBLISH,
    
    // Project management
    Permission.PROJECT_READ,
    Permission.PROJECT_LIST,
    Permission.PROJECT_APPROVE,
    Permission.PROJECT_REJECT,
    
    // Report management
    Permission.REPORT_READ,
    Permission.REPORT_LIST,
    Permission.REPORT_EXPORT,
    
    // Analytics
    Permission.ANALYTICS_VIEW,
    Permission.ANALYTICS_EXPORT,
    
    // Settings
    Permission.SETTINGS_READ,
  ],
  
  [UserRole.EDITOR]: [
    // Campaign management
    Permission.CAMPAIGN_CREATE,
    Permission.CAMPAIGN_READ,
    Permission.CAMPAIGN_UPDATE,
    Permission.CAMPAIGN_LIST,
    
    // Project management
    Permission.PROJECT_CREATE,
    Permission.PROJECT_READ,
    Permission.PROJECT_UPDATE,
    Permission.PROJECT_LIST,
    
    // Report management
    Permission.REPORT_READ,
    Permission.REPORT_LIST,
    
    // Analytics
    Permission.ANALYTICS_VIEW,
    
    // Settings
    Permission.SETTINGS_READ,
  ],
  
  [UserRole.VIEWER]: [
    // Campaign management
    Permission.CAMPAIGN_READ,
    Permission.CAMPAIGN_LIST,
    
    // Project management
    Permission.PROJECT_READ,
    Permission.PROJECT_LIST,
    
    // Report management
    Permission.REPORT_READ,
    Permission.REPORT_LIST,
    
    // Analytics
    Permission.ANALYTICS_VIEW,
    
    // Settings
    Permission.SETTINGS_READ,
  ],
};

/**
 * Check if a user role has a specific permission
 * @param role The user role
 * @param permission The permission to check
 * @returns True if the role has the permission, false otherwise
 */
export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions.includes(permission);
};

/**
 * Check if a user role has any of the specified permissions
 * @param role The user role
 * @param permissions The permissions to check
 * @returns True if the role has any of the permissions, false otherwise
 */
export const hasAnyPermission = (role: UserRole, permissions: Permission[]): boolean => {
  const rolePermissions = ROLE_PERMISSIONS[role];
  return permissions.some(permission => rolePermissions.includes(permission));
};

/**
 * Check if a user role has all of the specified permissions
 * @param role The user role
 * @param permissions The permissions to check
 * @returns True if the role has all of the permissions, false otherwise
 */
export const hasAllPermissions = (role: UserRole, permissions: Permission[]): boolean => {
  const rolePermissions = ROLE_PERMISSIONS[role];
  return permissions.every(permission => rolePermissions.includes(permission));
};

/**
 * Get all permissions for a specific role
 * @param role The user role
 * @returns Array of permissions for the role
 */
export const getRolePermissions = (role: UserRole): Permission[] => {
  return ROLE_PERMISSIONS[role] || [];
};

/**
 * Check if a role can perform an action on a resource
 * @param role The user role
 * @param action The action to perform
 * @param resource The resource type
 * @returns True if the role can perform the action, false otherwise
 */
export const canPerformAction = (
  role: UserRole,
  action: 'create' | 'read' | 'update' | 'delete' | 'list' | 'publish' | 'approve' | 'reject' | 'export',
  resource: 'user' | 'campaign' | 'project' | 'report' | 'analytics' | 'settings' | 'system'
): boolean => {
  const permission = `${resource}:${action}` as Permission;
  return hasPermission(role, permission);
};

/**
 * Resource ownership check - users can only modify their own resources unless they're admins
 * @param userRole The user's role
 * @param resourceOwnerId The owner ID of the resource
 * @param currentUserId The current user's ID
 * @returns True if the user can modify the resource, false otherwise
 */
export const canModifyResource = (
  userRole: UserRole,
  resourceOwnerId: string,
  currentUserId: string
): boolean => {
  // Admins can modify any resource
  if (userRole === UserRole.ADMIN) {
    return true;
  }
  
  // Users can only modify their own resources
  return resourceOwnerId === currentUserId;
};

/**
 * Check if a user can access a specific campaign
 * @param userRole The user's role
 * @param campaignOwnerId The owner ID of the campaign
 * @param currentUserId The current user's ID
 * @returns True if the user can access the campaign, false otherwise
 */
export const canAccessCampaign = (
  userRole: UserRole,
  campaignOwnerId: string,
  currentUserId: string
): boolean => {
  // Admins can access any campaign
  if (userRole === UserRole.ADMIN) {
    return true;
  }
  
  // Reviewers can access any campaign for review purposes
  if (userRole === UserRole.REVIEWER) {
    return true;
  }
  
  // Editors and viewers can only access campaigns they own
  return campaignOwnerId === currentUserId;
};

/**
 * Get accessible resources for a role
 * @param role The user role
 * @returns Array of resource types the role can access
 */
export const getAccessibleResources = (role: UserRole): string[] => {
  const resources = new Set<string>();
  
  const permissions = getRolePermissions(role);
  
  permissions.forEach(permission => {
    const [resource] = permission.split(':');
    resources.add(resource);
  });
  
  return Array.from(resources);
};

/**
 * Permission levels for hierarchical access control
 */
export enum PermissionLevel {
  READ = 1,
  WRITE = 2,
  ADMIN = 3,
}

/**
 * Get permission level for a specific permission
 * @param permission The permission
 * @returns The permission level
 */
export const getPermissionLevel = (permission: Permission): PermissionLevel => {
  if (permission.includes('delete') || permission.includes('create') || permission.includes('update')) {
    return PermissionLevel.WRITE;
  }
  
  if (permission.includes('admin') || permission.includes('system')) {
    return PermissionLevel.ADMIN;
  }
  
  return PermissionLevel.READ;
};

/**
 * Check if a role has at least a specific permission level
 * @param role The user role
 * @param level The minimum permission level required
 * @returns True if the role meets or exceeds the permission level
 */
export const hasPermissionLevel = (role: UserRole, level: PermissionLevel): boolean => {
  const permissions = getRolePermissions(role);
  
  return permissions.some(permission => {
    const permissionLevel = getPermissionLevel(permission);
    return permissionLevel >= level;
  });
};
