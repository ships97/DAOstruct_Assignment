import React, { useState, useEffect } from 'react';

function Demo() {
  const [spotlightItem, setSpotlightItem] = useState(null);
  const [latestItems, setLatestItems] = useState([]);
  const [olderItems, setOlderItems] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [overlayUrl, setOverlayUrl] = useState(null);

  useEffect(() => {
    // Fetch the latest item for the spotlight
    fetch('https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=2022-10-01&end_date=2022-10-29&thumbs=true')
      .then(response => response.json())
      .then(data => {
        setSpotlightItem(data);
      });

    // Fetch the latest 7 items
    fetch('https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=2022-10-01&end_date=2022-10-29&thumbs=true?limit=7')
      .then(response => response.json())
      .then(data => {
        setLatestItems(data);
      });
  }, []);

  function loadOlderItems() {
    // Fetch the next 7 older items
    fetch(`https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=${startDate}&end_date=${endDate}&thumbs=true&limit=7`)
      .then(response => response.json())
      .then(data => {
        setOlderItems(prevOlderItems => prevOlderItems.concat(data));
        setStartDate(data.start_date);
        setEndDate(data.end_date);
      });
  }

  function handleScroll() {
    // Check if the user has scrolled to the bottom of the page
    if (window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight) {
      loadOlderItems();
    }
  }

  function showOverlay(url) {
    setOverlayUrl(url);
}

function closeOverlay() {
    setOverlayUrl(null);
}


  useEffect(() => {
    // Add an event listener to load older items as the user scrolls
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div>
      {spotlightItem && (
        <div className="spotlight">
          <h1>{spotlightItem.title}</h1>
          <p>{spotlightItem.explanation}</p>
          <p>{spotlightItem.copyright}</p>
          <img src={spotlightItem.url} onClick={() => showOverlay(spotlightItem.url)} alt="" />
        </div>
      )}
      <div className="latest-items">
        {latestItems.map(item => (
          <div className="item" onClick={() => showOverlay(item.url)}>
            <h1>{item.title}</h1>
            <p>{item.copyright}</p>
            <p>{item.date}</p>
          </div>
        ))}
      </div>
      <div className="older-items">
        {olderItems.map(item => (
          <div className="item" onClick={() => showOverlay(item.url)}>
          <h1>{item.title}</h1>
          <p>{item.copyright}</p>
          <p>{item.date}</p>
        </div>
      ))}
    </div>
    {/* Overlay for showing media in full screen */}
    {overlayUrl && (
      <div className="overlay">
        <button onClick={closeOverlay}>Close</button>
        {overlayUrl.endsWith('.jpg') || overlayUrl.endsWith('.png') ? (
          <img src={overlayUrl} alt="" />
        ) : (
          <video src={overlayUrl} controls />
        )}
      </div>
    )}
  </div>
);
}

export default Demo;
