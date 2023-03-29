
const host = 'http://localhost:8000/api';

const prependSlash = (url) => { return url.charAt(0) === '/' ? url : `/${url}`; }

export const get = (url, extractHydra = true) => {

  const response = fetch(`${host}/${url}`).then((response) => {
    return response.json();
  })

  if(extractHydra) {
    response.then((data) => {
      return data['hydra:member'];
    })
  }

  return response;


};

export const post = async (url, data, options) =>  {

  const defaultOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(`${host}${prependSlash(url)}`,  {...defaultOptions, ...options});

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

export const del = async (url) =>  {

  const response = await fetch(`${host}/${url}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
  });

  return response;
}
