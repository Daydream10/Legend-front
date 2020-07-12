/* eslint-disable */
import Cookies from 'js-cookie'
export default function authHeader () {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken,
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),}
  } else {
    return {}
  }
}
