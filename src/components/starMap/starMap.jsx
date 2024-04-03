import React, { useState, useEffect, useRef } from "react";
import GridComponent from "../Grid";
import "./style/StarMap.css";
import { useDispatch, useSelector } from "react-redux";
import { mainFetch } from "../../fetchFunctions/mainFetch";

const StarMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const scrollRef = useRef();
  const dispatch = useDispatch();
  const planets = useSelector((state)=>state.planets.planets)

  useEffect(() => {
    const fetchData = async () =>{
      if (!isLoaded) {

        const data = await mainFetch("https://swapi.info/api/planets/", dispatch, "planets");
        setIsLoaded(true);
        return data;
      }
      
    }
    if(planets.length<60){
      fetchData();
    }else{
      setIsLoaded(true);
    }

      
  }, []);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setStartY(e.pageY - scrollRef.current.offsetTop);
    setScrollLeft(scrollRef.current.scrollLeft);
    setScrollTop(scrollRef.current.scrollTop);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const y = e.pageY - scrollRef.current.offsetTop;
    const walkX = x - startX;
    const walkY = y - startY;
    scrollRef.current.scrollLeft = scrollLeft - walkX / 1.5;
    scrollRef.current.scrollTop = scrollTop - walkY / 1.5;
  };

  return (
    <div
      className="scrol-area"
      ref={scrollRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {isLoaded && <GridComponent />}
    </div>
  );
};
export default StarMap;
