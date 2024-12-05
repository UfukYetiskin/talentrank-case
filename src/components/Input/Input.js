import React from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

function InputComponent({value, handleChange, text, type}) {

  return (
    <TextField
      label={text}
      type={type}
      className='w-full'
      id="outlined-start-adornment"
      sx={{ m: 1,
        //  width: '75ch',
          '& .MuiFilledInput-root': {
          backgroundColor: 'white'
        }
      }}
      value={value}
      onChange={handleChange}
    />
  )
}

export default InputComponent