import React from 'react';
import { FileText, FileQuestion } from 'lucide-react';

interface ChoiceDialogProps {
  onClose: () => void;
  onWithForm16: () => void;
  onWithoutForm16: () => void;
}

export function ChoiceDialog({ onClose, onWithForm16, onWithoutForm16 }: ChoiceDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-xl w-full max-w-lg m-4 p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Filing Method</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={onWithForm16}
            className="bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-6 text-center"
          >
            <FileText className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">With Form 16</h3>
            <p className="text-white/70 text-sm">Upload your Form 16 to automatically fill details</p>
          </button>

          <button
            onClick={onWithoutForm16}
            className="bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-6 text-center"
          >
            <FileQuestion className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Without Form 16</h3>
            <p className="text-white/70 text-sm">Manually enter your income and tax details</p>
          </button>
        </div>

        <button 
          onClick={onClose}
          className="mt-6 text-white/70 hover:text-white transition-colors text-sm w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
} 