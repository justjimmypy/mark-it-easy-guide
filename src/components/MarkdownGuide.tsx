
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckIcon, ClipboardCopyIcon } from "lucide-react";
import { toast } from "sonner";

interface MarkdownExample {
  markdown: string;
  rendered: React.ReactNode;
}

const MarkdownGuide = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const renderExample = (example: MarkdownExample, id: string) => {
    return (
      <div className="grid grid-cols-2 gap-4 border rounded-md p-4 bg-white">
        <div className="relative">
          <pre className="bg-gray-50 rounded p-2 text-sm font-mono overflow-x-auto">
            {example.markdown}
          </pre>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={() => copyToClipboard(example.markdown, id)}
          >
            {copiedId === id ? (
              <CheckIcon className="h-3 w-3 text-green-500" />
            ) : (
              <ClipboardCopyIcon className="h-3 w-3" />
            )}
          </Button>
        </div>
        <div className="markdown-output p-2 border-l">{example.rendered}</div>
      </div>
    );
  };

  // Headings examples
  const headingsExamples = [
    {
      markdown: "# Heading 1",
      rendered: <h1 className="text-2xl font-bold">Heading 1</h1>,
    },
    {
      markdown: "## Heading 2",
      rendered: <h2 className="text-xl font-bold">Heading 2</h2>,
    },
    {
      markdown: "### Heading 3",
      rendered: <h3 className="text-lg font-bold">Heading 3</h3>,
    },
  ];

  // Emphasis examples
  const emphasisExamples = [
    {
      markdown: "*italic* or _italic_",
      rendered: <p><em>italic</em> or <em>italic</em></p>,
    },
    {
      markdown: "**bold** or __bold__",
      rendered: <p><strong>bold</strong> or <strong>bold</strong></p>,
    },
    {
      markdown: "***bold and italic*** or ___bold and italic___",
      rendered: <p><strong><em>bold and italic</em></strong> or <strong><em>bold and italic</em></strong></p>,
    },
    {
      markdown: "~~strikethrough~~",
      rendered: <p><del>strikethrough</del></p>,
    },
  ];

  // Lists examples
  const listsExamples = [
    {
      markdown: "1. First item\n2. Second item\n3. Third item",
      rendered: (
        <ol className="list-decimal ml-5">
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ol>
      ),
    },
    {
      markdown: "- Unordered item\n- Another item\n- And another",
      rendered: (
        <ul className="list-disc ml-5">
          <li>Unordered item</li>
          <li>Another item</li>
          <li>And another</li>
        </ul>
      ),
    },
    {
      markdown: "- Main item\n  - Sub-item\n  - Another sub-item",
      rendered: (
        <ul className="list-disc ml-5">
          <li>Main item
            <ul className="list-disc ml-5">
              <li>Sub-item</li>
              <li>Another sub-item</li>
            </ul>
          </li>
        </ul>
      ),
    },
  ];

  // Links and images examples
  const linksImagesExamples = [
    {
      markdown: "[Link Text](https://example.com)",
      rendered: <p><a href="#" className="text-blue-600 hover:underline">Link Text</a></p>,
    },
    {
      markdown: "![Alt text](https://via.placeholder.com/150)",
      rendered: <p><img src="https://via.placeholder.com/150" alt="Alt text" className="max-w-full h-auto" /></p>,
    },
    {
      markdown: "[![Image with link](https://via.placeholder.com/80)](https://example.com)",
      rendered: <p><a href="#"><img src="https://via.placeholder.com/80" alt="Image with link" className="max-w-full h-auto" /></a></p>,
    },
  ];

  // Code examples
  const codeExamples = [
    {
      markdown: "`inline code`",
      rendered: <p><code className="bg-gray-100 px-1 rounded">inline code</code></p>,
    },
    {
      markdown: "```\ncode block\nwith multiple lines\n```",
      rendered: (
        <pre className="bg-gray-100 p-2 rounded overflow-auto">
          <code>code block<br />with multiple lines</code>
        </pre>
      ),
    },
    {
      markdown: "```javascript\nconst greeting = 'Hello world!';\nconsole.log(greeting);\n```",
      rendered: (
        <pre className="bg-gray-100 p-2 rounded overflow-auto">
          <code>
            <span className="text-blue-600">const</span> greeting = <span className="text-green-600">'Hello world!'</span>;<br />
            console.log(greeting);
          </code>
        </pre>
      ),
    },
  ];

  // Tables examples
  const tablesExamples = [
    {
      markdown: "| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n| Cell 3   | Cell 4   |",
      rendered: (
        <table className="border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-1">Header 1</th>
              <th className="border border-gray-300 p-1">Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-1">Cell 1</td>
              <td className="border border-gray-300 p-1">Cell 2</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1">Cell 3</td>
              <td className="border border-gray-300 p-1">Cell 4</td>
            </tr>
          </tbody>
        </table>
      ),
    },
  ];

  // Blockquotes examples
  const blockquotesExamples = [
    {
      markdown: "> This is a blockquote\n>\n> It can span multiple lines",
      rendered: (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700">
          <p>This is a blockquote</p>
          <p>It can span multiple lines</p>
        </blockquote>
      ),
    },
  ];

  // Horizontal rule examples
  const horizontalRuleExamples = [
    {
      markdown: "---\nor\n***\nor\n___",
      rendered: (
        <div>
          <hr className="my-2 border-t border-gray-300" />
          <p className="text-center text-gray-500">or</p>
          <hr className="my-2 border-t border-gray-300" />
          <p className="text-center text-gray-500">or</p>
          <hr className="my-2 border-t border-gray-300" />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-navy-700">Markdown Guide</h1>
        <p className="text-gray-600">Quick reference for Markdown syntax</p>
      </header>

      <Tabs defaultValue="headings" className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-4">
          <TabsTrigger value="headings">Headings</TabsTrigger>
          <TabsTrigger value="emphasis">Emphasis</TabsTrigger>
          <TabsTrigger value="lists">Lists</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="blockquotes">Quotes</TabsTrigger>
          <TabsTrigger value="hr">HR</TabsTrigger>
        </TabsList>
        
        <TabsContent value="headings" className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Headings</h2>
          {headingsExamples.map((example, index) => (
            <div key={`heading-${index}`}>
              {renderExample(example, `heading-${index}`)}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="emphasis" className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Emphasis</h2>
          {emphasisExamples.map((example, index) => (
            <div key={`emphasis-${index}`}>
              {renderExample(example, `emphasis-${index}`)}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="lists" className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Lists</h2>
          {listsExamples.map((example, index) => (
            <div key={`list-${index}`}>
              {renderExample(example, `list-${index}`)}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Links & Images</h2>
          {linksImagesExamples.map((example, index) => (
            <div key={`link-${index}`}>
              {renderExample(example, `link-${index}`)}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Code</h2>
          {codeExamples.map((example, index) => (
            <div key={`code-${index}`}>
              {renderExample(example, `code-${index}`)}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="tables" className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Tables</h2>
          {tablesExamples.map((example, index) => (
            <div key={`table-${index}`}>
              {renderExample(example, `table-${index}`)}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="blockquotes" className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Blockquotes</h2>
          {blockquotesExamples.map((example, index) => (
            <div key={`blockquote-${index}`}>
              {renderExample(example, `blockquote-${index}`)}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="hr" className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Horizontal Rules</h2>
          {horizontalRuleExamples.map((example, index) => (
            <div key={`hr-${index}`}>
              {renderExample(example, `hr-${index}`)}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarkdownGuide;
