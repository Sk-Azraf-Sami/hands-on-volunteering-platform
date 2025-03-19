import React from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Header = () => {
    return (
        <>
            <style>
                {`
          #hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(15, 21, 37, .8);
            z-index: -1;
          }
          .buttonStyle {
            font-family: inherit;
            font-size: 18px;
            color: white;
            padding: 0.7em 1em;
            padding-left: 0.9em;
            display: flex;
            align-items: center;
            border: none;
            border-radius: 16px;
            overflow: hidden;
            transition: all 0.2s;
            cursor: pointer;
          }
          .buttonStyle span {
            display: block;
            margin-left: 0.3em;
            transition: all 0.3s ease-in-out;
          }
          .buttonStyle i {
            display: block;
            transform-origin: center center;
            transition: transform 0.3s ease-in-out;
          }
          .buttonStyle:hover .svg-wrapper {
            animation: fly-1 0.6s ease-in-out infinite alternate;
          }
          .buttonStyle:hover i {
            transform: translateX(3rem) rotate(30deg) scale(1.5);
          }
          .buttonStyle:hover span {
            transform: translateX(50em);
          }
          .buttonStyle:active {
            transform: scale(0.95);
          }
          .join {
            background-color: royalblue;
          }
          .req {
            background-color: var(--bs-danger);
          }
          .link-style {
            text-decoration: none;
          }
          @keyframes fly-1 {
            from {
              transform: translateY(0.1em);
            }
            to {
              transform: translateY(-0.1em);
            }
          }
          .heading {
            font-size: 2.875rem;
            font-weight: 700;
            max-width: 80%;
            line-height: 1.2;
          }
          /* Media query for mobile view */
          @media (max-width: 500px) {
            .buttonStyle {
              font-size: 14px;
              padding: 0.5em 0.8em;
            }
            .heading {
              font-size: 2rem;
              font-weight: 700;
              max-width: 80%;
              line-height: 1.2;
            }
          }
        `}
            </style>
            <section id="hero" style={styles.hero}>
                <div style={styles.container}>
                    <video autoPlay muted loop style={styles.video}>
                        <source src="videos/video-1@c.mp4" type="video/mp4" />
                        <source src="videos/video-1@c.webm" type="video/webm" />
                    </video>

                    <h1 className="heading">
                        At{" "}
                        <span style={styles.highlight}>
                            HandsOn Volunteering Platform
                        </span>
                        , Bringing people together to create meaningful change, one act of kindness at a time. Join us in making a lasting impact on communities worldwide!
                    </h1>
                    <div style={styles.divButtonStyle}>
                        <Link to="/login" className="text-decoration-none">
                            <button className="buttonStyle join">
                                <div className="svg-wrapper-1">
                                    <div className="svg-wrapper">
                                        <i className="fas fa-hands-helping"></i>
                                    </div>
                                </div>
                                <span className="link-style">JOIN NOW</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

const styles = {
    hero: {
        Height: "60%",
        color: "white",
        position: "relative",
    },
    container: {
        width: "80%",
        margin: "0 auto",
        height: "100%",
        padding: "4rem 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    video: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -2,
    },
    highlight: {
        color: "#FFBF1A",
    },
    divButtonStyle: {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
    },
};

export default Header;