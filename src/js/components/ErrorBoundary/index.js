import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div>
          <h3>
            <span style={{ color: 'red' }}>Error! </span>
            Something went wrong!
          </h3>
          <Button size="small" color="primary" variant="contained" href="/">
            Back to home!
          </Button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
