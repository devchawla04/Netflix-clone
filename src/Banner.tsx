import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

type Movie = {
  backdrop_path?: string;
  title?: string;
  name?: string;
  original_name?: string;
  overview?: string;
};

function Banner() {
  const [moviebanner, setBanner] = useState<Movie | null>(null);

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

  function truncate(str: string | undefined, n: number): string {
    return str && str.length > n ? str.substr(0, n - 1) + "..." : str || "";
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${moviebanner?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {moviebanner?.title ||
            moviebanner?.name ||
            moviebanner?.original_name}
        </h1>
        <div className="banner_buttons"></div>
        <h1 className="banner-description">
          {truncate(moviebanner?.overview, 150)}
        </h1>
      </div>
      <div className="banner-fade-bottom" />
    </header>
  );
}

export default Banner;
