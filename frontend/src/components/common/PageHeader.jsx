import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

/**
 * A reusable page header component with title and optional actions
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {React.ReactNode} props.actions - Optional action buttons/components
 * @param {Object} props.sx - Additional styles
 */
const PageHeader = ({ title, actions, sx = {} }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backgroundImage: 'none',
        ...sx
      }}
    >
      <Typography variant="h5" component="h1" color="white">
        {title}
      </Typography>
      {actions && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          {actions}
        </Box>
      )}
    </Paper>
  );
};

export default PageHeader;
