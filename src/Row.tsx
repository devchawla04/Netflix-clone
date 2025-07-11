import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

type Movie = {
  id: number;
  name?: string;
  title?: string;
  poster_path?: string;
  backdrop_path?: string;
};

type RowProps = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

function Row({ title, fetchUrl, isLargeRow = false }: RowProps) {
  const [Movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string>("");

  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);

      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.name || movie?.title || "")
        .then((url: string) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v") || "");
        })
        .catch((error: any) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-posters">
        {Movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`rows-poster ${isLargeRow && "row-poster-large"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
