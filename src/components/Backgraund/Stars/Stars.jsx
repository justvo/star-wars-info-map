import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Stars = () => {
  const [stars, setStars] = useState([]);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [countStars, setCountStars] = useState(changeCount());


  useEffect(() => {
    const starsPosition = () => {
      const newStars = [];
      for (let i = 0; i < countStars; i++) {
        const animationDuration = Math.random() * (5 - 2) + 2;
        const size = `${Math.floor(Math.random() * 30)}`;

        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        newStars.push({ animationDuration, left, top, size });
      }
      setStars(newStars);
    }; 

    starsPosition();
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }
  function changeCount(){
    if (windowSize.innerWidth < 600) {
      return 25;
    } else if (windowSize.innerWidth < 900) {
      return 70;
    } else {
      return 110;
    }
  }


  return (
    <div>
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="star"
          initial={{ opacity: 0.1, scale: 0.8, boxShadow:'0 0 20px 1px  rgb(69, 216, 253)' }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.3, 0.8]  }}
          transition={{ duration: star.animationDuration, repeat: Infinity }}
          style={{
            position: "absolute",
            backgroundColor: "rgb(69, 216, 253)",
            borderRadius: "50%",
            width: star.size,
            height: star.size,
            left: star.left,
            top: star.top,
            boxShadow: '0 0 20px rgb(189, 204, 247)'
          }}
        />
      ))}
    </div>
  );
};

export default Stars;
