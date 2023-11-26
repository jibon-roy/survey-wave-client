import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Create user with email and password
    const createUserWithEmailPass = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const gmailUser = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // Check User
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            setUser(currentUser);
        })
        return () => unSubscribe();
    }, [])

    const logOut = () => {
        return signOut(auth)
            .then(res => {
                if (res) {
                    Swal.fire({
                        title: "Log Out Success!",
                        text: "See You Again",
                        icon: "success"
                    });
                }
            })
            .catch(err => {
                if (err) {
                    Swal.fire({
                        title: "Opps...",
                        text: "Something is wrong!",
                        icon: "error"
                    });
                }
            })
    }

    const data = { createUserWithEmailPass, gmailUser, loading, user, logOut }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;