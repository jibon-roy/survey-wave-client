import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic()
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
            .then(result => {
                if (result.user) {
                    const name = result.user.displayName;
                    const email = result.user.email;
                    const image = result.user.photoURL;
                    const roll = 'user'
                    const userData = { name, email, image, roll }
                    axiosPublic.post('/newUser', userData)
                        .then(res => {
                            if (res) {
                                Swal.fire({
                                    title: "Log in Success!",
                                    text: "Hey Welcome",
                                    icon: "success"
                                });
                            }
                        }).then(location.reload())
                }

            })
            .catch(error => {
                if (error) {
                    // console.log(error)
                    Swal.fire({
                        title: "Opps...",
                        text: "Something is wrong! 3",
                        icon: "error"
                    });
                }


            })
    }

    const logInWithEmailPass = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
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

    const data = { createUserWithEmailPass, logInWithEmailPass, gmailUser, loading, user, logOut }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;