import * as React from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid'

interface CommonAlertProps {
  description: string;
}

const CommonAlert = ({ description }: CommonAlertProps) => {
  return (
    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <XCircleIcon className="flex-shrink-0 inline w-4 h-4 me-3 text-red-400" aria-hidden="true" />
      <span className="sr-only">Danger</span>
      <div>
        <span className="font-medium">Error!</span> { description }
      </div>
    </div>
  )
}

export default CommonAlert;
