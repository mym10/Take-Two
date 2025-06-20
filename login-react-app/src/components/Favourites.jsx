import React, {useState, useEffect} from 'react';
import MovieCard from '../components2/MovieCard';
import MovieModal from '../components2/MovieModal';
import { useNavigate } from 'react-router-dom';

const Favourites = ({ theme, currentTheme }) => {
    const [favouriteMovies, setFavouriteMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleMovieAction = (movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    // useEffect(() => {
    //     const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    //     setFavouriteMovies(favourites);
    // }, []);

    //navigate
    const navigate = useNavigate();
    const onAction = () => {
        navigate('/home');
    }

    const handleModalToggle = () => {
        setModalOpen(!modalOpen);
    };

    useEffect(() => {
        const fetchFavourites = async () => {
            const username = localStorage.getItem("currentUser");
            if (!username) return;

            try {
                const response = await fetch(`http://localhost:8000/favourites/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setFavouriteMovies(data.favourites);
                } else {
                    console.error("Failed to fetch favourites.");
                }
            } catch (err) {
                console.error("Error fetching favourites:", err);
            }
        };

        fetchFavourites();
    }, []);


    return(
        <div className='favourite-page'>
            <h2>Favourites</h2>
            <div className='favourite-results'>
                {favouriteMovies.length > 0 ? (
                favouriteMovies.map((movie, index) => (
                    <MovieCard
                    key={index}
                    movie={movie}
                    movieImage={movie?.Images?.[0] || movie?.Poster}
                    movieTitle={movie.Title || movie.title}
                    actionText="View Details"
                    onAction={() => handleMovieAction(movie)}
                    theme={theme}
                    currentTheme={currentTheme}
                />
                 ))
            ):(
                <div className='no-favourites'>
                    <h3>Nothing in your favourite list!</h3>
                    <p>Browse more movies and add them to your favourites</p>
                    <button className="login-button" onClick={onAction}>
                        Watch-Now!
                    </button>
                </div>
            )}
        </div>
            {selectedMovie && (
                <MovieModal
                    movieImage={selectedMovie?.Images?.[2] || selectedMovie?.Poster}
                    movieTitle={selectedMovie.Title || selectedMovie.title}
                    movieYear={selectedMovie.Year}
                    runtime={selectedMovie.Runtime}
                    genres={selectedMovie.Genre}
                    director={selectedMovie.Director}
                    open={modalOpen}
                    onClose={handleModalToggle}
                    theme={theme}
                    currentTheme={currentTheme}
                />
            )} 
        </div>
    );
};

export default Favourites;