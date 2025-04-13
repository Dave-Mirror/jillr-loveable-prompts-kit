
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Hash, Plus, X } from "lucide-react";

interface ChallengeHashtagsInputProps {
  hashtags: string[];
  setHashtags: (hashtags: string[]) => void;
}

const ChallengeHashtagsInput: React.FC<ChallengeHashtagsInputProps> = ({ 
  hashtags, 
  setHashtags 
}) => {
  const [newHashtag, setNewHashtag] = useState('');

  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag]);
      setNewHashtag('');
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  return (
    <div>
      <FormLabel>Challenge Hashtags</FormLabel>
      <div className="flex flex-wrap gap-2 mb-3">
        {hashtags.map(tag => (
          <div 
            key={tag} 
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-jillr-darkBlue"
          >
            <Hash size={14} />
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeHashtag(tag)}
              className="ml-1 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Add a hashtag"
          value={newHashtag}
          onChange={(e) => setNewHashtag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addHashtag();
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={addHashtag}
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ChallengeHashtagsInput;
