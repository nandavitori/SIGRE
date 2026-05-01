import { X } from 'lucide-react'
import { STEPS } from '../config/ScheduleFormConfig'

const FormHeader = ({ step, horarioEdit, onCancel }) => {
    const cur = STEPS[step - 1]
    const StepIcon = cur.icon

    return (
        <div className="px-8 py-6 flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg, #1c1aa3 0%, #150355 100%)' }}>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                    <StepIcon size={18} className="text-white" />
                </div>
                <div>
                    <p className="text-blue-300/80 text-[10px] font-bold uppercase tracking-widest">
                        {horarioEdit ? 'Editar Horário' : 'Novo Horário'} · Passo {step}/{STEPS.length}
                    </p>
                    <h3 className="text-white text-xl font-black leading-tight mt-0.5">{cur.label}</h3>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex gap-2">
                    {STEPS.map(s => (
                        <div key={s.id} className="rounded-full transition-all duration-300"
                            style={{
                                width: step === s.id ? '22px' : '8px', height: '8px',
                                background: step > s.id ? 'rgba(255,255,255,0.85)' : step === s.id ? 'white' : 'rgba(255,255,255,0.2)',
                            }} />
                    ))}
                </div>
                <button onClick={onCancel}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all">
                    <X size={15} />
                </button>
            </div>
        </div>
    )
}

export default FormHeader
