import React from 'react';
import { CheckCircle, Circle } from 'lucide-react'; // Example icons

interface Step {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
}

interface MultiStepBookingProgressIndicatorProps {
  steps: Step[];
  currentStepId: string;
  onStepClick?: (stepId: string) => void; // Optional: allow clicking to navigate (if appropriate)
}

const MultiStepBookingProgressIndicator: React.FC<MultiStepBookingProgressIndicatorProps> = ({
  steps,
  currentStepId,
  onStepClick,
}) => {
  console.log("Rendering MultiStepBookingProgressIndicator, current step:", currentStepId);

  const getStepStatus = (step: Step, index: number): 'completed' | 'current' | 'pending' => {
    const currentIdx = steps.findIndex(s => s.id === currentStepId);
    if (index < currentIdx) return 'completed';
    if (index === currentIdx) return 'current';
    return 'pending';
  };

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center justify-between space-x-2 sm:space-x-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step, index);
          const isClickable = onStepClick && status === 'completed';

          return (
            <li key={step.id} className="flex-1">
              <button
                onClick={isClickable ? () => onStepClick(step.id) : undefined}
                disabled={!isClickable && status !== 'current'}
                className={`group flex flex-col items-center w-full ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex items-center w-full">
                    {/* Line before step (not for first step) */}
                    <div className={`flex-1 h-0.5 ${index === 0 ? 'bg-transparent' : (status === 'completed' || status === 'current' ? 'bg-sky-600' : 'bg-gray-300')} transition-colors duration-300`}></div>
                    
                    {/* Step Circle/Icon */}
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300
                        ${status === 'completed' ? 'bg-sky-600 text-white' : ''}
                        ${status === 'current' ? 'bg-sky-600 text-white ring-2 ring-sky-600 ring-offset-2' : ''}
                        ${status === 'pending' ? 'bg-gray-200 text-gray-500 border-2 border-gray-300 group-hover:border-gray-400' : ''}
                    `}>
                        {status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                        ) : (
                        <span className={`${status === 'current' ? 'font-bold' : ''}`}>{index + 1}</span>
                        )}
                    </span>

                    {/* Line after step (not for last step) */}
                    <div className={`flex-1 h-0.5 ${index === steps.length -1 ? 'bg-transparent' : (status === 'completed' ? 'bg-sky-600' : 'bg-gray-300')} transition-colors duration-300`}></div>
                </div>
                <p className={`mt-2 text-xs sm:text-sm font-medium text-center
                    ${status === 'current' ? 'text-sky-600' : 'text-gray-500'}
                    ${status === 'completed' && isClickable ? 'group-hover:text-sky-500' : ''}
                    ${status === 'pending' ? 'group-hover:text-gray-700' : ''}
                    transition-colors duration-300
                `}>
                  {step.name}
                </p>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default MultiStepBookingProgressIndicator;