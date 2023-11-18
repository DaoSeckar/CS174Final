import { useState} from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Home from "./components/homepage/homepage.component";
import CreatePost from "./components/create-post/create-post.component";
import SignInForm from "./components/sign-in/sign-in-form.component";
import SignUpForm from './components/sign-up/sign-up-form.component';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  return (
    <Router>
      <nav className="bg-blue-500 p-4">
        {!isAuth ? (
          <div className="flex space-x-4">
            <Link to="/" className="text-white">Sign In</Link>
            <Link to="/signup" className="text-white">Sign Up</Link>
          </div>
        ) : (
          <div className="flex flex-row justify-between px-10">
            <div className='flex flex-row gap-10'>             
            <Link to="/homepage" className="text-white">Home</Link>
            <Link to="/createpost" className="text-white">Create Post</Link>
            </div>
            <button onClick={signUserOut} className="text-white">Log Out</button>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/homepage" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/" index element={<SignInForm setIsAuth={setIsAuth} />} />
        <Route path="/signup" index element={<SignUpForm setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;