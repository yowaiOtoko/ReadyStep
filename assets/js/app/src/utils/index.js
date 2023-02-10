import data from "layouts/tables/data/authorsTableData";

const host = 'http://localhost:8001/api';
export const get = (url) => {

  return fetch(`${host}/${url}`).then((response) => {
    return response.json();
  })


};
