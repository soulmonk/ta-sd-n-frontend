class JwtService {
  constructor () {
    this.token = ''
  }

  getToken () {
    return this.token
  }

  saveToken (token) {
    this.token = token
  }

  destroyToken () {
    this.token = ''
  }
}

export default new JwtService()
