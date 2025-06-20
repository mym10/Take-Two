import React, {useState} from 'react';
import { Card, CardContent, CardActions, Typography, TextField } from '@mui/material';

const CustomCard = ({ title, description, actionText, onAction }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    return (
        <Card sx={{ maxWidth: 400, margin: '20px auto', boxShadow: 3, borderRadius:'15px', display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins'}}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ fontFamily: 'Poppins', marginBottom:'10px' }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins' }}>
                    {description}
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginBottom: '10px' }}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{ marginBottom: '10px' }}
                />
                <TextField
                    label="Message"
                    name="message"
                    value={userData.message}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ marginBottom: '10px' }}
                />
            </CardContent>
            <CardActions>
                <button className='button' onClick={onAction}>{actionText}</button>
            </CardActions>
        </Card>
    );
};

export default CustomCard;