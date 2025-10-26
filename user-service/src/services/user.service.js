import UserDetails from "../model/UserDetail.js";


class UserSerivce {

    async createUser(data) {        
        const { userId } = data
        const createUser = await UserDetails.create({userId})
        return createUser
    }
    async addingUserData(data) {
        const { addUserData, userId } = data
        const addData = await UserDetails.updateOne({ userId }, { $set: { ...addUserData } }, { new: true })
        return addData
    }
    async updateUser(data) {
        const { updateUser, userId } = data
        const updatedUser = await UserDetails.updateOne({ userId }, { $set: { ...updateUser } }, { new: true })
        return updatedUser
    }
}


export default new UserSerivce