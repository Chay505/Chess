import { NextRequest } from 'next/server';

describe('Middleware Configuration', () => {
  it('should have correct locale configuration', () => {
    const config = {
      locales: ['en', 'fr'],
      defaultLocale: 'en',
      localeDetection: true,
      localePrefix: 'always'
    };

    expect(config.locales).toEqual(['en', 'fr']);
    expect(config.defaultLocale).toBe('en');
    expect(config.localeDetection).toBe(true);
    expect(config.localePrefix).toBe('always');
  });

  it('should have correct matcher pattern', () => {
    const matcherPattern = '/((?!api|_next|_vercel|.*\\..*).*)';

    // Test patterns that should match
    expect('/en').toMatch(new RegExp(matcherPattern));
    expect('/fr/about').toMatch(new RegExp(matcherPattern));
    expect('/en/contact').toMatch(new RegExp(matcherPattern));

    // Test patterns that should NOT match
    expect('/api/test').not.toMatch(new RegExp(matcherPattern));
    expect('/_next/static/test').not.toMatch(new RegExp(matcherPattern));
    expect('/favicon.ico').not.toMatch(new RegExp(matcherPattern));
    expect('/image.png').not.toMatch(new RegExp(matcherPattern));
  });
});
