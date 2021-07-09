import React from 'react';

const ErrorMsg = (props) => {
  const { msgError } = props;
  return (
    <p className="error-msg font-bold">
      <i className="fa fa-exclamation mr-1" aria-hidden="true"></i>
      {msgError}
    </p>
  );
};

export default ErrorMsg;