import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Pin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function ForumPostCard({ post, onLike, onReply }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {post.is_pinned && (
                <Pin className="w-4 h-4 text-purple-600" />
              )}
              <CardTitle className="text-lg font-bold text-gray-900">{post.title}</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{post.is_anonymous ? 'Anonymous' : post.author_name}</span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(post.created_date), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 border-t pt-4">
          <Button size="sm" variant="ghost" onClick={() => onLike(post)} className="gap-1">
            <Heart className={`w-4 h-4 ${post.userHasLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
            {post.likes_count || 0}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onReply(post)} className="gap-1">
            <MessageCircle className="w-4 h-4" />
            {post.replies_count || 0} replies
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}