import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
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
                    const role = 'user'
                    const userData = { name, email, image, role }
                    axiosPublic.post('/newUser', userData)
                        .then()
                    Swal.fire({
                        title: "Log in Success!",
                        text: "Hey Welcome",
                        icon: "success"
                    });
                }

            })
            .catch(error => {
                if (error) {
                    // console.log(error)
                    Swal.fire({
                        title: "Opps...",
                        text: "Something is wrong!",
                        icon: "error"
                    });
                }


            })
    }

    const logInWithEmailPass = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)

    }

    // Check User
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {

            setUser(currentUser);
            if (currentUser) {
                // do something
                const userData = { email: currentUser?.email }
                axiosPublic.post('/jwt', userData)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            } else {
                // Do something
                await logOut()
                localStorage.removeItem('access-token')
            }
            setLoading(false);
        })
        return () => unSubscribe();
    }, [axiosPublic])

    const updateUserProfileName = (name) => {
        return updateProfile(user, { displayName: name })
    }
    const updateUserProfileImage = (photoUrl) => {
        return updateProfile(user, { photoURL: photoUrl })
    }


    const data = { createUserWithEmailPass, logInWithEmailPass, gmailUser, loading, user, logOut, updateUserProfileName, updateUserProfileImage }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;