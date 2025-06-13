
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyANokIQAqx-T795AfMQAVjFNm1agqwQCWg",
  authDomain: "netflix-clone-123dd.firebaseapp.com",
  projectId: "netflix-clone-123dd",
  storageBucket: "netflix-clone-123dd.firebasestorage.app",
  messagingSenderId: "718325843329",
  appId: "1:718325843329:web:59370ebdffe7d42e9e9480"
};

const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db=getFirestore(app);

const signup=async(name, email, password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth, email, password);
        const user=res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const login=async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout=()=>{
    signOut(auth);
}

export{auth, db, login, signup, logout};