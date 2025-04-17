import GoogleSvg from "@/components/design/GoogleSvg";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash } from "lucide-react";
import Image from "next/image";

const SettingTabs = ({ data }: { data: any }) => {
  return (
    <Tabs
      defaultValue="general"
      className="w-full mt-10  grid grid-cols-4 gap-6 bg-transparent"
    >
      <TabsList className="col-span-1 flex flex-col gap-1 bg-transparent rounded-lg  p-4 h-fit w-full space-y-4">
        <TabsTrigger
          value="general"
          className="w-full  py-1 px-2 font-medium text-base transition-colors rounded border-0 text-slate-700 "
        >
          General
        </TabsTrigger>
        <TabsTrigger
          value="edit-profile"
          className="w-full text-start py-1 px-2 font-medium text-base transition-colors rounded border-0 text-slate-700 "
        >
          Edit Profile
        </TabsTrigger>
        <TabsTrigger
          value="social-links"
          className="w-full text-start py-1 px-2 font-medium text-base transition-colors rounded border-0 text-slate-700"
        >
          Social Links
        </TabsTrigger>
        <div className="flex-grow"></div>
        <TabsTrigger
          value="delete-account"
          className="w-full text-start py-1 px-2 font-medium text-base text-red-500  transition-colors rounded border-0  flex items-center gap-2 mt-auto "
        >
          <Trash className="h-4 w-4" />
          <span>Delete Account</span>
        </TabsTrigger>
      </TabsList>

      <div className="flex-1 col-span-3">
        <TabsContent
          value="general"
          className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm"
        >
          <div>
            <h2 className="text-xl font-semibold mb-6">UserName</h2>
            <form>
              <div className="mb-6">
                <input
                  type="text"
                  name="username"
                  value={data?.username}
                  // onChange={handleChange}
                  placeholder="Username"
                  className="w-full px-4 py-2 border border-pink-300 rounded-xl focus:ring-pink-500 focus:border-pink-500"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Your URL: https://medium.com/
                  {data?.username || "username"}
                </p>
              </div>

              <h2 className="text-xl font-semibold mb-6 mt-8">Email</h2>
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Email address"
                  className="w-full px-4 py-2 border border-pink-300 rounded-xl focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <h2 className="text-xl font-semibold mb-6 mt-8">
                Google Sign-In
              </h2>
              <div className="mb-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg flex items-center gap-2"
                >
                  <GoogleSvg />
                  <span className="cursor-pointer">Google</span>
                </button>
                <p className="mt-2 text-sm text-gray-500">
                  Use Google, in addition to your username and password, to
                  access your account.
                </p>
              </div>

              <div className="mt-8 flex items-end justify-end">
                <Button className="rounded-xl">Save changes</Button>
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent
          value="edit-profile"
          className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm"
        >
          <div>
            <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
            <form>
              <div className="mb-6">
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Profile Picture
                </label>
                <div className="flex items-center gap-8">
                  {data?.image && (
                    <Image
                      src={data.image}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-full object-cover border border-pink-200"
                    />
                  )}
                  <div>
                    <label
                      htmlFor="fileUpload"
                      className="px-4 py-2 bg-pink-100 border border-pink-300 rounded-full hover:bg-pink-200 mt-4 cursor-pointer inline-block"
                    >
                      Choose File
                    </label>
                    <input type="file" id="fileUpload" className="hidden" />
                    <span className="ml-2 text-sm text-gray-500">
                      No file chosen
                    </span>
                    <p className="mt-2 text-xs text-gray-500">
                      Recommended: Square image, at least 400x400px
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={data?.name}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  defaultValue={data?.bio}
                  placeholder="Write a short bio about yourself"
                  rows={4}
                  className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                />
                <p className="text-sm text-gray-600">
                  Breif description about your profile
                </p>
              </div>

              <div className="mt-8 flex items-end justify-end">
                <button className="bg-slate-900 dark:bg-pink-400 px-4 py-2 rounded-full text-white">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent
          value="social-links"
          className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-6">Social Profiles</h2>
            <form>
              <div className="mb-6 px-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <div className="relative ">
                  <input
                    type="url"
                    placeholder="Linkedin URL"
                    defaultValue={data.socailLinks?.linkedin}
                    className="w-full pl-8 pr-4 py-2 border border-pink-400 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    name="LinkedIn"
                  />
                </div>
              </div>

              <div className="mb-6 px-4 ">
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  name="Instagram"
                  placeholder="Instagram URL"
                  defaultValue={data.socailLinks?.instagram}
                  className="w-full px-4 py-2 border border-pink-400 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <div className="mb-6 px-4 ">
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  placeholder="Facebook URL"
                  defaultValue={data.socailLinks?.facebook}
                  className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <div className="mt-8 flex items-end justify-end">
                <button className="bg-slate-900 cursor-pointer hover:bg-slate-800 dark:bg-pink-400 px-4 py-2 rounded-full text-white">
                  Save profile Changes
                </button>
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent
          value="delete-account"
          className="border border-red-100 rounded-lg p-6 bg-white shadow-sm"
        >
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-center mb-8">
              <Image
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

              <Button variant={"outline"} className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
                Delete my account
              </Button>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default SettingTabs;
