import {useEffect, useState} from "react"
import "./MovieList.css"
import { useParams } from "react-router-dom"   // it changes the data provided by API dynamically like popular top rated etc,provided by react-router-dom
import Cards from "../Cards/Cards"

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([]) //To save the data coming from API call
    const {type} = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then((response) => response.json())
        .then(data => setMovieList(data.results))
    }

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map((movie) => (
                       
                        <Cards movie={movie}/>
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList