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

        const recipeId = data.recipeId;
        const status = data.status

        if (data.userId) {
            await connectDB();
            const user = await User.findOne({clerk_id: data.userId})

            if (user) {
                const bookmarks = user.bookmarks;
                let updatedBookmark;
                if (status === 'ADD_BOOKMARK') {
                    updatedBookmark = [...bookmarks, recipeId]
                } else if (status === 'REMOVE_BOOKMARK') {
                    updatedBookmark = bookmarks.filter((bookmark: string) => bookmark !== recipeId)
                }
                const update = {$set: {bookmarks: updatedBookmark}};
                const newUser = await user.updateOne(update);
                res.status(201).json({user: newUser});
            }
            else {
                res.status(404).json({message: 'user not found'});
            }
        }
    }

}
