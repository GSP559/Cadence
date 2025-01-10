import './style.css'; // Make sure to create a Controls.css file for your styles

const Controls = ({ onNextUser, onPrevUser, onHeartUser }) => {
    return (
        <div className="controls">
            <button className="control-btn" onClick={onPrevUser}>⏪</button>
            <button className="control-btn love" onClick={onHeartUser}>❤️</button>
            <button className="control-btn" onClick={onNextUser}>⏩</button>
        </div>
    );
};

//<img className="heart" alt="Red" src="/red-304570-640-1@2x.png" />

export default Controls;
