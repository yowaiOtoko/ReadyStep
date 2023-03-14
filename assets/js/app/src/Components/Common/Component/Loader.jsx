import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => {

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Spinner style={{ width: '3rem', height: '3rem' }} />
    </div>
  )
};

export default Loader;