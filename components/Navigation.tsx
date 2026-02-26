'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-primary-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌾</span>
            <div>
              <h1 className="text-white font-bold text-xl">Virasat se Vikas tak</h1>
              <p className="text-primary-100 text-xs">विरासत से विकास तक</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-600 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/advisory"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/advisory')
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-600 hover:text-white'
              }`}
            >
              Advisory
            </Link>
            <Link
              href="/crop-doctor"
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                isActive('/crop-doctor')
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-600 hover:text-white'
              }`}
            >
              <span>🩺</span>
              Crop Doctor
              <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">NEW</span>
            </Link>
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/dashboard')
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-600 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/admin')
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-600 hover:text-white'
              }`}
            >
              Admin
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'bg-primary-800 text-white'
                  : 'text-primary-100 hover:bg-primary-600 hover:text-white'
              }`}
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu (you can expand this) */}
        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg ${
                isActive('/') ? 'bg-primary-800 text-white' : 'text-primary-100'
              }`}
            >
              Home
            </Link>
            <Link
              href="/advisory"
              className={`px-4 py-2 rounded-lg ${
                isActive('/advisory') ? 'bg-primary-800 text-white' : 'text-primary-100'
              }`}
            >
              Advisory
            </Link>
            <Link
              href="/crop-doctor"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                isActive('/crop-doctor') ? 'bg-primary-800 text-white' : 'text-primary-100'
              }`}
            >
              <span>🩺</span>
              Crop Doctor
              <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">NEW</span>
            </Link>
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-lg ${
                isActive('/dashboard') ? 'bg-primary-800 text-white' : 'text-primary-100'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin"
              className={`px-4 py-2 rounded-lg ${
                isActive('/admin') ? 'bg-primary-800 text-white' : 'text-primary-100'
              }`}
            >
              Admin
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg ${
                isActive('/about') ? 'bg-primary-800 text-white' : 'text-primary-100'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}