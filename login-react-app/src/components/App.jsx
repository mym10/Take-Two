import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginCard from "./LoginSignupCard";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import { Link } from 'react-router-dom';
import { IoFilm } from "react-icons/io5";
import popbg from '../assets/popbg.jpg';
import popbgFlipped from '../assets/popbgFlipped.jpg'
import NavBar from '../components2/NavBar';
import SearchResults from "./searchResults";
import Favourites from "./Favourites";
import WatchLater from "./WatchLater"
import UserProfile from "./UserProfile";
import Compare from './Compare';
//skeletons
import HomeSkeleton from '../components2/Skeletons/HomeSkeleton';
import FavouritesSkeleton from '../components2/Skeletons/FavouritesSkeleton';
import SearchResultsSkeleton from '../components2/Skeletons/SearchResultsSkeleton';
import CompareSkeleton from '../components2/Skeletons/CompareSkeleton';
import MovieAnalytics from "./Analytics";


const App = () => {
  //skeletons
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const renderSkeleton = () => {
    if (location.pathname === '/favourites') return <FavouritesSkeleton />;
    if (location.pathname === '/home') return <HomeSkeleton />;
    if (location.pathname === '/search') return <SearchResultsSkeleton />
    if (location.pathname === '/compare') return <CompareSkeleton />
    if (location.pathname === '/watchlater') return <FavouritesSkeleton />;
    return null;
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [location.pathname]);


  //login/signup
  const [isLogin, setIsLogin] = useState(true);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser || ""; 
  });
  
  const [currentEmail, setCurrentEmail] = useState(() => {
    const savedEmail = localStorage.getItem("currentEmail");
    return savedEmail || "";
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser);
    }
  }, [currentUser]);
  
  useEffect(() => {
    if (currentEmail) {
      localStorage.setItem("currentEmail", currentEmail);
    }
  }, [currentEmail]);

  const toggleAuthPage = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsLogin(false); 
    } else {
      setIsLogin(true); 
    }
  }, [location.pathname]); 

  const showNavbar = location.pathname !== '/'; 

  //theme setting
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeStyles = {
    light: {
      background: '#DDE9F3',
      color: '#000',
      translucent: 'rgba(255, 255, 255, 0.61)',
    },
    dark: {
      background: '#141924',
      color: '#fff',
      translucent: 'rgba(0, 0, 0, 0.5)',
    },
  };

  const currentTheme = themeStyles[theme];

  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.color;
  }, [currentTheme]);

  //avatar settings
  const [avatarProps, setAvatarProps] = useState(() => {
    const savedAvatarProps = localStorage.getItem("avatarProps");
    return savedAvatarProps ? JSON.parse(savedAvatarProps) : {
      shape: "circle",
      color: "#b385de",
      text: currentUser || 'User',
    };
  });

  useEffect(() => {
    setAvatarProps((prevProps) => ({
      ...prevProps,
      text: currentUser,
    }));
  }, [currentUser]);

  const updateAvatarProps = (newProps) => {
    setAvatarProps(newProps);
    localStorage.setItem("avatarProps", JSON.stringify(newProps));
  };
  

  return (
      <div key={isLogin ? 'login' : 'signup'} 
      className={`${location.pathname === '/' ? 'app-container-login' : 'app-container-home'}`}
      style={{ background: location.pathname === '/'  ? isLogin
            ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${popbg})`
            : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${popbgFlipped})`
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {showNavbar && <NavBar theme={theme} toggleTheme={toggleTheme} themeStyles={themeStyles} avatarProps={avatarProps}/>} 
        {isLoading ? (
        renderSkeleton()
        ) : ( 
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Link to="/" className="text-5xl font-bold text-white flex items-center" style={{ gap: '10px', position: 'absolute', top: '7rem', left: '50%', transform: 'translateX(-50%)' }}>
                    <IoFilm size={50} style={{ color: 'white' }} />
                    TAKE-TWO
                  </Link>
                  <LoginCard isLogin={isLogin} toggleAuthPage={toggleAuthPage} setCurrentUser={setCurrentUser} setCurrentEmail={setCurrentEmail} />
                </>
              }
            />
            <Route path="/home" element={<Home theme={theme} currentTheme={currentTheme} currentUser={currentUser}/>} />
            <Route path="/favourites" element={<Favourites theme={theme} currentTheme={currentTheme}/>} />
            <Route path="/watchlater" element={<WatchLater theme={theme} currentTheme={currentTheme}/>} />
            <Route path="/contact" element={<Contact currentTheme={currentTheme}/>} />
            <Route path="/about" element={<About currentTheme={currentTheme}/>} />
            <Route path="/search" element={<SearchResults theme={theme} currentTheme={currentTheme}/>} />
            <Route path="/userprofile" element={<UserProfile theme={theme} currentTheme={currentTheme} avatarProps={avatarProps} setAvatarProps={updateAvatarProps} currentUser={currentUser} currentEmail={currentEmail}/>}/>
            <Route path="/compare" element={<Compare theme={theme} currentTheme={currentTheme}/>}/>
            <Route path="/analytics" element={<MovieAnalytics/>}></Route>
          </Routes>
        )}
      </div>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);