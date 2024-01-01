import connectToDB from "@/utils/database";
import User from "@/models/User";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const user = await User.findById(params.id);
        return new Response(JSON.stringify(user), {status: 200});
    } catch (error) {
        return new Response(`Err get user ${params.id}`, {status: 500});
    }
}

export const PATCH = async (request, { params }) => {
    try {
        await connectToDB();
        let user = await User.findById(params.id);
        const info = await request.json();
        const props = Object.keys(info);
        props.forEach(key => {
            user[key] = info[key]; 
        })
        await user.save();
        return new Response("Successfully updated the user", {status: 200});
    } catch (error) {
        return new Response(`Err edit user ${params.id}`, {status: 500});
    }
}
