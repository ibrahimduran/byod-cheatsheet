import type { FC } from "react";

import type { ContentSchema } from "../../schema";
import { MarkdownContent } from "./markdown-content";
import { QAContent } from "./qa-content";
import { TextContent } from "./text-content";

interface ContentRendererProps {
  content: ContentSchema;
}

export const ContentRenderer: FC<ContentRendererProps> = ({ content }) => {
  if (typeof content === "string") {
    return <TextContent content={{ type: "text", text: content }} />;
  }

  switch (content.type) {
    case "text":
      return <TextContent content={content} />;
    case "markdown":
      return <MarkdownContent content={content} />;
    case "qa":
      return <QAContent content={content} />;
    default:
      content satisfies never;
  }
};
