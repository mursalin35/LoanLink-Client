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
import { AuthContext } from "../context/AuthContext";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null); // 'user' | 'manager' | 'admin'
  const [suspended, setSuspended] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");

  // -------------------------
  // Auth helper functions
  // -------------------------
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logOut = async () => {
    await signOut(auth);
    setRole(null);
    setSuspended(false);
    setSuspendReason("");
  };

  const updateUserProfile = async (profile) => {
    await updateProfile(auth.currentUser, profile);
    setUser({ ...auth.currentUser });
  };

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const getIdToken = async () => {
    if (!auth.currentUser) return null;
    return auth.currentUser.getIdToken(true); // force refresh
  };

  // -------------------------
  // Fetch user role from backend
  // -------------------------
  const fetchUserRole = async (currentUser) => {
    try {
      if (!currentUser?.email) return;

      const token = await currentUser.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${currentUser.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch role");

      const data = await res.json();
      setRole(data.role || "user");
      setSuspended(!!data.suspended);
      setSuspendReason(data.suspendReason || "");
    } catch (err) {
      console.error("fetchUserRole error:", err);
      // fallback defaults
      setRole("user");
      setSuspended(false);
      setSuspendReason("");
      console.log("Current Role User Data: ",setRole)
    }
  };

  // -------------------------
  // Observe Firebase Auth state
  // -------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);
      if (currentUser) {
        await fetchUserRole(currentUser);
      } else {
        setRole(null);
        setSuspended(false);
        setSuspendReason("");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // -------------------------
  // Auth context value
  // -------------------------
  const authData = {
    user,
    loading,
    createUser,
    login,
    logOut,
    updateUserProfile,
    signInWithGoogle,
    resetPassword,
    role,
    suspended,
    suspendReason,
    getIdToken,
  };

  return <AuthContext.Provider value={authData}> {!loading && children}</AuthContext.Provider>;
};

export default AuthProvider;
