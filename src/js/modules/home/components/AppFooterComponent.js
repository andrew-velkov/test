import React from 'react';
import { Button } from '@material-ui/core';

import css from 'styles/components/Footer.scss';

const AppFooterComponent = ({ handleNext, buttonName, disabled }) => (
  <footer className={css.footer}>
    <Button
      fullWidth
      variant="contained"
      color="primary"
      size="large"
      disabled={disabled}
      onClick={handleNext}
    >
      {buttonName}
    </Button>
  </footer>
);

export default AppFooterComponent;
