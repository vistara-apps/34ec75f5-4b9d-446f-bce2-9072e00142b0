'use client';

import { Draw } from '../lib/types';
import { formatTimeRemaining, formatAddress, canEnterDraw } from '../lib/utils';
import { Clock, Users, Trophy, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface DrawCardProps {
  draw: Draw;
  onEnterDraw: (drawId: string) => void;
  onViewDetails: (draw: Draw) => void;
  variant: 'compact' | 'detailed';
}

export function DrawCard({ draw, onEnterDraw, onViewDetails, variant }: DrawCardProps) {
  const timeRemaining = formatTimeRemaining(draw.endTime);
  const isActive = draw.status === 'Active';
  const userEntries = 0; // Would come from user context
  const canEnter = canEnterDraw(draw, userEntries, draw.rules.maxEntriesPerUser);

  const statusColors = {
    Active: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-blue-100 text-blue-800',
    Cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className={cn(
      'card hover:shadow-lg transition-shadow duration-200',
      variant === 'detailed' && 'p-8'
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={cn(
            'font-semibold text-textPrimary mb-1',
            variant === 'detailed' ? 'text-xl' : 'text-lg'
          )}>
            {draw.title}
          </h3>
          <p className="text-textSecondary text-sm">
            by {formatAddress(draw.creatorAddress)}
          </p>
        </div>
        <span className={cn(
          'px-2 py-1 rounded-full text-xs font-medium',
          statusColors[draw.status as keyof typeof statusColors]
        )}>
          {draw.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-textSecondary text-sm mb-4 line-clamp-2">
        {draw.description}
      </p>

      {/* Prize Info */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3 mb-4">
        <div className="flex items-center space-x-2 mb-1">
          <Trophy size={16} className="text-primary" />
          <span className="font-medium text-textPrimary">
            {draw.prizeDetails.prizeName}
          </span>
        </div>
        {draw.prizeDetails.value && (
          <p className="text-sm text-textSecondary">
            Value: {draw.prizeDetails.value} {draw.prizeDetails.prizeType}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Users size={14} className="text-textSecondary" />
          <span className="text-sm text-textSecondary">
            {draw.entries.length} entries
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={14} className="text-textSecondary" />
          <span className="text-sm text-textSecondary">
            {timeRemaining}
          </span>
        </div>
      </div>

      {/* Entry Requirements */}
      {variant === 'detailed' && (
        <div className="mb-4">
          <h4 className="font-medium text-textPrimary mb-2">Entry Requirements</h4>
          <ul className="text-sm text-textSecondary space-y-1">
            {draw.rules.entryRequirements.map((req, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-textSecondary rounded-full"></span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
          {draw.rules.entryFee && draw.rules.entryFee !== '0' && (
            <p className="text-sm text-textSecondary mt-2">
              Entry fee: {draw.rules.entryFee} ETH
            </p>
          )}
        </div>
      )}

      {/* Blockchain Info */}
      {variant === 'detailed' && draw.blockchainTxHash && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-textPrimary mb-2">Blockchain Verification</h4>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-textSecondary">Creation Tx:</span>
              <a
                href={`https://basescan.org/tx/${draw.blockchainTxHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center space-x-1"
              >
                <span>{formatAddress(draw.blockchainTxHash)}</span>
                <ExternalLink size={12} />
              </a>
            </div>
            {draw.vrfProofTxHash && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-textSecondary">VRF Proof:</span>
                <a
                  href={`https://basescan.org/tx/${draw.vrfProofTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center space-x-1"
                >
                  <span>{formatAddress(draw.vrfProofTxHash)}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        {isActive && canEnter && (
          <button
            onClick={() => onEnterDraw(draw.drawId)}
            className="btn-primary flex-1"
          >
            Enter Draw
            {draw.rules.entryFee && draw.rules.entryFee !== '0' && (
              <span className="ml-1">({draw.rules.entryFee} ETH)</span>
            )}
          </button>
        )}
        
        {variant === 'compact' && (
          <button
            onClick={() => onViewDetails(draw)}
            className="btn-secondary"
          >
            Details
          </button>
        )}
        
        {!isActive && (
          <div className="flex-1 text-center py-2 text-textSecondary text-sm">
            {draw.status === 'Pending' ? 'Not started yet' : 
             draw.status === 'Completed' ? 'Draw completed' : 'Draw cancelled'}
          </div>
        )}
      </div>

      {/* Winner Display */}
      {draw.status === 'Completed' && draw.winnerAddress && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Trophy size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Winner: {formatAddress(draw.winnerAddress)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
