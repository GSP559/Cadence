import Controls from '../Controls/Controls'; 
import './style.css'; // Make sure to create a MusicCard.css file for your styles

const SquareDisplay = () => {
  return (
    <div className="user-card">
      <div className="image-container">
        <img src="https://c.animaapp.com/2zr75fnR/img/rectangle-17.png" alt="Person enjoying music" className="music-image" />
      </div>
      <div className="overlay">
         <Controls />
      </div>
    </div>
  );
};

export default SquareDisplay;
