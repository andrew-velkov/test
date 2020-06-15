import React, { Component } from 'react';
import cx from 'classnames';
import { LinearProgress, IconButton, Icon } from '@material-ui/core';

import css from 'styles/components/Notifications.scss';

const MESSAGES = {
  error: {
    id: 1,
    type: 'error',
    title: 'Error',
    icon: 'error_outline',
  },
  info: {
    id: 2,
    type: 'info',
    title: 'Information',
    icon: 'info_outline',
  },
  success: {
    id: 3,
    type: 'success',
    title: 'Success',
    icon: 'check_circle',
  },
  warning: {
    id: 4,
    type: 'warning',
    title: 'Warning',
    icon: 'warning',
  },
};

class Message extends Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.initTimer();
  }

  componentWillUnmount() {
    this.deleteTimer();
  }

  onEnter = () => {
    this.deleteTimer();
  };

  onLeave = () => {
    this.initTimer();
  };

  progress = (completed) => {
    const {
      removeNotification,
      notice: { id },
    } = this.props;
    if (completed >= 100) {
      this.setState({
        completed: 100,
      });
      setTimeout(() => removeNotification(id), 500);
    } else {
      this.setState({ completed }, () => {
        this.timer = setTimeout(() => this.progress(completed + 3), 100);
      });
    }
  };

  initTimer = () => {
    this.timer = setTimeout(() => this.progress(2), 1000);
  };

  deleteTimer = () => {
    clearTimeout(this.timer);
    this.setState({ completed: 0 });
  };

  render() {
    const { notice, handleRemove } = this.props;
    const { completed } = this.state;

    return (
      <li
        className={css.notifications__item}
        onMouseEnter={this.onEnter}
        onMouseLeave={this.onLeave}
      >
        <div className={css.notifications__content}>
          <div className={css.notifications__wrap}>
            <div
              className={cx(
                css.notifications__icon,
                css[`notifications__icon_${MESSAGES[notice.type].type}`],
              )}
            >
              <Icon>{MESSAGES[notice.type].icon}</Icon>
            </div>
            <div>
              <h5
                className={cx(
                  css.notifications__title,
                  css[`notifications__title_${MESSAGES[notice.type].type}`],
                )}
              >
                {MESSAGES[notice.type].title}
              </h5>
              <p className={css.notifications__text}>{notice.text}</p>
              <IconButton className={css.notifications__close} onClick={handleRemove(notice.id)}>
                <Icon>close</Icon>
              </IconButton>
            </div>
            <LinearProgress
              className={cx(
                css.notifications__progress,
                css[`notifications__progress_${MESSAGES.type}`],
              )}
              variant="determinate"
              value={completed}
            />
          </div>
        </div>
      </li>
    );
  }
}

export default Message;
