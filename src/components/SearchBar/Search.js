import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';
import SearchIcon from "@mui/icons-material/Search";
import { styled } from '@mui/material/styles';
import { useState } from "react";

const CustomInput = styled(TextField)(({theme}) => ({
    '& label': {
        color: 'white',
    },
    '& label.Mui-focused': {
      color: '#ff94ff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ff94ff',
    },
    '& .MuiOutlinedInput-root': {
       borderRadius: '20px',
       transition: theme.transitions.create([
        'border-color'
       ]),
       color: 'white',

      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: '#ff94ff',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'p#ff94ff',
      },
    },
  }));

export const Search = (props) => {

  const onInputChangeHandler = (event) => {
    props.onSearch(event.target.value);
    if (!event.target.value) props.onEmptySearchBar();
  };
  

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <FormControl sx={{ m: '10vh 0', width: '50vw' }}>
      {/* <InputLabel htmlFor="search-input">Amount</InputLabel> */}
      <CustomInput
        id="search-input"
        value={props.currentSearchInput}
        onChange={onInputChangeHandler}
        InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{color: 'white'}} />
              </InputAdornment>
            ),
          }}
        placeholder="Search Movies"
      />
    </FormControl>
    </div>
  );
};
