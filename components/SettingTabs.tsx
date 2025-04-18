import GoogleSvg from "@/components/design/GoogleSvg";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash } from "lucide-react";
import Image from "next/image";
import UploadProfile from "./UploadProfile";
import { Author } from "@/sanity/types";

const SettingTabs = ({ data, formAction, errors, isPending }: { data: Author, formAction: (payload: FormData) => void, errors: Record<string, string>, isPending: boolean }) => {

  return (
    <Tabs
      defaultValue="general"
      className="w-full mt-10 grid grid-rows-[fit-content(0)_auto] md:grid-cols-4 gap-6 bg-transparent"
    >
      <TabsList className="col-span-1 flex md:flex-col gap-1 bg-transparent rounded-lg p-4 h-fit w-full space-y-4 max-md:overflow-x-auto">
        <TabsTrigger
          value="general"
          className="w-full py-1 px-2 font-medium text-base transition-colors rounded border-0 text-slate-700"
        >
          General
        </TabsTrigger>
        <TabsTrigger
          value="edit-profile"
          className="w-full text-start py-1 px-2 font-medium text-base transition-colors rounded border-0 text-slate-700"
        >
          Edit Profile
        </TabsTrigger>
        <TabsTrigger
          value="social-links"
          className="w-full text-start py-1 px-2 font-medium text-base transition-colors rounded border-0 text-slate-700"
        >
          Social Links
        </TabsTrigger>
        <div className="flex-grow hidden md:block"></div>
        <TabsTrigger
          value="delete-account"
          className="w-full text-start py-1 px-2 font-medium text-base text-red-500 md:flex md:items-center md:gap-2 md:mt-auto"
        >
          <Trash className="h-4 w-4" />
          <span>Delete Account</span>
        </TabsTrigger>
      </TabsList>

      <form action={formAction} className="flex-1 md:col-span-3">
        <TabsContent
          value="general"
          className="border border-slate-200 rounded-lg p-2 md:p-6 bg-white shadow-sm"
        >
          <div>
            <label htmlFor="username" className="edit-form_label">UserName</label>
            <div>
              <div className="mb-6">
                <input
                  type="text"
                  id="username"
                  name="username"
                  defaultValue={data?.username}
                  placeholder="Username"
                  className="edit-form_input"
                  required
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Your URL: https://medium.com/
                  {data?.username || "username"}
                </p>
              </div>

              <label htmlFor="email" className="edit-form_label">Email</label>
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  defaultValue={data.email}
                  placeholder="Email address"
                  className="edit-form_input"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <h2 className="text-xl font-semibold mb-6 mt-8">
                Google Sign-In
              </h2>
              <div className="mb-6">
                <Button
                  type="button"
                  className="invert"
                >
                  <GoogleSvg />
                  <span className="cursor-pointer">Google</span>
                </Button>
                <p className="mt-2 text-sm text-gray-500">
                  your account is connected through google to out community.
                </p>
              </div>

              <div className="mt-8 flex items-end justify-end">
                <Button type="submit" className="rounded-xl" disabled={isPending}>
                  {isPending ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="edit-profile"
          className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm"
        >
          <div>
            <h2 className="edit-form_label">Edit Profile</h2>
            <div>
              <div className="mb-6">
                <UploadProfile actualImageURL={data.image!} />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="name" className="edit-form_label-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={data?.name}
                  placeholder="Your name"
                  className="edit-form_input"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="bio" className="edit-form_label-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  defaultValue={data?.bio}
                  placeholder="Write a short bio about yourself"
                  rows={4}
                  className="edit-form_input"
                />
                {errors.bio && (
                  <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
                )}
                <p className="text-sm text-gray-600">
                  Brief description about your profile
                </p>
              </div>

              <div className="mt-8 flex items-end justify-end">
                <Button type="submit" className="rounded-xl" disabled={isPending}>
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="social-links"
          className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm"
        >
          <div>
            <h2 className="edit-form_label">Social Profiles</h2>
            <div>
              <div className="mb-6 px-4">
                <label htmlFor="linkedin" className="edit-form_label-2">
                  LinkedIn
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="linkedin"
                    id="linkedin"
                    placeholder="LinkedIn URL"
                    defaultValue={data.socialLinks?.linkedin || ""}
                    className="edit-form_input"
                  />
                  {errors.linkedin && (
                    <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>
                  )}
                </div>
              </div>

              <div className="mb-6 px-4">
                <label htmlFor="instagram" className="edit-form_label-2">
                  Instagram
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  placeholder="Instagram URL"
                  defaultValue={data.socialLinks?.instagram || ""}
                  className="edit-form_input"
                />
                {errors.instagram && (
                  <p className="text-red-500 text-sm mt-1">{errors.instagram}</p>
                )}
              </div>

              <div className="mb-6 px-4">
                <label htmlFor="facebook" className="edit-form_label-2">
                  Facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  id="facebook"
                  placeholder="Facebook URL"
                  defaultValue={data.socialLinks?.facebook || ""}
                  className="edit-form_input"
                />
                {errors.facebook && (
                  <p className="text-red-500 text-sm mt-1">{errors.facebook}</p>
                )}
              </div>

              <div className="mt-8 flex items-end justify-end">
                <Button type="submit" className="rounded-xl" disabled={isPending}>
                  {isPending ? "Saving..." : "Save profile Changes"}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="delete-account"
          className="border border-red-100 rounded-lg p-6 bg-white shadow-sm"
        >
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-center mb-8">
              <Image
                width={100}
                height={100}
                src="/delete-sad.jpg"
                alt="Decorative scribble illustration"
                className="w-full h-auto"
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              We're sorry to see you go
            </h1>

            <p className="text-gray-600 mb-2">
              If you'd like to reduce your email notifications, you can{" "}
              <a href="#" className="text-blue-600 hover:underline">
                disable them here
              </a>{" "}
              or if you just want to change your username, you can{" "}
              <a href="#" className="text-blue-600 hover:underline">
                do that here
              </a>
              .
            </p>

            <p className="text-gray-600 mb-8">
              Be advised, account deletion is final. There will be no way to
              restore your account.
            </p>

            <div className="flex space-x-4">
              <Button className="bg-gray-800 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-700 transition-colors">
                Nevermind
              </Button>

              <Button
                variant={"outline"}
                className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Delete my account"}
              </Button>
            </div>
          </div>
        </TabsContent>
      </form>
    </Tabs>
  );
};

export default SettingTabs;