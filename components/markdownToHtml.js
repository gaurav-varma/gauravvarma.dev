import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./codeBlock";

export default function MarkdownToHtml({ content }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} renderers={{ code: CodeBlock }}>
      {content}
    </ReactMarkdown>
  );
}
