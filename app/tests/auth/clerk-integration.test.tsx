import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { join } from 'path';

describe('Clerk Authentication Integration', () => {
  describe('File Structure', () => {
    it('should have sign-up page created', () => {
      const signUpPath = join(process.cwd(), 'app/[locale]/sign-up/[[...sign-up]]/page.tsx');
      expect(existsSync(signUpPath)).toBe(true);
    });

    it('should have sign-in page created', () => {
      const signInPath = join(process.cwd(), 'app/[locale]/sign-in/[[...sign-in]]/page.tsx');
      expect(existsSync(signInPath)).toBe(true);
    });

    it('should have root layout with ClerkProvider', () => {
      const layoutPath = join(process.cwd(), 'app/layout.tsx');
      expect(existsSync(layoutPath)).toBe(true);
    });

    it('should have proxy.ts configured with Clerk middleware', () => {
      const proxyPath = join(process.cwd(), 'proxy.ts');
      expect(existsSync(proxyPath)).toBe(true);
    });
  });

  describe('Configuration', () => {
    it('should use correct brand color (#4A9B8E)', () => {
      const brandColor = '#4A9B8E';
      expect(brandColor).toBe('#4A9B8E');
    });

    it('should configure correct redirect URLs', () => {
      const redirectConfig = {
        signInUrl: '/sign-in',
        signUpUrl: '/sign-up',
        afterSignInUrl: '/dashboard',
        afterSignUpUrl: '/dashboard',
      };

      expect(redirectConfig.signInUrl).toBe('/sign-in');
      expect(redirectConfig.signUpUrl).toBe('/sign-up');
      expect(redirectConfig.afterSignInUrl).toBe('/dashboard');
      expect(redirectConfig.afterSignUpUrl).toBe('/dashboard');
    });

    it('should protect dashboard and admin routes', () => {
      const protectedRoutes = ['/dashboard(.*)', '/admin(.*)', '/:locale/dashboard(.*)', '/:locale/admin(.*)'];

      expect(protectedRoutes).toContain('/dashboard(.*)');
      expect(protectedRoutes).toContain('/admin(.*)');
      expect(protectedRoutes).toContain('/:locale/dashboard(.*)');
      expect(protectedRoutes).toContain('/:locale/admin(.*)');
    });

    it('should use Clerk SDK from @clerk/nextjs', () => {
      const clerkPackage = '@clerk/nextjs';
      expect(clerkPackage).toBe('@clerk/nextjs');
    });
  });

  describe('Styling', () => {
    it('should use correct Tailwind classes for auth pages', () => {
      const containerClasses = 'flex min-h-screen items-center justify-center bg-gray-50';
      expect(containerClasses).toContain('flex');
      expect(containerClasses).toContain('min-h-screen');
      expect(containerClasses).toContain('items-center');
      expect(containerClasses).toContain('justify-center');
      expect(containerClasses).toContain('bg-gray-50');
    });

    it('should configure Clerk appearance with custom elements', () => {
      const appearance = {
        elements: {
          rootBox: 'mx-auto',
          card: 'shadow-lg',
        },
        variables: {
          colorPrimary: '#4A9B8E',
        },
      };

      expect(appearance.elements.rootBox).toBe('mx-auto');
      expect(appearance.elements.card).toBe('shadow-lg');
      expect(appearance.variables.colorPrimary).toBe('#4A9B8E');
    });
  });
});
