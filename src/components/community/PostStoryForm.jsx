import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, X } from "lucide-react";

export default function PostStoryForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    story_type: "success",
    title: "",
    content: "",
    is_anonymous: true,
    relationship_length: "",
    tags: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    onSubmit({
      ...formData,
      tags: tagsArray,
      moderation_status: "approved" // Auto-approve for now
    });
  };

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Share Your Story
          </CardTitle>
          <button onClick={onCancel} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Story Type *</label>
            <Select value={formData.story_type} onValueChange={(value) => setFormData({...formData, story_type: value})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="success">🎉 Success Story</SelectItem>
                <SelectItem value="challenge">💪 Challenge</SelectItem>
                <SelectItem value="advice">💡 Advice</SelectItem>
                <SelectItem value="milestone">🏆 Milestone</SelectItem>
                <SelectItem value="transformation">✨ Transformation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Give your story a title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Story *</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Share your experience..."
              className="h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship Length</label>
            <Input
              value={formData.relationship_length}
              onChange={(e) => setFormData({...formData, relationship_length: e.target.value})}
              placeholder="e.g., 2 years, 6 months"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma separated)</label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="e.g., communication, trust, growth"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_anonymous}
                onChange={(e) => setFormData({...formData, is_anonymous: e.target.checked})}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Post anonymously</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Share Story
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}