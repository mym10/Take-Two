import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompareCard from '../components2/CompareMovieCard';
import Rating from '@mui/material/Rating';

const Compare = () => {
    const [compareMovies, setCompareMovies] = useState([]);

    useEffect(() => {
        const compares = JSON.parse(localStorage.getItem('compares')) || [];
        setCompareMovies(compares);
    }, []);

    const navigate = useNavigate();

    const onAction = () => {
        navigate('/home');
    };

    return (
        <div className="compare-page">
            <h2>Compare</h2>
            {compareMovies.length > 1 &&  compareMovies.length < 5 ? (
                <div className="custom-table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Movie</th>
                                {compareMovies.map((movie, index) => (
                                    <th key={index} className="center-cell">
                                    <CompareCard
                                    movieImage={movie.Images[0]}
                                    movieTitle={movie.Title}/></th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Year</td>
                                {compareMovies.map((movie, index) => (
                                    <td key={index}>{movie.Year}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Director</td>
                                {compareMovies.map((movie, index) => (
                                    <td key={index}>{movie.Director}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Duration</td>
                                {compareMovies.map((movie, index) => (
                                    <td key={index}>{movie.Runtime}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Rating</td>
                                {compareMovies.map((movie, index) => (
                                    <td key={index}><Rating 
                                    value={movie.imdbRating / 2} 
                                    readOnly 
                                /></td>
                                ))}
                            </tr>
                            <tr>
                                <td>Genre</td>
                                {compareMovies.map((movie, index) => (
                                    <td key={index}>
                                        {movie.Genre ? movie.Genre.join(', ') : 'N/A'}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>Languages</td>
                                {compareMovies.map((movie, index) => (
                                    <td key={index}>
                                        {movie.Language ? movie.Language.join(', ') : 'N/A'}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="no-favourites">
                    <h3>Add 2-4 movies to compare.</h3>
                    <p>Browse more movies and add them to compare</p>
                    <button className="login-button" onClick={onAction}>
                        Watch-Now!
                    </button>
                </div>
            )}
        </div>
    );
};

export default Compare;
