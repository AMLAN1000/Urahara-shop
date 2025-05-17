import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/firebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const signup = async () => {
        setLoading(true);
        if (name === "" || email === "" || password === "") {
            setLoading(false);
            return toast.error("All fields are required");
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            };
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, user);
            toast.success("Signup Successfully");
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            toast.error("Signup failed");
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <div className="h-screen w-full bg-[url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/337e9b108798685.5fc5f3ecad368.jpg')] bg-cover bg-center flex justify-center items-center">
            {loading && <Loader />}
            <div className="backdrop-blur-md bg-black/70 px-10 py-10 rounded-xl border-2 border-pink-500 shadow-lg">
                <h1 className="text-center text-pink-500 font-bold text-2xl font-[Orbitron] mb-6">Join the Urahara-Shop</h1>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-900 text-pink-300 mb-4 px-4 py-3 w-full rounded-md placeholder-pink-400 outline-none border border-pink-600 focus:ring-2 focus:ring-pink-500"
                    placeholder="Name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-900 text-pink-300 mb-4 px-4 py-3 w-full rounded-md placeholder-pink-400 outline-none border border-pink-600 focus:ring-2 focus:ring-pink-500"
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-900 text-pink-300 mb-6 px-4 py-3 w-full rounded-md placeholder-pink-400 outline-none border border-pink-600 focus:ring-2 focus:ring-pink-500"
                    placeholder="Password"
                />
                <button
                    onClick={signup}
                    className="w-full bg-pink-500 hover:bg-pink-600 transition duration-300 text-white font-bold py-3 rounded-md shadow-md hover:shadow-pink-500"
                >
                    Sign Up
                </button>
                <p className="mt-4 text-center text-pink-300 font-[Orbitron]">
                    Have an account? <Link className="text-pink-400 underline" to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
