import { Clock } from 'lucide-react'
import { diasSemana } from '../../../../data/data'
import { STYLES } from '../../config/ScheduleFormConfig'
import { ErrorHint } from '../Common'

const Step1Horario = ({ form, set, errors }) => {
    const { inp, lbl } = STYLES
    const hasErr = (k) => errors[k] ? " border-red-500 ring-red-100" : ""

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className={lbl}>Data de início</label>
                    <input type="date" className={inp + hasErr('dataInicio')} value={form.dataInicio} onChange={e => set('dataInicio', e.target.value)} />
                    <ErrorHint error={errors.dataInicio} />
                </div>
                <div>
                    <label className={lbl}>Data de fim</label>
                    <input type="date" className={inp + hasErr('dataFim')} value={form.dataFim} onChange={e => set('dataFim', e.target.value)} />
                    <ErrorHint error={errors.dataFim} />
                </div>
            </div>
            <div>
                <label className={lbl}>Dia da semana</label>
                <div className={`grid grid-cols-6 gap-2 p-1 rounded-2xl ${errors.diaSemana ? 'bg-red-50 ring-1 ring-red-200' : ''}`}>
                    {diasSemana.map(d => (
                        <button key={d} type="button" onClick={() => set('diaSemana', d)}
                            className="py-3 rounded-xl text-xs font-bold border-2 transition-all"
                            style={form.diaSemana === d
                                ? { background: 'linear-gradient(135deg,#1c1aa3,#4f46e5)', color: 'white', borderColor: 'transparent', boxShadow: '0 4px 14px rgba(28,26,163,0.3)' }
                                : { borderColor: '#e5e7eb', color: '#9ca3af', background: 'white' }}>
                            {d.slice(0, 3)}
                        </button>
                    ))}
                </div>
                <ErrorHint error={errors.diaSemana} />
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className={lbl}><Clock size={11} className="inline mr-1 -mt-0.5" />Horário de início</label>
                    <input type="time" className={inp + hasErr('horarioInicio')} value={form.horarioInicio} onChange={e => set('horarioInicio', e.target.value)} />
                    <ErrorHint error={errors.horarioInicio} />
                </div>
                <div>
                    <label className={lbl}><Clock size={11} className="inline mr-1 -mt-0.5" />Horário de término</label>
                    <input type="time" className={inp + hasErr('horarioFim')} value={form.horarioFim} onChange={e => set('horarioFim', e.target.value)} />
                    <ErrorHint error={errors.horarioFim} />
                </div>
            </div>
        </div>
    )
}

export default Step1Horario
