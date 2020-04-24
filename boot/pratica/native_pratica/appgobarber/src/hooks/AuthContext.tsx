import React, { useEffect, createContext, useContext, useCallback, useState } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage'

interface AuthState {
  user: object;
  token: string;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  singIn(credentials: SingInCredentials): Promise<void>;
  singOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState<AuthState>(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
        const token = await  AsyncStorage.getItem('@goBarber:token');
        const user = await AsyncStorage.getItem('@goBarber:user');
        // multiGet

        if (token && user) {
          setData({token, user: JSON.parse(user)})
        }
        setLoading(false)
    }

    loadStorageData();
  }, [])

  const singIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    await AsyncStorage.setItem('@goBarber:token', token);
    await AsyncStorage.setItem('@goBarber:user', JSON.stringify(user));
    // multiSet

    setData({ token, user });
  }, []);

  const singOut = useCallback( async () => {
    await AsyncStorage.multiRemove(['@goBarber:token', '@goBarber:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, singIn, singOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
