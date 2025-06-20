import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearch, IoFilm, IoSunny, IoMoon} from "react-icons/io5";
import EditableAvatar from './AvatarModal';

const Navbar = ({ theme, toggleTheme, themeStyles, avatarProps }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className='bg-gray-800 text-white navbar' style={{ backgroundColor: themeStyles[theme].background, color: themeStyles[theme].color}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold flex items-center title" style={{ gap: '8px', color: themeStyles[theme].color }}>
            <IoFilm size={30} className='icon'/>
              TAKETWO
            </Link>
          </div>
          <div className="hidden md:flex flex-grow justify-center items-center space-x-2">
          <IoSearch size={25}/>
          <form onSubmit={handleSearchSubmit} className="w-full max-w-lg" >
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search..."
              className={"rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2"}
              style={{
                backgroundColor: theme === 'dark' ? '#4B5563' : '#d5d7db',
                color: themeStyles[theme].color,
                placeholder: theme === 'dark' ? '#9CA3AF' : '#6B7280',
              }}
            />
            </form>
          </div>
          <div className="hidden md:flex space-x-4" style={{ alignItems: 'center'}}>
            <div onClick={toggleTheme} style={{ cursor: 'pointer' }}>
              {theme === 'light' ? (
                <IoMoon size={24} style={{ color: '#343a40' }} />
              ) : (
                <IoSunny size={24} style={{ color: 'white' }} />
              )}
            </div>
            <Link to="/home" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-500 hover:text-white">Home</Link>
            <Link to="/favourites" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-500 hover:text-white">Favourites</Link>
            <Link to="/watchlater" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-500 hover:text-white">Watch Later</Link>
            <Link to="/userprofile" className="px-3 py-2"><EditableAvatar width={30} height={30} savedAvatarProps={avatarProps}/></Link>

          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
