import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AiRecipeProps {
  content: string;
}

const AiRecipe: React.FC<AiRecipeProps> = ({ content }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <ReactMarkdown 
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AiRecipe;