"use client";

import SettingTabs from "@/components/SettingTabs";
import { useFetch } from "@/hooks/useFetch";
import { updateProfile } from "@/lib/actions";
import { profileSchema } from "@/lib/validations";
import { fetchAuthor, uploadImageToSanity } from "@/sanity/lib/fetches";
import { urlFor } from "@/sanity/lib/image";
import { Author } from "@/sanity/types";
import Image from "next/image";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const ProfileSettingsPage = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data, isLoading, refresh } = useFetch<Author>(fetchAuthor, null);

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const username = formData.get("username") as string;
      const email = formData.get("email") as string;
      const name = formData.get("name") as string;
      const bio = formData.get("bio") as string;
      const profilePic = formData.get("profile") as File;
      const linkedin = formData.get("linkedin") as string;
      const instagram = formData.get("instagram") as string;
      const facebook = formData.get("facebook") as string;

      // Only attempt to process the image if we have data
      let imageURL = data?.image as string;

      if (profilePic && profilePic.size > 0) {
        const asset = await uploadImageToSanity(profilePic);
        imageURL = urlFor(asset).url() as string;
      }

      const formValues = {
        username: username || data?.username || "",
        email: email || data?.email || "",
        name: name || data?.name || "",
        bio: bio || data?.bio || "",
        image: imageURL || "",
        linkedin: linkedin || data?.socialLinks?.linkedin || "",
        instagram: instagram || data?.socialLinks?.instagram || "",
        facebook: facebook || data?.socialLinks?.facebook || ""
      };

      await profileSchema.parseAsync(formValues);

      const result = await updateProfile(prevState, formValues);

      if (result.status === "SUCCESS") {
        toast.success("Your profile was updated successfully", {
          duration: 3000,
        });
        refresh();
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("Please check your inputs and try again", {
          duration: 5000,
        });
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("An unexpected error occurred", {
        duration: 5000,
      });

      return {
        ...prevState,
        error: "An unexpected error occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="w-full flex items-center justify-center md:mt-2 min-h-screen bg-gradient-to-b from-background to-background/80 transition-colors duration-300">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="rounded-full w-10 h-10 border-4 border-t-primary border-muted animate-spin" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      ) : (
        <div className="py-6 w-full max-w-5xl px-2 sm:px-6 lg:px-8">
          <div className="flex flex-row gap-8 mx-auto items-center">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-lg">
                <Image
                  src={data?.image || "/default-avatar.jpg"}
                  alt="profile"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{data?.name}</h1>
              <p className="text-muted-foreground">
                Update your profile settings and manage your account
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

export default ProfileSettingsPage;