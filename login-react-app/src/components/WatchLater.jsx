import React, {useState, useEffect} from 'react';
import MovieCard from '../components2/MovieCard';
import MovieModal from '../components2/MovieModal';
import { useNavigate } from 'react-router-dom';

const WatchLater = ({ theme, currentTheme }) => {
    const [watchLaterMovies, setwatchLaterMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleMovieAction = (movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    useEffect(() => {
        const watchlater = JSON.parse(localStorage.getItem("watchLater")) || [];
        setwatchLaterMovies(watchlater);
    }, []);

    //navigate
    const navigate = useNavigate();
    const onAction = () => {
        navigate('/home');
    }

    const handleModalToggle = () => {
        setModalOpen(!modalOpen);
    };

    return(
        <div className='favourite-page'>
            <h2>Watch Later</h2>
            <div className='favourite-results'>
                {watchLaterMovies.length > 0 ? (
                watchLaterMovies.map((movie, index) => (
                    <MovieCard
                    key={index}
                    movie={movie}
                    movieImage={movie.Images[0]}
                    movieTitle={movie.Title}
                    actionText="View Details"
                    onAction={() => handleMovieAction(movie)}
                    theme={theme}
                    currentTheme={currentTheme}
                />
                 ))
            ):(
                <div className='no-favourites'>
                    <h3>Nothing in your watch later</h3>
                    <p>Browse more movies to watch later</p>
                    <button className="login-button" onClick={onAction}>
                        Watch-Now!
                    </button>
                </div>
            )}
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
                    theme={theme}
                    currentTheme={currentTheme}
                />
            )} 
        </div>
    );
};

export default WatchLater;