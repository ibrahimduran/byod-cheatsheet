# 📋 BYOD Cheatsheet

BYOD Cheatsheet is a UI renderer for cheatsheet-style content.

It is designed for AI-assisted workflows: you can ask an AI model to generate structured cheatsheet data, then render that data in a clean, filterable interface using this project.

## ✨ Features

- 🔍 Search across all blocks.
- 🏷️ Filter by labels and tags.
- 📝 Various content styles: plain text, markdown, and Q&A.
- 🎨 Simple theming support.

## 🚀 Quick Start (with AI)

Use this prompt in your AI chat tool:

```text
Create a complete HTML page that renders a cheatsheet using BYOD Cheatsheet.

Requirements:
1) Import this script in the page and have an <div id="root"> on the page:
   https://ibrahimduran.github.io/byod-cheatsheet/byod-cheatsheet.js
2) Define window.cheatsheet before the script runs.
3) Follow the JSON schema at https://ibrahimduran.github.io/byod-cheatsheet/schema.json or the summary below:
   - title: string
   - description: string
   - theme: { primary: string (hex color) }
   - icon: valid Lucide icon name or null
   - blocks: array of {
       title: string,
       labels: Record<string, string>,
       tags: string[],
       style: "default" | "important" | "tip",
       content: string
         OR { type: "text", text: string }
         OR { type: "markdown", md: string }
         OR { type: "qa", list: [{ q: string, a: string }] }
     }
4) Populate data based on the user's goal and instructions.
5) Return only one self-contained HTML document.
```

## 📖 Usage

### 1) Hosted Renderer + Hash Parameter

Use the hosted app URL:

- https://ibrahimduran.github.io/byod-cheatsheet/

Pass base64-encoded JSON data in the URL hash:

```text
https://ibrahimduran.github.io/byod-cheatsheet/#<url-encoded-base64-json>
```

The app will parse the hash, validate the payload, and render it.

### 2) Embed in Your Own Web Page

Define data on `window.cheatsheet`, then load the script:

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Cheatsheet</title>
  </head>
  <body>
    <div id="root"></div>

    <script>
      window.cheatsheet = {
        title: "JavaScript Interview Cheatsheet",
        description: "Core concepts and practical examples",
        theme: { primary: "#0ea5e9" },
        icon: "BookOpen",
        blocks: [
          {
            title: "Closures",
            labels: { level: "intermediate", topic: "functions" },
            tags: ["javascript", "scope"],
            style: "important",
            content: {
              type: "markdown",
              md: "A closure is a function bundled with references to its lexical environment.",
            },
          },
        ],
      };
    </script>

    <script src="https://ibrahimduran.github.io/byod-cheatsheet/dist/byod-cheatsheet.js"></script>
  </body>
</html>
```

Optional behavior:

- ⚙️ Set `window.cheatsheetHashEnabled = true` to allow URL hash data to override or replace the global variable when a hash is present.

## Data Schema Example

```json
{
  "title": "Python Cheatsheet",
  "description": "Common syntax and interview patterns",
  "theme": {
    "primary": "#14b8a6"
  },
  "icon": "FileText",
  "blocks": [
    {
      "title": "List Comprehension",
      "labels": {
        "language": "python",
        "difficulty": "beginner"
      },
      "tags": ["syntax", "collections"],
      "style": "default",
      "content": {
        "type": "text",
        "text": "[x * 2 for x in nums if x > 0]"
      }
    },
    {
      "title": "Big-O Summary",
      "labels": {
        "topic": "complexity"
      },
      "tags": ["algorithms"],
      "style": "tip",
      "content": {
        "type": "markdown",
        "md": "| Operation | Time |\\n|---|---|\\n| Lookup (dict) | O(1) avg |"
      }
    },
    {
      "title": "Concurrency Q&A",
      "labels": {
        "topic": "async"
      },
      "tags": ["interview"],
      "style": "important",
      "content": {
        "type": "qa",
        "list": [
          {
            "q": "Difference between threading and asyncio?",
            "a": "Threading uses OS threads; asyncio uses cooperative event-loop concurrency."
          }
        ]
      }
    }
  ]
}
```
