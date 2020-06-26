let apiUrl
const apiUrls = {
  production: 'https://ezstore-server.herokuapp.com',
  development: 'https://ezstore-server.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
