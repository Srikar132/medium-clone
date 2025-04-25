// SettingTabs.tsx
import { useState } from "react";
import GoogleSvg from "@/components/design/GoogleSvg";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash, Linkedin, Instagram, Facebook, User, Mail, FileText } from "lucide-react";
import Image from "next/image";
import UploadProfile from "./UploadProfile";
import { Author } from "@/sanity/types";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface SettingTabsProps {
  data: Author;
  formAction: (payload: FormData) => void;
  errors: Record<string, string>;
  isPending: boolean;
}

const SettingTabs = ({ data, formAction, errors, isPending }: SettingTabsProps) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Tabs
      defaultValue="general"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mt-10 grid grid-rows-[fit-content(0)_auto] md:grid-cols-4 gap-6 bg-transparent"
    >
      <TabsList className="col-span-1 flex md:flex-col gap-1 bg-transparent rounded-lg p-2 h-fit w-full md:space-y-2 max-md:overflow-x-auto max-md:items-center">
        <TabsTrigger
          value="general"
          className={cn(
            "w-full py-3 px-4 flex items-center gap-3 font-medium text-base transition-all rounded-lg border-0",
            "hover:bg-muted",
            activeTab === "general" 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground"
          )}
        >
          <User className="h-4 w-4" />
          <span>General</span>
        </TabsTrigger>
        <TabsTrigger
          value="edit-profile"
          className={cn(
            "w-full py-3 px-4 flex items-center gap-3 font-medium text-base transition-all rounded-lg border-0",
            "hover:bg-muted",
            activeTab === "edit-profile" 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground"
          )}
        >
          <FileText className="h-4 w-4" />
          <span>Edit Profile</span>
        </TabsTrigger>
        <TabsTrigger
          value="social-links"
          className={cn(
            "w-full py-3 px-4 flex items-center gap-3 font-medium text-base transition-all rounded-lg border-0",
            "hover:bg-muted",
            activeTab === "social-links" 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground"
          )}
        >
          <Linkedin className="h-4 w-4" />
          <span>Social Links</span>
        </TabsTrigger>
        <div className="flex-grow hidden md:block"></div>
        <TabsTrigger
          value="delete-account"
          className={cn(
            "w-full py-3 px-4 flex items-center gap-3 font-medium text-base transition-all rounded-lg border-0",
            "hover:bg-destructive/10",
            activeTab === "delete-account" 
              ? "bg-destructive/10 text-destructive" 
              : "text-muted-foreground"
          )}
        >
          <Trash className="h-4 w-4" />
          <span className="max-md:hidden">Delete Account</span>
        </TabsTrigger>
      </TabsList>

      <form action={formAction} className="flex-1 md:col-span-3 max-md:mt-3">
        <TabsContent
          value="general"
          className="border border-border rounded-lg p-6 bg-card shadow-md transition-all duration-300"
        >
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-card-foreground border-b border-border pb-2">
              General Information
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-card-foreground">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    defaultValue={data?.username}
                    placeholder="Username"
                    className="pl-10 w-full rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary py-2 px-3 text-card-foreground shadow-sm transition-colors"
                    required
                  />
                </div>
                {errors.username && (
                  <p className="text-destructive text-sm mt-1">{errors.username}</p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  Your URL: https://medium.com/
                  <span className="font-medium text-card-foreground">{data?.username || "username"}</span>
                </p>
              </div>
            
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    defaultValue={data?.email}
                    placeholder="Email address"
                    className="pl-10 w-full rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary py-2 px-3 text-card-foreground shadow-sm transition-colors"
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="pt-4 border-t border-border">
                <h2 className="text-lg font-semibold mb-4 text-card-foreground">
                  Google Sign-In
                </h2>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 dark:bg-background dark:text-foreground dark:hover:bg-muted"
                  >
                    <GoogleSvg />
                    <span>Connected with Google</span>
                  </Button>
                  <p className="ml-4 text-sm text-muted-foreground">
                    Your account is connected through Google
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-end justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-2 px-6"
              >
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="edit-profile"
          className="border border-border rounded-lg p-6 bg-card shadow-md transition-all duration-300"
        >
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-card-foreground border-b border-border pb-2">
              Edit Profile
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-1">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-card-foreground">Profile Picture</h4>
                  <UploadProfile actualImageURL={data?.image!} />
                  {errors.image && (
                    <p className="text-destructive text-sm mt-1">{errors.image}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 400x400px. Max size: 2MB.
                  </p>
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-card-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={data?.name}
                    placeholder="Your name"
                    className="w-full rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary py-2 px-3 text-card-foreground shadow-sm transition-colors"
                    required
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-card-foreground">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    defaultValue={data?.bio}
                    placeholder="Write a short bio about yourself"
                    rows={4}
                    className="w-full rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary py-2 px-3 text-card-foreground shadow-sm resize-y transition-colors"
                  />
                  {errors.bio && (
                    <p className="text-destructive text-sm mt-1">{errors.bio}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Brief description that will appear on your profile
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-end justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-2 px-6"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="social-links"
          className="border border-border rounded-lg p-6 bg-card shadow-md transition-all duration-300"
        >
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-card-foreground border-b border-border pb-2">
              Social Profiles
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="linkedin" className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="linkedin"
                    id="linkedin"
                    placeholder="LinkedIn URL"
                    defaultValue={data?.socialLinks?.linkedin || ""}
                    className="w-full rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary py-2 px-3 text-card-foreground shadow-sm transition-colors"
                  />
                  {errors.linkedin && (
                    <p className="text-destructive text-sm mt-1">{errors.linkedin}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="instagram" className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  placeholder="Instagram URL"
                  defaultValue={data?.socialLinks?.instagram || ""}
                  className="w-full rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary py-2 px-3 text-card-foreground shadow-sm transition-colors"
                />
                {errors.instagram && (
                  <p className="text-destructive text-sm mt-1">{errors.instagram}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="facebook" className="flex items-center gap-2 text-sm font-medium text-card-foreground">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  id="facebook"
                  placeholder="Facebook URL"
                  defaultValue={data?.socialLinks?.facebook || ""}
                  className="w-full rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary py-2 px-3 text-card-foreground shadow-sm transition-colors"
                />
                {errors.facebook && (
                  <p className="text-destructive text-sm mt-1">{errors.facebook}</p>
                )}
              </div>
            </div>

            <div className="mt-8 flex items-end justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-2 px-6"
              >
                {isPending ? "Saving..." : "Save profile Changes"}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="delete-account"
          className="border border-destructive/20 rounded-lg p-6 bg-card shadow-md transition-all duration-300"
        >
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 overflow-hidden">
                <Image
                  fill
                  sizes="128px"
                  src="/delete-sad.jpg"
                  alt="Sad face illustration"
                  className="object-cover"
                />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-card-foreground mb-4 text-center">
              We're sorry to see you go
            </h1>

            <div className="space-y-4 text-center">
              <p className="text-muted-foreground">
                If you'd like to reduce your email notifications, you can{" "}
                <a href="#" className="text-primary hover:underline">
                  disable them here
                </a>{" "}
                or if you just want to change your username, you can{" "}
                <a href="#" className="text-primary hover:underline">
                  do that here
                </a>
                .
              </p>

              <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                <p className="text-destructive font-medium">
                  Be advised, account deletion is final. There will be no way to
                  restore your account or content.
                </p>
              </div>

              <div className="flex space-x-4 justify-center pt-4">
                <Button
                  type="button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6"
                  onClick={() => setActiveTab("general")}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="bg-background text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive rounded-md px-6"
                  disabled={isPending}
                >
                  {isPending ? "Processing..." : "Delete my account"}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </form>
    </Tabs>
  );
};

export default SettingTabs;