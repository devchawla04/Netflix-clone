import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";
function Banner() {
  const [moviebanner, setBanner] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setBanner(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${moviebanner?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {moviebanner?.title ||
            moviebanner?.name ||
            moviebanner?.original_name}
        </h1>
        <div className="banner_buttons">
          {/* <button className="banner_button">Play</button>
<button className="banner_button">My List</button> */}
        </div>
        <h1 className="banner-description">
          {truncate(moviebanner?.overview, 150)}
        </h1>
      </div>

      <div className="banner-fade-bottom" />
    </header>
  );
}

export default Banner;
