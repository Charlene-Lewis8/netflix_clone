import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut, } from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC11wg82XN9YisErAUTzINXSVKLmPVNpNA",
  authDomain: "netflix-clone-a86a1.firebaseapp.com",
  projectId: "netflix-clone-a86a1",
  storageBucket: "netflix-clone-a86a1.firebasestorage.app",
  messagingSenderId: "514850947462",
  appId: "1:514850947462:web:01389f329c4a6048ffec07"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
      const res = await createUserWithEmailAndPassword(auth, email, 
        password);
        const user = res.user;
        await addDoc (collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
       await signInWithEmailAndPassword(auth, email, password)
    } 
    catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
 

const logout = ()=> {
    signOut(auth);
}

export {auth, db, login, signup, logout}