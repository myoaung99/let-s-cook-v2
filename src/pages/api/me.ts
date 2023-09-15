import type {NextApiRequest, NextApiResponse} from 'next';
import connectDB from "@/lib/db-config";
import User from "@/Model/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const payload = JSON.stringify(req.body);
        const data = JSON.parse(payload)

        if (data.clerk_id) {
            await connectDB();
            const user = await User.findOne({clerk_id: data.clerk_id})
            if(user){
                res.status(200).json({user: user});
            }else{
                res.status(404).json({message: 'user not found'});
            }
        } else {
            res.status(400).json({message: 'bad request'});
        }
    }

}
