import { AuditLog, AuditEntityType, AuditAction } from '../types';
import apiClient from './apiClient';

/**
 * Audit logging service for tracking system activities
 */
class AuditService {
  /**
   * Log an audit event
   * @param userId The user ID performing the action
   * @param entityType The entity type
   * @param entityId The entity ID
   * @param action The action performed
   * @param oldValue The old value (for updates)
   * @param newValue The new value (for updates)
   * @param additionalData Additional data to log
   */
  async log({
    userId,
    entityType,
    entityId,
    action,
    oldValue,
    newValue,
    additionalData,
  }: {
    userId: string;
    entityType: AuditEntityType;
    entityId: string;
    action: AuditAction;
    oldValue?: any;
    newValue?: any;
    additionalData?: Record<string, any>;
  }): Promise<void> {
    try {
      const auditLog: Partial<AuditLog> = {
        userId,
        entityType,
        entityId,
        action,
        oldValue,
        newValue,
        timestamp: new Date(),
        ipAddress: this.getClientIpAddress(),
        userAgent: this.getUserAgent(),
        ...additionalData,
      };

      // Send to server
      await apiClient.post('/audit/log', auditLog);
      
      // Also log to console in development
      if (import.meta.env.DEV) {
        console.log('Audit Log:', auditLog);
      }
    } catch (error) {
      // Log error but don't throw to avoid breaking the main flow
      console.error('Failed to log audit event:', error);
    }
  }

  /**
   * Log user login
   * @param userId The user ID
   * @param success Whether the login was successful
   * @param errorMessage Error message if login failed
   */
  async logUserLogin(userId: string, success: boolean, errorMessage?: string): Promise<void> {
    await this.log({
      userId,
      entityType: AuditEntityType.USER,
      entityId: userId,
      action: AuditAction.LOGIN,
      newValue: { success, timestamp: new Date(), errorMessage },
    });
  }

  /**
   * Log user logout
   * @param userId The user ID
   */
  async logUserLogout(userId: string): Promise<void> {
    await this.log({
      userId,
      entityType: AuditEntityType.USER,
      entityId: userId,
      action: AuditAction.LOGOUT,
      newValue: { timestamp: new Date() },
    });
  }

  /**
   * Log entity creation
   * @param userId The user ID creating the entity
   * @param entityType The entity type
   * @param entityId The entity ID
   * @param entityData The entity data
   */
  async logEntityCreation(
    userId: string,
    entityType: AuditEntityType,
    entityId: string,
    entityData: any
  ): Promise<void> {
    await this.log({
      userId,
      entityType,
      entityId,
      action: AuditAction.CREATE,
      newValue: entityData,
    });
  }

  /**
   * Log entity update
   * @param userId The user ID updating the entity
   * @param entityType The entity type
   * @param entityId The entity ID
   * @param oldValue The old entity data
   * @param newValue The new entity data
   */
  async logEntityUpdate(
    userId: string,
    entityType: AuditEntityType,
    entityId: string,
    oldValue: any,
    newValue: any
  ): Promise<void> {
    await this.log({
      userId,
      entityType,
      entityId,
      action: AuditAction.UPDATE,
      oldValue,
      newValue,
    });
  }

  /**
   * Log entity deletion
   * @param userId The user ID deleting the entity
   * @param entityType The entity type
   * @param entityId The entity ID
   * @param entityData The entity data before deletion
   */
  async logEntityDeletion(
    userId: string,
    entityType: AuditEntityType,
    entityId: string,
    entityData: any
  ): Promise<void> {
    await this.log({
      userId,
      entityType,
      entityId,
      action: AuditAction.DELETE,
      oldValue: entityData,
    });
  }

  /**
   * Log campaign publish
   * @param userId The user ID publishing the campaign
   * @param campaignId The campaign ID
   * @param campaignData The campaign data
   */
  async logCampaignPublish(
    userId: string,
    campaignId: string,
    campaignData: any
  ): Promise<void> {
    await this.log({
      userId,
      entityType: AuditEntityType.CAMPAIGN,
      entityId: campaignId,
      action: AuditAction.PUBLISH,
      newValue: campaignData,
    });
  }

  /**
   * Log project approval
   * @param userId The user ID approving the project
   * @param projectId The project ID
   * @param projectData The project data
   */
  async logProjectApproval(
    userId: string,
    projectId: string,
    projectData: any
  ): Promise<void> {
    await this.log({
      userId,
      entityType: AuditEntityType.PROJECT,
      entityId: projectId,
      action: AuditAction.APPROVE,
      newValue: projectData,
    });
  }

  /**
   * Log project rejection
   * @param userId The user ID rejecting the project
   * @param projectId The project ID
   * @param projectData The project data
   * @param rejectionReason The reason for rejection
   */
  async logProjectRejection(
    userId: string,
    projectId: string,
    projectData: any,
    rejectionReason: string
  ): Promise<void> {
    await this.log({
      userId,
      entityType: AuditEntityType.PROJECT,
      entityId: projectId,
      action: AuditAction.REJECT,
      oldValue: projectData,
      newValue: { ...projectData, rejectionReason, rejectedAt: new Date() },
    });
  }

  /**
   * Get audit logs for an entity
   * @param entityType The entity type
   * @param entityId The entity ID
   * @param limit The number of logs to retrieve
   * @param offset The offset for pagination
   * @returns Array of audit logs
   */
  async getEntityAuditLogs(
    entityType: AuditEntityType,
    entityId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<AuditLog[]> {
    try {
      const response = await apiClient.getPaginated<AuditLog>('/audit/logs', {
        params: {
          entityType,
          entityId,
          limit,
          offset,
        },
      });

      return response.data || [];
    } catch (error) {
      console.error('Failed to get audit logs:', error);
      return [];
    }
  }

  /**
   * Get audit logs for a user
   * @param userId The user ID
   * @param limit The number of logs to retrieve
   * @param offset The offset for pagination
   * @returns Array of audit logs
   */
  async getUserAuditLogs(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<AuditLog[]> {
    try {
      const response = await apiClient.getPaginated<AuditLog>('/audit/logs', {
        params: {
          userId,
          limit,
          offset,
        },
      });

      return response.data || [];
    } catch (error) {
      console.error('Failed to get user audit logs:', error);
      return [];
    }
  }

  /**
   * Get audit logs within a date range
   * @param startDate The start date
   * @param endDate The end date
   * @param limit The number of logs to retrieve
   * @param offset The offset for pagination
   * @returns Array of audit logs
   */
  async getAuditLogsByDateRange(
    startDate: Date,
    endDate: Date,
    limit: number = 50,
    offset: number = 0
  ): Promise<AuditLog[]> {
    try {
      const response = await apiClient.getPaginated<AuditLog>('/audit/logs', {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          limit,
          offset,
        },
      });

      return response.data || [];
    } catch (error) {
      console.error('Failed to get audit logs by date range:', error);
      return [];
    }
  }

  /**
   * Search audit logs
   * @param searchTerm The search term
   * @param entityType The entity type to filter by
   * @param action The action to filter by
   * @param limit The number of logs to retrieve
   * @param offset The offset for pagination
   * @returns Array of audit logs
   */
  async searchAuditLogs(
    searchTerm: string,
    entityType?: AuditEntityType,
    action?: AuditAction,
    limit: number = 50,
    offset: number = 0
  ): Promise<AuditLog[]> {
    try {
      const response = await apiClient.getPaginated<AuditLog>('/audit/logs/search', {
        params: {
          searchTerm,
          entityType,
          action,
          limit,
          offset,
        },
      });

      return response.data || [];
    } catch (error) {
      console.error('Failed to search audit logs:', error);
      return [];
    }
  }

  /**
   * Get client IP address
   * @returns The client IP address
   */
  private getClientIpAddress(): string {
    // In a real implementation, this would get the actual client IP
    // For now, we'll return a placeholder
    return '127.0.0.1';
  }

  /**
   * Get user agent string
   * @returns The user agent string
   */
  private getUserAgent(): string {
    return navigator.userAgent || 'Unknown';
  }
}

// Create singleton instance
const auditService = new AuditService();

export default auditService;
