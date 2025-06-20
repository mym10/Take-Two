import React from 'react';
import { LinearProgress } from '@mui/material';

const ProgressBar = ({ playedSeconds, duration }) => {
    const progress = (playedSeconds / duration) * 100;
    return (
        <div
            style={{
                marginTop: '-4px',
                width: '99%',
                backgroundColor: '#e0e0e0',
                borderRadius: '5px',
                overflow: 'hidden',
            }}
        >
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: '4px',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: 'red', 
                        transition: 'width 0.3s ease',
                    },
                }}
            />
        </div>
    );
};

export default ProgressBar;