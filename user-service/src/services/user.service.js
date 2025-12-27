import UserDetails from "../model/UserDetail.js";


class UserSerivce {

    async createUser(data) {        
        const { userId } = data
        const createUser = await UserDetails.create({userId})
        return createUser
    }
    async updateUser(data) {
        
        const { updateUser, userId } = data
        const id =userId.id

        
        const updatedUser = await UserDetails.updateOne({ userId:id }, { $set: { ...updateUser } }, { new: true })
        console.log(updatedUser);
        
        return updatedUser
    }
    async getUsers(){
        const users = await UserDetails.find()
        return users
    }
    async getUser(id){
        const user = await UserDetails.findOne({userId:id})
        // console.log(user);
        
        return user
    }
}


export default new UserSerivce