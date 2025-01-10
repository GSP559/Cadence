import React, { useState } from 'react';
import "./style.css";
import NextSVGButton from '../../components/NextPicture/NextPicture';
import PrevSVGButton from '../../components/PrevPicture/PrevPicture';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
    const [isShaking, setIsShaking] = useState(false); // State to control the shaking effect

    const pictures = [
        'https://c.animaapp.com/I2nDhD6p/img/rectangle-17.png',
        'https://c.animaapp.com/I2nDhD6p/img/ellipse-8@2x.png',
        'https://c.animaapp.com/I2nDhD6p/img/ellipse-10@2x.png',
    ];

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

    
    const navigate = useNavigate();

const handleEditInfoClick = () => {
    navigate('/profile/edit');
    console.log("Navigating to Edit Info");
};


    return (
        <div className="main-page">
        <div className="overlap-wrapper">
            <div className="overlap">
                <div className="group">
                    <div className={`ProfileViewBackground ${isShaking ? 'shake' : ''}`} onClick={handleClick}>
                        <div className='NameBackGround'></div>
                        <div className='text-wrapper'>Matthew, 32</div>
                        <img className="ProfilePicture1" alt="Profile" src={pictures[currentPictureIndex]} />
                        {currentPictureIndex > 0 && (
                            <button className="prev-button" onClick={handlePrevButtonClick} aria-label="Previous">
                                <PrevSVGButton />
                            </button>
                        )}
                        {currentPictureIndex < pictures.length - 1 && (
                            <button className="next-button" onClick={handleNextButtonClick} aria-label="Next">
                                <NextSVGButton />
                            </button>
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
                                        Passionate about music—every genre speaks to me. From Beethoven to The Beatles, my soul dances to
                                        every beat and melody. Life&#39;s better with tunes.
                                    </p>
                                </div>
                                <div className="GenreBox">
                                    <div className="GenreTitle">Favorite Genres</div>
                                    <div className="Genre1Outline">
                                        <div className="Genre1">Rock</div>
                                    </div>
                                    <div className="Genre2Outline">
                                        <div className="Genre2">Pop</div>
                                    </div>
                                    <div className="Genre3Outline">
                                        <div className="Genre3">Reggae</div>
                                    </div>
                                    <div className="Genre4Outline">
                                        <div className="Genre4">Hip-hop</div>
                                    </div>
                                </div>
                                <img
                                    className="PlaylistImage"
                                    alt="PlaylistImage"
                                    src="https://c.animaapp.com/I2nDhD6p/img/rectangle-29@2x.png"
                                />
                                <div className="AlbumPicture">
                                    <img
                                        className="AlbumImage"
                                        alt="AlbumImage"
                                        src="https://c.animaapp.com/I2nDhD6p/img/ab67616d0000b2735c837cc621c1ec82bf3c81ac-1@2x.png"
                                    />
                                    <div className="ArtistName">Yeezy</div>
                                    <div className="AlbumTitle">Fellas In Paris</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};