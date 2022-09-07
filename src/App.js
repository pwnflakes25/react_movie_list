import { useEffect, useState } from "react";
import "./App.css";
import { MovieList } from "./components/Movie/MovieList";
import { Search } from "./components/SearchBar/Search";
import { useDebounce } from "./Hooks/useDebounce";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from '@mui/material/styles';

const CustomTabs = styled(Tabs)({
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center'
  },
});

const StyledTab = styled((props) => <Tab {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(18),
    marginRight: theme.spacing(1),
    color: 'white',
    '&.Mui-selected': {
      color: 'purple',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'transparent',
    },
  }),
);

function App() {

  const storedFavoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  console.log("stored movies:", storedFavoriteMovies);
  const [favoriteMovies, setFavoriteMovies] = useState(storedFavoriteMovies);
  const [searchInput, setSearchInput] = useState("");
  const [currentTab, setCurrentTab] = useState("Movies");
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
      setCurrentTab('Movies');
      console.log("inside the useEffect we get the value:", debouncedSearch);
      // setLoading(true);

      // const url = `... ${debouncedSearch}`;
      // const data = await fetch(url).then(res => res.json());
      // setLoading(false);
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  const onSearchHandler = (text) => {
    console.log("handling search input:", text);
    setSearchInput(text);
  };

  const onSetFavoriteMovies = (movieInput) => {
    setFavoriteMovies((prevArray) => {
      const currentFavorites = [...prevArray];
      const foundMovieIndex = prevArray.findIndex(
        (movie) => movie._id === movieInput._id
      );
      foundMovieIndex >= 0
        ? currentFavorites.splice(foundMovieIndex, 1)
        : currentFavorites.push(movieInput);
      localStorage.setItem('favoriteMovies', JSON.stringify(currentFavorites));
      return currentFavorites;
    });
  };

  const handleTabChange = (event, value) => {
    console.log("tab", value);
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
