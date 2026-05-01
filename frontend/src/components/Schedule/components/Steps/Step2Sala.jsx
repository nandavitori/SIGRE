import { Building2 } from 'lucide-react'
import { STYLES } from '../../config/ScheduleFormConfig'
import { CadastrarBtn, PreviewCard, ErrorHint } from '../Common'

const Step2Sala = ({ form, set, errors, salas, onGoTo }) => {
    const { inp, lbl } = STYLES
    const hasErr = (k) => errors[k] ? " border-red-500 ring-red-100" : ""
    const getSala = () => salas.find(s => String(s.id) === String(form.salaId))

    return (
        <div className="space-y-6">
            <div>
                <label className={lbl}>Sala ou laboratório</label>
                <div className="flex gap-2">
                    <select className={inp + hasErr('salaId')} value={form.salaId} onChange={e => set('salaId', e.target.value)}>
                        <option value="">Selecione a sala...</option>
                        {salas.map(s => <option key={s.id} value={s.id}>{s.nomeSala || s.nome} — {s.tipoSala || s.tipo}</option>)}
                    </select>
                    <CadastrarBtn label="Cadastrar sala" onClick={() => onGoTo('salas')} />
                </div>
                <ErrorHint error={errors.salaId} />
            </div>
            {form.salaId && getSala() && <PreviewCard icon={Building2} title={getSala().nomeSala || getSala().nome} subtitle={getSala().tipoSala || getSala().tipo} />}
        </div>
    )
}

export default Step2Sala
