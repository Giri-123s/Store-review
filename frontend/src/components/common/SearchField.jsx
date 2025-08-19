import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * A reusable search field component with debounced input
 * @param {Object} props - Component props
 * @param {string} props.value - Current search value
 * @param {function} props.onChange - Change handler function
 * @param {string} props.placeholder - Placeholder text
 * @param {Object} props.sx - Additional styles
 */
const SearchField = ({
  value,
  onChange,
  placeholder = 'Search...',
  sx = {}
}) => {
  // Debounce the search input
  const [timer, setTimer] = React.useState(null);

  const handleChange = (event) => {
    const newValue = event.target.value;
    
    // Clear existing timer
    if (timer) clearTimeout(timer);
    
    // Set new timer for debounce
    const newTimer = setTimeout(() => {
      onChange(newValue);
    }, 300);
    
    setTimer(newTimer);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
          },
        },
        '& .MuiInputBase-input': {
          color: 'rgba(255, 255, 255, 0.9)',
        },
        '& .MuiSvgIcon-root': {
          color: 'rgba(255, 255, 255, 0.4)',
        },
        ...sx
      }}
    />
  );
};

export default SearchField;
