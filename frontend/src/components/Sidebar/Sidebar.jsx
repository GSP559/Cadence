import './style.css';
import React from 'react';

const Sidebar = ({ possibleMatches, onUserClick }) => {
    const matchedUsers = possibleMatches?.matchedUsers || [];
    const similarUsers = possibleMatches?.similarUsers || [];
    
    const getMatchingUserDetails = () => {
        const matchedUsernames = new Set(matchedUsers);
        return similarUsers.filter(user => matchedUsernames.has(user.username));
    };

    const matchingUsersDetails = getMatchingUserDetails();
    console.log("Matched user details:", matchingUsersDetails);

    const defaultImage = "uploads/default.jpeg"; 

    return (
        <div className="sidebar">
            {matchingUsersDetails.map((user, index) => (
                <div key={index} className="user">
                    <img src={(user.profilePic && user.profilePic.length > 0) ? user.profilePic[0] : defaultImage} alt={user.name || "User"} className="avatar" 
                     onClick={() => onUserClick(user)}/>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
