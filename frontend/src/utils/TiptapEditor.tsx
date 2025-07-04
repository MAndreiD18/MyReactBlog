import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import "../assets/TipTap.css";

type TiptapEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      Code,
      Blockquote,
      Link,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
    // eslint-disable-next-line
  }, [value]);

  if (!editor) return null;

  return (
    <div>
      <div className="tiptap-toolbar">
        <button
          type="button"
          className={editor.isActive("bold") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className={editor.isActive("italic") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          className={editor.isActive("underline") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <u>U</u>
        </button>
        <button
          type="button"
          className={editor.isActive("strike") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <s>S</s>
        </button>
        <button
          type="button"
          className={editor.isActive("code") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          {"</>"}
        </button>
        <button
          type="button"
          className={editor.isActive("blockquote") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          &#8220; &#8221;
        </button>
        <button
          type="button"
          className={editor.isActive("bulletList") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>
        <button
          type="button"
          className={editor.isActive("orderedList") ? "active" : ""}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
        <button
          type="button"
          className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </button>
        <button
          type="button"
          className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Introdu URL-ul:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        >
          Clear
        </button>
      </div>
      <EditorContent editor={editor} className="tiptap-editor-area" />
    </div>
  );
}