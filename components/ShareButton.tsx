"use client"

import React, { useState } from 'react';
import { Upload, CheckCircle, Copy } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TooltipWrapper, { CustomTooltipProps } from './TooltipWrapper';

interface ShareButtonProps {
  id: string;
  side?  : CustomTooltipProps["side"];
}

const ShareButton: React.FC<ShareButtonProps> = ({ id , side = "left" }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const articleUrl = `http://localhost:3000/article/${id}`;
  
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setIsCopied(true);
      
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <TooltipWrapper side={side} content={"Share article"}>
          <DialogTrigger asChild>
              <div className='rounded-full p-2 border hover:bg-gray-100 cursor-pointer dark:hover:bg-zinc-800'>
                <Upload className="w-5 h-5  font-thin" />
              </div>
          </DialogTrigger>
        </TooltipWrapper>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Article</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Share this article with your friends and colleagues
          </p>
          
          <div className="flex items-center space-x-2">
            <input 
              readOnly 
              value={articleUrl} 
              className="flex-1 h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCopyToClipboard}
              className="px-3 focus:ring-2"
            >
              {isCopied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-4 flex space-x-3">
            <Button size="sm" variant="outline" className="flex-1" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}`, '_blank')}>
              Twitter
            </Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, '_blank')}>
              Facebook
            </Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`, '_blank')}>
              LinkedIn
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareButton;