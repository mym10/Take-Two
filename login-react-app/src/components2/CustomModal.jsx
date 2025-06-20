import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const CustomModal = ({open, onClose, title, children}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                color: 'black',
            }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}> {title}</Typography>
                {children}
            </Box>
        </Modal>
    );
};

export default CustomModal;