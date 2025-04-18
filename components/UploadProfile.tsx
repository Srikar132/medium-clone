"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Props = {
  actualImageURL: string;
};

const UploadProfile = ({ actualImageURL }: Props) => {
  const [profile, setProfile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(actualImageURL);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile(file);
      const tempUrl = URL.createObjectURL(file);
      setPreview(tempUrl);
    }
  };

  return (
    <>
      <label className="edit-form_label-2">Profile Picture</label>
      <div className="flex items-center gap-8">
        <Image
          src={preview || "/default-avatar.jpg"}
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full object-cover border border-pink-200"
        />

        <div>
          <label
            htmlFor="profile"
            className="px-4 py-2 bg-pink-100 border border-pink-300 rounded-full hover:bg-pink-200 mt-4 cursor-pointer inline-block"
          >
            Choose File
          </label>
          <input
            type="file"
            id="profile"
            name="profile"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <span className="ml-2 text-sm text-gray-500">
            {profile ? profile.name : "No file chosen"}
          </span>
          <p className="mt-2 text-xs text-gray-500">
            Recommended: Square image, at least 400x400px
          </p>
        </div>


        <input type="hidden" name="currentImageURL" value={actualImageURL} />

      </div>
    </>
  );
};

export default UploadProfile;
