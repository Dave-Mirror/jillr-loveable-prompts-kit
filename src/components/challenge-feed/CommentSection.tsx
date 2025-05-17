
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { X, Send, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Comment } from '@/components/challenge-feed/types';

interface CommentSectionProps {
  feedItemId: string;
  comments: Comment[];
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (feedItemId: string, text: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  feedItemId,
  comments,
  isOpen,
  onClose,
  onAddComment
}) => {
  const [commentText, setCommentText] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(feedItemId, commentText);
      setCommentText('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-50 bg-jillr-dark border-t border-jillr-border h-[70vh] rounded-t-2xl flex flex-col"
        >
          <div className="flex justify-between items-center p-4 border-b border-jillr-border">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <h3 className="font-medium">Kommentare ({comments.length})</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <img src={comment.userAvatar || "/placeholder.svg"} alt={comment.username} />
                  </Avatar>
                  <div className="flex-1 bg-jillr-darkBlue/30 rounded-xl p-3">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm">{comment.username}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm mt-1">{comment.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <MessageSquare className="h-10 w-10 mb-2 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Noch keine Kommentare</p>
                <p className="text-sm text-muted-foreground">
                  Sei der Erste, der einen Kommentar hinterlässt!
                </p>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-jillr-border flex gap-2">
            <Avatar className="h-8 w-8">
              <img src="/placeholder.svg" alt="Your avatar" />
            </Avatar>
            <Input 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Schreibe einen Kommentar..."
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!commentText.trim()}
              className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommentSection;
