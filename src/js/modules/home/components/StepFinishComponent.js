import React from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Fab, Icon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'inherit',
    flexDirection: 'column',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonFab: {
    backgroundColor: 'rgba(97, 62, 234, 0.1) !important',
    boxShadow: 'none',
    height: '12rem',
    width: '12rem',
  },
  buttonSuccess: {
    '&:hover': {
      backgroundColor: 'rgba(97, 62, 234, 0.3) !important',
    },
  },
  fabProgress: {
    color: 'rgba(97, 62, 234, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  iconOther: {
    fontSize: 38,
    color: 'rgba(97, 62, 234, 0.7)',
  },
  iconCheck: {
    fontSize: 38,
    color: '#613EEA',
  },
  done: {
    fontFamily: "'Sarabun', sans-serif",
    fontWeight: 600,
    fontSize: '2.2rem',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '0.1px',
    color: '#613EEA',
  },
}));

export default function StepFinishComponent() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = cx(classes.buttonFab, {
    [classes.buttonSuccess]: success,
  });

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 5000);
    }
  };

  React.useEffect(() => {
    handleButtonClick();
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {success ? (
            <Icon className={classes.iconCheck}>check</Icon>
          ) : (
            <Icon className={classes.iconOther}>rowing_icon</Icon>
          )}
        </Fab>
        {loading && <CircularProgress size={120} thickness={0.5} className={classes.fabProgress} />}
      </div>
      <h2 className={classes.done}>Done</h2>
    </div>
  );
}
