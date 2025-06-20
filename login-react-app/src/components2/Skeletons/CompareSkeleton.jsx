import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CompareSkeleton = () => {
  return (
    <Box sx={{ padding: '20px', marginTop: '60px' }}>
      <Typography variant="h2" sx={{ marginBottom: '20px' }}>
        <Skeleton width="30%" sx={{ bgcolor: '#ffffff' }} />
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {[...Array(3)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: '320px',
              height: '600px',
              padding: '30px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height={500}
              sx={{ marginBottom: '10px', borderRadius: '8px', bgcolor: '#ffffff' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CompareSkeleton;
