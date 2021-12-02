import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Hidden } from '@material-ui/core';
import { ButtonNavigate } from '@components/index';

NavigateBar.propTypes = {
  layout: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object.isRequired,
      key: PropTypes.string.isRequired,
      handleClick: PropTypes.func.isRequired,
      text: PropTypes.string,
    }),
  ).isRequired,
  fontSize: PropTypes.string,
  hiddenText: PropTypes.object,
};

NavigateBar.defaultProps = {
  fontSize: '30px',
  hiddenText: {
    xsDown: true,
  },
};

export function NavigateBar(props) {
  const { layout, buttons, fontSize, hiddenText } = props;
  const stylesButton = {
    fontSize: `${fontSize} !important`,
  };

  const _renderButton = ({ icon, key, handleClick, text }) => {
    const Icon = icon;

    return (
      <Grid item xs key={key}>
        <ButtonNavigate
          icon={<Icon fontSize='inherit' />}
          styles={stylesButton}
          onClick={handleClick}
          selected={layout === key}>
          <Hidden {...hiddenText}>{text}</Hidden>
        </ButtonNavigate>
      </Grid>
    );
  };

  return (
    <div>
      <Grid container>{buttons.map(_renderButton)}</Grid>
    </div>
  );
}
