import React, { useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logOut = () => {
    return signOut(auth);
  };

  // Update user info
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData).then(() => {
      setUser({ ...auth.currentUser });
    });
  };

  // Google Sign-In
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Password Reset (NEW)
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Observer for user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    loading,
    setUser,
    createUser,
    login,
    logOut,
    updateUser,
    signInWithGoogle,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


