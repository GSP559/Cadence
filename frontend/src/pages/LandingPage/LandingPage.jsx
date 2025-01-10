import React, { useState } from "react";
import ButtonSignin from "../../components/ButtonSignIn/ButtonSignIn";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SignUpComponent from "../../components/SignUpComponent/SignUpComponent";
import SquareDisplay from "../../components/SquareDisplay/SquareDisplay";
import { useNavigate } from "react-router-dom";
import "./style.css";

function SignInOverlay({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}
    >
      <div style={{ textAlign: "center", paddingTop: "20%" }}>
        <SignUpComponent onClose={onClose} text="Sign In" />
      </div>
    </div>
  );
}

function SignUpOverlay({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}
    >
      <div style={{ textAlign: "center", paddingTop: "20%" }}>
        <SignUpComponent onClose={onClose} text="Sign Up" />
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const handleNavigateToOnboarding = () => {
    navigate("/onboarding");
  };

  const [showSignInOverlay, setSignInShowOverlay] = useState(false);
  const [showSignUpOverlay, setSignUpShowOverlay] = useState(false);

  const handleSignInShowOverlay = () => setSignInShowOverlay(true);
  const handleSignInHideOverlay = () => setSignInShowOverlay(false);
  const handleSignUpShowOverlay = () => setSignUpShowOverlay(true);
  const handleSignUpHideOverlay = () => setSignUpShowOverlay(false);

  return (
    <div className="landing">
      <div className="overlap-wrapper">
        {showSignInOverlay && (
          <SignInOverlay onClose={handleSignInHideOverlay} />
        )}
        {showSignUpOverlay && (
          <SignUpOverlay onClose={handleSignUpHideOverlay} />
        )}
        <div className="overlap">
          <div className="group">
            <div className="overlap-group">
              <div className="rectangle" />
              <img className="img" alt="Vector" src="/vector-4.svg" />
              <img className="vector-2" alt="Vector" src="/vector-3.svg" />
              <div className="div" />
              <img className="frame" alt="Frame" src="/frame-1.svg" />
            </div>
          </div>
          <div className="landing-user-card">
            <SquareDisplay />
          </div>
          <div className="text-wrapper-2">cadence</div>
          <img
            className="untitled-recovered"
            alt="Untitled recovered"
            src="/untitled-1-recovered-1@2x.png"
          />
          <button
            className="interactable"
            style={{ background: "none", border: "none", padding: 0 }}
            onClick={handleSignInShowOverlay}
          >
            <ButtonSignin
              className="button-signin-instance"
              vectorStroke="/vector-1--stroke-.svg"
            />
          </button>
          <p className="headline">Single and Ready to Jingle.</p>
          <button
            className="interactable"
            style={{ background: "none", border: "none", padding: 0 }}
            onClick={handleSignUpShowOverlay}
          >
            <PrimaryButton
              className="primary-button-instance"
              text="Sign Up"
              vector="/vector-1--stroke-.svg"
              onClick={handleNavigateToOnboarding}
            />
          </button>
          <img className="vector-3" alt="Vector" src="/vector-1--stroke-.svg" />
        </div>
      </div>
    </div>
  );
}
