"use server"
import connectDb from "@/db/connectDb"
import User from "@/modals/User"
export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }   
        await User.updateOne({email: ndata.email}, ndata)
        
    }
    else{

        
        await User.updateOne({email: ndata.email}, ndata)
    }


}