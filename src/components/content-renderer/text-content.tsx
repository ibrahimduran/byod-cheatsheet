import type { FC } from "react";

import type { TextContentSchema } from "../../schema";

export const TextContent: FC<{ content: TextContentSchema }> = ({
  content: { text },
}) => {
  return <p>{text}</p>;
};
