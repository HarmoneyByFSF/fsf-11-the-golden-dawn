import React from 'react';
import {HashRouter, Link, Route, Routes } from "react-router-dom";
import myImage from '../../assets/preview.png';

const Start = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-300">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Cashflow Quest
        </h1>
        <img className="mx-auto mb-4" src={myImage} alt="Logo"/>
        <Link to="/player-setup" className="btn btn-outline btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg">Launch Cashflow Quest</Link>
      </div>
    </div>);
};

export default Start;