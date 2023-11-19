import { useState} from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Home from "./components/homepage/homepage.component";
import CreatePost from "./components/create-post/create-post.component";
import SignInForm from "./components/sign-in/sign-in-form.component";
import SignUpForm from './components/sign-up/sign-up-form.component';
import NavBar from './components/navigation/nav-bar';

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
    <div className="app-container bg-stone-300 min-h-screen">
      <Router>
        <NavBar isAuth={isAuth} signUserOut={signUserOut}/>
        <Routes>
          <Route path="/homepage" element={<Home isAuth={isAuth} />} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/" index element={<SignInForm setIsAuth={setIsAuth} />} />
          <Route path="/signup" index element={<SignUpForm setIsAuth={setIsAuth} />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;