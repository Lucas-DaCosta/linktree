import { User, Mail, Calendar, Clock } from 'lucide-react'
import * as getSlots from "../../../models/timeslots.ts"

interface SlotProps {
  slots: getSlots.Slot[];
}

// Fonction pour formater les dates
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date));
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export default function Timeslots({slots} : SlotProps) {
  return (
    <div className="bg-linear-to-br from-blue-50 to-indigo-50 shadow-xl rounded-2xl overflow-hidden max-w-3xl mx-auto my-8 border border-blue-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Vos futurs créneaux</h1>
      {slots && slots.length > 0 && (
        <div className="p-6 divide-y divide-gray-200">
          {slots.map((slot) => (
            <div
              key={slot.id_slot}
              className="flex items-center gap-6 py-4 first:pt-0 last:pb-0 hover:bg-white/50 px-4 rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center gap-2 min-w-fit">
                <User className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">{slot.username}</p>
              </div>
              
              <div className="flex items-center gap-2 flex-1">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-gray-600 text-sm">{slot.user_email}</p>
              </div>
              
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                <Calendar className="w-4 h-4 text-blue-600" />
                <p className="text-gray-700 font-medium text-sm">{formatDate(slot.start_date)}</p>
              </div>
              
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                <Clock className="w-4 h-4 text-blue-600" />
                <p className="text-gray-700 font-medium text-sm">
                  {formatTime(slot.start_date)} - {formatTime(slot.end_date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}