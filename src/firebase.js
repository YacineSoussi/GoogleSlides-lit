import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";

import firebaseConfig from "./firebase.json";
import { initializeApp } from "firebase/app";
import page from "page";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export function getUserConnection() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user', JSON.stringify(user));
    }
  });
}

export function signUpUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      page("/");
      runToast("#8fce00", "User created and logged successfully");
    })
    .catch(() => runToast("#C70039", "Error during user registration"));
}

export function signOutUser() {
  signOut(auth)
    .then(() => {
      localStorage.removeItem('user');
      page("/");
      runToast("#8fce00", "User logged out successfully");
    })
    .catch(() => runToast("#C70039", "Error during user logout"));
}

export function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      page("/");
      runToast("#8fce00", "User logged in successfully");
    })
    .catch(() => runToast("#C70039", "Error during user login"));
}

export async function getUserPresentations() {
  const snapshot = await get(ref(database, 'presentations'));
  return snapshot.val();
}

export async function getUserPresentation(title) {
  const snapshot = await get(ref(database, `presentations/${title}`));
  return snapshot.val();
}

export function addUserPresentation(author, title, slides) {
  set(ref(database, 'presentations/' + title), {
    author,
    title,
    slides
  }).then(() => {
    runToast("#8fce00", "Presentation added successfully");
  }).catch(() => runToast("#C70039", "Error during presentation addition"));
}

function runToast(color, message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.className = "show";
  snackbar.style.backgroundColor = color;
  snackbar.style.color = "white";
  snackbar.innerHTML = message;
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}