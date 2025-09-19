export interface Draw {
  drawId: string;
  creatorAddress: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: DrawStatus;
  prizeDetails: PrizeDetails;
  rules: DrawRules;
  blockchainTxHash?: string;
  vrfProofTxHash?: string;
  winnerAddress?: string;
  entries: Entry[];
}

export interface Entry {
  entryId: string;
  drawId: string;
  participantAddress: string;
  entryTimestamp: Date;
  eligibilityStatus: boolean;
  blockchainTxHash?: string;
  isWinner: boolean;
}

export interface PrizeDetails {
  prizeName: string;
  prizeType: 'ETH' | 'TOKEN' | 'NFT' | 'OTHER';
  value?: string;
  tokenAddress?: string;
  tokenId?: string;
  description?: string;
}

export interface DrawRules {
  entryRequirements: string[];
  maxEntriesPerUser: number;
  eligibilityCriteria?: string;
  entryFee?: string;
}

export enum DrawStatus {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface CreateDrawFormData {
  title: string;
  description: string;
  prizeName: string;
  prizeType: PrizeDetails['prizeType'];
  prizeValue: string;
  startTime: string;
  endTime: string;
  maxEntriesPerUser: number;
  entryFee: string;
  eligibilityCriteria: string;
}

export interface TransactionStatus {
  status: 'idle' | 'pending' | 'success' | 'error';
  txHash?: string;
  error?: string;
}
