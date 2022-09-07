import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from '@mui/material/styles';

export const Search = (props) => {

  const onInputChangeHandler = (event) => {
    props.onSearch(event.target.value)
  };

  const CustomInput = styled(TextField)(({theme}) => ({
    '& label': {
        color: 'white',
    },
    '& label.Mui-focused': {
      color: 'purple',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'purple',
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
        borderColor: 'purple',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'purple',
      },
    },
  }));
  

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
