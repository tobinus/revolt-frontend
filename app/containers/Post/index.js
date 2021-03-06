/*
 *
 * Post
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import {
  selectPost,
  selectPostLoading,
  selectPostError,
} from './selectors';
import { loadPost } from './actions';
import styles from './styles.css';

export class Post extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.loadPost(this.props.params.slug);
    moment.locale('NB_no', {
      calendar: {
        lastDay: '[I går] HH:mm',
        sameDay: '[I dag] HH:mm',
        nextDay: '[I morgen] HH:mm',
        sameElse: 'DD.MM.YY HH:mm',
      },
    });
  }

  getNormalizedDateString(dateString) {
    const paddedString = i => (i < 10 ? `0${i}` : `${i}`);

    const date = moment(dateString);
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();

    return `${paddedString(day)}.${paddedString(month)}.${year}`;
  }

  render() {
    if (this.props.loading || this.props.post === false) {
      return <div></div>;
    }

    const time = this.getNormalizedDateString(this.props.post.publishAt);

    return (
      <div className={styles.post}>
        <h1 className={styles.title}>{this.props.post.title}</h1>
        <div className={styles.meta}>
          <span className={styles.createdBy}>{this.props.post.createdBy.fullName}, </span>
          <span className={styles.createdAt}>{time}</span>
        </div>
        <p className={styles.body} dangerouslySetInnerHTML={{ __html: this.props.post.content }}></p>
      </div>
    );
  }
}

Post.propTypes = {
  post: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]),
  params: React.PropTypes.object,
  loadPost: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.bool,
  isAuthenticated: React.PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  post: selectPost(),
  loading: selectPostLoading(),
  error: selectPostError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPost: (slug) => dispatch(loadPost(slug)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
