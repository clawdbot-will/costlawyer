import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div className={cn(
      'prose prose-slate dark:prose-invert max-w-none',
      'prose-headings:font-semibold prose-headings:tracking-tight',
      'prose-h1:text-3xl prose-h1:font-bold prose-h2:text-2xl prose-h2:font-bold prose-h3:text-xl',
      'prose-h4:text-lg prose-h5:text-base prose-h6:text-sm',
      'prose-p:leading-7 prose-p:my-4 first:prose-p:mt-0',
      'prose-a:text-primary hover:prose-a:text-primary/90 prose-a:underline',
      'prose-strong:font-semibold',
      'prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md',
      'prose-blockquote:border-l-4 prose-blockquote:border-muted',
      'prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:text-muted-foreground',
      'prose-ul:list-disc prose-ol:list-decimal',
      'prose-li:my-2',
      className
    )}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}