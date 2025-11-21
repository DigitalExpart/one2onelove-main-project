import React, { useState } from 'react';
import { Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const EMOJI_CATEGORIES = {
  '😀': ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔'],
  '❤️': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐'],
  '👍': ['👍', '👎', '👊', '✊', '🤛', '🤜', '🤞', '✌️', '🤟', '🤘', '🤙', '👌', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💪', '🦾', '🦿', '🦵'],
  '🎉': ['🎉', '🎊', '🎈', '🎁', '🎀', '🎂', '🎄', '🎆', '🎇', '✨', '🎊', '🎋', '🎍', '🎎', '🎏', '🎐', '🎑', '🎀', '🎁', '🎂', '🎃', '🎄', '🎅', '🤶', '🧑‍🎄', '🎆', '🎇', '🧨', '🎊', '🎈'],
  '🌍': ['🌍', '🌎', '🌏', '🌐', '🗺️', '🧭', '🏔️', '⛰️', '🌋', '🗻', '🏕️', '🏖️', '🏜️', '🏝️', '🏞️', '🏟️', '🏛️', '🏗️', '🧱', '🏘️', '🏚️', '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩'],
  '🍕': ['🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥓', '🥚', '🍳', '🥘', '🍲', '🥣', '🥗', '🍿', '🧈', '🧇', '🥞', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙', '🧆', '🌮'],
  '⚽': ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳', '🏹', '🎣', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂'],
  '🚗': ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🛴', '🛹', '🛼', '🚁', '🛸', '✈️', '🛩️', '🛫', '🛬', '🪂', '💺', '🚀', '🚤'],
};

const RECENT_EMOJIS_KEY = 'chat_recent_emojis';

export default function EmojiPicker({ onEmojiSelect }) {
  const [selectedCategory, setSelectedCategory] = useState('😀');
  const [recentEmojis, setRecentEmojis] = useState(() => {
    try {
      const stored = localStorage.getItem(RECENT_EMOJIS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleEmojiClick = (emoji) => {
    // Add to recent emojis
    const updated = [emoji, ...recentEmojis.filter(e => e !== emoji)].slice(0, 30);
    setRecentEmojis(updated);
    try {
      localStorage.setItem(RECENT_EMOJIS_KEY, JSON.stringify(updated));
    } catch (e) {
      // Ignore localStorage errors
    }
    onEmojiSelect(emoji);
  };

  const categories = Object.keys(EMOJI_CATEGORIES);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Smile className="w-5 h-5 text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-2">
          {/* Category Tabs */}
          <div className="flex gap-1 border-b border-gray-200 pb-2 mb-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  flex-shrink-0 p-2 rounded-lg text-lg transition-colors
                  ${selectedCategory === category ? 'bg-gray-100' : 'hover:bg-gray-50'}
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Recent Emojis */}
          {recentEmojis.length > 0 && selectedCategory === categories[0] && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-2 px-2">Recent</p>
              <div className="grid grid-cols-8 gap-1">
                {recentEmojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleEmojiClick(emoji)}
                    className="p-2 text-xl hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Emoji Grid */}
          <div className="grid grid-cols-8 gap-1 max-h-64 overflow-y-auto">
            {EMOJI_CATEGORIES[selectedCategory].map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => handleEmojiClick(emoji)}
                className="p-2 text-xl hover:bg-gray-100 rounded-lg transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

