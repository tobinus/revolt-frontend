/*
 *
 * Player reducer
 *
 */

import { fromJS } from 'immutable';
import {
  PLAY_LIVE,
  GET_PODCAST_PLAYLIST_PENDING,
  GET_PODCAST_PLAYLIST_SUCCESS,
  GET_PODCAST_PLAYLIST_FAIELD,
  GET_ON_DEMAND_PLAYLIST_PENDING,
  GET_ON_DEMAND_PLAYLIST_SUCCESS,
  GET_ON_DEMAND_PLAYLIST_FAIELD,
  GET_LIVE_TITLE,
  PLAYER_STATUS,
  PLAY_ON_DEMAND_EPISODE,
  RESUME,
  PAUSE,
} from './constants';
import blankmp3 from './blank.mp3';

const initialState = fromJS({
  live: false,
  offset: 0,
  index: 0,
  playlist: false,
  loading: false,
  error: false,
  playingTitle: 'Radio Revolt',
  paused: true,
  url: null,
});

function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_LIVE:
      return state
        .set('live', true)
        .set('url', 'https://direkte.radiorevolt.no/revolt.ogg')
        .set('paused', false)
        .set('offset', action.offset);
    case GET_PODCAST_PLAYLIST_PENDING:
      return state.set('loading', true).set('error', false);
    case GET_PODCAST_PLAYLIST_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('live', false)
        .set('playlist', action.playlist)
        .set('index', action.index)
        .set('offset', action.offset);
    case GET_PODCAST_PLAYLIST_FAIELD:
      return state.set('loading', false).set('error', true);
    case GET_ON_DEMAND_PLAYLIST_PENDING:
      return state
        .set('loading', true)
        .set('error', false)
        .set('paused', false)
        .set('url', blankmp3);
    case GET_ON_DEMAND_PLAYLIST_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('playlist', action.playlist);
    case PLAY_ON_DEMAND_EPISODE: {
      // Might be triggered before playlist has loaded
      if (state.get('loading')) {
        return state;
      }
      const episode = state.get('playlist')[action.index];
      return state
        .set('paused', false)
        .set('live', false)
        .set('index', action.index)
        .set('offset', action.offset)
        .set('url', episode.url)
        .set('playingTitle', `${episode.show}: ${episode.title}`);
    }
    case GET_ON_DEMAND_PLAYLIST_FAIELD:
      return state.set('loading', false).set('error', true);
    case GET_LIVE_TITLE: {
      if (!state.get('live')) {
        return state;
      }
      return state.set('playingTitle', action.liveTitle);
    }
    case RESUME:
      return state.set('paused', false);
    case PAUSE:
      return state.set('paused', true);
    case PLAYER_STATUS:
      return state.set('paused', action.paused);
    default:
      return state;
  }
}

export default playerReducer;
