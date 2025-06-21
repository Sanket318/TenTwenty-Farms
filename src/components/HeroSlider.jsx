import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import img1 from "../assets/slide1.jpg";
import img2 from "../assets/slide2.jpg";
import img3 from "../assets/slide3.jpg";
import img4 from "../assets/slide4.jpg"

const slides = [
  {
    image: img1,
    headline: "From Our Farms\nTo Your Hands",
    sub: "Welcome To TenTwenty Farms",
  },
  {
    image: img2,
    headline: "Fresh From The Field\nEvery Day",
    sub: "Welcome To TenTwenty Farms",
  },
  {
    image: img3,
    headline: "Sustainably Grown\nLocally Delivered",
    sub: "Welcome To TenTwenty Farms",
  },
  {
    image: img4,
    headline: "Quality Harvest\nDelivered Fresh",
    sub: "Welcome To TenTwenty Farms",
  },
];

const splitDuration = 1.4; 
const slideInterval = 5; 
const splitEase = [0.25, 0.1, 0.25, 1]; 

const previewVariants = {
  initial: { opacity: 0, y: 60, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 22, duration: 1.2 },
  },
  exit: { opacity: 0, y: -40, scale: 0.97, transition: { duration: 0.3 } },
};

const splitTopVariants = {
  initial: { y: "0%" },
  animate: { y: "0%" },
  exit: {
    y: "-100%", 
    transition: { 
      duration: splitDuration, 
      ease: splitEase,
      type: "tween" 
    }
  }
};

const splitBottomVariants = {
  initial: { y: "0%" },
  animate: { y: "0%" },
  exit: {
    y: "100%", 
    transition: { 
      duration: splitDuration, 
      ease: splitEase,
      type: "tween" 
    }
  }
};


const fadeInVariants = {
  initial: { opacity: 0, scale: 1.05 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: splitDuration,
      ease: splitEase,
      delay: 0.2 
    }
  }
};

const textVariants = {
  initial: { opacity: 0, y: 60, filter: "blur(16px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: splitDuration * 0.7, ease: splitEase }
  },
  exit: {
    opacity: 0,
    y: -60,
    filter: "blur(16px)",
    transition: { duration: 0.4, ease: splitEase }
  }
};

export default function HeroSlider() {
  const [page, setPage] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const prevPageRef = useRef(page);

  // For loading bar
  const progressControls = useAnimation();
  const [progressKey, setProgressKey] = useState(0);

 
  useEffect(() => {
    if (!transitioning) {
      progressControls.set({ rotate: 0 });
      progressControls.start({
        rotate: 360,
        transition: { duration: slideInterval, ease: "linear" }
      });
      const timeout = setTimeout(() => handlePaginate(1), slideInterval * 1000);
      return () => {
        clearTimeout(timeout);
        progressControls.stop();
      };
    }
  }, [page, transitioning, progressKey, progressControls]);

  function handlePaginate(dir) {
    if (transitioning) return;
    setTransitioning(true);
    prevPageRef.current = page;
    
    setPage((prev) => (prev + dir + slides.length) % slides.length);
    setProgressKey((k) => k + 1);
    
    setTimeout(() => setTransitioning(false), splitDuration * 1000 + 200);
  }

  const prevIdx = prevPageRef.current;
  const nextIdx = (page + 1) % slides.length;
  const currentSlide = slides[page];
  const prevSlide = slides[prevIdx];

  return (
    <section className="relative w-screen h-[100vh] overflow-hidden bg-black" style={{ 
      WebkitBackfaceVisibility: "hidden",
      backfaceVisibility: "hidden",
      transform: "translateZ(0)"
    }}>
      <AnimatePresence>
        {transitioning && (
          <motion.img
            key={`base-${page}`}
            src={currentSlide.image}
            alt=""
            className="absolute w-full h-full object-cover top-0 left-0 z-5"
            draggable={false}
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
          />
        )}
      </AnimatePresence>

      {!transitioning && (
        <img
          src={currentSlide.image}
          alt=""
          className="absolute w-full h-full object-cover top-0 left-0 z-0"
          draggable={false}
        />
      )}

      <AnimatePresence>
        {transitioning && (
          <>
            <motion.div
              key={`split-top-${prevIdx}`}
              className="absolute left-0 w-full overflow-hidden z-20"
              style={{
                top: 0,
                height: "calc(50vh + 1px)", 
                willChange: "transform",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={splitTopVariants}
            >
              <img
                src={prevSlide.image}
                alt=""
                className="w-full object-cover absolute left-0"
                style={{ 
                  height: "100vh",
                  top: 0,
                  transform: "translateZ(0)",  
                  WebkitTransform: "translateZ(0)"
                }}
                draggable={false}
              />
            </motion.div>

            <motion.div
              key={`split-bottom-${prevIdx}`}
              className="absolute left-0 w-full overflow-hidden z-20"
              style={{
                bottom: 0,
                height: "calc(50vh + 1px)", 
                willChange: "transform",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={splitBottomVariants}
            >
              <img
                src={prevSlide.image}
                alt=""
                className="w-full object-cover absolute left-0"
                style={{ 
                  height: "100vh",
                  top: "-50vh",  
                  transform: "translateZ(0)",  
                  WebkitTransform: "translateZ(0)"
                }}
                draggable={false}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="relative z-30 flex flex-col justify-center h-full pl-[8vw] pt-[12vh] pointer-events-none">
        <AnimatePresence initial={false} mode="wait">
          {!transitioning && (
            <motion.div
              key={page}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pointer-events-none"
            >
              <span
                className="text-white text-lg md:text-xl font-light mb-4 block"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
              >
                {currentSlide.sub}
              </span>
              <h1
                className="whitespace-pre-line text-white text-4xl md:text-6xl font-light leading-tight mb-12"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
              >
                {currentSlide.headline}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute left-[8vw] bottom-10 z-40 flex items-center gap-6 select-none">
        <div className="relative z-10 w-[84px] h-[84px] mr-7 group">
          <button
            onClick={() => handlePaginate(1)}
            disabled={transitioning}
            className="w-full h-full focus:outline-none rounded-[0.5rem] bg-transparent p-0 border-none relative shadow-lg overflow-visible"
            style={{ cursor: transitioning ? "not-allowed" : "pointer" }}
            aria-label="Next Slide"
          >
            <motion.div
              key={progressKey}
              className="absolute inset-0 rounded-[0.5rem] pointer-events-none z-20"
              style={{
                background: `conic-gradient(from 0deg, white 0deg, white var(--progress-angle, 0deg), transparent var(--progress-angle, 0deg), transparent 360deg)`,
                padding: '3px',
                WebkitMask: `
                  radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px)),
                  conic-gradient(from 0deg, transparent 0deg, transparent var(--progress-angle, 0deg), white var(--progress-angle, 0deg), white 360deg)
                `,
                WebkitMaskComposite: 'subtract',
                mask: `
                  radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px)),
                  conic-gradient(from 0deg, transparent 0deg, transparent var(--progress-angle, 0deg), white var(--progress-angle, 0deg), white 360deg)
                `,
                maskComposite: 'subtract'
              }}
              animate={progressControls}
              onUpdate={(latest) => {
                const angle = latest.rotate || 0;
                const element = document.querySelector(`[data-progress-key="${progressKey}"]`);
                if (element) {
                  element.style.setProperty('--progress-angle', `${angle}deg`);
                }
              }}
              data-progress-key={progressKey}
            >
              <div className="w-full h-full rounded-[0.5rem] bg-white" />
            </motion.div>

            <span className="absolute inset-0 rounded-[0.5rem] border border-white/30 z-10 pointer-events-none" />
            
            <motion.img
              key={nextIdx}
              src={slides[nextIdx].image}
              alt="Next"
              className="w-full h-full object-cover block rounded-[0.5rem] relative z-5"
              draggable={false}
              style={{
                filter: "brightness(0.87)",
                transition: "filter 0.2s",
                willChange: "transform",
              }}
              variants={previewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />
            
            <span className="absolute w-full h-full left-0 top-0 flex items-center justify-center text-white text-xl font-medium pointer-events-none z-30" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>
              Next
            </span>
          </button>
        </div>
        <div className="flex flex-col justify-center">
          <div className="relative flex items-center h-7">
            <span className="text-white font-light text-lg w-7 text-right">{String(page + 1).padStart(2, "0")}</span>
            <div className="relative mx-4 h-1 w-28 bg-white/30 rounded overflow-hidden" />
            <span className="text-white font-light text-lg w-7 text-left">{String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-50" />
    </section>
  );
}