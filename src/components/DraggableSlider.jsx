import React, { useState, useRef, useEffect } from "react";
import img1 from "../assets/project1.jpg";
import img2 from "../assets/project2.jpg";
import img3 from "../assets/project3.jpg";
import img4 from "../assets/project4.jpg";

const clients = [
  {
    image: img1,
    name: "Client 1",
    location: "Goa, India",
  },
  {
    image: img2,
    name: "Client 2",
    location: "Mumbai, India",
  },
  {
    image: img3,
    name: "Client 3",
    location: "New Delhi, India",
  },
  {
    image: img4,
    name: "Client 4",
    location: "Punjab, India",
  },
];

const SIDE_IMG_RATIO = 0.77;
const IMG_WIDTH = 340;
const IMG_HEIGHT = 470;
const ROTATION_ANGLE = 12;

export default function DraggableSlider() {
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const dragRef = useRef(null);
  const length = clients.length;

  // Touch events for mobile
  useEffect(() => {
    const element = dragRef.current;
    if (!element) return;

    const handleTouchStart = (e) => {
      setIsDragging(true);
      setDragStart(e.touches[0].clientX);
      setDragOffset(0);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const offset = e.touches[0].clientX - dragStart;
      setDragOffset(offset * 0.45);
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
      const actualOffset = dragOffset / 0.45;
      if (actualOffset < -60) {
        handleNext();
      } else if (actualOffset > 60) {
        handlePrev();
      }
      setDragOffset(0);
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
    // eslint-disable-next-line
  }, [isDragging, dragStart, dragOffset, length]);

  // Mouse events for desktop
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const offset = e.clientX - dragStart;
    setDragOffset(offset * 0.45);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const actualOffset = dragOffset / 0.45;
    if (actualOffset < -60) {
      handleNext();
    } else if (actualOffset > 60) {
      handlePrev();
    }
    setDragOffset(0);
  };

 
  function handleNext() {
    setIsTransitioning(true);
    setTimeout(() => {
      setActive((prev) => (prev + 1) % length);
      setIsTransitioning(false);
    }, 410); 
  }

  function handlePrev() {
    setIsTransitioning(true);
    setTimeout(() => {
      setActive((prev) => (prev - 1 + length) % length);
      setIsTransitioning(false);
    }, 410);
  }

  const leftIdx = (active - 1 + length) % length;
  const rightIdx = (active + 1) % length;

  const getImageStyle = (type) => {
    let style = {
      width: `${IMG_WIDTH}px`,
      height: `${IMG_HEIGHT}px`,
      position: "absolute",
      top: 0,
      borderRadius: "1rem",
      objectFit: "cover",
      userSelect: "none",
      background: "#eee",
      willChange: "transform",
      transition: !isDragging
        ? "transform 0.6s cubic-bezier(.22,1,.36,1), box-shadow 0.4s cubic-bezier(.22,1,.36,1), filter 0.38s"
        : "none",
      boxShadow: "0 8px 32px rgba(0,0,0,0.11)",
      filter: "brightness(0.97)",
      zIndex: 1,
    };

    if (type === "left") {
      style.transform = `translateX(calc(-28vw - 18px)) rotate(-${ROTATION_ANGLE}deg) scale(${SIDE_IMG_RATIO})`;
      style.opacity = 0.7;
    }
    if (type === "center") {
      style.left = "50%";
      style.transform = `translateX(-50%) translateX(${dragOffset}px) rotate(${dragOffset * 0.08}deg) scale(${isDragging ? 0.97 : 1})`;
      style.zIndex = 2;
      style.opacity = 1;
      style.filter = "brightness(1) saturate(1.05)";
      style.cursor = isDragging ? "grabbing" : "grab";
      style.boxShadow = isDragging ? "0 20px 60px rgba(0,0,0,0.19)" : "0 12px 48px rgba(0,0,0,0.16)";
      style.transition = isDragging
        ? "none"
        : "transform 0.7s cubic-bezier(.22,1,.36,1), box-shadow 0.4s cubic-bezier(.22,1,.36,1)";
    }
    if (type === "right") {
      style.transform = `translateX(calc(28vw + 18px)) rotate(${ROTATION_ANGLE}deg) scale(${SIDE_IMG_RATIO})`;
      style.opacity = 0.7;
    }
    return style;
  };

  const detailsFade =
    isTransitioning
      ? { opacity: 0, transform: "translateY(38px)", transition: "all 0.5s cubic-bezier(.22,1,.36,1)" }
      : { opacity: 1, transform: "translateY(0)", transition: "all 0.6s cubic-bezier(.22,1,.36,1) 0.1s" };

  return (
    <>
      <style>
        {`
          .draggable-slider-outer {
            width: 100%;
            min-height: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #fffdfc;
            position: relative;
            overflow: hidden;
            padding-top: 2.2rem;
            padding-bottom: 2.2rem;
          }
          .responsive-slider-container {
            position: relative;
            width: 100%;
            height: ${IMG_HEIGHT}px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            min-height: 200px;
          }
          .responsive-client-details {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 1.7rem;
            margin-bottom: 0.5rem;
          }
          @media (max-width: 900px) {
            .responsive-slider-image {
              width: 55vw !important;
              height: 55vw !important;
              min-width: 175px !important;
              min-height: 210px !important;
              max-width: 340px !important;
              max-height: 470px !important;
            }
            .responsive-slider-container {
              height: 55vw !important;
              min-height: 210px !important;
              max-height: 470px !important;
            }
            .responsive-client-name {
              font-size: 1.6rem !important;
            }
            .responsive-client-location {
              font-size: 1rem !important;
            }
            .draggable-slider-outer {
              padding-top: 1.5rem;
              padding-bottom: 1.5rem;
            }
          }
          @media (max-width: 600px) {
            .responsive-slider-image {
              width: 78vw !important;
              height: 70vw !important;
              min-width: 120px !important;
              min-height: 120px !important;
              max-width: 250px !important;
              max-height: 360px !important;
            }
            .responsive-slider-container {
              height: 70vw !important;
              min-height: 120px !important;
              max-height: 360px !important;
            }
            .responsive-left-image {
              transform: translateX(calc(-32vw - 8px)) rotate(-${ROTATION_ANGLE}deg) scale(${SIDE_IMG_RATIO}) !important;
            }
            .responsive-right-image {
              transform: translateX(calc(32vw + 8px)) rotate(${ROTATION_ANGLE}deg) scale(${SIDE_IMG_RATIO}) !important;
            }
            .draggable-slider-outer {
              padding-top: 1rem;
              padding-bottom: 1rem;
            }
            .responsive-client-details {
              margin-top: 1.1rem;
              margin-bottom: 0.2rem;
            }
          }
        `}
      </style>
      <div className="draggable-slider-outer">
        <div className="responsive-slider-container">
          <img
            src={clients[leftIdx].image}
            alt={clients[leftIdx].name}
            style={getImageStyle("left")}
            className="responsive-slider-image responsive-left-image"
            draggable={false}
          />
          <img
            ref={dragRef}
            src={clients[active].image}
            alt={clients[active].name}
            style={getImageStyle("center")}
            className="responsive-slider-image"
            draggable={false}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          <img
            src={clients[rightIdx].image}
            alt={clients[rightIdx].name}
            style={getImageStyle("right")}
            className="responsive-slider-image responsive-right-image"
            draggable={false}
          />
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(ellipse at center, transparent 30%, rgba(248,250,252,0.08) 70%)`,
              pointerEvents: 'none',
              zIndex: 4,
            }}
          />
        </div>
        <div
          className="responsive-client-details"
          style={{
            ...detailsFade
          }}
        >
          <h2
            className="responsive-client-name"
            style={{
              fontSize: '2rem',
              fontWeight: 300,
              marginBottom: '0.5rem',
              color: '#222',
              ...detailsFade
            }}
          >
            {clients[active].name}
          </h2>
          <div
            className="responsive-client-location"
            style={{
              color: '#9ca3af',
              fontSize: '1.2rem',
              ...detailsFade
            }}
          >
            {clients[active].location}
          </div>
        </div>
      </div>
    </>
  );
}