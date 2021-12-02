import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import './InputDebounce.scss';

InputDebounce.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
  value: PropTypes.string,
  wait: PropTypes.number,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

InputDebounce.defaultProps = {
  value: '',
  wait: 0,
  name: 'keyword',
  placeholder: '',
};

export function InputDebounce(props) {
  const { onSubmit, icon: Icon, wait, name, placeholder } = props;
  const typingTimeoutRef = useRef(null);
  const [value, setValue] = useState(props.value);

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSubmit(value);
    }, wait);
  };

  return (
    <div className='input-debounce'>
      <TextField
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <label htmlFor={name}>
                <Icon fontSize='inherit' />
              </label>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
