"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const CreatePostButton = () => {

  return (
    <Link href="/article/write" className="max-lg:hidden" passHref>
      <Button variant={"secondary"} size="sm" className="signup_write-btn">
        <PlusCircle className="w-4 h-4" />
        New Post
      </Button>
    </Link>
  );
};

export default CreatePostButton;