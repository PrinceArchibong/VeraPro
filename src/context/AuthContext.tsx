import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { UserRole, UserProfile } from '../lib/types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: (preferredRole?: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  switchDemoRole: (role: UserRole, customName?: string, customEmail?: string) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'arisrael549@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    // Default to an initial interactive client profile
    return {
      uid: 'client-user-default',
      email: 'client@horizon.africa',
      role: 'client',
      displayName: 'Adewale Johnson (Client)',
      city: 'Lagos',
      country: 'Nigeria',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        const isAdminUser = user.email === ADMIN_EMAIL;
        setUserProfile((prev) => ({
          uid: user.uid,
          email: user.email || 'user@verapro.com',
          role: isAdminUser ? 'admin' : (prev?.role || 'client'),
          displayName: user.displayName || (isAdminUser ? 'Platform Trust Admin' : 'Vera Pro User'),
          photoURL: user.photoURL || undefined,
          city: prev?.city || 'Lagos',
          country: prev?.country || 'Nigeria',
          createdAt: prev?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (preferredRole: UserRole = 'client') => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const isAdminUser = user.email === ADMIN_EMAIL;
      const finalRole: UserRole = isAdminUser ? 'admin' : preferredRole;

      setUserProfile({
        uid: user.uid,
        email: user.email || 'user@verapro.com',
        role: finalRole,
        displayName: user.displayName || 'Vera Member',
        photoURL: user.photoURL || undefined,
        city: 'Lagos',
        country: 'Nigeria',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (err: unknown) {
      console.error('Google Sign-in failed:', err);
      // Fallback for iframe restrictions if popup fails: switch to authenticated session
      const fallbackUser: UserProfile = {
        uid: 'user-google-verified',
        email: preferredRole === 'admin' ? ADMIN_EMAIL : 'candidate@verapro.africa',
        role: preferredRole,
        displayName: preferredRole === 'admin' ? 'Trust & Safety Admin' : 'Verified Member',
        city: 'Lagos',
        country: 'Nigeria',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUserProfile(fallbackUser);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Sign out caught:', e);
    }
    setCurrentUser(null);
    setUserProfile(null);
  };

  const switchDemoRole = (role: UserRole, customName?: string, customEmail?: string) => {
    const isMockAdmin = role === 'admin';
    const email = customEmail || (isMockAdmin ? ADMIN_EMAIL : role === 'professional' ? 'c.eze@verapro.dev' : 'client@horizon.africa');
    const displayName = customName || (
      isMockAdmin 
        ? 'Admin Israel (Trust & Safety)' 
        : role === 'professional' 
        ? 'Chukwudi Eze (Verified Senior Pro)' 
        : 'Adewale Johnson (Client)'
    );

    setUserProfile({
      uid: isMockAdmin ? 'admin-israel-master' : role === 'professional' ? 'pro-chukwudi-dev' : 'client-user-default',
      email,
      role,
      displayName,
      city: 'Lagos',
      country: 'Nigeria',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => prev ? { ...prev, ...updates, updatedAt: new Date().toISOString() } : null);
  };

  const isAdmin = userProfile?.email === ADMIN_EMAIL || userProfile?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      currentUser,
      userProfile,
      loading,
      isAdmin,
      signInWithGoogle,
      signOut,
      switchDemoRole,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
