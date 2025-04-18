"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";

export const updateProfile = async (
  state: any,formValues : FormValues
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }



  const {
    username,
    email,
    image,
    name,
    bio ,
    linkedin ,
    instagram ,
    facebook ,
  } = formValues;

  try {
    const doc = {
      username,
      email,
      image,
      name,
      bio,
      socialLinks: {
        linkedin,
        instagram,
        facebook,
      },
    };

    await writeClient
      .patch(session.id) 
      .set(doc)
      .commit();

    return parseServerActionResponse({
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Sanity update error:", error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
