import './components/scss/app.css'
import React from 'react';
import SearchWeather from './components/SearchWeather';
import WeatherGallery from './components/WeatherGallery'

function App() {

  return (
    <div
      className="App"
      style={{
        backgroundImage:
          "url('https://rare-gallery.com/uploads/posts/124416-miui-8-rainy-weather-background-minimal-hd.png')",
      }}>
      <h1 className='title'>What's the Weather?</h1>
      <SearchWeather />
    </div>

  );
}

export default App;
