import React, { createContext, useContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../firebaseconfig";

import { db } from "../../firebaseconfig";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function signup(email, password) {
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userRef = db.collection("users").doc(userCredential.user.uid);
      await userRef.set({ userType });
      return userCredential;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function login(email, password) {
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userRef = db.collection("users").doc(userCredential.user.uid);
      const userData = await userRef.get();
      if (userData.exists) {
        const userType = userData.data().userType;
        return userCredential;
      } else{
        setError("User not found");
        throw new Error("User not found");
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function logout() {
    setError("");
    try {
      return await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    logout,
    signup,
    login,
    error,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
