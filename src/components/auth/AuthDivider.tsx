
import React from 'react';

const AuthDivider: React.FC = () => {
  return (
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--glass-border)]"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-background text-[var(--txt-dim)]">
            OR CONTINUE WITH EMAIL
          </span>
        </div>
      </div>
  );
};

export default AuthDivider;
