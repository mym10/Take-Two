import React, {useState, useEffect} from "react";
import { Card, CardContent, CardActions, Typography, Modal, Box, Checkbox } from '@mui/material';
import Tooltip from '../components2/TooltipComponent';
import ReactPlayer from 'react-player'
import { IoClose } from "react-icons/io5";
import { IoHeartCircleOutline, IoCheckmarkCircleOutline, IoCaretForwardCircleOutline, IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';  
//progress bar
import ProgressBar from "./ProgressbarComponent";


const MovieCard = ({movieImage, movieTitle, actionText, onAction, theme, currentTheme, movie, movieTrailer, rating, addMovieToRecentlyWatched, duration, showProgressBar}) => {
    const navigate = useNavigate();
    
    //add to compare
    const [isAdded, setIsAdded] = useState(()=>
        JSON.parse(localStorage.getItem("compares"))?.some(comp => comp.Title === movie.Title) || false
    )

    const [compares, setCompares] = useState(JSON.parse(localStorage.getItem("compares")) || []);
    useEffect(() => {
        localStorage.setItem("compares", JSON.stringify(compares));
    }, [compares]);

    const handleCompare = () => {
        let compares = JSON.parse(localStorage.getItem("compares")) || [];
        if (!isAdded) {
            compares.push(movie); 
        } else {
            compares = compares.filter(comp => comp.Title !== movie.Title);
        }
        setIsAdded(!isAdded);
        setCompares(compares);
        localStorage.setItem("compares", JSON.stringify(compares));
    };

    //add to favourites
    const [isClicked, setIsClicked] = useState(() => 
        JSON.parse(localStorage.getItem("favourites"))?.some(fav => fav.Title === movie.Title) || false 
    )

    const handleClick = () => {
        setIsClicked(!isClicked);
        let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
        if (!isClicked) {
            favourites.push(movie); //add to favourites
        } else {
            favourites = favourites.filter(fav => fav.Title !== movie.Title); //remove from favourites
        }
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }

    //add to watch later
    const [isWatchLater, setIsWatchLater] = useState(() => 
        JSON.parse(localStorage.getItem("watchLater"))?.some(wl => wl.Title === movie.Title) || false 
    )

    const handleWatchlater = () => {
        setIsWatchLater(!isWatchLater);
        let watchLater = JSON.parse(localStorage.getItem("watchLater")) || [];
        if (!isWatchLater) {
            watchLater.push(movie); //add to watchLater
        } else {
            watchLater = watchLater.filter(wl => wl.Title !== movie.Title); //remove from watchLater
        }
        localStorage.setItem("watchLater", JSON.stringify(watchLater));
    }

    //recently watched
    const [isModalOpen, setIsModalOpen] = useState(() => {
        const storedMovies = localStorage.getItem("recently-watched");
        const recentlyWatched = storedMovies ? JSON.parse(storedMovies) : [];
        return recentlyWatched.some(rw => rw.Title === movie.Title) ? false : false;
    }); 
    
    
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const [playedSeconds, setPlayedSeconds] = useState(0);

    const handleProgress = (progress) => {
        if (progress && progress.playedSeconds !== undefined) {
            setPlayedSeconds(progress.playedSeconds);
        }
    };

    const handleModalClose = () => {
        addMovieToRecentlyWatched(movie);
        setIsModalOpen(false);
        navigate("/home");
    }

    const redirectToCompare = () => navigate("/compare");
    return (
        <>
            <Card sx={{ width: 300, 
            borderRadius: 2, 
            backgroundColor: theme ==='light' ? 'lightgray' : '#333',
            overflow: 'visible',
            color: theme ==='light' ? '#333' : 'lightgray'
            }}>
                <CardContent sx={{ "&:last-child": { padding: 0} }}>
                    <div className="movie-container">
                        <Checkbox  style={{marginLeft: '260px', marginBottom: '-35px', padding: '-20px'}}  sx={{
                            color: 'white',
                            '&.Mui-checked': {
                            color: 'white',
                            },
                        }}  
                        checked={isAdded}
                        onChange={handleCompare} />
                        <img src={movieImage} alt={movieTitle} />
                        {/* progress bar */}
                        {showProgressBar && ( 
                            <ProgressBar playedSeconds={playedSeconds} duration={duration} />
                        )}
                        <Typography variant="h5" component="h3" sx={{ 
                            textAlign: 'left', 
                            marginTop: '3px', 
                            fontFamily: "Poppins", 
                            fontWeight: 500, 
                            width:'270px', 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            color: theme ==='light' ? '#333' : 'lightgray'
                            }}>
                            {movieTitle}
                        </Typography>
                        <div className="rating">
                            {rating ? <Rating value={rating / 2} readOnly/> : null}
                        </div>
                        <div className="movie-container-actions">
                            <div className="left-icons">
                                <Tooltip text="Play">
                                <IoCaretForwardCircleOutline size={30} style={{ color: theme === 'light' ? '#333' : 'lightgray', cursor: 'pointer' }}  onClick={handleModalOpen} />
                                </Tooltip>

                                <Tooltip text={isWatchLater ? "Remove from watch later" : "Add to watch later"}>
                                <div onClick={handleWatchlater} style={{display: "inline-flex", alignItems: "center", cursor: "pointer"}}>
                                    {isWatchLater ? (
                                    <IoCheckmarkCircleOutline size={30} style={{ color: theme === "light" ? "#333" : "lightgray"}}/>
                                    ) : (
                                    <IoAddCircleOutline size={30} style={{ color: theme === "light" ? "#333" : "lightgray"}}/>
                                    )}
                                </div>
                                </Tooltip>

                                <Tooltip text={isClicked ? 'Remove from favourites' : 'Add to favourites'}>
                                <IoHeartCircleOutline size={30} style={{ color: isClicked ? '#990f02' : theme === 'light' ? '#333' : 'lightgray', cursor: 'pointer' }} onClick={handleClick} />
                                </Tooltip>
                            </div>
                            
                            <div className="action-text">
                                <CardActions sx={{ justifyContent: 'flex-end' }}>
                                    <Typography 
                                        variant="body2" 
                                        color="lightgray" 
                                        sx={{
                                            textAlign: 'center',
                                            fontSize: '15px',
                                            fontFamily: "Poppins",
                                            cursor: 'pointer',
                                            padding: '5px 5px',
                                            border: `2px solid ${theme ==='light' ? '#333' : 'lightgray'}`,
                                            borderRadius: '4px',
                                            display: 'inline-block',
                                            transition: '0.3s ease',
                                            backgroundColor: currentTheme.background,
                                            color: currentTheme.color,
                                            '&:hover': { 
                                                backgroundColor: theme === 'light' ? '#ddd' : 'black', 
                                                color: theme === 'light' ? 'black' : 'white' 
                                            }
                                        }} 
                                        onClick={onAction}
                                    >
                                        {actionText}
                                    </Typography>
                                </CardActions>
                            </div>
                        </div>
                    </div>
                </CardContent> 
            </Card>

            {compares.length > 1 && compares.length < 5 && (
                <div
                    className="compare-popup"
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        left: "20px",
                        padding: "10px 20px",
                        backgroundColor: "#ffff",
                        color: "#000",
                        borderRadius: "8px",
                        cursor: "pointer",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                    }}
                    onClick={redirectToCompare}
                >
                    What to compare? Click here!
                </div>
            )}

                <Modal
                    open={isModalOpen}
                    onClose={handleModalClose}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                <Box
                    sx={{
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: theme === 'light' ? '#fff' : '#000',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 2,
                        outline: 'none',
                        padding: '10px 10px 10px',
                        zIndex: 1000,
                    }}
                >
                    <IoClose
                        onClick={handleModalClose}
                        style={{
                            alignSelf: 'flex-end', 
                            fontSize: '30px',
                            color: theme === 'light' ? '#333' : 'lightgray',
                            cursor: 'pointer',
                            marginBottom: '-20px', 
                        }}
                    />
                    <ReactPlayer
                        url={movieTrailer}
                        playing
                        controls
                        onProgress={handleProgress}
                        width="100%"
                        height="100%"
                        style={{
                            marginTop: '20px',
                        }}
                    />
                </Box>
            </Modal>
        </>
    );
}

export default MovieCard;