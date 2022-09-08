import { useEffect, useState } from "react";
import "./App.css";
import { MovieList } from "./components/Movie/MovieList";
import { Search } from "./components/SearchBar/Search";
import { useDebounce } from "./Hooks/useDebounce";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-flexContainer": {
    justifyContent: "center",
  },
});

const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(18),
  marginRight: theme.spacing(1),
  color: "white",
  "&.Mui-selected": {
    color: "purple",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "transparent",
  },
}));

function App() {
  // access stored favorite movies from localStorage
  const storedFavoriteMovies =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  // states
  const [favoriteMovies, setFavoriteMovies] = useState(storedFavoriteMovies);
  const [searchInput, setSearchInput] = useState("");
  const [currentTab, setCurrentTab] = useState("Movies");
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  // debounce the search to prevent calling API too many times
  const debouncedSearch = useDebounce(searchInput, 500);

  // Fetch Data from API
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const url =
        "https://api.themoviedb.org/3/movie/popular?api_key=dfdc1f38d126df44ced0515b846cf94a&language=en-US&page=1";
      const response = await fetch(url);
      const data = await response.json()
      setMovies(data.results);
      setLoading(false);
    };

    async function fetchDataWithSearch() {
      setCurrentTab("Movies");
      setLoading(true);

      const url = `https://api.themoviedb.org/3/search/movie?api_key=dfdc1f38d126df44ced0515b846cf94a&language=en-US&query=${debouncedSearch}&page=1&include_adult=false`;
      const response = await fetch(url);
      const data = await response.json()
      setMovies(data.results);
      setLoading(false);
    }

    if (!movies.length) {
      fetchInitialData();
    } else if (debouncedSearch) {
      fetchDataWithSearch();
    }
  }, [debouncedSearch, movies]);

  const onSearchHandler = (text) => {
    console.log("handling search input:", text);
    setSearchInput(text);
  };

  // Modify the Favorite Movies List
  const onSetFavoriteMovies = (movieInput) => {
    setFavoriteMovies((prevArray) => {
      const currentFavorites = [...prevArray];
      const foundMovieIndex = prevArray.findIndex(
        (movie) => movie.id === movieInput.id
      );
      foundMovieIndex >= 0
        ? currentFavorites.splice(foundMovieIndex, 1)
        : currentFavorites.push(movieInput);
      localStorage.setItem("favoriteMovies", JSON.stringify(currentFavorites));
      return currentFavorites;
    });
  };

  // Handle Tab Changes
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <div className="App">
      <Search onSearch={onSearchHandler} currentSearchInput={searchInput} />
      <CustomTabs
        sx={{ marginBottom: "15px" }}
        value={currentTab}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <StyledTab value="Movies" label="Movie List" />
        <StyledTab value="My Favorite" label="My Favorite Movies" />
      </CustomTabs>
      {currentTab === "Movies" && (
        <MovieList
          onFavoriteMovie={onSetFavoriteMovies}
          favoriteMovies={favoriteMovies}
          movies={movies}
          isLoading={isLoading}
        />
      )}
      {currentTab === "My Favorite" && (
        <MovieList
          onFavoriteMovie={onSetFavoriteMovies}
          favoriteMovies={favoriteMovies}
          movies={favoriteMovies}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
