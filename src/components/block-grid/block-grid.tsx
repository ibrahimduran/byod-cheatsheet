import "./block-grid.css";
import Masonry from "react-masonry-css";

import type { FC, PropsWithChildren } from "react";

export interface BlockGridProps {}

export const BlockGrid: FC<PropsWithChildren<BlockGridProps>> = ({
  children,
}) => {
  return (
    <Masonry
      breakpointCols={{
        default: 3,
        1024: 2,
        640: 1,
      }}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {children}
    </Masonry>
  );
};
