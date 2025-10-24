import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import type { HealthCheckResponse } from "@/app/types/api";

export async function GET() {
  const startTime = Date.now();

  try {
    // Test database connectivity with a simple query
    await prisma.$queryRaw`SELECT 1`;

    const responseTime = Date.now() - startTime;

    const response: HealthCheckResponse = {
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    console.error("Health check failed:", error);

    const response: HealthCheckResponse = {
      status: "unhealthy",
      database: "disconnected",
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
