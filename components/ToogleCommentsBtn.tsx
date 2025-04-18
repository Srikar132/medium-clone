"use client";

import { useCommentStore } from "@/store";
import { MessageCircle, X } from "lucide-react";
import React from "react";
import TooltipWrapper, { CustomTooltipProps } from "./TooltipWrapper";

const ToogleCommentsBtn = ({side = "left"} : {side? : CustomTooltipProps["side"]}) => {
  const { openComments, toggleComments } = useCommentStore();
  return (
    <TooltipWrapper side={side} content="comments">
        <button
        onClick={toggleComments}
        className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer p-2 border border-gray-200 dark:border-gray-700 transition-colors"
        aria-label={openComments ? "Close comments" : "Open comments"}
        >
        {openComments ? (
            <X className="w-5 h-5" />
        ) : (
            <MessageCircle className="w-5 h-5" />
        )}
        </button>

    </TooltipWrapper>
  );
};

export default ToogleCommentsBtn;
