import { useEffect, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../Components/MovieList/MovieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]); //storing result in this state variable
  // API calling as page loads and showing it with useEffect on start screen
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US  "
    )
      .then((response) => response.json()) //response is variable and can be anything
      .then((data) => setPopularMovies(data.results)); //using results array from API call
  }, []);

  // react carousel is used here to change the images for movies and their details inside our app  it is installed by npm i react-responsive-carousel
  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={true}
          autoPlay={true} // it will keep changing the cards data by itself
          transitionTime={1} // after how much time in second the card will be changed
          infiniteLoop={true} //repeating a set of data infinitely
          showStatus={false}
        >
          {popularMovies.map((movie) => (    //mapping over the links for different categories like popular ,top rated etc
            <Link                    // Router links    and wrapping rhis 
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`} //image in card coming from API data
                />
              </div>
              <div className="posterImage__overlay">      {/* This will show the image of picture */}
                <div className="posterImage__title">
                  {movie ? movie.original_title : ""}
                </div>
                <div className="posterImage__runtime">    {/* this will show the release date of movie */}
                  {movie ? movie.release_date : ""}
                  <span className="posterImage__rating">
                    {movie ? movie.vote_average : ""}
                    <i className="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="posterImage__description">
                  {movie ? movie.overview : ""}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
        <MovieList />   
      </div>
    </>
  );
};

export default Home;
