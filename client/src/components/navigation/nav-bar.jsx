import { Link } from 'react-router-dom';

const NavBar = ({ isAuth, signUserOut }) => {
  return (
    <nav className={`bg-white p-4 rounded-full shadow-lg ${isAuth ? 'fixed top-0 left-0 right-0 mx-auto z-10 w-full' : ''}`} >
      {!isAuth ? (
        <div className='flex flex-row gap-6 px-10'>
          <Link to="/" className="text-black hover:underline">Sign In</Link>
          <Link to="/signup" className="text-black hover:underline">Sign Up</Link>
        </div>
      ) : (
        <div className="flex items-center justify-between px-10">
          <div className='flex flex-row gap-6'>
            <Link to="/homepage" className="text-black hover:underline">Home</Link>
            <Link to="/createpost" className="text-black hover:underline">Create Post</Link>
          </div>
          <button onClick={signUserOut} className="text-black hover:underline">Log Out</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;