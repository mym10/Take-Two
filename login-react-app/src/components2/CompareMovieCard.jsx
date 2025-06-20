import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';

const CompareCard = ({movieImage, movieTitle, theme, currentTheme}) => {
    return (
        <Card sx={{width: 300,
            borderRadius: 2,
            backgroundColor: theme ==='light' ? 'lightgray' : '#333',
            overflow: 'visible',
            color: theme ==='light' ? '#333' : 'lightgray'
        }}>
        <CardContent sx={{ "&:last-child": { padding: 0} }}>
            <div className="movie-container">
                <img src={movieImage} alt={movieTitle} />
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
            </div>  
        </CardContent>
        </Card>
    );
}

export default CompareCard;