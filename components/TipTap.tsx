"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { useState, useEffect, useMemo } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Pilcrow,
} from "lucide-react";
import  { htmlToBlocks , blocksToHtml } from "@/utils";

const Tiptap = ({
  content = [],
  onChange,
}: {
  content: SanityContent[];
  onChange: (content: SanityContent[]) => void;
}) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);

  const initialContent = useMemo(() => {
    if (Array.isArray(content) && content.length > 0) {
      return blocksToHtml(content);
    }
    return "";
  }, [content]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your story...",
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const blocks = htmlToBlocks(html);
      if (onChange) {
        onChange(blocks);
      }
    },
  });

  useEffect(() => {
    if (editor && content && Array.isArray(content) && content.length > 0) {
      const html = blocksToHtml(content);
      if (html && editor.getHTML() !== html) {
        editor.commands.setContent(html);
      }
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const toggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const toggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  const toggleBlockquote = () => {
    editor.chain().focus().toggleBlockquote().run();
  };

  const toggleCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  const setHeading = (level: any) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

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

  const undoChange = () => {
    editor.chain().focus().undo().run();
  };

  const redoChange = () => {
    editor.chain().focus().redo().run();
  };

  const addParagraph = () => {
    editor.chain().focus().setParagraph().run();
  };

  return (
    <div className=" max-w-none w-full">
      <div className="border rounded-md mb-4">
        <div className="flex flex-wrap items-center p-2 gap-1 border-b">
          <button
            onClick={toggleBold}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={toggleItalic}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-1"></div>
          <button
            onClick={() => setHeading(1)}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}`}
            title="Heading 1"
          >
            <Heading1 size={16} />
          </button>
          <button
            onClick={() => setHeading(2)}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}`}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </button>
          <button
            onClick={() => setHeading(3)}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""}`}
            title="Heading 3"
          >
            <Heading3 size={16} />
          </button>
          <button
            onClick={addParagraph}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("paragraph") ? "bg-gray-200" : ""}`}
            title="Paragraph"
          >
            <Pilcrow size={16} />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-1"></div>
          <button
            onClick={toggleBulletList}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("bulletList") ? "bg-gray-200" : ""}`}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            onClick={toggleOrderedList}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("orderedList") ? "bg-gray-200" : ""}`}
            title="Ordered List"
          >
            <ListOrdered size={16} />
          </button>
          <button
            onClick={toggleBlockquote}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("blockquote") ? "bg-gray-200" : ""}`}
            title="Blockquote"
          >
            <Quote size={16} />
          </button>
          <button
            onClick={toggleCodeBlock}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("codeBlock") ? "bg-gray-200" : ""}`}
            title="Code Block"
          >
            <Code size={16} />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-1"></div>
          <button
            onClick={() => setShowLinkInput(!showLinkInput)}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("link") ? "bg-gray-200" : ""}`}
            title="Insert Link"
          >
            <LinkIcon size={16} />
          </button>
          <button
            onClick={() => setShowImageInput(!showImageInput)}
            className="p-2 rounded hover:bg-gray-100"
            title="Insert Image"
          >
            <ImageIcon size={16} />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-1"></div>
          <button
            onClick={undoChange}
            className="p-2 rounded hover:bg-gray-100"
            title="Undo"
          >
            <Undo size={16} />
          </button>
          <button
            onClick={redoChange}
            className="p-2 rounded hover:bg-gray-100"
            title="Redo"
          >
            <Redo size={16} />
          </button>
        </div>

        {showLinkInput && (
          <div className="flex items-center p-2 bg-gray-50">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              className="flex-1 p-1 border rounded mr-2"
            />
            <button
              onClick={setLink}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 "
            >
              Add Link
            </button>
          </div>
        )}

        {showImageInput && (
          <div className="flex items-center p-2 bg-gray-50">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="flex-1 p-1 border rounded mr-2"
            />
            <button
              onClick={insertImage}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Image
            </button>
          </div>
        )}

        <div className="p-2 min-h-64 tiptap-editor">
          <EditorContent
            editor={editor}
            className=" outline-none border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
