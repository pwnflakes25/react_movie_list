import { useEffect, useState } from "react";
import "./App.css";
import { MovieList } from "./components/Movie/MovieList";
import { Search } from "./components/SearchBar/Search";

function App() {
  const [favoriteMovies, setFavoriteMovies] = useState({'AB': 1, 'BC': 1});
  const [movies, filterMovies] = useState([
    {
      _id: "AB",
      name: "The Movie 1",
      year: "2010",
      image: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      _id: "BC",
      name: "The Movie 2",
      year: "2015",
      image: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      _id: "CD",
      name: "The Movie 3",
      year: "2021",
      image: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      _id: "DE",
      name: "The Movie 4",
      year: "2022",
      image: "https://picsum.photos/seed/picsum/200/300",
    },
  ]);

  const onSearchHandler = () => {
    // ... filter movies here..
  };

  const onSetFavoriteMovies = (movieId) => {
    setFavoriteMovies((prevValue) => {
      if (prevValue[movieId]) {
        delete prevValue[movieId];
        return {...prevValue};
      } else {
        return {...prevValue, [movieId]: 1 };
      }
    });
  };

  console.log(favoriteMovies);


  return (
    <div className="App">
      <Search onSearch={onSearchHandler} />
      <MovieList
        onFavoriteMovie={onSetFavoriteMovies}
        favoriteMovies={favoriteMovies}
        movies={movies}
      />
    </div>
  );
}

export default App;
