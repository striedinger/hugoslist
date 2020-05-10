import fetch from 'isomorphic-unfetch';
const localStorageKey = '__HL_TOKEN__';

const client = (endpoint, {body, ...customConfig} = {}) => {
  const token = window.localStorage.getItem(localStorageKey);
  const headers = {'Content-Type': 'application/json'};
  if (token) headers.Authorization = `Bearer ${token}`;
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };
  if (body) config.body = JSON.stringify(body);
  return fetch(endpoint, config)
    .then(async response => {
      if (response.status === 401) {
        // Should logout here
      }
      if (!response.ok) return Promise.reject(response.statusText);
      return await response.json();
    })
};

export default client;