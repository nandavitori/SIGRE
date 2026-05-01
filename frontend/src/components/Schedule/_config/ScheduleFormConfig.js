import { Calendar, Building2, BookOpen, User, Check } from 'lucide-react'

export const STEPS = [
    { id: 1, label: 'Horário', icon: Calendar },
    { id: 2, label: 'Sala', icon: Building2 },
    { id: 3, label: 'Disciplina', icon: BookOpen },
    { id: 4, label: 'Professor', icon: User },
    { id: 5, label: 'Confirmação', icon: Check },
]

export const STYLES = {
    inp: "w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-indigo-400 transition-all text-sm placeholder-gray-400",
    lbl: "block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2"
}
