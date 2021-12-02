import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Box } from '@material-ui/core';

Loading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

Loading.defaultProps = {
  width: '100%',
  height: '100%',
  size: 20,
  color: 'black',
};

export function Loading(props) {
  const { size, width, height, color } = props;

  return (
    <Box sx={{ width, height, color }} display='flex' alignItems='center' justifyContent='center'>
      <CircularProgress size={size} color='inherit' />
    </Box>
  );
}
