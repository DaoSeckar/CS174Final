import { useState } from "react"
import {singInWithGooglePopup, signInAuthUserWithEmailAndPassword, auth} from '../../firebase-config'
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = ({setIsAuth}) =>{
    let navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const signInWithGoogle = async () => {
        const response = await singInWithGooglePopup();
        console.log(response);
        localStorage.setItem('isAuth', true);
        localStorage.setItem('userUid', auth.currentUser.uid);
        setIsAuth(true);
        navigate('/homepage');
    };

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleChange= (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            localStorage.setItem('isAuth', true);
            localStorage.setItem('userUid', auth.currentUser.uid);
            setIsAuth(true);
            navigate('/homepage');
        } catch (err) {
            switch(err.code){
                case "auth/invalid-login-credentials":
                    alert('Incorrect password for email');
                    break;
                default:
                    console.log(err)
            }
        }
    }

    return (
        <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-md shadow-md">
            <div></div>
            <h2 className="text-2xl font-semibold mb-4">Welcome to Blog Site</h2>
            <span className="text-gray-600">Sign In with your email and password</span>

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        onChange={handleChange}
                        name="email"
                        value={email}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        id="password"
                        type="password"
                        required
                        onChange={handleChange}
                        name="password"
                        value={password}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                        Sign In
                    </button>
                    
                    <button type="button" onClick={signInWithGoogle} className="bg-red-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800">
                        Google Sign In
                    </button>
                </div>
            </form>
        </div>

    )
};

export default SignInForm;