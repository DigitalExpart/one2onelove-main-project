import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Bell, Repeat, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

const eventTypeColors = {
  date: "from-pink-500 to-rose-500",
  anniversary: "from-purple-500 to-pink-500",
  milestone: "from-amber-500 to-orange-500",
  reminder: "from-blue-500 to-cyan-500",
  appointment: "from-green-500 to-emerald-500",
  activity: "from-indigo-500 to-purple-500",
  other: "from-gray-500 to-slate-500"
};

const eventTypeIcons = {
  date: "💕",
  anniversary: "🎉",
  milestone: "🏆",
  reminder: "⏰",
  appointment: "📅",
  activity: "🎯",
  other: "📌"
};

export default function CalendarEventCard({ event, onEdit, onDelete, index }) {
  const colorClass = eventTypeColors[event.event_type] || eventTypeColors.other;
  const icon = eventTypeIcons[event.event_type] || eventTypeIcons.other;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-pink-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                  {icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(event.event_date), 'MMMM d, yyyy')}
                    </div>
                    {event.event_time && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.event_time}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    )}
                  </div>

                  {event.description && (
                    <p className="text-gray-700 mb-3">
                      {event.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${colorClass} text-white`}>
                      {event.event_type}
                    </span>
                    {event.reminder_enabled && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 flex items-center gap-1">
                        <Bell className="w-3 h-3" />
                        {event.reminder_days_before}d before
                      </span>
                    )}
                    {event.is_recurring && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 flex items-center gap-1">
                        <Repeat className="w-3 h-3" />
                        {event.recurrence_pattern}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(event)}
                className="text-gray-400 hover:text-pink-600"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(event.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}