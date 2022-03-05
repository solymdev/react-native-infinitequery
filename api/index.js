/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
import BASE_URL from '../config';

export const warsAPI = {
  fetchCharacters: ({ pageParam = BASE_URL + 1 }) =>
    fetch(pageParam).then(res => {
      console.log(`param:${pageParam}`);
      console.log(pageParam);
      console.log(`res:${res}`);
      return res.json();
    }),
};

export default warsAPI;
