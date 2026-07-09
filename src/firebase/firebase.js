import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc as firestoreDoc,
  getDoc as firestoreGetDoc,
  setDoc as firestoreSetDoc,
  addDoc as firestoreAddDoc,
  collection as firestoreCollection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const placeholderPattern = /your_|example|changeme/i;
const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => value && !placeholderPattern.test(value),
);

const STORAGE_KEYS = {
  auth: "wanderlust-auth-state",
  users: "wanderlust-users",
  bookings: "wanderlust-bookings",
};

let app = null;
let auth = { currentUser: null };
let db = null;

const fallbackAuth = {
  currentUser: null,
};

function readStorage(key) {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(window.localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function writeStorage(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getStoredAuthUser() {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.auth);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function persistAuthUser(user) {
  if (typeof window === "undefined") return;

  if (user) {
    window.localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(STORAGE_KEYS.auth);
  }
}

function notifyAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("wanderlust-auth-change"));
  }
}

function hashPassword(password) {
  return btoa(encodeURIComponent(password));
}

function verifyPassword(password, passwordHash) {
  return hashPassword(password) === passwordHash;
}

function getUsers() {
  return readStorage(STORAGE_KEYS.users);
}

function saveUsers(users) {
  writeStorage(STORAGE_KEYS.users, users);
}

function normalizeUser(user) {
  if (!user) return null;

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || user.fullName || null,
    fullName: user.fullName || user.displayName || null,
    phone: user.phone || null,
  };
}

function getUserByEmail(email) {
  return getUsers().find((user) => user.email === email) || null;
}

function getUserById(uid) {
  return getUsers().find((user) => user.uid === uid) || null;
}

function setUserRecord(userRecord) {
  const users = getUsers();
  const existingIndex = users.findIndex((user) => user.uid === userRecord.uid);

  if (existingIndex >= 0) {
    users[existingIndex] = { ...users[existingIndex], ...userRecord };
  } else {
    users.push(userRecord);
  }

  saveUsers(users);
  return userRecord;
}

if (isFirebaseConfigured) {
  try {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.info("Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  console.warn(
    "Firebase config is missing or incomplete. Falling back to local storage auth and bookings.",
  );
}

fallbackAuth.currentUser = getStoredAuthUser();
auth.currentUser = fallbackAuth.currentUser;
export const isFirebaseReady = Boolean(auth && db);

export function onAuthStateChanged(authInstance, callback) {
  if (isFirebaseReady && authInstance) {
    return firebaseOnAuthStateChanged(authInstance, (user) => {
      fallbackAuth.currentUser = user;
      auth.currentUser = user;
      callback(user);
    });
  }

  const handleAuthChange = () => {
    fallbackAuth.currentUser = auth.currentUser;
    callback(fallbackAuth.currentUser);
  };

  handleAuthChange();

  if (typeof window !== "undefined") {
    window.addEventListener("wanderlust-auth-change", handleAuthChange);
    return () =>
      window.removeEventListener("wanderlust-auth-change", handleAuthChange);
  }

  return () => {};
}

export async function signInWithEmailAndPassword(_auth, email, password) {
  if (isFirebaseReady) {
    return firebaseSignInWithEmailAndPassword(_auth, email, password);
  }

  const userRecord = getUserByEmail(email);
  if (!userRecord || !verifyPassword(password, userRecord.passwordHash)) {
    throw {
      code: "auth/invalid-credential",
      message: "Invalid email or password",
    };
  }

  const user = normalizeUser(userRecord);
  fallbackAuth.currentUser = user;
  persistAuthUser(user);
  notifyAuthChange();
  return { user };
}

export async function createUserWithEmailAndPassword(_auth, email, password) {
  if (isFirebaseReady) {
    return firebaseCreateUserWithEmailAndPassword(_auth, email, password);
  }

  const existingUser = getUserByEmail(email);
  if (existingUser) {
    throw {
      code: "auth/email-already-in-use",
      message: "Email already registered",
    };
  }

  const uid = `local-${Math.random().toString(36).slice(2, 10)}`;
  const userRecord = {
    uid,
    email,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  setUserRecord(userRecord);
  const user = normalizeUser(userRecord);
  fallbackAuth.currentUser = user;
  persistAuthUser(user);
  notifyAuthChange();
  return { user };
}

export async function updateProfile(user, profileData) {
  if (isFirebaseReady) {
    return firebaseUpdateProfile(user, profileData);
  }

  const existing = getUserById(user.uid);
  if (!existing) {
    throw new Error("User profile not found");
  }

  const updated = setUserRecord({
    ...existing,
    fullName: profileData.displayName || existing.fullName || "",
    displayName: profileData.displayName || existing.displayName || "",
  });

  const normalized = normalizeUser(updated);
  fallbackAuth.currentUser = normalized;
  auth.currentUser = normalized;
  persistAuthUser(normalized);
  notifyAuthChange();
  return normalized;
}

export async function signOut(_auth) {
  if (isFirebaseReady) {
    return firebaseSignOut(_auth);
  }

  fallbackAuth.currentUser = null;
  auth.currentUser = null;
  persistAuthUser(null);
  notifyAuthChange();
  return null;
}

export async function getUserProfile(uid) {
  if (isFirebaseReady && db) {
    const userDoc = await firestoreGetDoc(firestoreDoc(db, "users", uid));
    return userDoc.exists() ? userDoc.data() : null;
  }

  return getUserById(uid);
}

export async function setUserProfile(uid, profileData) {
  if (isFirebaseReady && db) {
    await firestoreSetDoc(firestoreDoc(db, "users", uid), profileData);
    return profileData;
  }

  return setUserRecord({ uid, ...profileData });
}

export async function createBooking(bookingData) {
  if (isFirebaseReady && db) {
    const docRef = await firestoreAddDoc(
      firestoreCollection(db, "bookings"),
      bookingData,
    );
    return { id: docRef.id, ...bookingData };
  }

  const bookings = readStorage(STORAGE_KEYS.bookings);
  const newBooking = { id: `local-${Date.now()}`, ...bookingData };
  bookings.push(newBooking);
  writeStorage(STORAGE_KEYS.bookings, bookings);
  return newBooking;
}

export { auth, db };
