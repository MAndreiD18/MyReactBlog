import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ToolbarPlugin } from "@lexical/react/LexicalToolbarPlugin";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import "./LexicalEditor.css";

type LexicalEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

function HtmlInitPlugin({ html }: { html: string }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      editor.setEditorState(
        EditorState.createWithContent(nodes)
      );
    });
    // eslint-disable-next-line
  }, [html]);
  return null;
}

export default function LexicalEditor({ value, onChange }: LexicalEditorProps) {
  const initialConfig = {
    namespace: "MyEditor",
    theme: {
      // poți adăuga stiluri custom aici
      paragraph: "lexical-paragraph",
    },
    onError(error: Error) {
      throw error;
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable className="lexical-editor-area" />}
        placeholder={<div style={{ color: "#aaa" }}>Scrie continutul articolului...</div>}
      />
      <HistoryPlugin />
      <OnChangePlugin
        onChange={(editorState, editor) => {
          editorState.read(() => {
            const html = $generateHtmlFromNodes(editor, null);
            onChange(html);
          });
        }}
      />
      <HtmlInitPlugin html={value} />
    </LexicalComposer>
  );
}