/**
 * API Response Type Definitions
 * Shared types for API endpoints across the application
 */

/**
 * Health Check API Response Types
 */
export interface HealthCheckResponse {
  status: "healthy" | "unhealthy";
  database: "connected" | "disconnected";
  timestamp: string;
  responseTime: string;
  error?: string;
}

/**
 * Generic API Error Response
 */
export interface ApiErrorResponse {
  error: string;
  message?: string;
  timestamp: string;
}
