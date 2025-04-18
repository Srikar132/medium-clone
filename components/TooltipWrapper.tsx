import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type CustomTooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  className?: string;
  contentClassName?: string;
};


const TooltipWrapper = ({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 300,
  className = "",
  contentClassName = "",
}: CustomTooltipProps) => {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger className={className} asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent 
        side={side} 
        align={align} 
        className={`text-sm font-medium ${contentClassName}`}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipWrapper;