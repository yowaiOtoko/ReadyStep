
const host = 'http://localhost:8001/api';
export const get = (url) => {

  return fetch(`${host}/${url}`).then((response) => {
    return response.json();
  })


};

export const post = async (url, data, options) =>  {

  const defaultOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(`${host}/${url}`,  {...defaultOptions, ...options});

  const resData = await response.json();

  return resData;
}

export const put = async (url, data) =>  {

  const response = await fetch(`${host}/${url}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const resData = await response.json();

  return resData;
}
