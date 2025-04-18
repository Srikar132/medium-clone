"use client";

import React, { useState, useEffect, useRef } from "react";
import { useFetch } from "@/hooks/useFetch";
import { fetchCategories } from "@/sanity/lib/fetches";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

interface SocialLinks {
  instagram: string;
  facebook: string;
  linkedin: string;
}

const OnboardingPage: React.FC = () => {
  const [bio, setBio] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    instagram: "",
    facebook: "",
    linkedin: "",
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: categories } = useFetch<Category[]>(fetchCategories, []);

  const formRef = useRef<HTMLFormElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bioSectionRef = useRef<HTMLDivElement>(null);
  const socialSectionRef = useRef<HTMLDivElement>(null);
  const categoriesSectionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleSocialChange = (platform: keyof SocialLinks, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [platform]: value }));
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ bio, socialLinks, selectedCategories });

    // Submit animation
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    // Handle submission logic here
  };

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
      })
      .from(
        bioSectionRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.3"
      )
      .from(
        socialSectionRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.2"
      )
      .from(
        categoriesSectionRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.2"
      )
      .from(
        buttonRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
        },
        "-=0.1"
      );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-4 sm:py-10 mb-20">
      <div className="w-full max-w-3xl">
        <div ref={headerRef} className="mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-black">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 mt-2 ">
            Tell us more about yourself and connect your social accounts
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-2"
        >
          <div
            ref={categoriesSectionRef}
            className="bg-white rounded-2xl p-5 sm:p-4"
          >
            <h2 className="text-xl font-semibold text-black mb-3">
              Select Categories
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Choose the categories that interest you
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center py-10">
              {categories?.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => toggleCategory(category._id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategories.includes(category._id)
                      ? "bg-pink-500 text-white scale-105 transform"
                      : "bg-white text-gray-700 border border-pink-200 hover:bg-pink-50"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links Section */}
          <div ref={socialSectionRef} className="bg-white rounded-2xl sm:p-3">
            <h2 className="text-xl font-semibold text-black mb-3">
              Social Links
            </h2>
            <div className="space-y-2">
              <div>
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Instagram
                </label>
                <div className="flex rounded-lg overflow-hidden">
                  <div className="bg-pink-100 flex items-center justify-center px-4">
                    <span className="text-pink-800">@</span>
                  </div>
                  <input
                    id="instagram"
                    type="text"
                    className="flex-1 px-4 py-3 bg-white border border-pink-100 border-l-0 rounded-r-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition"
                    placeholder="your.instagram"
                    value={socialLinks.instagram}
                    onChange={(e) =>
                      handleSocialChange("instagram", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Facebook
                </label>
                <div className="flex rounded-lg overflow-hidden">
                  <div className="bg-pink-100 flex items-center justify-center px-4">
                    <span className="text-pink-800">@</span>
                  </div>
                  <input
                    id="facebook"
                    type="text"
                    className="flex-1 px-4 py-3 bg-white border border-pink-100 border-l-0 rounded-r-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition"
                    placeholder="your.facebook"
                    value={socialLinks.facebook}
                    onChange={(e) =>
                      handleSocialChange("facebook", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  LinkedIn
                </label>
                <div className="flex rounded-lg overflow-hidden">
                  <div className="bg-pink-100 flex items-center justify-center px-4">
                    <span className="text-pink-800">@</span>
                  </div>
                  <input
                    id="linkedin"
                    type="text"
                    className="flex-1 px-4 py-3 bg-white border border-pink-100 border-l-0 rounded-r-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition"
                    placeholder="your.linkedin"
                    value={socialLinks.linkedin}
                    onChange={(e) =>
                      handleSocialChange("linkedin", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div ref={bioSectionRef} className="bg-white p-3 sm:p-6">
            <h2 className="text-xl font-semibold text-black mb-4">About You</h2>
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                className="w-full px-4 py-3  bg-white border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition"
                placeholder="Tell us about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div ref={buttonRef} className=" pt-2">
            <Button type="submit" className="rounded-xl">
              Complete Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
