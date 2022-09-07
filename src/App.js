import { useEffect, useState } from "react";
import "./App.css";
import { MovieList } from "./components/Movie/MovieList";
import { Search } from "./components/SearchBar/Search";
import { useDebounce } from "./Hooks/useDebounce";

function App() {
  const [favoriteMovies, setFavoriteMovies] = useState({'AB': 1, 'BC': 1});
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setLoading] = useState(false);
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

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    async function fetchData() {

      console.log("inside the useEffect we get the value:", debouncedSearch);
      // setLoading(true);

      // const url = `... ${debouncedSearch}`;
      // const data = await fetch(url).then(res => res.json());
      // setLoading(false);
    }

    if(debouncedSearch) fetchData();
  }, [debouncedSearch])

  const onSearchHandler = (text) => {
    console.log('handling search input:', text);
    setSearchInput(text);
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
      <Search onSearch={onSearchHandler} currentSearchInput={searchInput} />
      <MovieList
        onFavoriteMovie={onSetFavoriteMovies}
        favoriteMovies={favoriteMovies}
        movies={movies}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
