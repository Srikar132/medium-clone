"use client";

import SettingTabs from "@/components/SettingTabs";
import { useFetch } from "@/hooks/useFetch";
import { updateProfile } from "@/lib/actions";
import { profileSchema } from "@/lib/validations";
import { fetchAuthor, uploadImageToSanity } from "@/sanity/lib/fetches";
import { Author } from "@/sanity/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import {z} from "zod";




const page = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data, isLoading , refresh } = useFetch<Author>(fetchAuthor , null);



  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {

      const username =  formData.get("username") as string;
      const email =  formData.get("email") as string;
      const name = formData.get("name") as string;
      const bio = formData.get("bio") as string;
      const profilePic = formData.get("profile") as File;
      const linkedin = formData.get("linkedin") as string;
      const instagram = formData.get("instagram") as string;
      const facebook = formData.get("facebook") as string;

      let imageURL = data.image as string;

      if(profilePic && profilePic.size > 0) {
        imageURL = await uploadImageToSanity(profilePic);
      }



      const formValues = {
        username : username || data.username,
        email : email || data.email,
        name : name || data.name,
        bio : bio || data.bio,
        image: imageURL,
        linkedin: linkedin || data.socialLinks?.linkedin,
        instagram: instagram || data.socialLinks?.instagram,
        facebook: facebook || data.socialLinks?.facebook
      };


      
      

      await profileSchema.parseAsync(formValues);


      const result = await updateProfile(prevState, formValues as FormValues);

      if (result.status == "SUCCESS") {
        toast("Your profile is updated successfully");
        refresh();
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast("Please check your inputs and try again");

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("An unexpected error has occurred");

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };



  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="w-full flex items-center justify-center md:mt-2 min-h-screen">
      {isLoading ? (
        <div className="rounded-full w-10 h-10 border-4 border-t-pink-500 border-gray-400 animate-spin"/>
      ) : (
        <div className="py-6 w-full max-w-5xl px-2 sm:px-6 lg:px-8">
          <div className="flex flex-row gap-8 mx-auto">
            <div className="flex items-center gap-4 mb-8">
              
                <Image
                  src={data?.image || "/default-avatar.jpg"}
                  alt="profile"
                  width={64}
                  height={64}
                  className="rounded-full object-cover border border-gray-200"
                />
              
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{data?.name}</h1>
              <p className="text-gray-600">
                Update Your Username and manage your account
              </p>
            </div>
          </div>

          <SettingTabs 
            data={data}  
            formAction={formAction} 
            errors={errors}
            isPending={isPending}
          />
        </div>
      )}
    </div>
  );
};

export default page;
