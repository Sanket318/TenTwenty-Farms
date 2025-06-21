import React from "react";
import HeroSlider from "../components/HeroSlider";
import QualityProducts from "../components/QualityProducts";
import DraggableSlider from "../components/DraggableSlider";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <QualityProducts />
      <DraggableSlider />
    </>
  );
}