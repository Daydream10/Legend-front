import api from '@/services/api'
export default {
  /*getAllNotifications() {
    return api.get('/inbox/notifications/api/all_list/')
  },*/
  getAllNotifications() {
    return api.get('/inbox/notifications/api/unread_list/?max=100')
  },
  getUnReadNotifications() {
    return api.get('/inbox/notifications/api/unread_list/')
  },
}
