import session from './session'

export default {
  login(email, password) {
    return session.post('/api/auth/login/', { email, password })
  },
  logout() {
    return session.post('/api/auth/logout/', {})
  },
  createAccount(
    email,
    password1,
    password2,
    nombre,
    apellido,
    direccion,
    telefono,
    tipo_usuario
  ) {
    return session.post('/api/auth/registration/', {
      email,
      password1,
      password2,
      nombre,
      apellido,
      direccion,
      telefono,
      tipo_usuario,
    })
  },
  changeAccountPassword(payload) {
    return session.post('/api/auth/password/change/', payload)
  },
  sendAccountPasswordResetEmail(email) {
    return session.post('/api/auth/password/reset/', { email })
  },
  resetAccountPassword(uid, token, new_password1, new_password2) {
    // eslint-disable-line camelcase
    return session.post('/api/auth/password/reset/confirm/', {
      uid,
      token,
      new_password1,
      new_password2,
    })
  },
  getAccountDetails() {
    return session.get('/api/auth/user/')
  },
  updateAccountDetails(payload) {
    return session.patch('/api/auth/user/', payload)
  },
  verifyAccountEmail(key) {
    return session.post('/api/registration/verify-email/', { key })
  },
}
