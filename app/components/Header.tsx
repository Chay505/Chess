import { LanguageSwitcher } from './LanguageSwitcher';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
          Chess Coaching
        </Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
