import React from "react";
import Nav from "./Nav/Nav";
import logog from "../../assets/logo.webp";
import username from "../../assets/buutons/username.svg";
import jopinname from "../../assets/buutons/user-registration.webp";
import sports from "../../assets/buutons/sports.gif";
import inplay from "../../assets/buutons/in-play.gif";
import liveCasino from "../../assets/buutons/live-casino.gif";
import slots from "../../assets/buutons/slots.gif";
import virtual from "../../assets/buutons/virtual.webp";
import poker from "../../assets/buutons/poker.gif";
import aviator from "../../assets/buutons/aviator.webp";
import zeppelin from "../../assets/buutons/zeppelin.webp";
import spacemen from "../../assets/buutons/spaceman.webp";
import tombala from "../../assets/buutons/tombala.webp";
import othergames from "../../assets/buutons/other-games.gif";
import promotions from "../../assets/buutons/promo.webp";
import "./Header.scss";

const arrImg = [
  {
    img: sports,
    titlle: "Sports",
    id: 1,
  },
  {
    img: inplay,
    titlle: "In Play",
    id: 2,
  },
  {
    img: liveCasino,
    titlle: "Live Casino",
    id: 3,
  },
  {
    img: slots,
    titlle: "3D Slots",
    id: 4,
  },
  {
    img: virtual,
    titlle: "Virtual Sports",
    id: 5,
  },
  {
    img: poker,
    titlle: "Blackjack",
    id: 6,
  },
  {
    img: aviator,
    titlle: "Aviator",
    id: 7,
  },
  {
    img: zeppelin,
    titlle: "Zeppelin",
    id: 8,
  },
  {
    img: spacemen,
    titlle: "Spacemen",
    id: 9,
  },
  {
    img: tombala,
    titlle: "Tombala",
    id: 10,
  },
  {
    img: othergames,
    titlle: "Other Games",
    id: 11,
  },
  {
    img: promotions,
    titlle: "Promotions",
    id: 12,
  },
];

const Header = () => {
  return (
    <div className="container_header">
      <Nav />
      <div className="content_main_header">
        <div className="wrapper_content">
          <div className="logotip">
            <div className="logo">
              <img src={logog} alt="logo" />
            </div>
            <div className="buttons">
              <div className="username">
                <div className="user_img">
                  <img src={username} alt="user" />
                </div>
                <input type="text" value="username" />
              </div>
              <div className="password">
                <input type="text" value="password" />
                <div className="pass_icon">
                  <span>?</span>
                </div>
              </div>
              <div className="login">
                <span>Login</span>
              </div>
              <p className="or">Or</p>
              <div className="joinnow">
                <img src={jopinname} alt="" />
                <p>JOIN NOW</p>
              </div>
            </div>
          </div>
          <div className="interface">
            <ul>
              {arrImg.map((item) => (
                <li className={item.id > 1 ? "list " : null}>
                  <a href="#">
                    <img src={item.img} alt={item.titlle} />
                    <span>{item.titlle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
