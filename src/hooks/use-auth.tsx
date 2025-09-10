import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ciso' | 'analyst' | 'engineer' | 'compliance_officer';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginMutation: ReturnType<typeof useMutation>;
  logoutMutation: ReturnType<typeof useMutation>;
  registerMutation: ReturnType<typeof useMutation>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Check for existing session on app load
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // Simulate checking for existing session
      const savedUser = localStorage.getItem('ai-spm-user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email === 'admin@ai-spm.com' && credentials.password === 'admin123') {
        return {
          id: '1',
          email: credentials.email,
          name: 'Security Administrator',
          role: 'ciso' as const,
          avatar: '/placeholder.svg'
        };
      } else {
        throw new Error('Invalid credentials');
      }
    },
    onSuccess: (userData) => {
      setUser(userData);
      localStorage.setItem('ai-spm-user', JSON.stringify(userData));
      toast({
        title: 'Welcome back!',
        description: 'Successfully logged into AI-SPM dashboard.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Authentication failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      setUser(null);
      localStorage.removeItem('ai-spm-user');
      queryClient.clear();
      toast({
        title: 'Logged out',
        description: 'You have been securely logged out.',
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: { 
      email: string; 
      password: string; 
      name: string; 
      role: User['role'] 
    }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        role: userData.role,
      };
    },
    onSuccess: (userData) => {
      setUser(userData);
      localStorage.setItem('ai-spm-user', JSON.stringify(userData));
      toast({
        title: 'Account created!',
        description: 'Welcome to AI-SPM. Your account has been created successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Registration failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const value = {
    user,
    isLoading,
    loginMutation,
    logoutMutation,
    registerMutation,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}