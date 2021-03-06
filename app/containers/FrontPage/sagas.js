import { take, call, put } from 'redux-saga/effects';
import {
  frontPagePostsLoaded,
  frontPagePostsError,
} from './actions';
import { LOAD_FRONT_PAGE_POSTS_PENDING } from './constants';
import { getGraphQL } from 'utils/api';

// Individual exports for testing
export function* loadFrontPageArticles() {
  const query = `query {
    frontPagePosts {
      id,
      title,
      slug,
      image,
      lead
    }
  }`;
  try {
    const result = yield call(getGraphQL, query);
    yield put(frontPagePostsLoaded(result.data.frontPagePosts));
  } catch (error) {
    yield put(frontPagePostsError());
  }
}

export function* loadFrontPageArticlesWatcher() {
  while (yield take(LOAD_FRONT_PAGE_POSTS_PENDING)) {
    yield call(loadFrontPageArticles);
  }
}

// All sagas to be loaded
export default [
  loadFrontPageArticlesWatcher,
];
