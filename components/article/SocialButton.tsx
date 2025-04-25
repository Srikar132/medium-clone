"use client";
import { useTheme } from "next-themes";
import { ColorVariant } from "../ui/nav-link";
import Link from "next/link";
import { Mail } from "lucide-react";
import { FaFacebook } from "react-icons/fa6";
import { BsInstagram, BsTelegram, BsTwitter } from "react-icons/bs";

interface SocialButtonProps {
  icon: React.ComponentType<any>;
  variant?: ColorVariant;
  href?: string;
  size?: number;
  className?: string;
  darkModeOnly?: boolean;
  lightModeOnly?: boolean;
}

export default function SocialButton({
  icon: Icon,
  variant = "blue",
  href = "#",
  size = 20,
  className = "",
  darkModeOnly = false,
  lightModeOnly = false,
  ...props
}: SocialButtonProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Show button based on mode preferences
  if ((darkModeOnly && !isDarkMode) || (lightModeOnly && isDarkMode)) {
    return null;
  }

  // Define variant styles with proper before: syntax
  const getVariantStyles = (variant: ColorVariant) => {
    const styles = {
      blue: {
        hoverBgClass: "hover:before:bg-blue-500",
        glowClass: "hover:shadow-blue-500/50",
        textClass: "group-hover:text-blue-50",
      },
      red: {
        hoverBgClass: "hover:before:bg-red-500",
        glowClass: "hover:shadow-red-500/50",
        textClass: "group-hover:text-red-50",
      },
      pink: {
        hoverBgClass: "hover:before:bg-pink-500",
        glowClass: "hover:shadow-pink-500/50",
        textClass: "group-hover:text-pink-50",
      },
      yellow: {
        hoverBgClass: "hover:before:bg-yellow-500",
        glowClass: "hover:shadow-yellow-500/50",
        textClass: "group-hover:text-yellow-50",
      },
      green: {
        hoverBgClass: "hover:before:bg-green-500",
        glowClass: "hover:shadow-green-500/50",
        textClass: "group-hover:text-green-50",
      },
      violet: {
        hoverBgClass: "hover:before:bg-purple-500",
        glowClass: "hover:shadow-purple-500/50",
        textClass: "group-hover:text-purple-50",
      },
      orange: {
        hoverBgClass: "hover:before:bg-orange-500",
        glowClass: "hover:shadow-orange-500/50",
        textClass: "group-hover:text-orange-50",
      },
      teal: {
        hoverBgClass: "hover:before:bg-teal-500",
        glowClass: "hover:shadow-teal-500/50",
        textClass: "group-hover:text-teal-50",
      },
    };

    return styles[variant] || styles.blue;
  };

  const { hoverBgClass, glowClass, textClass } = getVariantStyles(variant);

  const baseThemeStyles = isDarkMode
    ? "text-gray-300 hover:text-white"
    : "text-gray-600 hover:text-white";

  return (
    <Link
      href={href}
      className={`
          group
          relative flex items-center justify-center w-10 h-10 rounded-full
          ${baseThemeStyles}
          transition-all duration-300
          ${className}
        `}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <span
        className={`
            absolute inset-0 rounded-full transition-opacity duration-300
            opacity-0 group-hover:opacity-100 ${hoverBgClass} ${glowClass}
            before:absolute before:inset-0 before:rounded-full before:transition-all
            before:duration-300 before:opacity-0 group-hover:before:opacity-100
          `}
      />

      <span
        className={`relative z-10 transition-colors duration-300 ${textClass}`}
      >
        {Icon && <Icon size={size} />}
      </span>
    </Link>
  );
}

export const SocialLinks = () => (
  <div className="flex gap-3 mb-4">
    <SocialButton icon={FaFacebook} href="#" variant="blue" />
    <SocialButton icon={BsTwitter} href="#" variant="teal" />
    <SocialButton icon={BsInstagram} href="#" variant="pink" />
    <SocialButton icon={Mail} href="#" variant="red" />
    <SocialButton icon={BsTelegram} href="#" variant="green" />
  </div>
);
