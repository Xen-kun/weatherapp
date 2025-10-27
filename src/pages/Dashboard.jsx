import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TabMenu from "../components/TabMenu";
import WeatherCard from "../components/CurrentWeather";
import Analytics from "./Analytics";
import Forecast from "./Forecast";
import Locations from "./Locations";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Current Weather");

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case "Current Weather":
  //       return <WeatherCard />;
  //     case "Analytics":
  //       return <Analytics />;
  //     case "Forecast":
  //       return <Forecast />;
  //     case "Locations":
  //       return <Locations />;
  //     default:
  //       return null;
  //   }
  // };

  const componentList = [
    { name: "Current Weather", component: <WeatherCard /> },
    { name: "Analytics", component: <Analytics /> },
    { name: "Forecast", component: <Forecast /> },
    { name: "Locations", component: <Locations /> }
  ];


  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center p-6 flex-1">
        <Navbar />
        <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="w-full flex justify-center mt-5">
          {componentList.find((item) => item.name === activeTab)?.component}
        </div>
      </div>

      <Footer />
    </div>
  );
}
