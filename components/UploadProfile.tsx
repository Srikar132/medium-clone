// UploadProfile.tsx
import { useState, useRef } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import { cn } from "@/lib/utils";

const UploadProfile = ({ actualImageURL }: { actualImageURL: string }) => {
  const [preview, setPreview] = useState<string | null>(actualImageURL || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Update file input value
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  const resetImage = () => {
    setPreview(actualImageURL);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {preview ? (
          <div className="relative">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
              <Image 
                src={preview} 
                alt="Profile preview" 
                fill
                sizes="96px"
                className="object-cover" 
              />
            </div>
            <button
              type="button"
              onClick={resetImage}
              className="absolute -top-1 -right-1 p-1 bg-destructive text-white rounded-full hover:bg-destructive/90 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ) : null}
        
        <div
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
            preview ? "w-auto" : "w-full h-32",
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <Camera className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-primary">Click to upload</span> or drag and drop
            </div>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or GIF (max. 2MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            id="profile"
            name="profile"
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadProfile;