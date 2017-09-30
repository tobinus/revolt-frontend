/**
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, Switch, withRouter } from 'react-router-dom';

import pngLogo from './RR_logo.png';
import styles from './styles.css';

import Footer from 'components/Footer';
import HeaderLiveButton from 'components/HeaderLiveButton';

import Player from 'components/Player';
import { playLive } from 'components/Player/actions';

const navbarLinks = [
  {
    path: '/',
    title: 'Hjem',
  },
  {
    path: '/programmer',
    title: 'Programmer',
  },
];

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    changeRoute: React.PropTypes.func.isRequired,
    playLive: React.PropTypes.func.isRequired,
    routes: React.PropTypes.array.isRequired,
  };

  render() {
    const navbarItems = navbarLinks.map((link, index) => (
      <li key={`item-${index}`} className={styles.navbarItem}>
        <Link
          className={styles.navbarLink}
          style={{ textDecoration: 'none', color: 'inherit' }}
          to={link.path}
        >
          {link.title}
        </Link>
      </li>
    ));

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <button
            className={styles.liveButton}
            onClick={this.props.playLive}
            onKeyPress={this.props.playLive}
          >
            <HeaderLiveButton />
          </button>
          <Link className={styles.logoLink} to="/">
            <img src={pngLogo} alt="Logo" className={styles.logo} />
          </Link>
          <div className={styles.navbarContainer}>
            <ul className={styles.navbar}>{navbarItems}</ul>
          </div>
        </header>
        <div className={styles.content}>
          <Switch>{this.props.routes}</Switch>
        </div>
        <Footer />
        <Player />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    playLive: (offset = 0) => dispatch(playLive(offset)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
