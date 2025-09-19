'use client';

import { Entry } from '../lib/types';
import { formatAddress, formatDate } from '../lib/utils';
import { Trophy, ExternalLink } from 'lucide-react';

interface ParticipantListProps {
  entries: Entry[];
  variant: 'withAvatar' | 'withoutAvatar';
}

export function ParticipantList({ entries, variant }: ParticipantListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-textSecondary">
        <p>No participants yet. Be the first to enter!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div
          key={entry.entryId}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            {variant === 'withAvatar' && (
              <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {entry.participantAddress[2]}
                </span>
              </div>
            )}
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-textPrimary">
                  {formatAddress(entry.participantAddress)}
                </span>
                {entry.isWinner && (
                  <Trophy size={14} className="text-yellow-500" />
                )}
              </div>
              <p className="text-sm text-textSecondary">
                Entered {formatDate(entry.entryTimestamp)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className={`text-xs px-2 py-1 rounded-full ${
                entry.eligibilityStatus 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {entry.eligibilityStatus ? 'Eligible' : 'Ineligible'}
              </div>
            </div>
            
            {entry.blockchainTxHash && (
              <a
                href={`https://basescan.org/tx/${entry.blockchainTxHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
                title="View transaction"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
