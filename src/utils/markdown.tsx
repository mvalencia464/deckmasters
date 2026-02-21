import React from 'react';

const parseMarkdown = (text) => {
  if (!text) return text;
  const parts = [];
  let lastIndex = 0;
  const regex = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    // Add formatted text
    if (match[1]) {
      parts.push(<strong key={`${match.index}-bold`}>{match[1]}</strong>);
    } else if (match[2]) {
      parts.push(<em key={`${match.index}-italic`}>{match[2]}</em>);
    }
    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 0 ? text : parts;
};

export default parseMarkdown;

