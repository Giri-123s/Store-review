import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

/**
 * A reusable stats card component for dashboards
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Stats value
 * @param {React.ReactNode} props.icon - Icon component
 * @param {Object} props.sx - Additional styles
 */
const StatsCard = ({ title, value, icon, sx = {} }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backgroundImage: 'none',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
        ...sx
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          backgroundColor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="body2"
          color="rgba(255, 255, 255, 0.7)"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          color="white"
          fontWeight="bold"
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatsCard;
