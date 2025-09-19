'use client';

import { useState } from 'react';
import { ConnectWalletButton } from './ConnectWalletButton';
import { Menu, X, Plus } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FP</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-textPrimary">FairPlay</h1>
              <p className="text-xs text-textSecondary -mt-1">Draws</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-textSecondary hover:text-textPrimary transition-colors duration-200">
              Browse Draws
            </a>
            <a href="#" className="text-textSecondary hover:text-textPrimary transition-colors duration-200">
              My Entries
            </a>
            <button className="btn-secondary flex items-center space-x-2">
              <Plus size={16} />
              <span>Create Draw</span>
            </button>
          </nav>

          {/* Mobile Menu Button & Wallet */}
          <div className="flex items-center space-x-3">
            <ConnectWalletButton />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-textSecondary hover:text-textPrimary"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="space-y-3">
              <a href="#" className="block py-2 text-textSecondary hover:text-textPrimary">
                Browse Draws
              </a>
              <a href="#" className="block py-2 text-textSecondary hover:text-textPrimary">
                My Entries
              </a>
              <button className="btn-secondary w-full flex items-center justify-center space-x-2 mt-3">
                <Plus size={16} />
                <span>Create Draw</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
