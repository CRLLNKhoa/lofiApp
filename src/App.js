import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import BookCafe from "./Pages/BookCafe";
import Switch from "./Components/Swicth";
import Music from "./Components/Music";
import Menu from "./Components/Menu";
import Seoul from "./Pages/Seoul";
import { dataSong } from "./dataSong.js";
import Tokyo from "./Pages/Tokyo";
import Chill from "./Pages/Chill";
import Van from "./Pages/Van";
import Cafe from "./Pages/Cafe";
import Honolulu from "./Pages/Honolulu";
import Loading from "./Pages/Loading";
import React, { useEffect } from "react";
import Time from "./Components/Time";
import Outside from "./Pages/Outside";
import InsizeCafe from "./Pages/InsizeCafe";
import TimeOnl from "./Components/TimeOnl";
import { BsGiftFill } from "react-icons/bs";
import ButtonLogin from "./Components/ButtonLogin";
import Respone from "./Pages/Respone";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState(true);
  const [songs, setSongs] = useState(dataSong);
  const chill = dataSong.filter((item) => item.list === "chill");
  const jazz = dataSong.filter((item) => item.list === "jazz");
  const sleepy = dataSong.filter((item) => item.list === "sleepy");
  const [loading, setLoading] = useState(true);
  const [afk, setAfk] = useState(1);
  const [num, setNum] = useState(0);
  const [gift, setGift] = useState(false);
  const [numGift, setNumGift] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setNum(num + 1);
    }, 1000);
    return () => clearTimeout(timer1);
  }, [num]);

  useEffect(() => {
    const timer2 = setTimeout(() => {
      setNumGift(numGift + 1);
      if (numGift > 3600) setGift(true);
      else setGift(false);
    }, 1000);
    return () => clearTimeout(timer2);
  }, [numGift]);

  // Afk mode

  // document.onmousemove = (function() {
  //   var onmousestop = function() {
  //     /* do stuff */
  //     console.log(1)
  //     setAfk(0)
  //   }, thread;

  //   return function() {
  //     clearTimeout(thread);
  //     setAfk(1)
  //     console.log(2)
  //     thread = setTimeout(onmousestop, 30000);
  //   };
  // })();

  const handleClaim = () => {
    setNumGift(numGift - 3600);
  };

  const handleKeyPress = (e) => {
    if (e.key === "h") {
      setAfk(0);
    }
    if (e.key === "h" && afk === 0) {
      setAfk(1);
    }
  };

  document.addEventListener("keydown", handleKeyPress);

  return (
    <Router>
      <div className="App">
        <ThemeContext.Provider
          value={{ theme, setTheme, chill, jazz, sleepy, setSongs, afk }}
        >
          <span onClick={()=> setAfk(0)} style={{ opacity: afk }} className="text">Press the H key on the keyboard to hide/show the interface.</span>
          {/* {afk ? <BsFillEyeSlashFill className="icon" onClick={() => setAfk(0)} /> : <BsFillEyeFill onClick={() => setAfk(1)} className="icon" />} */}
          <Switch afk={afk} />
          <Music afk={afk} listSong={songs} />
          <Menu hidden={afk} />
          <Time afk={afk} />
          <TimeOnl afk={afk} num={num} />
          <ButtonLogin afk={afk} />
          {gift && (
            <BsGiftFill
              onClick={handleClaim}
              style={{ opacity: afk }}
              className="gift"
            />
          )}
          {loading && <Loading />}
          <Respone />
          <Routes>
            <Route
              path="/book-cafe"
              element={<BookCafe afk={afk}></BookCafe>}
            />
            <Route path="/" element={<Seoul afk={afk}></Seoul>} />
            <Route path="/tokyo" element={<Tokyo afk={afk}></Tokyo>} />
            <Route path="/chill-vibes" element={<Chill afk={afk}></Chill>} />
            <Route path="/van" element={<Van afk={afk}></Van>} />
            <Route
              path="/inside-cafe"
              element={<InsizeCafe afk={afk}></InsizeCafe>}
            />
            <Route path="/cafe-lofi" element={<Cafe afk={afk}></Cafe>} />
            <Route path="/honolulu" element={<Honolulu afk={afk}></Honolulu>} />
            <Route path="/outside" element={<Outside afk={afk}></Outside>} />
            <Route path="*" element={<Loading></Loading>} />
          </Routes>
        </ThemeContext.Provider>
      </div>
    </Router>
  );
}

export default App;
