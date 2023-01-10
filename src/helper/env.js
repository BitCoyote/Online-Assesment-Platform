const {
    REACT_APP_SECRET_VALUE
  } =
    /* istanbul ignore next */
    process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
      ? process.env
      : (window).__env__;
  
  export const env = {
    REACT_APP_SECRET_VALUE: REACT_APP_SECRET_VALUE,
  };
  
  