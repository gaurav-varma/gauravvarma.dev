import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import PropTypes from 'prop-types';

export default function CodeBlock({ language, value, node }) {
  const getHighlightLine = (lineInput) => {
    if (!lineInput) return []; // Return an empty array if lineInput is falsy

    const lineMeta = lineInput
      .slice(1, -1)
      .split(',')
      .map((line) => {
        if (line.indexOf('-') !== -1) {
          const lineSize = line.split('-');
          const lines = [];
          for (
            let i = parseInt(lineSize[0], 10);
            i <= parseInt(lineSize[1], 10);
            i += 1
          ) {
            lines.push(i);
          }
          return lines;
        }
        return parseInt(line, 10);
      });
    return [].concat(...lineMeta);
  };

  const highlightData = getHighlightLine(node.meta);

  const highlightLine = (lineNumber) => {
    let style = {
      display: 'block',
      fontSize: '15px',
      lineHeight: 1.4,
      wordBreak: 'break-all',
      whiteSpace: 'pre-wrap',
    };
    if (highlightData.includes(lineNumber)) {
      style = {
        ...style,
      };
    }
    return { style };
  };

  return (
    <div className='relative transition-all duration-100 ease-in-out group codeblock clipboard'>
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

CodeBlock.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  node: PropTypes.shape({
    meta: PropTypes.string,
  }).isRequired,
};
