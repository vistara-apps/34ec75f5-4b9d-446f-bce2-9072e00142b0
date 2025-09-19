import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatTimeRemaining(endTime: Date): string {
  const now = new Date();
  const diff = endTime.getTime() - now.getTime();
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function generateDrawId(): string {
  return `draw_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateEntryId(): string {
  return `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function isDrawActive(draw: { startTime: Date; endTime: Date }): boolean {
  const now = new Date();
  return now >= draw.startTime && now <= draw.endTime;
}

export function canEnterDraw(
  draw: { startTime: Date; endTime: Date; status: string },
  userEntries: number,
  maxEntries: number
): boolean {
  const now = new Date();
  return (
    draw.status === 'Active' &&
    now >= draw.startTime &&
    now <= draw.endTime &&
    userEntries < maxEntries
  );
}
