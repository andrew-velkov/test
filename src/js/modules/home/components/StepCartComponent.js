import React from 'react';

const styles = {
  content: {
    margin: 'auto',
    textAlign: 'right',
  },
  title: {
    fontWeight: 600,
    fontSize: '2.4rem',
  },
  text: {
    color: '#999',
  },
};

const StepCartComponent = ({ total }) => (
  <div style={styles.content}>
    <p>Total</p>
    <h1 style={styles.title}>
      <span>$ </span>
      {total.toFixed(2)}
    </h1>
    <p style={styles.text}>Confirm your action, please!</p>
  </div>
);

export default StepCartComponent;
