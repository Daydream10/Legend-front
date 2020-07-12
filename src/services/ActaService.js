import api from '@/service/api.js'

export default class ActaService {
  url= 'http://localhost:8080/api/'
  getAll () {
    return api.get(this.url + 'listar')
  }

save (acta) {
  return api.post(this.url + 'save', acta)
}

edit (acta) {
  return api.post(this.url + 'editar', acta.getId())
}
}
