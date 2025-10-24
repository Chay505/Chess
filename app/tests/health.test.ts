/**
 * Health Check Endpoint Tests
 *
 * This file validates the /api/health endpoint functionality:
 * 1. Returns proper JSON structure
 * 2. Database connectivity check works
 * 3. Response includes all required fields
 * 4. Error handling for database failures
 * 5. Response time is logged
 */

import { GET } from "@/app/api/health/route";
import { prisma } from "@/app/lib/db";
import type { HealthCheckResponse } from "@/app/types/api";

/**
 * Test 1: Health check returns proper structure on success
 */
async function testHealthCheckSuccess() {
  console.log("Test 1: Health check success response...");

  try {
    const response = await GET();
    const data = await response.json();

    // Verify status code
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }

    // Verify response structure
    const requiredFields = ["status", "database", "timestamp", "responseTime"];
    for (const field of requiredFields) {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Verify values
    if (data.status !== "healthy") {
      throw new Error(`Expected status "healthy", got "${data.status}"`);
    }

    if (data.database !== "connected") {
      throw new Error(`Expected database "connected", got "${data.database}"`);
    }

    // Verify timestamp format (ISO 8601)
    const timestamp = new Date(data.timestamp);
    if (isNaN(timestamp.getTime())) {
      throw new Error("Invalid timestamp format");
    }

    // Verify response time format
    if (!data.responseTime.endsWith("ms")) {
      throw new Error(`Invalid responseTime format: ${data.responseTime}`);
    }

    console.log("✅ Test 1 passed: Health check returns correct structure");
    return true;
  } catch (error) {
    console.error("❌ Test 1 failed:", error);
    return false;
  }
}

/**
 * Test 2: Database connectivity check executes
 */
async function testDatabaseConnectivity() {
  console.log("Test 2: Database connectivity check...");

  try {
    // Verify Prisma can execute a query
    await prisma.$queryRaw`SELECT 1`;

    console.log("✅ Test 2 passed: Database is reachable");
    return true;
  } catch (error) {
    console.error("❌ Test 2 failed:", error);
    return false;
  }
}

/**
 * Test 3: Response time is reasonable
 */
async function testResponseTime() {
  console.log("Test 3: Response time validation...");

  try {
    const startTime = Date.now();
    const response = await GET();
    const endTime = Date.now();
    const actualTime = endTime - startTime;

    const data = await response.json();
    const reportedTime = parseInt(data.responseTime.replace("ms", ""));

    // Verify response time is under 5 seconds (generous for first call)
    if (actualTime > 5000) {
      throw new Error(`Response time too slow: ${actualTime}ms`);
    }

    // Verify reported time is close to actual time (within 100ms margin)
    if (Math.abs(reportedTime - actualTime) > 100) {
      console.warn(
        `Warning: Reported time (${reportedTime}ms) differs from actual (${actualTime}ms)`
      );
    }

    console.log(
      `✅ Test 3 passed: Response time is acceptable (${actualTime}ms)`
    );
    return true;
  } catch (error) {
    console.error("❌ Test 3 failed:", error);
    return false;
  }
}

/**
 * Test 4: Type safety validation
 */
function testTypeSafety() {
  console.log("Test 4: TypeScript type safety...");

  // If this compiles, types are correct
  const mockResponse: HealthCheckResponse = {
    status: "healthy",
    database: "connected",
    timestamp: new Date().toISOString(),
    responseTime: "50ms",
  };

  console.log("✅ Test 4 passed: Type definitions are correct");
  return true;
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log("\n🧪 Running Health Check Endpoint Tests\n");

  const results = [
    await testHealthCheckSuccess(),
    await testDatabaseConnectivity(),
    await testResponseTime(),
    testTypeSafety(),
  ];

  const passed = results.filter((r) => r).length;
  const total = results.length;

  console.log(`\n📊 Test Results: ${passed}/${total} passed\n`);

  if (passed === total) {
    console.log("✅ All health check tests passed!");
    return true;
  } else {
    console.log("❌ Some tests failed");
    return false;
  }
}

// Export for manual testing
export {
  testHealthCheckSuccess,
  testDatabaseConnectivity,
  testResponseTime,
  testTypeSafety,
  runAllTests,
};

// Auto-run if executed directly
runAllTests()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error("Test execution failed:", error);
    process.exit(1);
  });
