'use client';

import { TransactionStatus } from '../lib/types';
import { CheckCircle, XCircle, Loader, ExternalLink } from 'lucide-react';
import { formatAddress } from '../lib/utils';

interface TransactionStatusIndicatorProps {
  status: TransactionStatus;
}

export function TransactionStatusIndicator({ status }: TransactionStatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status.status) {
      case 'pending':
        return {
          icon: <Loader size={16} className="animate-spin" />,
          bgColor: 'bg-blue-50 border-blue-200',
          textColor: 'text-blue-800',
          title: 'Transaction Pending',
          message: 'Please wait while your transaction is being processed...',
        };
      case 'success':
        return {
          icon: <CheckCircle size={16} />,
          bgColor: 'bg-green-50 border-green-200',
          textColor: 'text-green-800',
          title: 'Transaction Successful',
          message: 'Your transaction has been confirmed on the blockchain.',
        };
      case 'error':
        return {
          icon: <XCircle size={16} />,
          bgColor: 'bg-red-50 border-red-200',
          textColor: 'text-red-800',
          title: 'Transaction Failed',
          message: status.error || 'An error occurred while processing your transaction.',
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  if (!config) return null;

  return (
    <div className={`fixed top-4 right-4 max-w-sm w-full p-4 border rounded-lg shadow-card animate-slide-up z-50 ${config.bgColor}`}>
      <div className="flex items-start space-x-3">
        <div className={config.textColor}>
          {config.icon}
        </div>
        
        <div className="flex-1">
          <h4 className={`font-medium ${config.textColor} mb-1`}>
            {config.title}
          </h4>
          <p className={`text-sm ${config.textColor} opacity-90`}>
            {config.message}
          </p>
          
          {status.txHash && (
            <div className="mt-2">
              <a
                href={`https://basescan.org/tx/${status.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center space-x-1 text-sm ${config.textColor} hover:underline`}
              >
                <span>View: {formatAddress(status.txHash)}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
