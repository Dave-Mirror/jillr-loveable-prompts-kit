
import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
      <div className="text-center">
        <h2 className="text-xl mb-4">Keine Wallet-Daten gefunden</h2>
        <p>Bitte logge dich ein, um deine Wallet zu sehen.</p>
      </div>
    </div>
  );
};

export default EmptyState;
