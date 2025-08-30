import React from 'react';
import { X, CheckCircle } from 'lucide-react';

interface BudgetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  onConfirm: () => void;
}

export const BudgetConfirmModal: React.FC<BudgetConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  propertyTitle,
  onConfirm 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-t-3xl w-full max-w-lg mx-4 mb-0 transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Budget Confirmation</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            Is this property in your budget range?
          </h4>
          
          <p className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg leading-relaxed">
            <strong>{propertyTitle}</strong>
          </p>
          
          <div className="space-y-3">
            <button
              onClick={onConfirm}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium text-sm hover:bg-green-700 transition-colors duration-200"
            >
              Yes, I'm Interested
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium text-sm hover:bg-gray-300 transition-colors duration-200"
            >
              Not Right Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};