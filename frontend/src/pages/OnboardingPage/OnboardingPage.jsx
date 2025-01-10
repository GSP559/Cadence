import React, { useState, useEffect } from 'react';
import "./style.css";
import GenderSelection from "../../components/Gender/GenderSelection";
import AudienceSelection from '../../components/ShowMe/showme';
import GenresPopup from '../../components/Genres/GenresPopup';
import ProfilePictureUploader from '../../components/ProfilePictureUploader/ProfilePictureUploader';
import NavigateToLandingButton from '../../components/NavToLanding/NavToLanding';
import { useNavigate } from 'react-router-dom';

export default function OnboardingPage () {
    const navigate = useNavigate();

    const [images, setImages] = useState([null, null, null]); // for three placeholders
    const [selectedImage, setSelectedImage] = useState(null);
    const [someValue, setSomeValue] = useState(''); // Initialize it with an empty string or any default value
    const [firstName, setFirstName] = useState('');
    const [gender, setGender] = useState('');
    const [audience, setAudience] = useState('');
    const [genre, setGenre] = useState([]);
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [location, setLocation] = useState('');
    const [aboutMe, setAboutMe] = useState('');

    // Function to handle the navigation
    const navigateToDashboard = () => {
        navigate('/dashboard'); // The '/dashboard' is the path you want to navigate to
    };


    const handleCreateAccount = async () => {
        const age = calculateAge(birthYear, birthMonth, birthDay);

        const formData = new FormData();
        images.forEach((image, index) => {
            if (image) {
                formData.append('avatars', image); // Use the same field name for all images
            }
        });

        // Append other form data
        formData.append('firstname', firstName);
        genre.forEach(g => formData.append('topGenre', g));
        formData.append('sex', gender);
        formData.append('sexualPreference', audience);
        formData.append('age', age.toString());
        formData.append('location', location);
        formData.append('aboutMe', aboutMe);

        const url = '/onboarding';
        try {
            console.log(formData);
            const response = await fetch(url, {
                method: 'PUT', // Using PUT since we are updating an existing record
                body: formData, // Send formData
                // Do NOT set 'Content-Type' here; let the browser set it
            });

            if (response.ok) {
                console.log("Account updated successfully");
                navigateToDashboard();
            } else {
                const errorResponse = await response.text();
                console.error("Failed to update account", errorResponse);
            }
        } catch (error) {
            console.error("Error making the PUT request:", error);
        }
    };

    const fetchLocation = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (!response.ok) throw new Error('Failed to fetch location data');

            const data = await response.json();
            setLocation(data.city);  // Storing just the city name
        } catch (error) {
            console.error("Error fetching location data:", error);
            // You can set a default city or handle the error as you see fit
        }
    };

    const calculateAge = (year, month, day) => {
        const today = new Date();
        const birthDate = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handlePictureSelected = (file, index) => {
        //const fileUrl = URL.createObjectURL(file);
        //setImages(images.map((img, i) => (i === index ? fileUrl : img)));
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages); // Now 'images' will store File objects instead of URLs
    };

    // Your handleInputChange function (if needed)
    const handleInputChange = (event) => {
        setSomeValue(event.target.value);

    };

    const handleGenderSelect = (gender) => {
        console.log('Selected gender:', gender);
        // You can handle the selected gender here, such as setting state or making API calls
        setGender(gender);
        setIsPopupVisible(false);
    };
    const handleAudienceSelect = (audience) => {
        setAudience(audience);
        console.log(audience); // Or update the state, etc.
    };
    const handleGenresSelect = (selectedGenres) => {
        console.log('Selected genres:', selectedGenres);
        setGenre(selectedGenres);
        // Do something with the selected genres
        handleClosePopup(); // Call the function to close the popup
    };
    const genresList = ['Pop', 'Rock', 'Jazz', 'Blues', 'Hip-Hop', 'Country', 'EDM', 'Classical', 'Reggae', 'R&B', 'Punk', 'Metal', 'Alternative', 'Soul', 'Indie Rock'];

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const onClose = () => {
        // Logic to close the popup, typically setting a state variable
        setIsPopupVisible(false);
    };
    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    return (
        <div className="registration">
            <div className="overlap-group-wrapper">
                <div className="overlap-group">
                    <div className="box"></div>         
                    <img className="vector" src="OnboardingSVG.svg" />
                    <img className="img" src="OnboardingSVG2.svg" />
                    <div className="show-me-title">Show me</div>
                    <AudienceSelection onSelect={handleAudienceSelect} />

                    <div className="music-genres-title">Music Genres</div>
                    <button className="genres-button" onClick={() => setIsPopupVisible(true)}>+ Genres</button>
                    {isPopupVisible && (
                        <GenresPopup
                            className="genres-button"
                            genres={genresList}
                            onSelect={handleGenresSelect}
                            onClose={() => setIsPopupVisible(false)}
                        />
                    )}



                    <div className="gender-title">Gender</div>
                    <GenderSelection className="gender-selection" onSelect={handleGenderSelect} />

                    <div className="top-half-box" />
                    <div className="profile-picture">Profile Pictures</div>
                    <div className="birthday-text-box">
                        <input
                            type="text"
                            id="YearInput"
                            className="YearTextBox"
                            placeholder="YYYY"
                            name="Year"
                            style={{
                                width: '90px', // Set the width as desired
                                height: '35px', // Set the height as desired
                                padding: '10px', // Set the padding as desired
                                fontSize: '16px' // Set the font size as desired
                            }}
                            onChange={e => setBirthYear(e.target.value)}
                            // ...other props like value, onChange
                        />
                    </div>
                    <div className="birthday-text-box-MM">
                        <input
                            type="text"
                            id="MonthInput"
                            className="MonthTextBox"
                            placeholder="MM"
                            name="Month"
                            style={{
                                width: '90px', // Set the width as desired
                                height: '35px', // Set the height as desired
                                padding: '10px', // Set the padding as desired
                                fontSize: '16px' // Set the font size as desired
                            }}
                            onChange={e => setBirthMonth(e.target.value)}
                            // ...other props like value, onChange
                        />
                    </div>
                    <div className="birthday-text-box-DD">
                        <input
                            type="text"
                            id="DayInput"
                            className="DayTextBox"
                            placeholder="DD"
                            name="Day"
                            style={{
                                width: '90px', // Set the width as desired
                                height: '35px', // Set the height as desired
                                padding: '10px', // Set the padding as desired
                                fontSize: '16px' // Set the font size as desired
                            }}
                            onChange={e => setBirthDay(e.target.value)}
                            // ...other props like value, onChange
                        />          
                    </div>
                    <div className="birthday-title">Birthday</div>
                    <div className="email-address-text">
                        <input
                            type="text"
                            id="email"
                            className="text-wrapper"
                            placeholder="Email Address"
                            name="email"
                            // ...other props like value, onChange
                        />
                    </div>
                    <div className="email-address-title">Email Address</div>
                    <div className="first-name-text-box">

                        <input
                            type="text"
                            id="firstname"
                            className="text-wrapper"
                            placeholder="First Name"
                            name="firstName"
                            onChange={e => setFirstName(e.target.value)}
                            // ...other props like value, onChange
                        />


                    </div>
                    <div className="cadence-title">cadence</div>
                    <img className="cadence-logo" alt="Cadence logo" src="untitled-1-recovered-1@2x.png" />
                    <img className="vector-2" alt="Vector" src="OnboardingSVG2.svg" />
                    <div className="create-button" onClick={handleCreateAccount}>
                        Create Account
                    </div>
                    <div className="first-name-title">First Name</div>




                    <div className="first-name-title">First Name</div>

                    <div style={{ position: 'absolute', left: '799px', top: '195px' }}>
                    </div>

                    <div style={{ position: 'absolute', left: '949px', top: '195px' }}>
                    </div>

                    <div style={{ position: 'absolute', left: '1099px', top: '195px' }}>
                    </div>

                    {selectedImage && <img src={selectedImage} alt="Selected Profile" />}

                    {images.map((image, index) => (
                        <div key={index} style={{ position: 'absolute', left: `${799 + 150 * index}px`, top: '195px' }}>
                            <ProfilePictureUploader 
                                onPictureSelected={(file) => handlePictureSelected(file, index)}
                                uploadedImageUrl={image} 
                                index={index} // Pass index here
                            />
                        </div>
                    ))}

                    <div className="about-me-frame">
                        <div className="about-me-title">About Me</div>
                        <textarea
                            className="about-me-textarea"
                            placeholder="Tell us something about yourself..."
                            value={aboutMe}
                            onChange={e => setAboutMe(e.target.value)}
                            style={{
                                width: '300px', // Set width as needed
                                height: '100px', // Set height as needed
                                padding: '10px', // Set padding as needed
                                fontSize: '16px' // Set font size as needed
                            }}
                        ></textarea>
                    </div>

                </div>
            </div>
        </div>
    );
};
