import { describe, it, expect } from 'vitest';

describe('Clerk Environment Variables', () => {
  it('should have NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY defined', () => {
    // In test environment, we expect these to be defined or we should provide test values
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

    // For tests, we accept either real keys or test placeholder
    expect(publishableKey).toBeDefined();
  });

  it('should have CLERK_SECRET_KEY defined', () => {
    const secretKey = process.env.CLERK_SECRET_KEY;

    // For tests, we accept either real keys or test placeholder
    expect(secretKey).toBeDefined();
  });

  it('publishable key should start with pk_', () => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

    if (publishableKey && !publishableKey.startsWith('YOUR_')) {
      expect(publishableKey).toMatch(/^pk_(test|live)_/);
    } else {
      // Skip validation for placeholder values in CI/CD
      expect(publishableKey).toBeDefined();
    }
  });

  it('secret key should start with sk_', () => {
    const secretKey = process.env.CLERK_SECRET_KEY;

    if (secretKey && !secretKey.startsWith('YOUR_')) {
      expect(secretKey).toMatch(/^sk_(test|live)_/);
    } else {
      // Skip validation for placeholder values in CI/CD
      expect(secretKey).toBeDefined();
    }
  });
});
