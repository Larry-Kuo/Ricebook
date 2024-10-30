import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style.css';

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state?.userData || {};

    const [formData, setFormData] = useState({
        userID: userData.userID || 11,
        accountName: userData.accountName || 'Default Account',
        displayName: userData.displayName || 'Default Display Name',
        email: userData.email || 'default@example.com',
        phone: userData.phone || '',
        zipcode: userData.zipcode || '',
        password: '********',
        dateOfBirth: userData.dateOfBirth || '',
        profileImage: userData.profileImage || '/images/profile-icon-11.png',
        dailyStatus: 'I am feeling good',
        successMessage: '',
        errorMessage: '',
    });
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData(prevState => ({
                ...prevState,
                profileImage: imageUrl
            }));
        }
    };
    
    const triggerFileInput = () => {
        document.getElementById('file-upload').click();
    };
    const handleNavigate = () => {
        navigate('/main', { state: { userData: formData } });
    };

    const update = () => {
        let errmsg = '';
        let successmsg = '';

        const newDisplayName = document.getElementById('new-display-name').value;
        const newEmail = document.getElementById('new-email').value;
        const newPhone = document.getElementById('new-phone').value;
        const newZipcode = document.getElementById('new-zipcode').value;
        const newPassword = document.getElementById('new-password').value;
        const passwordConfirmation = document.getElementById('password-confirmation').value;

        if (newDisplayName !== '') {
            successmsg += `Successfully Updated Display Name from ${formData.displayName} to ${newDisplayName}.<br>`;
            setFormData((prevState) => ({ ...prevState, displayName: newDisplayName }));
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (newEmail !== '') {
            if (!emailRegex.test(newEmail)) {
                errmsg += 'Incorrect Email Format: yourmail@aaa.bbb.<br>';
            } else {
                successmsg += `Successfully Updated Email from ${formData.email} to ${newEmail}.<br>`;
                setFormData((prevState) => ({ ...prevState, email: newEmail }));
            }
        }

        const phoneRegex = /^\d+$/;
        if (newPhone !== '') {
            if (!phoneRegex.test(newPhone)) {
                errmsg += 'Incorrect Phone Format: only digits.<br>';
            } else {
                successmsg += `Successfully Updated Phone from ${formData.phone} to ${newPhone}.<br>`;
                setFormData((prevState) => ({ ...prevState, phone: newPhone }));
            }
        }

        const zipcodeRegex = /^\d{5}$/;
        if (newZipcode !== '') {
            if (!zipcodeRegex.test(newZipcode)) {
                errmsg += 'Incorrect Zipcode format: 5 digits.<br>';
            } else {
                successmsg += `Successfully Updated Zipcode from ${formData.zipcode} to ${newZipcode}.<br>`;
                setFormData((prevState) => ({ ...prevState, zipcode: newZipcode }));
            }
        }

        if (newPassword !== '' || passwordConfirmation !== '') {
            if (newPassword !== passwordConfirmation) {
                errmsg += 'Incorrect Password: confirmation does not match.<br>';
            } else {
                successmsg += 'Successfully Updated Password.<br>';
                setFormData((prevState) => ({ ...prevState, password: '*'.repeat(newPassword.length) }));
            }
        }

        document.querySelectorAll('input').forEach((input) => {
            if (input.type === 'text' || input.type === 'password') {
                input.value = '';
            }
        });

        setFormData((prevState) => ({
            ...prevState,
            errorMessage: errmsg,
            successMessage: successmsg,
        }));
    };

    return (
    <div>
        <div className="banner">
            <a className="logo">RiceBook</a>
            <a href="register">Logout</a>
            <a href="main" onClick={handleNavigate}>Feed</a>
            <a className="active">Profile</a>
        </div>
        <div className="profile-container">
            <div className={`row ${formData.successMessage ? '' : 'hidden'}`}>
                <div className="column success message" id="success-message">
                    <p dangerouslySetInnerHTML={{ __html: formData.successMessage }}></p>
                </div>
            </div>
            <div className={`row ${formData.errorMessage ? '' : 'hidden'}`}>
                <div className="column error message" id="error-message">
                    <p dangerouslySetInnerHTML={{ __html: formData.errorMessage }}></p>
                </div>
            </div>

            <div className="row" style={{ minWidth: '550px' }}>
                <div className="column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        src={formData.profileImage}
                        alt="Profile"
                        className="profile-image"
                    />
                    <input 
                        type="file" 
                        id="file-upload" 
                        style={{ display: 'none' }} 
                        onChange={handleFileChange} 
                    />
                    <button onClick={triggerFileInput} style={{ marginTop: '10px' }}>
                        Upload
                    </button>
                </div>
            </div>

            <div className="row" style={{ minWidth: '550px' }}>
                <div className="column">
                    <div className="input-group">
                        <label htmlFor="new-account-name">Account Name</label>
                        <p>{formData.accountName}</p>
                        <input id="new-account-name" className="invisible" disabled />
                    </div>
                    <div className="input-group">
                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <p>{formData.dateOfBirth}</p>
                        <input id="date-of-birth" type="date" className="invisible" disabled />
                    </div>
                    <div className="input-group">
                        <label htmlFor="new-display-name">Display Name</label>
                        <p id="display-name">{formData.displayName}</p>
                        <input id="new-display-name" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="new-email">Email Address</label>
                        <p id="email">{formData.email}</p>
                        <input id="new-email" placeholder="aaa@bbb.ccc" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="new-phone">Phone Number</label>
                        <p id="phone">{formData.phone}</p>
                        <input id="new-phone" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="new-zipcode">Zipcode</label>
                        <p id="zipcode">{formData.zipcode}</p>
                        <input id="new-zipcode" placeholder="77005" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="new-password">Password</label>
                        <p id="password">{formData.password}</p>
                        <input id="new-password" type="password" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password-confirmation">Confirmation</label>
                        <input id="password-confirmation" type="password" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button type="button" onClick={update}>
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Profile;
