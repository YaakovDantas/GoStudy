import React from 'react';

import { AuthProvider } from './AuthContext';
import { ToastProvider } from './toast';

export const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};
