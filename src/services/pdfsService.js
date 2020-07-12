import api from '@/services/api'

export default {
  getPdf (id) {
    return api.get(`/pdf/downloadFile/${id}`)
  },
  createPdf (pdf) {
    return api.post('/pdf/uploadFile', pdf)
  },
}
