import React, { useState, useEffect } from "react";
import "../styles/Modal.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <div className="modal-content">
          <div className="modal-form">
            <button className="back-button">Back</button>
            <div className="auth-options">
              <button
                className={`signup-btn ${isSignUp ? "active" : ""}`}
                onClick={() => setIsSignUp(true)}
              >
                Sign up
              </button>
              <button
                className={`login-btn ${!isSignUp ? "active" : ""}`}
                onClick={() => setIsSignUp(false)}
              >
                Log In
              </button>
            </div>
            {isSignUp ? (
              <div className="signup-view">
                <h3>Register with your Email</h3>
                <form>
                  <input type="email" placeholder="Email" required />
                  <button className="continue-btn" type="submit">
                    Register with your Email
                  </button>
                </form>
              </div>
            ) : (
              <div className="login-view">
                <h3>We love having you back</h3>
                <form>
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <button className="continue-btn" type="submit">
                    Continue
                  </button>
                </form>
              </div>
            )}
            <p>For any questions, reach out to support@Quickbetmovies.com</p>
          </div>
          <div className="modal-welcome">
            {isSignUp ? (
              <>
                <h2>Welcome to Quickbet Movies!</h2>
                <p>
                  🍿 Ready to unlock a universe of cinematic delights? Sign up
                  now and start your journey with us!
                </p>
                <img
                  src="/yellow-hoodie-character.png"
                  alt="Character Image"
                  style={{ width: "100%" }}
                />
              </>
            ) : (
              <>
                <h2>Welcome back to Quickbet Movies!</h2>
                <p>
                  🍿 Ready to dive into the world of unlimited entertainment?
                  Enter your credentials and let the cinematic adventure begin!
                </p>
                <img
                  src="/02.png"
                  alt="Character Image"
                  style={{ width: "100%" }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
