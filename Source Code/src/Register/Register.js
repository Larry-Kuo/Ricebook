import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userID: 11,
        accountName: '',
        displayName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        zipcode: '',
        password: '',
        passwordConfirmation: '/images/profile-icon-11.png',
        profileImage: '',
        dailyStatus: 'I am feeling good',
    });

    const [loginData, setLoginData] = useState({
        userName: '',
        password: '',
    });

    const [users, setUsers] = useState([]);

    // Fetch users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                const usersWithProfileData = data.map(user => ({
                    userID: user.id,
                    accountName: user.name,
                    displayName: user.username,
                    email: user.email,
                    phone: user.phone,
                    zipcode: user.address.zipcode,
                    password: user.address.street,
                    profileImage: '/images/profile-icon-' + user.id + '.png', 
                }));
                setUsers(usersWithProfileData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const validation = () => {
        let msg = '';
        const nameRegex = /^[a-zA-Z][ a-zA-Z0-9]+$/;
        if (!nameRegex.test(formData.accountName)) {
            msg += 'Incorrect Account Name Format: starts with alphabets and follows with numerics.\n';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            msg += 'Incorrect Email Format: yourmail@aaa.bbb.\n';
        }

        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(formData.phone)) {
            msg += 'Incorrect Phone Format: only digits.\n';
        }

        const dateOfBirth = new Date(formData.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dateOfBirth.getFullYear();
        const month = today.getMonth() - dateOfBirth.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
            age--;
        }
        if (age < 18) {
            msg += 'No registration under age of 18.\n';
        }

        const zipcodeRegex = /^\d{5}$/;
        if (!zipcodeRegex.test(formData.zipcode)) {
            msg += 'Incorrect Zipcode format: 5 digits.\n';
        }

        if (formData.password !== formData.passwordConfirmation) {
            msg += 'Incorrect Password: confirmation does not match.\n';
        }

        if (msg !== '') {
            alert(msg);
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) {
            console.log('Registration form submitted successfully', formData);
            console.log(formData.profileImage);
            navigate('/main', { state: { userData: formData } });
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const user = users.find(user => user.displayName === loginData.userName);
        if (user && user.password === loginData.password) {
            navigate('/main', { state: { userData: user } });
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div>
            <div className="banner">
                <a className="logo">RiceBook</a>
            </div>
            <div className="form-container">
                <div className="column">
                    <h1>Register</h1>
                    <form name="registration-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="account-name" className="required">Account Name</label>
                            <input id="account-name" name="accountName" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="display-name">Display Name</label>
                            <input id="display-name" name="displayName" onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email" className="required">Email Address</label>
                            <input id="email" name="email" placeholder="aaa@bbb.ccc" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone" className="required">Phone Number</label>
                            <input id="phone" name="phone" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="date-of-birth" className="required">Date of Birth</label>
                            <input id="date-of-birth" name="dateOfBirth" type="date" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="zipcode" className="required">Zipcode</label>
                            <input id="zipcode" name="zipcode" placeholder="77005" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password" className="required">Password</label>
                            <input id="password" name="password" type="password" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password-confirmation" className="required">Confirmation</label>
                            <input id="password-confirmation" name="passwordConfirmation" type="password" required onChange={handleChange} />
                        </div>
                        <div className="buttons-group">
                            <input type="submit" id="submit" value="Register" />
                            <input type="reset" id="reset" value="Reset" />
                        </div>
                    </form>
                </div>
                <div className="column">
                    <h1>Login</h1>
                    <form name="login-form" onSubmit={handleLoginSubmit}>
                        <div className="input-group">
                            <label htmlFor="username" className="required">User Name</label>
                            <input id="username" name="userName" required onChange={handleLoginChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="login-password" className="required">Password</label>
                            <input id="login-password" name="password" type="password" required onChange={handleLoginChange} />
                        </div>
                        <div className="buttons-group">
                            <input type="submit" id="login-submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;