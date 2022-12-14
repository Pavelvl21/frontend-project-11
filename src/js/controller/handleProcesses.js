/* eslint-disable no-param-reassign */

import loadFeeds from './loadFeeds.js';
import validateUrl from './utils/validate.js';

export default (watchedState) => (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const rssLink = Object.fromEntries(formData).url;
  const loadedFeeds = Array.from(watchedState.loadedFeeds);

  validateUrl(rssLink, loadedFeeds)
    .then(({ url }) => {
      watchedState.processes.processState = 'loading';
      loadFeeds(url, watchedState);
    })
    .catch((error) => {
      watchedState.processes.processState = 'filling';
      watchedState.processes.processError = error.message;
    });
};
