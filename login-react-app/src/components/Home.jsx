import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components2/MovieCard';
import movies from '../static/movies.json';
import MovieModal from '../components2/MovieModal';
import { IoChatbubbleSharp } from "react-icons/io5";
import CarouselComponent from '../components2/CarouselComponent';
import Fab from '@mui/material/Fab';
import ChatDrawer from '../components2/ChatbotComponent';
import Pagination from '../components2/Pagination';
import CommentSection from '../components2/CommentSection';

const Home = ({theme, currentTheme, currentUser}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleMovieAction = (movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    const handleModalToggle = () => {
        setModalOpen(!modalOpen);
    };

    const gradientColor = theme === 'dark'
        ? 'linear-gradient(to bottom, rgba(20, 25, 36, 0) 0%, #141924 100%)'
        : 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 60%, #DDE9F3 100%)';

    //optional------------------
    // const shuffleArray = (array) => {
    //     let shuffledArray = [...array]; 
    //     for (let i = shuffledArray.length - 1; i > 0; i--) {
    //       const j = Math.floor(Math.random() * (i + 1)); 
    //       [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
    //     }
    //     return shuffledArray;
    // };

    //trending movies based on the descending order of imdbRating
    const desIMDB = (array) => {
        return array.sort((a, b) => b.imdbRating - a.imdbRating);
    }
    //-------------------------- 
    //drop down
    const [selectedGenre, setSelectedGenre] = useState("Select Genre");

    const genres = ["Action","Comedy","Drama","Horror","Romance","Sci-Fi","Thriller","Fantasy","Animation","Documentary"];

    const navigate = useNavigate();

    const handleGenreChange = (e) => {
        const genre = e.target.value;
        setSelectedGenre(genre);
        navigate(`/search?q=${encodeURIComponent(genre)}`);
    };

    //carousel data 
    const carouselSlides = [
        { src: "https://www.youtube.com/embed/1JLUn2DFW4w?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&showinfo=0&playlist=1JLUn2DFW4w" },
        { src: "https://www.youtube.com/embed/6ZfuNTqbHE8?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&showinfo=0&playlist=6ZfuNTqbHE8" },
        { src: "https://www.youtube.com/embed/d9MyW72ELq0?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&showinfo=0&playlist=d9MyW72ELq0" }
    ];

    //drawer functions
    const toggleDrawer = (isOpen) => () => {
        setDrawerOpen(isOpen);
    };

    //recently watched movies
    const [recentlyWatchedMovies, setRecentlyWatchedMovies] = useState(() => {
        const storedMovies = localStorage.getItem("recently-watched");
        return storedMovies ? JSON.parse(storedMovies) : [];
    });

    useEffect(() => {
        const storedMovies = localStorage.getItem("recently-watched");
        if (storedMovies) {
          setRecentlyWatchedMovies(JSON.parse(storedMovies));
        }
    }, []);

    const addMovieToRecentlyWatched = (movie) => {
        let recentlyWatched = JSON.parse(localStorage.getItem("recently-watched")) || [];
        const isDuplicate = recentlyWatched.some(rw => rw.Title === movie.Title);

        if (!isDuplicate) {
            recentlyWatched = [movie, ...recentlyWatched];
            localStorage.setItem("recently-watched", JSON.stringify(recentlyWatched));
            setRecentlyWatchedMovies(recentlyWatched);
        }
    };

    //pagination
    const itemsPerPage = 5;

    const [currentPageMovies, setCurrentPageMovies] = useState(1);
    const [currentPageRecentlyWatched, setCurrentPageRecentlyWatched] = useState(1);
    const [currentPageTrending, setCurrentPageTrending] = useState(1);

    const handleMoviesPageChange = (page) => {
        setCurrentPageMovies(page);
    };
    
    const handleRecentlyWatchedPageChange = (page) => {
        setCurrentPageRecentlyWatched(page);
    };
    
    const handleTrendingPageChange = (page) => {
        setCurrentPageTrending(page);
    };
    
    const paginatedMovies = movies.slice(
        (currentPageMovies - 1) * itemsPerPage,
        currentPageMovies * itemsPerPage
    );
    
    const paginatedrwMovies = recentlyWatchedMovies.slice(
        (currentPageRecentlyWatched - 1) * itemsPerPage,
        currentPageRecentlyWatched * itemsPerPage
    );
    
    const paginatedraMovies = desIMDB(movies).slice(
        (currentPageTrending - 1) * itemsPerPage,
        currentPageTrending * itemsPerPage
    );

    //accodion for comments
    const [isCommentsVisible, setIsCommentsVisible] = useState(false);

    const toggleComments = () => {
        setIsCommentsVisible(!isCommentsVisible);
    };

    //recommended movies based on favourites
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const username = localStorage.getItem("currentUser"); // or wherever you're storing
                const response = await fetch(`http://localhost:8000/recommendations/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setRecommendedMovies(data.recommended_movies);
                } else {
                    console.error("Failed to fetch recommendations");
                }
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <div className='home-page' style={{backgroundColor: currentTheme.background, color: currentTheme.color}}>
            <div className="carousel-container">
                <CarouselComponent
                    slides={carouselSlides}
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={5000}
                />
                <div className="carousel-gradient-overlay" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100px', 
                    background: gradientColor,
                    zIndex: 1,
                    pointerEvents: 'none',
                }}></div>
            </div>
            <div className="home-page-content">
                <div className="dropdown-container">
                    <select
                        className="dropdown"
                        value={selectedGenre}
                        onChange={handleGenreChange}
                        style={{
                            backgroundColor: theme ==='light' ? 'lightgray' : '#333',
                            color: theme ==='light' ? '#333' : 'lightgray',
                            border: `1px solid ${theme === 'light' ? '#ccc' : '#444'}`,
                        }}
                    >
                        <option disabled>Select Genre</option>
                        {genres.map((genre, index) => (
                        <option key={index} value={genre}>
                            {genre}
                        </option>
                        ))}
                    </select>
                </div>
                {/* <div className='bar-title' style={{ borderBottom: `${theme === 'light' ? '#ccc' : '#444'}` }}>
                <h2 class="watched-movies-title">Continue Watching</h2>
                </div>
                <div className='home-user-watches'>
                {paginatedMovies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <MovieCard
                            movie = {movie}
                            movieImage={movie?.Images?.[0] || movie?.Poster}
                            movieTitle={movie.Title}
                            actionText="View Details"
                            onAction={() => handleMovieAction(movie)}
                            theme = {theme}
                            currentTheme={currentTheme}
                            movieTrailer={movie.Trailer}
                            addMovieToRecentlyWatched={addMovieToRecentlyWatched}
                            duration={movie.TrailerDuration}
                            showProgressBar={true} 
                        />
                    </React.Fragment>
                ))}
                </div> */}
                {/* <div className='pagination-container'>
                <Pagination
                    totalItems={movies.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPageMovies}
                    onPageChange={handleMoviesPageChange}
                /></div> */}
                {recentlyWatchedMovies.length > 0 && (
                    <>
                        <div className='bar-title' style={{ borderBottom: `${theme === 'light' ? '#ccc' : '#444'}` }}>
                        <h2>Recently Watched Movies</h2>
                        </div>
                        <div className='recently-watched'>
                        {paginatedrwMovies.map((movie, index) => (
                            <React.Fragment key={index}>
                            <MovieCard
                                movie={movie}
                                movieImage={movie?.Images?.[0] || movie?.Poster}
                                movieTitle={movie.Title}
                                actionText="View Details"
                                onAction={() => handleMovieAction(movie)}
                                theme={theme}
                                currentTheme={currentTheme}
                                movieTrailer={movie.Trailer}
                                addMovieToRecentlyWatched={addMovieToRecentlyWatched}
                                duration={movie.TrailerDuration}
                                showProgressBar={true}
                            />
                            </React.Fragment>
                        ))}
                        </div>
                    </>
                )}

                {recommendedMovies.length > 0 && (
                    <>
                        <div className='bar-title' style={{ borderBottom: `${theme === 'light' ? '#ccc' : '#444'}` }}>
                        <h2>Based on your watching</h2>
                        </div>
                        <div className='recommended-watched'>
                        {recommendedMovies.map((movie, index) => (
                            <React.Fragment key={index}>
                            <MovieCard
                                movie={movie}
                                movieImage={movie.Poster}
                                movieTitle={movie.Title}
                                actionText="View Details"
                                onAction={() => handleMovieAction(movie)}
                                theme={theme}
                                currentTheme={currentTheme}
                                movieTrailer={movie.Trailer}
                                addMovieToRecentlyWatched={addMovieToRecentlyWatched}
                                duration={movie.TrailerDuration}
                                showProgressBar={false}
                            />
                            </React.Fragment>
                        ))}
                        </div>
                    </>
                )}
                {/* <div className='pagination-container'>
                <Pagination
                    totalItems={recentlyWatchedMovies.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPageRecentlyWatched}
                    onPageChange={handleRecentlyWatchedPageChange}
                /></div> */}
                <div className='bar-title' style={{ borderBottom: `${theme === 'light' ? '#ccc' : '#444'}` }}>
                <h2>Trending in India</h2>
                </div>
                <div className='trending-movies'>
                {paginatedraMovies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <MovieCard
                            movie = {movie}
                            movieImage={movie?.Images?.[0] || movie?.Poster}
                            movieTitle={movie.Title}
                            actionText="View Details"
                            onAction={() => handleMovieAction(movie)}
                            theme = {theme}
                            currentTheme={currentTheme}
                            movieTrailer={movie.Trailer}
                            rating={movie.imdbRating}
                            addMovieToRecentlyWatched={addMovieToRecentlyWatched}
                            duration={movie.TrailerDuration}
                            showProgressBar={false} 
                        />
                    </React.Fragment>
                ))}
                </div>
                {/* <div className='pagination-container' style={{marginBottom: '20px'}}>
                <Pagination
                    totalItems={movies.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPageTrending}
                    onPageChange={handleTrendingPageChange}
                /></div> */}
                <div className="accordion">
                <button
                    onClick={toggleComments}
                    style={{
                        padding: '15px',
                        textAlign: 'left',
                        backgroundColor: '#333',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        margin:'20px',
                    }}
                >
                    {isCommentsVisible ? 'Hide Comments' : 'Show Comments'}
                </button>
                {isCommentsVisible && (
                    <div className="accordion-content" style={{ marginTop: '10px' }}>
                        <CommentSection currentUser={currentUser}/>
                    </div>
                )}
            </div>
            </div>
            {selectedMovie && (
                <MovieModal
                    movieImage={selectedMovie.Images[2]}
                    movieTitle={selectedMovie.Title}
                    movieYear={selectedMovie.Year}
                    runtime={selectedMovie.Runtime}
                    genres={selectedMovie.Genre}
                    director={selectedMovie.Director}
                    open={modalOpen}
                    onClose={handleModalToggle}
                    theme = {theme}
                    currentTheme={currentTheme}
                />
            )}    

            <div>
                <Fab
                    size="large"
                    aria-label="chat"
                    onClick={toggleDrawer(true)}
                    sx={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    backgroundColor: '#845ec2',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#2D3748' },
                    }}
                >
                    <IoChatbubbleSharp size={25} />
                </Fab>
                <ChatDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
            </div>
        </div>
    );
};

export default Home;