import type { BlockSchema, ContentSchema } from "../schema";

export const stringifyBlock = (block: BlockSchema): string => {
  return `${block.title}\n\n${stringifyContent(block.content)}`;
};

export const stringifyContent = (content: ContentSchema): string => {
  if (typeof content === "string") {
    return content;
  }

  switch (content.type) {
    case "text": {
      return content.text;
    }
    case "markdown": {
      return content.md;
    }
    case "qa": {
      return content.list
        .map((item) => `Q: ${item.q}\nA: ${item.a}`)
        .join("\n\n");
    }
    default: {
      content satisfies never;
      throw new Error("Unsupported content type");
    }
  }
};
