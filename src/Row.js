import React, { useEffect, useState } from "react";
import axios from "./axios";
import './row.css'
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl,isLargeRow }) {
  const [Movies, setMovies] = useState([]);
  const [trailerUrl,setTrailerUrl] = useState("");



  const base_url = "https://image.tmdb.org/t/p/original/"
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
    
      setMovies(request.data.results);

      return request;
    }
    fetchData();
  }, [fetchUrl]);

const opts = {
  height:"390",
  width:"100%",
  playerVars:{
    autoplay:1,
  },
};

const handleClick = (movie) => {
if(trailerUrl) {  
setTrailerUrl('');
}
else{ 
  movieTrailer( movie.name || movie?.title  || "" )
  .then((url) =>{
const urlParams = new URLSearchParams(new URL(url).search);
setTrailerUrl(urlParams.get('v'));
  })
  .catch((error) => console.log(error));
}
}

  return (
    <div className="row">
    
      <h2>{title}</h2>

<div className="row_posters">
{
Movies.map(movie => (
<img 
key={movie.id} 
onClick={() => handleClick(movie)}
className={`rows_poster ${isLargeRow && "row_posterLarge"}` }
src={`${base_url}${isLargeRow ? movie.poster_path:movie.backdrop_path}`} alt={movie.title} />
))}
</div>
{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row;
  