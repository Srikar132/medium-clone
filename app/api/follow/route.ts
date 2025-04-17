import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";


export async function POST(request: Request) {


    try {
        const { authorId, userId } = await request.json();

        if (!userId || !authorId) {
            return Response.json({ error: "Unathourized" }, { status: 401 });
        }

        if (userId === authorId) {
            return Response.json({ error: "You cannot follow yourself" }, { status: 400 })
        }

        const existingFollow = await client.fetch(`
            *[_type == "follow" && follower._ref == $userId && following._ref == $authorId][0]
        ` , { userId, authorId });


        if (existingFollow) {
            await writeClient.delete(existingFollow._id);
            return Response.json({ followed: true });
        } else {
            await writeClient.create({
                _type: "follow",
                follower: { _type: "reference", _ref: userId },
                following: { _type: "reference", _ref: authorId },
                createdAt: new Date()
                    .toISOString()
            });

            return Response.json({ followed: true });

        }



    } catch (error) {
        console.log(error);
    }

}