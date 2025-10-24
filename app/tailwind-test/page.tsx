export default function TailwindTestPage() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-desktop mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-h1 text-primary mb-4">
            Tailwind CSS Configuration Test
          </h1>
          <p className="text-base text-neutral-900">
            Testing custom design tokens: colors, typography, and responsive
            breakpoints
          </p>
        </header>

        {/* Color Palette Section */}
        <section className="mb-12">
          <h2 className="text-h2 text-secondary mb-6">Color Palette</h2>

          <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 gap-6">
            {/* Primary Color */}
            <div className="space-y-2">
              <div className="h-24 bg-primary rounded-lg shadow-md"></div>
              <p className="text-base font-semibold">Primary</p>
              <p className="text-sm text-neutral-500">#4A9B8E</p>
            </div>

            {/* Secondary Color */}
            <div className="space-y-2">
              <div className="h-24 bg-secondary rounded-lg shadow-md"></div>
              <p className="text-base font-semibold">Secondary</p>
              <p className="text-sm text-neutral-500">#2C3E50</p>
            </div>

            {/* Accent Color */}
            <div className="space-y-2">
              <div className="h-24 bg-accent rounded-lg shadow-md"></div>
              <p className="text-base font-semibold">Accent</p>
              <p className="text-sm text-neutral-500">#F39C12</p>
            </div>

            {/* Success Color */}
            <div className="space-y-2">
              <div className="h-24 bg-success rounded-lg shadow-md"></div>
              <p className="text-base font-semibold">Success</p>
              <p className="text-sm text-neutral-500">#27AE60</p>
            </div>

            {/* Warning Color */}
            <div className="space-y-2">
              <div className="h-24 bg-warning rounded-lg shadow-md"></div>
              <p className="text-base font-semibold">Warning</p>
              <p className="text-sm text-neutral-500">#F39C12</p>
            </div>

            {/* Error Color */}
            <div className="space-y-2">
              <div className="h-24 bg-error rounded-lg shadow-md"></div>
              <p className="text-base font-semibold">Error</p>
              <p className="text-sm text-neutral-500">#E74C3C</p>
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="mt-8">
            <h3 className="text-h3 text-secondary mb-4">Neutral Colors</h3>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-16 bg-neutral-50 rounded-lg border border-neutral-500"></div>
                <p className="text-sm text-center">neutral-50</p>
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-16 bg-neutral-100 rounded-lg border border-neutral-500"></div>
                <p className="text-sm text-center">neutral-100</p>
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-16 bg-neutral-500 rounded-lg"></div>
                <p className="text-sm text-center text-neutral-900">
                  neutral-500
                </p>
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-16 bg-neutral-900 rounded-lg"></div>
                <p className="text-sm text-center text-neutral-900">
                  neutral-900
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12">
          <h2 className="text-h2 text-secondary mb-6">Typography</h2>

          <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <div>
              <h1 className="text-h1 text-primary">Heading 1 - 48px</h1>
              <p className="text-sm text-neutral-500">
                Font: Inter, Weight: 700, Line Height: 1.2
              </p>
            </div>

            <div>
              <h2 className="text-h2 text-secondary">Heading 2 - 36px</h2>
              <p className="text-sm text-neutral-500">
                Font: Inter, Weight: 600, Line Height: 1.3
              </p>
            </div>

            <div>
              <h3 className="text-h3 text-secondary">Heading 3 - 24px</h3>
              <p className="text-sm text-neutral-500">
                Font: Inter, Weight: 600, Line Height: 1.4
              </p>
            </div>

            <div>
              <p className="text-base">
                Base text - 16px. This is the default body text style with
                normal weight and comfortable line height for reading long-form
                content. Supports FR/EN character sets: À, É, È, Ç, Ê, Î, Ô, Û.
              </p>
              <p className="text-sm text-neutral-500">
                Font: Inter, Weight: 400, Line Height: 1.6
              </p>
            </div>

            <div>
              <p className="font-serif text-base">
                Serif font example - Merriweather
              </p>
            </div>

            <div>
              <p className="font-mono text-base">
                Monospace font example - Fira Code
              </p>
            </div>
          </div>
        </section>

        {/* Responsive Grid Section */}
        <section className="mb-12">
          <h2 className="text-h2 text-secondary mb-6">Responsive Breakpoints</h2>
          <p className="text-base text-neutral-900 mb-4">
            Resize browser to see responsive behavior:
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4">
              <div className="bg-primary text-white p-4 rounded">Column 1</div>
              <div className="bg-secondary text-white p-4 rounded">
                Column 2
              </div>
              <div className="bg-accent text-white p-4 rounded">Column 3</div>
              <div className="bg-success text-white p-4 rounded">Column 4</div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Mobile:</span> 640px+ (2 columns)
            </p>
            <p>
              <span className="font-semibold">Tablet:</span> 1024px+ (3
              columns)
            </p>
            <p>
              <span className="font-semibold">Desktop:</span> 1280px+ (4
              columns)
            </p>
          </div>
        </section>

        {/* Dark Mode Section */}
        <section className="mb-12">
          <h2 className="text-h2 text-secondary mb-6">
            Dark Mode Configuration
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-base text-neutral-900 mb-2">
              Dark mode strategy: <span className="font-semibold">class</span>
            </p>
            <p className="text-sm text-neutral-500">
              Dark mode can be toggled by adding the{' '}
              <code className="bg-neutral-100 px-2 py-1 rounded">dark</code>{' '}
              class to the HTML element. This is configured for future
              enhancement.
            </p>
          </div>
        </section>

        {/* Bilingual Test */}
        <section className="mb-12">
          <h2 className="text-h2 text-secondary mb-6">
            Bilingual Support (FR/EN)
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div>
              <p className="text-base font-semibold text-primary">English:</p>
              <p className="text-base">
                The quick brown fox jumps over the lazy dog. Testing all
                standard characters and numbers: 0123456789
              </p>
            </div>
            <div>
              <p className="text-base font-semibold text-primary">Français:</p>
              <p className="text-base">
                Le renard brun rapide saute par-dessus le chien paresseux.
                Caractères accentués: À, É, È, Ç, Ê, Î, Ô, Û, Ù, Ë, Ï, Ä, Ö.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
