import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const NotFound = () => (
  <div style={{ textAlign: 'center' }}>
    <h2>404 Not Found</h2>
    <Button fullwidth variant="contained" color="secondary">
      <Link to="/" style={{ color: '#fff' }}>
        Back to home
      </Link>
    </Button>
  </div>
);

export default NotFound;
