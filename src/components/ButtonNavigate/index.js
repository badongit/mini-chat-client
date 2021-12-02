import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import './ButtonNavigate.scss';

ButtonNavigate.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
  ]).isRequired,
  styles: PropTypes.object,
  selected: PropTypes.bool,
};

ButtonNavigate.defaultProps = {
  onClick: () => null,
  styles: {},
  icon: null,
  children: null,
  selected: false,
};

export function ButtonNavigate(props) {
  const { icon, onClick, children, styles, selected } = props;

  const ButtonStyled = styled(Button)({
    ...styles,
  });
  return (
    <div className={`button-navigate ${selected ? 'selected' : ''}`}>
      <ButtonStyled
        startIcon={
          <Box sx={{ fontSize: styles.fontSize }} className='button-icon'>
            {icon}
          </Box>
        }
        onClick={onClick}
        fullWidth>
        {children}
      </ButtonStyled>
    </div>
  );
}
