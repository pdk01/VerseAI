import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { Button, Box } from '@mui/material';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ textAlign: 'right', padding: 2 }}>
      <Button variant="outlined" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </Box>
  );
}

export default ThemeToggle;
