/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
import BASE_URL from '../config';

export const warsAPI = {
  fetchCharacters: ({ pageParam = BASE_URL + 1 }) =>
    fetch(pageParam).then(res => res.json()),
};

export default warsAPI;
