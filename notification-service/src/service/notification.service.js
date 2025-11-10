import Notification from "../model/Notification.js";


class NotificationService {

    async createNotification(data) {
        
        await Notification.create({
          userId: data.userId,
          type: data.type,
          message: data.message,
        })
    }
}


export default new NotificationService