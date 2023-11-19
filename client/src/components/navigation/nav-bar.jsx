import { Link } from 'react-router-dom';

const NavBar = ({ isAuth, signUserOut }) => {
  return (
<nav className={`bg-white px-2 py-6 rounded-full shadow-lg ${isAuth ? 'z-10 w-full' : ''}`} >
  {!isAuth ? (
    <div className='flex flex-row px-10 gap-6'>
      <Link to="/" className="text-black hover:underline transition duration-300 ease-in-out">Sign In</Link>
      <Link to="/signup" className="text-black hover:underline transition duration-300 ease-in-out">Sign Up</Link>
    </div>
  ) : (
    <div className="flex items-center justify-between px-10">
      <div className='flex flex-row gap-6'>
        <Link to="/homepage" className="text-black hover:underline transition duration-300 ease-in-out">Home</Link>
        <Link to="/createpost" className="text-black hover:underline transition duration-300 ease-in-out">Create Post</Link>
      </div>
      <button onClick={signUserOut} className="text-black hover:underline transition duration-300 ease-in-out">Log Out</button>
    </div>
  )}
</nav>

  );
};

export default NavBar;