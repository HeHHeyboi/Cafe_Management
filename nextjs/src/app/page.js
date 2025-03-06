
import dropdownlist from "./components/Navbar/dropdownlist";
import React from "react";
import Carousel from "./components/Carousel/Carousel";
import Menu from "./components/MenuBar/page";
import Footer from "./components/Footer/page";
export default function Home() {
  return (
    <div >
      <dropdownlist />
      <Carousel />
      <Menu />
        <h1>Home</h1>
      <Footer />
    </div>
  );
}
