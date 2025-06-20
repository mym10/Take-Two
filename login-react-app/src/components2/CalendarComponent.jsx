import React, { useState, useEffect } from 'react';
import { Dialog } from '@mui/material';
import { Calendar } from 'react-calendar';
import { IoClose } from 'react-icons/io5';
import 'react-calendar/dist/Calendar.css';
import movies from '../static/movies.json';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';


const CalendarComponent = ({ open, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    const highlightedMovies = movies.filter((movie) => movie.ComingSoon).map((movie) => ({date: new Date(movie.Released), title: movie.Title }));

    const getHighlightedMovie = (date) => {
        return highlightedMovies.find(
            (movie) => movie.date.toDateString() === date.toDateString()
        );
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="sm" 
            fullWidth 
            PaperProps={{
                style: {
                    height: '500px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#f4f4f4'
                },
            }}
        >
            <div style={styles.header}>
                <h2 style={styles.title}>Upcoming Movies</h2>
                <IoClose onClick={handleClose} style={styles.closeIcon} />
            </div>
            <div style={styles.body}>
                <Calendar
                    tileContent={({ date }) => {
                        const highlightedMovie = getHighlightedMovie(date);
                        return highlightedMovie ? (
                            <>
                                <div
                                    style={styles.highlight}
                                    data-tooltip-id="movie-tooltip"
                                    data-tooltip-content={highlightedMovie.title}
                                >🎥</div>
                                <ReactTooltip id="movie-tooltip" place="bottom" effect="solid" />
                            </>
                        ) : null;
                    }}
                />
            </div>
        </Dialog>   
    );
};

const styles = {
    
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#845ec2',
        color: '#ecf0f1',
        padding: '15px 20px',
    },
    title: {
        fontSize: '22px',
        margin: 0,
        fontWeight: 600,
    },
    closeIcon: {
        fontSize: '28px',
        cursor: 'pointer',
        color: '#ecf0f1',
    },
    body: {
        padding: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
    },
    highlight: {
        color: 'black',
        fontSize: '14px',
        textAlign: 'center',
        borderRadius: '0%',
        padding: '0px',
    },
};

export default CalendarComponent;
