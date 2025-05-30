import React from 'react'


export default function About() {

      return(
        <div className="aboutInfo">
            
            <p>Welcome to The MMA Minute!Step into the heart of Mixed 
            Martial Arts, where power, strategy, and raw passion collide. 
            Whether you're a seasoned fan, a practitioner, or new to the 
            sport, The MMA Minute is your ultimate source for breaking news
            , fight analysis, and exclusive insights from the world’s top 
            fighters and events. </p>


            <iframe 

                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/u0s-1CKTJKo?autoplay=1&start=11"
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                cross-origin="anonymous"
            ></iframe>

        </div>
        );


}