import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";


export async function POST(request : Request) {


    const {postId , userId} = await request.json();


    const existingLike = await client.fetch(`
        *[_type == "like" && user._ref == $userId && post._ref == $postId][0]
    ` , {postId , userId});

    if(existingLike) {
        await writeClient.delete(existingLike._id);
        return Response.json({liked : false});
    }else {
        await writeClient.create({
            _type: 'like',
            user: { _type: 'reference', _ref: userId },
            post: { _type: 'reference', _ref: postId },
            createdAt: new Date().toISOString()
          });
          return Response.json({ liked: true });
    }

}