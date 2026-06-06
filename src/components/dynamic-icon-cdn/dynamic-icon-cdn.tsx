import DOMPurify from "dompurify";
import { useEffect, useState, type FC } from "react";

import { LOG_PREFIX } from "../../constant";

const CDN_BASE_URL = "https://cdn.jsdelivr.net/npm/lucide-static@1.17.0/icons";
const LOCAL_STORAGE_CACHE_PREFIX = `icon-cache[${CDN_BASE_URL}]`;
const PLACEHOLDER_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>`;

export interface DynamicIconCdnProps {
  name: string;
  color?: string;
  size?: number;
}

export const DynamicIconCdn: FC<DynamicIconCdnProps> = ({
  name,
  color = "currentColor",
  size = 24,
}) => {
  const [svgStr, setSvgStr] = useState(
    replaceSvgColor(replaceSvgSize(PLACEHOLDER_ICON, size), color),
  );

  useEffect(() => {
    fetchSvg(name)
      .then((text) => replaceSvgColor(replaceSvgSize(text, size), color))
      .then((svgStr) => setSvgStr(DOMPurify.sanitize(svgStr)))
      .catch((error) => {
        console.error(LOG_PREFIX, "Error fetching SVG:", error);
      });
  }, [name, size, color]);

  return (
    <span style={{ color }} dangerouslySetInnerHTML={{ __html: svgStr }} />
  );
};

function replaceSvgColor(svgStr: string, color: string): string {
  if (color === "currentColor") {
    return svgStr;
  }

  return svgStr.replace("currentColor", color);
}

function replaceSvgSize(svgStr: string, size: number) {
  if (size === 24) {
    return svgStr;
  }

  const sizeStr = size.toString();

  return svgStr
    .replace('width="24"', `width="${sizeStr}"`)
    .replace('height="24"', `height="${sizeStr}"`)
    .replace('viewBox="0 0 24 24"', `viewBox="0 0 ${sizeStr} ${sizeStr}"`);
}

async function fetchSvg(name: string): Promise<string> {
  const cacheKey = `${LOCAL_STORAGE_CACHE_PREFIX}[${name}]`;

  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await fetch(`${CDN_BASE_URL}/${name}.svg`);
  const text = await response.text();

  localStorage.setItem(cacheKey, text);
  return text;
}
