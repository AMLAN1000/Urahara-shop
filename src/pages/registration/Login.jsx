import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../fireabase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../../components/loader/Loader';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const signin = async () => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('user', JSON.stringify(result));
            toast.success('Signin Successfully');
            window.location.href = '/';
        } catch (error) {
            toast.error('Signin Failed');
        }
        setLoading(false);
    }

    return (
        <div className="h-screen w-full bg-[url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/216667c2-e427-4dda-96a6-f5a6558ebbdf/dh878kc-20c3fda8-2451-4b95-9438-1b2e038a55d5.jpg/v1/fill/w_1024,h_615,q_75,strp/anime_city_at_sunset_by_criativedreamer_dh878kc-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIxNjY2N2MyLWU0MjctNGRkYS05NmE2LWY1YTY1NThlYmJkZlwvZGg4NzhrYy0yMGMzZmRhOC0yNDUxLTRiOTUtOTQzOC0xYjJlMDM4YTU1ZDUuanBnIiwiaGVpZ2h0IjoiPD02MTUiLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC8yMTY2NjdjMi1lNDI3LTRkZGEtOTZhNi1mNWE2NTU4ZWJiZGZcL2NyaWF0aXZlZHJlYW1lci00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.Biw7p3d1su2ahNR39p0__5mg0Uc9k_xDOifPhB9EN8M')] bg-cover bg-center flex justify-center items-center">
            {loading && <Loader />}
            <div className="backdrop-blur-md bg-black/70 px-10 py-10 rounded-xl border-2 border-yellow-400 shadow-xl">
                <h1 className="text-center text-yellow-400 font-bold text-2xl font-[Orbitron] mb-6">Enter the Portal</h1>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-900 text-yellow-300 mb-4 px-4 py-3 w-full rounded-md placeholder-yellow-400 outline-none border border-yellow-500 focus:ring-2 focus:ring-yellow-400"
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-900 text-yellow-300 mb-6 px-4 py-3 w-full rounded-md placeholder-yellow-400 outline-none border border-yellow-500 focus:ring-2 focus:ring-yellow-400"
                    placeholder="Password"
                />
                <button
                    onClick={signin}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-black font-bold py-3 rounded-md shadow-md hover:shadow-yellow-500"
                >
                    Login
                </button>
                <p className="mt-4 text-center text-yellow-300 font-[Orbitron]">
                    Don't have an account? <Link className="text-yellow-400 underline" to="/signup">Signup</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
