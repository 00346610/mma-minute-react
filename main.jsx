import React from 'react';
import { createRoot } from 'react-dom/client';
import Search from './app';
import './css.css';
import  Intro from './intro';
import  About from './About';
import  AIathlete from './AIathlete';
import SPLoader from './spinnerLoader';



const rootElement = document.getElementById('roots');
const root = createRoot(rootElement);


function Layout() {
    return (
        <>
    
      <Intro />
      <About />
      <AIathlete />
      <SPLoader/>
      <Search />

      </>
    );
}

root.render(<Layout/>);