import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import styles from './styles.scss';
import CategoryTag from 'components/common/tag/CategoryTag';

const ShowPreview = props => {
  let categories;
  if (props.categories && props.categories.length > 0) {
    categories = props.categories.map((category, index) => (
      <CategoryTag {...category} index={index} position={'top'} key={index} />
    ));
  }

  return (
    <div className={styles.container}>
      {categories}
      <div className={styles.padding}>
        <div className={styles.imageWrapper}>
          <Link to={`/programmer/${props.slug}`}>
            <LazyLoad height={300} offset={100} once>
              <img
                className={styles.image}
                src={props.logoImageUrl}
                alt={props.title}
              />
            </LazyLoad>
          </Link>
        </div>
        <Link className={styles.title} to={`/programmer/${props.slug}`}>
          <h2>{props.title}</h2>
        </Link>
        <div>{props.lead}</div>
      </div>
    </div>
  );
};

ShowPreview.propTypes = {
  title: PropTypes.string.isRequired,
  logoImageUrl: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  lead: PropTypes.string.isRequired,
  categories: PropTypes.array,
};

export default ShowPreview;