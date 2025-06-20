import React from 'react';
import { Modal, Box, Typography, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';

const NewsletterModal = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
        <Box
            sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            }}
        >
            <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'black' }}>
            Subscribe to our Newsletter
            </Typography>
            <form>
            <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2,  mb: 2}}>
                <TextField fullWidth variant='outlined' label='First Name' type='text'/>
                <TextField fullWidth variant='outlined' label='Last Name' type='text'/>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2,  mb: 2}}>
                <TextField fullWidth variant='outlined' label='Email' type='email'/>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ mb: 1, color: 'black' }}>
                Genres of Interest:
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, color: 'black'}}>
                    <FormControlLabel control={<Checkbox />}label="Action"/>
                    <FormControlLabel control={<Checkbox />}label="Comedy"/>
                    <FormControlLabel control={<Checkbox />}label="Drama"/>
                    <FormControlLabel control={<Checkbox />}label="Horror"/>
                    <FormControlLabel control={<Checkbox />}label="Romance"/>
                    <FormControlLabel control={<Checkbox />}label="Sci-Fi"/>
                    <FormControlLabel control={<Checkbox />}label="Thriller"/>
                    <FormControlLabel control={<Checkbox />}label="Animation"/>
                </Box>
            </Box>
            <Button variant="contained" color="primary" fullWidth onClick={onClose}>
                Subscribe
            </Button>
            </form>
        </Box>
        </Modal>
    );
};

export default NewsletterModal;
