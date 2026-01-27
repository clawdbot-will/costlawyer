import React from 'react';

interface CaseContentProps {
  content: string;
}

/**
 * A component to format and display case law content with proper structure
 */
export default function CaseContent({ content }: CaseContentProps) {
  // Check if content is HTML (contains HTML tags) or plain text/markdown
  const isHTMLContent = /<[a-z][\s\S]*>/i.test(content);
  
  // If content is HTML from rich text editor, render it directly
  if (isHTMLContent) {
    return (
      <div 
        className="case-content prose prose-lg max-w-none text-gray-800 bg-white p-6 rounded-lg shadow-sm
          prose-headings:text-gray-900 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
          prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900
          prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50
          prose-blockquote:text-blue-800 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
  
  // Legacy formatting for markdown-style content
  const formatContentWithSections = () => {
    // Split content by lines to process
    const lines = content.split('\n');
    const formattedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Process headers (#), handle both markdown and plain text formatting
      if (line.startsWith('# ') || line.startsWith('## ') || line.startsWith('### ')) {
        const level = line.split(' ')[0].length; // Count the number of #
        const text = line.substring(level + 1);
        
        // Add appropriate header tags based on level
        switch (level) {
          case 1: 
            formattedLines.push(<h1 key={i} className="text-2xl font-bold mt-8 mb-4 text-gray-900">{text}</h1>);
            break;
          case 2:
            formattedLines.push(<h2 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-900">{text}</h2>);
            break;
          case 3:
            formattedLines.push(<h3 key={i} className="text-lg font-bold mt-5 mb-2 text-gray-800">{text}</h3>);
            break;
          default:
            formattedLines.push(<p key={i} className="my-2 text-gray-700">{line}</p>);
        }
      } 
      // Check for bold text with ##
      else if (line.includes('##')) {
        // Highlight judgment sections with special formatting
        if (line.toLowerCase().includes('judgment') || 
            line.toLowerCase().includes('key points') || 
            line.toLowerCase().includes('highlights') || 
            line.toLowerCase().includes('summary')) {
          formattedLines.push(
            <div key={i} className="bg-blue-50 p-4 rounded-lg my-4 border-l-4 border-blue-500 shadow-sm">
              {line.split('##').map((part, index) => 
                index % 2 === 0 ? 
                  <span key={`${i}-${index}`}>{part}</span> : 
                  <span key={`${i}-${index}`} className="font-bold text-blue-800">{part}</span>
              )}
            </div>
          );
        } else {
          // Regular bold formatting
          formattedLines.push(
            <p key={i} className="my-3 leading-relaxed text-gray-700">
              {line.split('##').map((part, index) => 
                index % 2 === 0 ? 
                  <span key={`${i}-${index}`}>{part}</span> : 
                  <strong key={`${i}-${index}`} className="text-gray-900">{part}</strong>
              )}
            </p>
          );
        }
      }
      // Check for participants section
      else if (line.toLowerCase().includes('participants') || line.toLowerCase().includes('parties:')) {
        formattedLines.push(
          <div key={i} className="bg-gray-50 p-4 rounded-lg my-5 shadow-sm">
            <h3 className="font-bold mb-3 text-gray-800">{line}</h3>
            {i+1 < lines.length && <ul className="list-disc ml-5 space-y-1">
              {lines[++i].split(',').map((party, idx) => 
                <li key={`party-${idx}`} className="pl-1 text-gray-700">{party.trim()}</li>
              )}
            </ul>}
          </div>
        );
      }
      // Check for legal citation
      else if (/\[\d{4}\]/.test(line) && (line.includes('EWHC') || line.includes('EWCA') || line.includes('UKSC'))) {
        formattedLines.push(
          <div key={i} className="font-medium text-lg my-4 py-2 px-3 bg-gray-100 rounded border-l-4 border-gray-400 text-gray-800">
            {line}
          </div>
        );
      }
      // Regular paragraphs
      else if (line.trim()) {
        formattedLines.push(
          <p key={i} className="my-3 leading-relaxed text-gray-700">
            {line}
          </p>
        );
      }
      // Empty line - add spacing
      else {
        formattedLines.push(<div key={i} className="my-2"></div>);
      }
    }
    
    return formattedLines;
  };

  return (
    <div className="case-content text-gray-800 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      {formatContentWithSections()}
    </div>
  );
}