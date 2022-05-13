import React, { useState } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function CodeBlock({ language, value, node }) {
  const getHighlightLine = (lineInput) => {
    const lineMeta = lineInput
      ?.slice(1, -1)
      .split(",")
      .map((line) => {
        if (line.indexOf("-") !== -1) {
          const lineSize = line.split("-");
          let lines = [];
          for (let i = parseInt(lineSize[0]); i <= parseInt(lineSize[1]); i++) {
            lines.push(i);
          }
          return lines;
        } else {
          return parseInt(line);
        }
      });
    return [].concat.apply([], lineMeta);
  };

  const highlightData = getHighlightLine(node.meta);

  const highlightLine = (lineNumber) => {
    let style = {
      display: "block",
      fontSize: "15px",
      lineHeight: 1.4,
      wordBreak: "break-all",
      whiteSpace: "pre-wrap",
    };
    if (highlightData.includes(lineNumber)) {
      style = {
        ...style,
      };
    }
    return { style };
  };

  return (
    <div className="relative transition-all duration-100 ease-in-out group codeblock clipboard">
      <SyntaxHighlighter
        lineProps={highlightLine}
        showLineNumbers
        wrapLines
        language={language}
        style={oneDark}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
