"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Bold, Italic, List, ListOrdered, Quote, Code,
  Link as LinkIcon, Image as ImageIcon, Heading1,
  Heading2, Heading3, Undo, Redo, Pilcrow
} from "lucide-react";
import { htmlToBlockContent } from "@/sanity/sanity-converters/html-to-blocks";
import { blocksToHtml } from "@/sanity/sanity-converters/blocks-to-html";
import { client } from "@/sanity/lib/client";
import { uploadImageToSanity } from "@/sanity/lib/fetches";

// Define TypeScript interfaces
interface SanityAsset {
  _id: string;
  url: string;
}

interface SanityContent {
  _type: string;
  [key: string]: any;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active: boolean;
  title: string;
  icon: React.FC<{ size?: number }>;
}

interface TiptapProps {
  content?: SanityContent[];
  onChange: (content: SanityContent[]) => void;
}

const Tiptap: React.FC<TiptapProps> = ({
  content = [],
  onChange,
}) => {
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [showLinkInput, setShowLinkInput] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showImageInput, setShowImageInput] = useState<boolean>(false);
  const [showImageUpload, setShowImageUpload] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string>("");

  // Convert Sanity blocks to HTML for initial content
  const initialContent = useMemo(() => {
    if (Array.isArray(content) && content.length > 0) {
      return blocksToHtml(content);
    }
    return "";
  }, [content]);

  // Create editor instance
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          // Configure code block to ensure it works correctly
          HTMLAttributes: {
            class: 'bg-gray-100 p-4 rounded-md font-mono text-sm whitespace-pre-wrap overflow-x-auto',
          },
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-md my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your story...",
        emptyEditorClass: 'before:content-[attr(data-placeholder)] before:text-gray-400 before:float-left before:pointer-events-none',
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      
      htmlToBlockContent(html)
        .then((blocks) => {
          if (onChange) {
            onChange(blocks as SanityContent[]);
          }
        })
        .catch((error) => {
          console.error("Failed to convert HTML to block content:", error);
        });
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-64 w-full',
        spellcheck: 'true',
      },
    },
  });

  // Update editor content when Sanity content changes
  useEffect(() => {
    if (editor && content && Array.isArray(content) && content.length > 0) {
      const html = blocksToHtml(content);
      if (html && editor.getHTML() !== html) {
        editor.commands.setContent(html);
      }
    }
  }, [content, editor]);

  // Handle image file upload to Sanity
  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadError("");
      setUploadProgress(0);

      // Create a Sanity asset from the file
      const asset = await uploadImageToSanity(file);

      // Insert the image into the editor
      if (editor && asset?.url) {
        editor.chain().focus().setImage({ src: asset.url }).run();
      } else {
        setUploadError("Failed to retrieve image URL from Sanity.");
      }
      
      setShowImageUpload(false);
      setIsUploading(false);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Failed to upload image. Please try again.");
      setIsUploading(false);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  // Editor command functions
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run();
  
  // Fix for code block functionality
  const toggleCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
    // Force a focus to ensure proper interaction after toggling code block
    setTimeout(() => {
      editor.commands.focus();
    }, 0);
  };
  
  const setHeading = (level: 1 | 2 | 3) => editor.chain().focus().toggleHeading({ level }).run();
  const undoChange = () => editor.chain().focus().undo().run();
  const redoChange = () => editor.chain().focus().redo().run();
  const addParagraph = () => editor.chain().focus().setParagraph().run();

  const setLink = () => {
    if (linkUrl) {
      // Check if the URL has a protocol
      const url = linkUrl.trim();
      const hasProtocol = /^(http|https):\/\//.test(url);
      const finalUrl = hasProtocol ? url : `https://${url}`;

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: finalUrl })
        .run();
      setLinkUrl("");
      setShowLinkInput(false);
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageInput(false);
    }
  };

  // ToolbarButton component for consistent styling
  const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, active, title, icon: Icon }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 ${active ? "bg-gray-200" : ""}`}
      title={title}
      type="button"
    >
      <Icon size={16} />
    </button>
  );

  // Divider component for toolbar
  const Divider = () => <div className="h-6 w-px bg-gray-300 mx-1"></div>;

  return (
    <div className="max-w-none w-full">
      <div className="border rounded-md mb-4 shadow-sm">
        <div className="flex flex-wrap items-center p-2 gap-1 border-b">
          {/* Text formatting */}
          <ToolbarButton 
            onClick={toggleBold} 
            active={editor.isActive("bold")} 
            title="Bold" 
            icon={Bold} 
          />
          <ToolbarButton 
            onClick={toggleItalic} 
            active={editor.isActive("italic")} 
            title="Italic" 
            icon={Italic} 
          />
          
          <Divider />
          
          {/* Headings */}
          <ToolbarButton 
            onClick={() => setHeading(1)} 
            active={editor.isActive("heading", { level: 1 })} 
            title="Heading 1" 
            icon={Heading1} 
          />
          <ToolbarButton 
            onClick={() => setHeading(2)} 
            active={editor.isActive("heading", { level: 2 })} 
            title="Heading 2" 
            icon={Heading2} 
          />
          <ToolbarButton 
            onClick={() => setHeading(3)} 
            active={editor.isActive("heading", { level: 3 })} 
            title="Heading 3" 
            icon={Heading3} 
          />
          <ToolbarButton 
            onClick={addParagraph} 
            active={editor.isActive("paragraph")} 
            title="Paragraph" 
            icon={Pilcrow} 
          />
          
          <Divider />
          
          {/* Lists and quotes */}
          <ToolbarButton 
            onClick={toggleBulletList} 
            active={editor.isActive("bulletList")} 
            title="Bullet List" 
            icon={List} 
          />
          <ToolbarButton 
            onClick={toggleOrderedList} 
            active={editor.isActive("orderedList")} 
            title="Ordered List" 
            icon={ListOrdered} 
          />
          <ToolbarButton 
            onClick={toggleBlockquote} 
            active={editor.isActive("blockquote")} 
            title="Blockquote" 
            icon={Quote} 
          />
          <ToolbarButton 
            onClick={toggleCodeBlock} 
            active={editor.isActive("codeBlock")} 
            title="Code Block" 
            icon={Code} 
          />
          
          <Divider />
          
          {/* Links and images */}
          <ToolbarButton 
            onClick={() => {
              setShowLinkInput(!showLinkInput);
              setShowImageInput(false);
              setShowImageUpload(false);
            }} 
            active={editor.isActive("link") || showLinkInput} 
            title="Insert Link" 
            icon={LinkIcon} 
          />
          <div className="relative">
            <ToolbarButton 
              onClick={() => {
                const menu = !showImageInput && !showImageUpload;
                setShowImageInput(menu);
                setShowImageUpload(false);
                setShowLinkInput(false);
              }} 
              active={showImageInput || showImageUpload} 
              title="Insert Image" 
              icon={ImageIcon} 
            />
            {showImageInput && (
              <div className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-md p-2 z-10 w-64">
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => {
                      setShowImageInput(false);
                      setShowImageUpload(true);
                    }}
                    className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 rounded"
                  >
                    Upload from device
                  </button>
                  <button 
                    onClick={() => {
                      // Keep the image URL input visible
                    }}
                    className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 rounded"
                  >
                    Insert from URL
                  </button>
                  <div className="mt-2 pt-2 border-t">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Enter image URL"
                      className="w-full p-1 border rounded text-sm"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={insertImage}
                        disabled={!imageUrl}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm disabled:bg-blue-300"
                      >
                        Insert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Divider />
          
          {/* Undo/Redo */}
          <ToolbarButton 
            onClick={undoChange} 
            active={false} 
            title="Undo" 
            icon={Undo} 
          />
          <ToolbarButton 
            onClick={redoChange} 
            active={false} 
            title="Redo" 
            icon={Redo} 
          />
        </div>

        {/* Link input */}
        {showLinkInput && (
          <div className="flex items-center p-2 bg-gray-50 border-b">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              className="flex-1 p-1 border rounded mr-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter') setLink();
              }}
            />
            <button
              onClick={setLink}
              disabled={!linkUrl}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              Add Link
            </button>
          </div>
        )}

        {/* Image upload */}
        {showImageUpload && (
          <div className="p-3 bg-gray-50 border-b">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                disabled={isUploading}
              />
              {isUploading && (
                <div className="mt-2">
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full transition-all duration-300 ease-in-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
                </div>
              )}
              {uploadError && (
                <p className="text-sm text-red-500 mt-1">{uploadError}</p>
              )}
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  disabled={isUploading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Editor content area */}
        <div className="px-4 py-3">
          <EditorContent
            editor={editor}
            className="outline-none prose w-full min-h-64 focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Tiptap;