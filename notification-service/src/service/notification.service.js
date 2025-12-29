import Notification from "../model/Notification.js";


class NotificationService {

  async createNotification(data) {

    await Notification.create({
      userId: data.userId,
      type: data.type,
      message: data.message,
    })
  }

  async getNotficationByUser(id) {
    const notifications = await Notification.find({ userId: id })
    console.log(notifications);
    return notifications
  }

  async viewNotification(id) {
    const viewedNoti = await Notification.findByIdAndUpdate(id, { seen: true }, { new: true })
    return viewedNoti
  }
}


export default new NotificationService