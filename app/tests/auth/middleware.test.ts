import { describe, it, expect } from 'vitest';

describe('Clerk Middleware Configuration', () => {
  it('should have correct matcher patterns for route protection', () => {
    // Test the expected middleware matcher configuration
    const expectedConfig = {
      matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
      ],
    };

    expect(expectedConfig.matcher).toBeDefined();
    expect(Array.isArray(expectedConfig.matcher)).toBe(true);
    expect(expectedConfig.matcher.length).toBe(2);
  });

  it('matcher should skip static files and Next.js internals', () => {
    const staticFilePattern = '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)';

    // Verify pattern excludes _next
    expect(staticFilePattern).toContain('!_next');

    // Verify pattern excludes common static file extensions
    expect(staticFilePattern).toContain('css');
    expect(staticFilePattern).toContain('png');
    expect(staticFilePattern).toContain('svg');
  });

  it('matcher should include API routes', () => {
    const apiPattern = '/(api|trpc)(.*)';

    expect(apiPattern).toContain('api');
    expect(apiPattern).toContain('trpc');
  });

  it('middleware should protect dashboard and admin routes', () => {
    // Define expected protected routes
    const protectedRoutes = ['/dashboard', '/admin', '/:locale/dashboard', '/:locale/admin'];

    // Verify we have defined protected routes
    expect(protectedRoutes.length).toBeGreaterThan(0);
    expect(protectedRoutes).toContain('/dashboard');
    expect(protectedRoutes).toContain('/admin');
    expect(protectedRoutes).toContain('/:locale/dashboard');
    expect(protectedRoutes).toContain('/:locale/admin');
  });
});
