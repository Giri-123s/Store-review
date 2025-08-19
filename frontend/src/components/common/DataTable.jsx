import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Box,
  CircularProgress,
} from '@mui/material';

/**
 * A reusable data table component with sorting and loading states
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions
 * @param {Array} props.data - Array of data objects
 * @param {boolean} props.loading - Loading state
 * @param {string} props.sortBy - Current sort column
 * @param {string} props.sortOrder - Current sort order (asc/desc)
 * @param {function} props.onSort - Sort handler function
 * @param {Object} props.sx - Additional styles for TableContainer
 */
const DataTable = ({
  columns,
  data,
  loading,
  sortBy,
  sortOrder,
  onSort,
  sx = {}
}) => {
  // Default dark theme styling
  const defaultSx = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backgroundImage: 'none',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    borderRadius: 2,
    ...sx
  };

  const defaultCellSx = {
    color: 'rgba(255,255,255,0.9)',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  };

  return (
    <TableContainer component={Paper} sx={defaultSx}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sx={{
                  ...defaultCellSx,
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={sortBy === column.id}
                    direction={sortBy === column.id ? sortOrder.toLowerCase() : 'asc'}
                    onClick={() => onSort(column.id)}
                    sx={{
                      '& .MuiTableSortLabel-icon': {
                        color: 'rgba(255,255,255,0.3) !important',
                      },
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell 
                colSpan={columns.length} 
                align="center"
                sx={defaultCellSx}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell 
                colSpan={columns.length} 
                align="center"
                sx={defaultCellSx}
              >
                No data found
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow
                key={row.id || index}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.05)'
                  },
                  transition: 'background-color 0.2s'
                }}
              >
                {columns.map((column) => (
                  <TableCell 
                    key={column.id}
                    sx={defaultCellSx}
                  >
                    {column.render ? column.render(row) : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
