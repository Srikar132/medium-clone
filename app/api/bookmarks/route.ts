import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";


export async function POST(request : Request) {
    const session = await auth();

    if(!session?.id) {
        return Response.json({error : "Unauthorized"} , {status : 401});
    }

    const {postId} = await request.json();
    const userId = session?.id;

    const existingBookmark = await client.fetch(`
        *[_type == "bookmark" && author._ref == $userId && post._ref == $postId][0] 
    ` , {userId , postId});

    if(existingBookmark) {
        await writeClient.delete(existingBookmark._id);
        return Response.json({bookmared : false});
    }else {
        await writeClient.create({
            _type : "bookmark",
            author : {_type : "reference" , _ref : userId},
            post : {_type : "reference" , _ref : postId},
            createdAt : new Date().toISOString()
        });

        return Response.json({bookmarked : true});
    }
}