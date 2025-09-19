'use client';

import { useState } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { useAccount } from 'wagmi';
import { Wallet, ChevronDown } from 'lucide-react';
import { formatAddress } from '../lib/utils';

export function ConnectWalletButton() {
  const { context } = useMiniKit();
  const { address, isConnected } = useAccount();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-surface border border-border rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">
              {context?.user?.displayName?.[0] || address[2]}
            </span>
          </div>
          <span className="text-textPrimary font-medium">
            {context?.user?.displayName || formatAddress(address)}
          </span>
          <ChevronDown size={14} className="text-textSecondary" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-card py-2 animate-fade-in">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-xs text-textSecondary">Connected as</p>
              <p className="text-sm font-medium text-textPrimary">
                {formatAddress(address)}
              </p>
            </div>
            <button className="w-full text-left px-3 py-2 text-sm text-textSecondary hover:bg-gray-50">
              View Profile
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-textSecondary hover:bg-gray-50">
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button className="btn-primary flex items-center space-x-2">
      <Wallet size={16} />
      <span>Connect</span>
    </button>
  );
}
