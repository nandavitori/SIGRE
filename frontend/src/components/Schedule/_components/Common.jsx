import { Plus, ExternalLink, Check } from 'lucide-react'

export const CadastrarBtn = ({ label, onClick }) => (
    <button type="button" onClick={onClick}
        className="shrink-0 h-11 px-4 flex items-center gap-1.5 rounded-xl border border-gray-200 text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all text-xs font-semibold whitespace-nowrap">
        <Plus size={12} />
        {label}
        <ExternalLink size={10} className="opacity-50 ml-0.5" />
    </button>
)

export const PreviewCard = ({ icon: Icon, title, subtitle }) => (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-indigo-100 bg-indigo-50">
        <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
            <Icon size={16} className="text-indigo-600" />
        </div>
        <div className="flex-1">
            <p className="font-bold text-indigo-900 text-sm">{title}</p>
            {subtitle && <p className="text-xs text-indigo-400 mt-0.5">{subtitle}</p>}
        </div>
        <Check size={15} className="text-indigo-500" />
    </div>
)

export const ErrorHint = ({ error }) => {
    if (!error) return null
    return (
        <p className="text-[10px] text-red-500 font-bold mt-1 animate-in fade-in slide-in-from-top-1">
            {error}
        </p>
    )
}
