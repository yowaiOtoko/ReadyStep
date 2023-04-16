
const host = 'http://localhost:8000';

const prependSlash = (url) => { return url.charAt(0) === '/' ? url : `/${url}`; }

export const get = (url, {extractHydra = true, dateProperties = []} = {}) => {


  let response = fetch(`${host}/${url}`).then((response) => {
    return response.json();
  })

  return response.then((data) => {

    const isCollection = data['@type'] == 'hydra:Collection';
    if(isCollection && extractHydra){
      data = data['hydra:member'];
    }

    if(dateProperties.length > 0) {
      if(isCollection){
        data.forEach(d => parsePropertiesToDate(d, dateProperties))
      }else{
        data = parsePropertiesToDate(data, dateProperties)
      }
    }
    return data
  })

};

export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('fr-FR', formatting).format(new Date(value))
}

export const post = async (url, data, options, throwOnError = true) =>  {

  const defaultOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  return fetch(
    `${host}${prependSlash(url)}`,
    {...defaultOptions, ...options}
  ).then((response) => {

      if(throwOnError && response.status >= 400) {
        throw new Error(response.statusText);
      }

      return response.json();

    })
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

export const parseJwt = token => {

  try{

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);

  }catch(e){
    return null;
  }

}

export const parsePropertiesToDate = (obj, properties) => {

  function setKey(propertyPath, obj, transform) {

    const parts = propertyPath.split('.')
    const property = parts.slice(-1)
    const path = parts.slice(0, -1)

    const resolved = path.reduce(function(a, b) {
      return a && a[b]
    }, obj)

    if (resolved) {
      resolved[property] = transform(resolved[property])
    }

  }

  properties.forEach(p => {
    setKey(p, obj, val => {
      const dateObj = val ? new Date(val) : null
      return dateObj ? dateObj : null
    })
  })
  return obj
}
