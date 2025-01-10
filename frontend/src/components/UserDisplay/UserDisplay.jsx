import React, { useState, useEffect } from 'react';
import Controls from '../Controls/Controls'; 
import ChatBox from '../ChatBox/ChatBox';
import NextSVGButton from '../../components/NextPicture/NextPicture';
import PrevSVGButton from '../../components/PrevPicture/PrevPicture';
import { useNavigate } from 'react-router-dom';
import "./style.css";

export default function SquareDisplay({ userData, isChatActiveState, clickedUserProp }) {
    const [similarUsers, setSimilarUsers] = useState([]);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [currentPictures, setCurrentPictures] = useState([]);
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
    const [currentGenres, setCurrentGenres] = useState([]);
    const [isChatActive, setIsChatActive] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [clickedUser, setClickedUser] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (userData && userData.similarUsers) {
            setSimilarUsers(userData.similarUsers);
        }
    }, [userData]);

    useEffect(() => {
        setIsChatActive(isChatActiveState);
        setClickedUser(clickedUserProp);

        // Update the user index only when a user is clicked and chat is activated
        if (isChatActiveState && clickedUserProp) {
            const index = similarUsers.findIndex(user => user.username === clickedUserProp.username);
            if (index !== -1) {
                setCurrentUserIndex(index);  // Ensure this user is set immediately when clicking
                fetchMessagesAndOtherUser(clickedUserProp.username);
            }
        }
    }, [isChatActiveState, clickedUserProp, similarUsers]);

    useEffect(() => {
        // Load data related to the current user index
        if (similarUsers[currentUserIndex]) {
            const user = similarUsers[currentUserIndex];
            const userPictures = user.profilePic || default_pictures;
            const userGenres = user.topGenre;
            setCurrentPictures(userPictures);
            setCurrentGenres(userGenres);
            setCurrentPictureIndex(0);
        }
    }, [currentUserIndex, similarUsers]);

    if (!userData || !userData.similarUsers) {
        return null; // or return null;
    }

    const fetchMessagesAndOtherUser = async (currentlyChattingWith) => {
        try {
            const response = await fetch(`http://localhost:5501/message?otheruser=${currentlyChattingWith}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (response.ok) {
                // Set state related to chat data, other user details, etc.
                console.log('Chats:', data.chats);
                setChatMessages(data.chats);
            } else {
                throw new Error('Failed to fetch messages');
            }
        } catch (error) {
            console.error("Error retrieving messages:", error);
        }
    };

    //console.log("similarUsers:", similarUsers);
    //console.log("currentGenres", currentGenres);
    console.log("Clicked user in userdisplay:", clickedUser);

    const default_pictures = [
        'https://c.animaapp.com/I2nDhD6p/img/rectangle-17.png',
        'https://c.animaapp.com/I2nDhD6p/img/ellipse-8@2x.png',
        'https://c.animaapp.com/I2nDhD6p/img/ellipse-10@2x.png',
    ];

    const pictures = userData?.profilePic || default_pictures;

    const handleNextUser = () => {
        console.log("Next button clicked!");
        console.log("currentUser:", similarUsers[currentUserIndex], "Index:", currentUserIndex);
        if (currentUserIndex < similarUsers.length - 1) {
            setCurrentUserIndex(currentUserIndex + 1);
        }
    };

    const handlePrevUser = () => {
        console.log("Prev button clicked!");
        console.log("currentUser:", similarUsers[currentUserIndex], "Index:", currentUserIndex);
        if (currentUserIndex > 0) {
            setCurrentUserIndex(currentUserIndex - 1);
        }
    };

    console.log("Chats later:", chatMessages);


    //console.log("profilePic:", userData?.proflePic)

    const handleClick = (event) => {
        const { clientX, currentTarget } = event;
        const { left, width } = currentTarget.getBoundingClientRect();
        const half = width / 2;
        const isLeftSide = clientX - left < half;

        if ((isLeftSide && currentPictureIndex === 0) || (!isLeftSide && currentPictureIndex === pictures.length - 1)) {
            triggerShake();
            return; // Prevent navigation if it's an invalid direction
        }

        if (isLeftSide) {
            handlePrevButtonClick();
        } else {
            handleNextButtonClick();
        }
    };

    const triggerShake = () => {
        setIsShaking(true);
        setTimeout(() => {
            setIsShaking(false);
        }, 500); // Ensure this matches the duration of the animation
    };

    const handlePrevButtonClick = (event) => {
        if (currentPictureIndex > 0) {
            setCurrentPictureIndex(currentPictureIndex - 1);
        }
    };

    const handleNextButtonClick = (event) => {
        if (currentPictureIndex < pictures.length - 1) {
            setCurrentPictureIndex(currentPictureIndex + 1);
        }
    };

    const handleHeartButtonClick = async (event) => {
        const likedUserId = similarUsers[currentUserIndex].username;
        console.log("likedUserId:", likedUserId);

        const url = '/dashboard';
        const payload = {
            otherUserUsername: likedUserId, // Ensure this is a string and not an object
            likedUser: true,
        };

        console.log("Payload:", payload);

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log("Liked user!");
            } else {
                const errorMsg = await response.text();
                console.error("Failed to create account", errorMsg);
            }
        } catch (error) {
            console.error("Error making the PUT request:", error);
        }
    };

    const handleEditInfoClick = () => {
        navigate('/profile/edit');
        console.log("Navigating to Edit Info");
    };

    return (
        <div className="userdisplay">
            <div className="userdiplay-wrapper">
                <div className="userdisplay-overlap">
                    <div className="userdisplay-group">
                        <div className='ProfileViewBackground'>
                            <div className='NameBackGround'></div>
                            <div className='text-wrapper'>{similarUsers[currentUserIndex]?.username || "Matthew"}, {similarUsers[currentUserIndex]?.age || "32"}</div>

                            {isChatActive ? (
                                <ChatBox
                                    messages={[
                                        { chatMessage: "Test message", sentBy: "Joshua" },
                                        { chatMessage: "hey!", sentBy: "Simon" }
                                    ]}
                                    onSendMessage={() => {}}
                                    currentUser={userData.username}
                                />
                            ) : (
                                    <>
                                        <img className="ProfilePicture1" alt="Profile" src={currentPictures[currentPictureIndex]} />
                                        {currentPictureIndex > 0 && (
                                            <button className="prev-button" onClick={() => setCurrentPictureIndex(currentPictureIndex - 1)} aria-label="Previous">
                                                <PrevSVGButton />
                                            </button>
                                        )}
                                        {currentPictureIndex < currentPictures.length - 1 && (
                                            <button className="next-button" onClick={() => setCurrentPictureIndex(currentPictureIndex + 1)} aria-label="Next">
                                                <NextSVGButton />
                                            </button>
                                        )}
                                        <div className="controls">
                                            <Controls onNextUser={handleNextUser} onPrevUser={handlePrevUser} onHeartUser={handleHeartButtonClick} />
                                        </div>
                                    </>
                                )}
                        </div>
                        <div className="PhoneFrame">
                            <div className="PhoneBackGround">
                                <button className="edit-info-button" onClick={handleEditInfoClick}>
                                    Edit Info
                                </button>
                            </div>
                            <div className="frame">
                                <div className="BioFrame">
                                    <div className="BioBackGround" />
                                    <div className="BioTitle">About me</div>
                                    <p className="Bio">
                                        {similarUsers[currentUserIndex]?.aboutMe}
                                    </p>
                                </div>
                                <div className="GenreBox">
                                    <div className="GenreTitle">Favorite Genres</div>
                                    {currentGenres.map((genre, index) => (
                                        <div key={index} className={`GenreOutline`}>
                                            <div className={`GenreName`}>{genre}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

