import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const MediumFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold font-cursive">
              Medium
            </Link>
          </div>

          {/* Primary Navigation */}
          <nav className="flex flex-wrap md:space-x-6 mb-6 md:mb-0">
            <Link href="/for-writers" className="mr-6 mb-2 md:mb-0 text-black hover:text-gray-900">
              For Writers
            </Link>
            <Link href="/explore" className="mr-6 mb-2 md:mb-0 text-black hover:text-gray-900">
              Explore
            </Link>
            <Link href="/blog" className="mr-6 mb-2 md:mb-0 text-black hover:text-gray-900">
              Blog
            </Link>
            <Link href="/about" className="mr-6 mb-2 md:mb-0 text-black hover:text-gray-900">
              About
            </Link>
            <Link href="/careers" className="mr-6 mb-2 md:mb-0 text-black hover:text-gray-900">
              Careers
            </Link>
            <Link href="/help" className="text-black hover:text-gray-900">
              Help
            </Link>
          </nav>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="https://twitter.com/medium" aria-label="Twitter" className="text-black hover:text-gray-900">
              <FaTwitter size={20} />
            </a>
            <a href="https://facebook.com/medium" aria-label="Facebook" className="text-black hover:text-gray-900">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com/medium" aria-label="Instagram" className="text-black hover:text-gray-900">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Secondary Links */}
        <div className="mt-16 flex flex-wrap justify-between">
          <div className="mb-4 md:mb-0">
            <span className="text-gray-500">© 2025 Medium</span>
            <Link href="/terms" className="ml-4 text-gray-500 hover:text-gray-900">
              Terms
            </Link>
            <Link href="/privacy" className="ml-4 text-gray-500 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/cookies" className="ml-4 text-gray-500 hover:text-gray-900">
              Cookies
            </Link>
          </div>

          <div className="flex flex-wrap mt-8">
            <Link href="/" className="mr-4 text-gray-500 hover:text-gray-900">
              Jobs
            </Link>
            <Link href="/" className="mr-4 text-gray-500 hover:text-gray-900">
              Writers
            </Link>
            <Link href="/" className="mr-4 text-gray-500 hover:text-gray-900">
              Publications
            </Link>
            <Link href="/" className="mr-4 text-gray-500 hover:text-gray-900">
              Topics
            </Link>
            <Link href="/" className="mr-4 text-gray-500 hover:text-gray-900">
              Collections
            </Link>
            <Link href="/" className="text-gray-500 hover:text-gray-900">
              Resources
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MediumFooter;