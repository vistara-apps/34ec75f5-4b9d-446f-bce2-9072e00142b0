'use client';

import { useState, useEffect } from 'react';
import { DrawCard } from './DrawCard';
import { CreateDrawForm } from './CreateDrawForm';
import { ParticipantList } from './ParticipantList';
import { TransactionStatusIndicator } from './TransactionStatusIndicator';
import { Draw, TransactionStatus } from '../lib/types';
import { SAMPLE_DRAWS } from '../lib/constants';
import { Plus, Filter, Search } from 'lucide-react';

export function DrawDashboard() {
  const [draws, setDraws] = useState<Draw[]>(SAMPLE_DRAWS);
  const [selectedDraw, setSelectedDraw] = useState<Draw | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>({ status: 'idle' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredDraws = draws.filter(draw => {
    const matchesSearch = draw.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         draw.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || draw.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleCreateDraw = async (drawData: any) => {
    setTransactionStatus({ status: 'pending' });
    
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newDraw: Draw = {
        ...drawData,
        drawId: `draw_${Date.now()}`,
        creatorAddress: '0x1234...5678', // Would come from connected wallet
        entries: [],
        blockchainTxHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      };
      
      setDraws(prev => [newDraw, ...prev]);
      setTransactionStatus({ 
        status: 'success', 
        txHash: newDraw.blockchainTxHash 
      });
      setShowCreateForm(false);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setTransactionStatus({ status: 'idle' });
      }, 3000);
      
    } catch (error) {
      setTransactionStatus({ 
        status: 'error', 
        error: 'Failed to create draw' 
      });
    }
  };

  const handleEnterDraw = async (drawId: string) => {
    setTransactionStatus({ status: 'pending' });
    
    try {
      // Simulate entry transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const entryTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      setDraws(prev => prev.map(draw => {
        if (draw.drawId === drawId) {
          const newEntry = {
            entryId: `entry_${Date.now()}`,
            drawId,
            participantAddress: '0x1234...5678',
            entryTimestamp: new Date(),
            eligibilityStatus: true,
            blockchainTxHash: entryTxHash,
            isWinner: false,
          };
          return {
            ...draw,
            entries: [...draw.entries, newEntry],
          };
        }
        return draw;
      }));
      
      setTransactionStatus({ 
        status: 'success', 
        txHash: entryTxHash 
      });
      
      setTimeout(() => {
        setTransactionStatus({ status: 'idle' });
      }, 3000);
      
    } catch (error) {
      setTransactionStatus({ 
        status: 'error', 
        error: 'Failed to enter draw' 
      });
    }
  };

  return (
    <div className="container py-6 space-y-6">
      {/* Transaction Status */}
      {transactionStatus.status !== 'idle' && (
        <TransactionStatusIndicator status={transactionStatus} />
      )}

      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-h1 text-textPrimary mb-2">
          Blockchain-Verified Fair Draws
        </h1>
        <p className="text-body text-textSecondary mb-6 max-w-2xl mx-auto">
          Create and participate in transparent, provably fair draws with complete data traceability on the blockchain.
        </p>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          <Plus size={16} />
          <span>Create Your First Draw</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary" />
          <input
            type="text"
            placeholder="Search draws..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input pl-10 pr-8 appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Draws Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDraws.map((draw) => (
          <DrawCard
            key={draw.drawId}
            draw={draw}
            onEnterDraw={handleEnterDraw}
            onViewDetails={setSelectedDraw}
            variant="compact"
          />
        ))}
      </div>

      {filteredDraws.length === 0 && (
        <div className="text-center py-12">
          <p className="text-textSecondary text-body">
            {searchTerm || filterStatus !== 'all' 
              ? 'No draws match your search criteria.' 
              : 'No draws available yet.'}
          </p>
        </div>
      )}

      {/* Create Draw Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <CreateDrawForm
              onSubmit={handleCreateDraw}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}

      {/* Draw Details Modal */}
      {selectedDraw && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-h2 text-textPrimary">Draw Details</h2>
                <button
                  onClick={() => setSelectedDraw(null)}
                  className="text-textSecondary hover:text-textPrimary"
                >
                  ×
                </button>
              </div>
              
              <DrawCard
                draw={selectedDraw}
                onEnterDraw={handleEnterDraw}
                onViewDetails={() => {}}
                variant="detailed"
              />
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-textPrimary mb-3">
                  Participants ({selectedDraw.entries.length})
                </h3>
                <ParticipantList
                  entries={selectedDraw.entries}
                  variant="withAvatar"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
