import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SearchResultsSkeleton = () => {
  return (
    <Box sx={{ padding: '20px', marginTop: '60px' }}>
      <Typography variant="h2" sx={{ marginBottom: '20px' }}>
        <Skeleton width="30%" sx={{ bgcolor: '#ffffff' }} />
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {[...Array(4)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: '320px',
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height={150}
              sx={{ marginBottom: '10px', borderRadius: '8px', bgcolor: '#ffffff' }}
            />
            <Skeleton variant="text" width="80%" height={20} sx={{ marginBottom: '10px', bgcolor: '#ffffff' }} />
            <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: '#ffffff' }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchResultsSkeleton;
