import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import EditableAvatar from '../components2/AvatarModal';
import Tooltip  from '../components2/TooltipComponent';
import { SketchPicker } from "react-color";
import CalendarComponent from '../components2/CalendarComponent'
import QuizComponent from '../components2/QuizComponent'

//icons
import { IoArrowBack, IoToday } from "react-icons/io5";
import { MdOutlineDevices, MdCottage, MdQuiz } from "react-icons/md";
import { CheckCircle } from '@mui/icons-material';
import { MdDraw } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";


const UserProfile = ({ theme, currentTheme, avatarProps, setAvatarProps, currentUser, currentEmail }) => {
    const [selectedPlan, setSelectedPlan] = useState('free');
    const navigate = useNavigate();

    const handlePlanChange = (event) => {
        setSelectedPlan(event.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem('favourites');
        localStorage.removeItem('compares');
        localStorage.removeItem('avatarProps');
        localStorage.removeItem('watchLater');
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentEmail");
        localStorage.removeItem('recently-watched');
        navigate('/');
    };

    //avatar settings
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleSave = () => {
        setAvatarProps({ ...avatarProps });
        setOpen(false);
    };

    const handleChange = (prop) => (event) => {
        setAvatarProps({ ...avatarProps, [prop]: event.target.value });
    };

    const handleColorChange = (color) => {
        setAvatarProps({ ...avatarProps, color: color.hex });
    };

    const [modalOpen, setModalOpen] = useState(false);
    
    const handleAction = () => {
        setModalOpen(true);
    };

    const handleModalToggle = () => {
        setModalOpen(!modalOpen);
    };

    const [quizOpen, setQuizOpen] = useState(false);

    const handleQuizOpen = () => {
        setQuizOpen(true);
    }

    const handleQuizClose = () => {
        setQuizOpen(!quizOpen)
    }

  return (
    <div className='profile-page'>
        <div className='left-pane'>
            <div className='avatar'>
                <EditableAvatar width={200} height={200} currentUser={currentUser} savedAvatarProps={avatarProps}/><Tooltip text={'edit'}><MdDraw size={30} className='draw-icon' fill='white' onClick={handleClickOpen}/></Tooltip>
                <Link to="/home" className="text-xl flex items-center title home" style={{ gap: '10px', color: currentTheme.color }}>
                <IoArrowBack size={'25px'} className='icon'/>
                    Back to Home</Link>
            </div>
            <div className='under-avatar'>
                <Link to="/about" className="text-xl flex items-center title" style={{ gap: '10px', color: currentTheme.color }}>
                <MdCottage size={'25px'} className='icon'/>
                About</Link>
                <Link to="/contact" className="text-xl flex items-center title" style={{ gap: '10px', color: currentTheme.color }}>
                <MdOutlineDevices size={'25px'} className='icon'/>
                Contact Us</Link>
                <Link to="#" className="text-xl flex items-center title" style={{ gap: '10px', color: currentTheme.color }} onClick={handleAction}>
                <IoToday size={'25px'} className='icon' />
                Calender</Link>
                <Link to="/analytics" className="text-xl flex items-center title" style={{ gap: '10px', color: currentTheme.color }}>
                <IoMdAnalytics size={'25px'} className='icon' />
                Analytics</Link>
            </div> 
            <button className="login-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
        <div className='right-pane'>
            <div className='user-details'>
                <h2>User Details</h2>
                <TextField
                    id="standard-read-only-input"
                    label="Username"
                    defaultValue={currentUser ||"User"}//username
                    variant="standard"
                    slotProps={{
                        input: {
                        readOnly: true,
                        },
                    }}
                    sx={{
                        input: { color: theme === 'light' ? 'black' : 'white' },
                        '& .MuiInputLabel-root': { color: theme === 'light' ? 'black' : 'white' },
                        '& .MuiInput-underline:before': { borderBottomColor: theme === 'light' ? 'black' : 'white' },
                        '& .MuiInput-underline:hover': { borderBottomColor: theme === 'light' ? 'black' : 'white' },
                        '& .MuiInput-underline:after': { borderBottomColor: theme === 'light' ? 'black' : 'white' },
                    }}
                    />
                    <TextField
                    id="standard-read-only-input"
                    label="Email-id"
                    defaultValue={currentEmail || "user1010@gmail.com"} //email
                    variant="standard"
                    slotProps={{
                        input: {
                        readOnly: true,
                        },
                    }}
                    sx={{
                        input: { color: theme === 'light' ? 'black' : 'white' },
                        '& .MuiInputLabel-root': { color: theme === 'light' ? 'black' : 'white' },
                        '& .MuiInput-underline:before': { borderBottomColor: theme === 'light' ? 'black' : 'white' },
                        '& .MuiInput-underline:hover': { borderBottomColor: theme === 'light' ? 'black' : 'white' },
                        '& .MuiInput-underline:after': { borderBottomColor: theme === 'light' ? 'black' : 'white' },
                    }}
                />
            </div>
            <div className='plan-and-others'>
                <div className='plan'>
                    <h2>Plan</h2>
                    <div className="plan-container">
                        {['free', 'premium', 'premium+'].map(plan => (
                            <div
                                key={plan}
                                className={`plan-box ${selectedPlan === plan ? 'selected' : ''}`}
                                onClick={() => handlePlanChange(plan)}
                                value={plan}
                            >
                                <h3>{plan.charAt(0).toUpperCase() + plan.slice(1)}</h3>
                                <p>{plan === 'free' ? '₹0/month' : plan === 'premium' ? '₹149/month' : '₹199/month'}</p>
                                <ul>
                                    <li>{plan === 'free' ? 'Basic features' : plan === 'premium' ? 'All features, no ads' : 'Premium features, exclusive content'}</li>
                                </ul>
                                {selectedPlan === 'free' && plan === 'free' && (
                                    <CheckCircle className="check-icon" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='quiz'><Link to="#" className="text-xl flex items-center title" style={{ gap: '10px', color: currentTheme.color }} onClick={handleQuizOpen}>
                <MdQuiz size={'25px'} className='icon' />
                Take a Quiz</Link></div>
            </div>
        </div>

        {quizOpen && (
            <QuizComponent open={quizOpen} onClose={handleQuizClose} />
        )}

        {modalOpen && (
            <CalendarComponent
                open={modalOpen}
                onClose={handleModalToggle}
            />
        )}
        
        {open && (
            <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Avatar</h2>
                {/* shape */}
                <div className="form-group">
                <label>
                    <input
                    type="radio"
                    name="shape"
                    value="circle"
                    checked={avatarProps.shape === "circle"}
                    onChange={handleChange("shape")}
                    />
                    Circle
                </label>
                <label>
                    <input
                    type="radio"
                    name="shape"
                    value="square"
                    checked={avatarProps.shape === "square"}
                    onChange={handleChange("shape")}
                    />
                    Square
                </label>
                </div>

                {/* color */}
                <div className="form-group-color">
                <label>Color</label>
                    <div className="color-picker-popover">
                    <div className="color-picker-cover"  />
                    <SketchPicker color={avatarProps.color} onChange={handleColorChange} />
                    </div>
                </div>

                {/* text */}
                <div className="form-group">
                <label>Text</label>
                <input
                    type="text"
                    value={avatarProps.text}
                    onChange={handleChange("text")}
                />
                </div>

                {/* buttons */}
                <div className="modal-actions">
                <button className="login-button" onClick={handleClose}>
                    Cancel
                </button>
                <button className="login-button" onClick={handleSave}>
                    Save
                </button>
                </div>
            </div>
            </div>
        )}
    </div>
  );
}

export default UserProfile;
  
  