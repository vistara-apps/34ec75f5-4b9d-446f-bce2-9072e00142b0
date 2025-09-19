'use client';

import { useState } from 'react';
import { CreateDrawFormData, PrizeDetails } from '../lib/types';
import { ENTRY_FEE_OPTIONS, PRIZE_TYPES } from '../lib/constants';
import { X, Calendar, DollarSign, Trophy, Users } from 'lucide-react';

interface CreateDrawFormProps {
  onSubmit: (data: CreateDrawFormData) => void;
  onCancel: () => void;
}

export function CreateDrawForm({ onSubmit, onCancel }: CreateDrawFormProps) {
  const [formData, setFormData] = useState<CreateDrawFormData>({
    title: '',
    description: '',
    prizeName: '',
    prizeType: 'ETH',
    prizeValue: '',
    startTime: '',
    endTime: '',
    maxEntriesPerUser: 1,
    entryFee: '0',
    eligibilityCriteria: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateDrawFormData, string>>>({});

  const handleChange = (field: keyof CreateDrawFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateDrawFormData, string>> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.prizeName.trim()) newErrors.prizeName = 'Prize name is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';

    if (formData.startTime && formData.endTime) {
      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);
      const now = new Date();

      if (start <= now) {
        newErrors.startTime = 'Start time must be in the future';
      }
      if (end <= start) {
        newErrors.endTime = 'End time must be after start time';
      }
      if (end.getTime() - start.getTime() < 60 * 60 * 1000) {
        newErrors.endTime = 'Draw must run for at least 1 hour';
      }
    }

    if (formData.maxEntriesPerUser < 1) {
      newErrors.maxEntriesPerUser = 'Must allow at least 1 entry per user';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Set default times (1 hour from now to 25 hours from now)
  const setDefaultTimes = () => {
    const now = new Date();
    const start = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
    const end = new Date(now.getTime() + 25 * 60 * 60 * 1000); // 25 hours from now

    setFormData(prev => ({
      ...prev,
      startTime: start.toISOString().slice(0, 16),
      endTime: end.toISOString().slice(0, 16),
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-h2 text-textPrimary">Create New Draw</h2>
        <button
          onClick={onCancel}
          className="text-textSecondary hover:text-textPrimary"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">
            Draw Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="input"
            placeholder="e.g., Weekly ETH Giveaway"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="input min-h-[80px] resize-none"
            placeholder="Describe your draw and what participants can win..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Prize Details */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-medium text-textPrimary mb-3 flex items-center space-x-2">
            <Trophy size={16} />
            <span>Prize Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1">
                Prize Name *
              </label>
              <input
                type="text"
                value={formData.prizeName}
                onChange={(e) => handleChange('prizeName', e.target.value)}
                className="input"
                placeholder="e.g., 0.1 ETH Prize"
              />
              {errors.prizeName && (
                <p className="text-red-500 text-sm mt-1">{errors.prizeName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1">
                Prize Type
              </label>
              <select
                value={formData.prizeType}
                onChange={(e) => handleChange('prizeType', e.target.value as PrizeDetails['prizeType'])}
                className="input"
              >
                {Object.values(PRIZE_TYPES).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Prize Value
            </label>
            <input
              type="text"
              value={formData.prizeValue}
              onChange={(e) => handleChange('prizeValue', e.target.value)}
              className="input"
              placeholder="e.g., 0.1 (for ETH) or contract address (for tokens/NFTs)"
            />
          </div>
        </div>

        {/* Timing */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-textPrimary flex items-center space-x-2">
              <Calendar size={16} />
              <span>Draw Timing</span>
            </h3>
            <button
              type="button"
              onClick={setDefaultTimes}
              className="text-sm text-primary hover:underline"
            >
              Set defaults
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1">
                Start Time *
              </label>
              <input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                className="input"
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1">
                End Time *
              </label>
              <input
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => handleChange('endTime', e.target.value)}
                className="input"
              />
              {errors.endTime && (
                <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
              )}
            </div>
          </div>
        </div>

        {/* Entry Rules */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-medium text-textPrimary mb-3 flex items-center space-x-2">
            <Users size={16} />
            <span>Entry Rules</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1">
                Max Entries Per User
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.maxEntriesPerUser}
                onChange={(e) => handleChange('maxEntriesPerUser', parseInt(e.target.value))}
                className="input"
              />
              {errors.maxEntriesPerUser && (
                <p className="text-red-500 text-sm mt-1">{errors.maxEntriesPerUser}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-textPrimary mb-1">
                Entry Fee
              </label>
              <select
                value={formData.entryFee}
                onChange={(e) => handleChange('entryFee', e.target.value)}
                className="input"
              >
                {ENTRY_FEE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Eligibility Criteria
            </label>
            <textarea
              value={formData.eligibilityCriteria}
              onChange={(e) => handleChange('eligibilityCriteria', e.target.value)}
              className="input min-h-[60px] resize-none"
              placeholder="e.g., Must hold Base wallet, Follow @FairPlayDraws..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <DollarSign size={16} />
            <span>Create Draw (0.01 ETH)</span>
          </button>
        </div>
      </form>
    </div>
  );
}
