export const DRAW_STATUSES = {
  PENDING: 'Pending',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const;

export const PRIZE_TYPES = {
  ETH: 'ETH',
  TOKEN: 'TOKEN',
  NFT: 'NFT',
  OTHER: 'OTHER',
} as const;

export const DEFAULT_DRAW_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const MAX_ENTRIES_PER_USER = 10;

export const MIN_DRAW_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const ENTRY_FEE_OPTIONS = [
  { label: 'Free', value: '0' },
  { label: '0.001 ETH', value: '0.001' },
  { label: '0.005 ETH', value: '0.005' },
  { label: '0.01 ETH', value: '0.01' },
];

import { DrawStatus } from './types';

export const SAMPLE_DRAWS = [
  {
    drawId: 'draw_1',
    creatorAddress: '0x1234...5678',
    title: 'Weekly ETH Giveaway',
    description: 'Win 0.1 ETH in our weekly community draw!',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    endTime: new Date(Date.now() + 22 * 60 * 60 * 1000), // 22 hours from now
    status: DrawStatus.ACTIVE,
    prizeDetails: {
      prizeName: '0.1 ETH Prize',
      prizeType: 'ETH' as const,
      value: '0.1',
      description: 'Weekly community prize pool'
    },
    rules: {
      entryRequirements: ['Must hold Base wallet', 'One entry per person'],
      maxEntriesPerUser: 1,
      entryFee: '0.001'
    },
    entries: []
  },
  {
    drawId: 'draw_2',
    creatorAddress: '0x9876...4321',
    title: 'NFT Collection Drop',
    description: 'Rare NFT from the FairPlay Genesis collection',
    startTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
    status: DrawStatus.PENDING,
    prizeDetails: {
      prizeName: 'FairPlay Genesis #001',
      prizeType: 'NFT' as const,
      tokenAddress: '0xabcd...efgh',
      tokenId: '1',
      description: 'Limited edition genesis NFT'
    },
    rules: {
      entryRequirements: ['Follow @FairPlayDraws', 'Recast announcement'],
      maxEntriesPerUser: 1,
      entryFee: '0'
    },
    entries: []
  }
];
