import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const HomeSkeleton = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      {/* Carousel Skeleton */}
      <Skeleton
        variant="rectangular"
        height="70vh"
        sx={{
          background: 'linear-gradient(90deg, #e0e0e0 25%, #cfcece 50%, #e0e0e0 75%)',
          backgroundSize: '200% 100%',
          animation: 'skeleton-loading 1.5s infinite',
          marginBottom: '40px',
          bgcolor: '#ffffff',
        }}
      />

      {/* Movie Card Skeletons */}
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
            {/* Movie Image Skeleton */}
            <Skeleton
              variant="rectangular"
              width="100%"
              height={150}
              sx={{ marginBottom: '10px', borderRadius: '8px', bgcolor: '#ffffff' }}
            />
            {/* Movie Title Skeleton */}
            <Skeleton variant="text" width="80%" height={20} sx={{ marginBottom: '10px', bgcolor: '#ffffff' }} />
            {/* Movie Action Skeleton */}
            <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: '#ffffff' }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomeSkeleton;
