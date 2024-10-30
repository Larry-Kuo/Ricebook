import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style.css';

const Main = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state?.userData || {};
    const [dailyStatus, setDailyStatus] = useState(userData.dailyStatus || "I'm feeling good");
    const [followers, setFollowers] = useState([]);
    const [newFollower, setNewFollower] = useState('');
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const authorNames = ['Bret', 'Antonette', 'Samantha', 'Karianne', 'Kamren', 'Leopoldo_Corkery', 'Considine-Lockman', 'Elwyn.Skiles', 'Maxime_Nienow', 'Delphine', 'Moriah.Stanton'];
    const postsToDisplay = searchTerm === '' ? posts : filteredPosts;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                const users = data.map(user => ({
                    userID: user.id,
                    displayName: user.username,
                    profileImage: '/images/profile-icon-' + user.id + '.png', 
                }));

                const newFollowers = [];
                for (let i = 1; i <= 3; i++) {
                    const userID = (userData.userID + i) % 10; 
                    const user = users.find(user => user.userID === userID);
                    if (user) {
                        const followerMessage = {
                            name: user.displayName,
                            dailyStatus: "I'm feeling good",
                            icon: user.profileImage,
                        };
                        newFollowers.push(followerMessage);
                    }
                }

                setFollowers(newFollowers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                const formattedPosts = data.map((post, index) => ({
                    id: post.id,
                    title: post.title,
                    body: post.body,
                    authorId: post.userId,
                    authorName: authorNames[post.userId - 1],
                    image: index % 2 === 0 ? `/images/random-img-${Math.floor(Math.random() * 5) + 1}.jpg` : null,
                }));
                setPosts(formattedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        if(userData.userID !== 11) fetchUsers();
        fetchPosts();
    }, [userData.userID]);

    const handleUpdateClick = (event) => {
        const newStatus = event.target.previousElementSibling.value;
        event.target.previousElementSibling.value = "";
        setDailyStatus(newStatus);
    };

    const handleAddFollower = () => {
        if (newFollower.trim()) {
            let followID;
            do {
                followID = Math.floor(Math.random() * 10) + 1;
            }
            while (followID === userData.userID);

            const url = '/images/profile-icon-' + followID + '.png';

            const followerMessage = {
                name: newFollower,
                dailyStatus: "I'm feeling good",
                icon: url,
            };
            setFollowers([...followers, followerMessage]);
            setNewFollower('');
        }
    };

    const handleUnfollow = (index) => {
        const updatedFollowers = followers.filter((_, i) => i !== index);
        setFollowers(updatedFollowers);
    };

    const handleCancelPost = () => {
        setPostContent('');
    };

    const handlePostContentChange = (e) => {
        setPostContent(e.target.value);
    };

    const handlePost = () => {
        if (postContent.trim()) {
            const newPost = {
                id: posts.length + 1,
                title: postContent,
                body: postContent,
                authorId: userData.userID,
                authorName: userData.displayName || 'Your Name',
            };
            
            setPosts([newPost, ...posts]);
            setPostContent('');
        }
    };
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filtered = posts.filter(post =>
            post.authorName.includes(value) ||
            post.body.includes(value)
        );
        setFilteredPosts(filtered);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
    };
    
    const triggerFileInput = () => {
        document.getElementById('file-upload').click();
    };

    const toProfile = () => {
        navigate('/profile', { state: { userData: userData } });
    };

    return (
        <div>
            <div className="banner">
            <a className="logo">RiceBook</a>
            <a href="register">Logout</a>
            <a className="active">Feed</a>
            <a href="profile" onClick={toProfile}>Profile</a>
            <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
            </div>
        </div>
        </div>

            <div className="container" style={{ display: 'flex' }}>
                <div className="column profile-section" style={{ minWidth: '200px' }}>
                    <div className="profile-image-container">
                        <div className="upper-row" style={{ textAlign: 'center' }}>
                            <img
                                src={userData.profileImage || '/images/profile-icon-11.png'}
                                alt="Profile"
                                className="profile-image"
                            />
                            <h2>{userData.displayName || 'Your Name'}</h2>
                            <p>{dailyStatus}</p>

                            <textarea
                                placeholder="Update your status..."
                            />

                            <button onClick={handleUpdateClick}>
                                Update Status
                            </button>
                        </div>

                        <div className="follows-section">
                            <h2>Follows</h2>
                            <div>
                                {followers.map((follower, index) => (
                                    <div key={index} className="follower-item">
                                        <img src={follower.icon} alt="Follower Icon" />
                                        <div>
                                            <strong>{follower.name}</strong>
                                            <p style={{ fontSize: '14px', margin: '5px' }}>{follower.dailyStatus}</p>
                                        </div>
                                        <button onClick={() => handleUnfollow(index)}>Unfollow</button>
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={newFollower}
                                onChange={(e) => setNewFollower(e.target.value)}
                                placeholder="Add a new follower"
                            />
                            <button onClick={handleAddFollower}>
                                Add Follower
                            </button>
                        </div>
                    </div>
                </div>

                <div className="column feed-section" style={{ minWidth: '400px' }}>
                    <div className='post-section'>
                        <div className="user-header">
                            <img 
                                src={`/images/profile-icon-${userData.userID}.png`} 
                                alt="Author" 
                                className="post-author-image" 
                            />
                        </div>
                        <TextareaAutosize 
                            className='post-input' 
                            placeholder='What are you thinking?' 
                            value={postContent}
                            onChange={handlePostContentChange}
                        />

                        <div className='post-action'>
                            <input 
                                type="file" 
                                id="file-upload" 
                                style={{ display: 'none' }} 
                                onChange={handleFileChange}
                            />
                            <button className="upload-button" onClick={triggerFileInput}>
                                <img 
                                    src="/icons/upload-icon.png" 
                                    alt="Upload" 
                                    className="upload-icon"
                                />
                            </button>
                            <div className="action-buttons">
                                <button onClick={handlePost}>Post</button>
                                <button onClick={handleCancelPost}>Cancel</button>
                            </div>
                        </div>
                    </div>
                    {postsToDisplay.map(post => (
                        <div key={post.id} className="post">
                            <div className="post-header">
                                <img 
                                    src={`/images/profile-icon-${post.authorId}.png`} 
                                    alt="Author" 
                                    className="post-author-image" 
                                />
                                <div className="post-author-info">
                                    <h3 className="post-author-name">{post.authorName}</h3>
                                    <p className="post-timestamp">Just Now</p>
                                </div>
                            </div>
                            {post.image && <img src={post.image} alt="Post" className="post-image" />}
                            <p className="post-body">{post.body}</p>
                            <div className="post-buttons">
                                <img 
                                    src="/icons/comment-icon.png" 
                                    alt="Comment" 
                                    className="post-button-icon" 
                                />
                                <img 
                                    src="/icons/edit-icon.png" 
                                    alt="Edit" 
                                    className="post-button-icon" 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Main;