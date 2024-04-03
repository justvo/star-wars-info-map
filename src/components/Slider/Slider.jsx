import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/style.css";
import { useNavigate } from "react-router-dom";

const ImageSlider = ({ slides, imageType }) => {
  const navigate = useNavigate();

  if (slides.length < 2) {
    slides = [...slides, ...slides, ...slides,...slides,];
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: false,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="slider-item">
          <div className="slider-item-title">
            <div>{slide?.name}</div>
            <div>{slide?.title}</div>
          </div>
          <img
            onClick={() => {
              navigate(`/${imageType}/${slide.id}`);
            }}
            src={slide.image}
            alt={`item id #${slide.id}`}
            className={`slider-image ${imageType}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
