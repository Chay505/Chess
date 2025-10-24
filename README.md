# Projet Échec - Chess Learning Platform

A bilingual chess learning platform built with Next.js 14+ for students and instructors.

## Tech Stack

- **Framework:** Next.js 16.0.0 (App Router)
- **Language:** TypeScript 5.9.3 (strict mode enabled)
- **Styling:** Tailwind CSS 4.1.16
- **Code Quality:** ESLint + Prettier
- **Version Control:** Git

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/philbeliveau/Chess.git
   cd Chess
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly

## Project Structure

```
Chess/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── public/                # Static assets
├── .bmad-core/            # BMAD method configuration
├── docs/                  # Project documentation
├── .eslintrc.json         # ESLint configuration
├── .prettierrc            # Prettier configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## Development Guidelines

- TypeScript strict mode is enabled for maximum type safety
- All code must pass ESLint checks before committing
- Use Prettier for consistent code formatting
- Follow Next.js App Router conventions

## License

ISC
