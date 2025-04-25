import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorCard = ({ title = "An error occurred", description = "Please try again later." }) => {
  return (
    <div className="w-full mx-auto py-4">
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-md shadow-sm">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-red-800 dark:text-red-300">{title}</h4>
            {description && (
              <p className="mt-1 text-sm text-red-700 dark:text-red-400">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;