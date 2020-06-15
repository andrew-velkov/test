import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
/* eslint-disable */
import { addNotification, removeNotification } from 'actions';
import Message from 'components/Notifications/message';

import css from 'styles/components/Notifications.scss';

class Notifications extends Component {
  removeNotification = (id) => {
    const { removeNotificationAction } = this.props;
    removeNotificationAction(id);
  };

  handleRemove = (id) => (e) => {
    e.preventDefault();
    this.removeNotification(id);
  };

  render() {
    const {
      notifications: { data },
    } = this.props;

    return (
      <section>
        <TransitionGroup className={cx(css.notifications)} component="ul">
          {data.map((notice) => (
            <CSSTransition
              con
              key={notice.id}
              timeout={{ enter: 800, exit: 500 }}
              classNames="item"
            >
              <Message
                notice={notice}
                handleRemove={this.handleRemove}
                removeNotification={this.removeNotification}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </section>
    );
  }
}

export default connect(
  (state) => ({
    notifications: state.get.notifications,
  }),
  (dispatch) => ({
    addNotificationAction: (data) => dispatch(addNotification(data)),
    removeNotificationAction: (data) => dispatch(removeNotification(data)),
  }),
)(Notifications);
