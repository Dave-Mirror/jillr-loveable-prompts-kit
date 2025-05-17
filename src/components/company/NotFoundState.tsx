
import React from 'react';

const NotFoundState: React.FC = () => {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Unternehmen nicht gefunden</h2>
      <p className="text-gray-400">Das gesuchte Unternehmen konnte nicht gefunden werden.</p>
    </div>
  );
};

export default NotFoundState;
