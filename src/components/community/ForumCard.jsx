import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, ArrowRight } from "lucide-react";

export default function ForumCard({ forum, onClick }) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-200" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
              {forum.icon || '💬'}
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">{forum.forum_name}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">{forum.description}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{forum.member_count || 0} members</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{forum.post_count || 0} posts</span>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}