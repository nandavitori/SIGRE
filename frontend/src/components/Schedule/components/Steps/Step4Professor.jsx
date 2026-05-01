import { User } from 'lucide-react'
import { STYLES } from '../../config/ScheduleFormConfig'
import { CadastrarBtn, PreviewCard, ErrorHint } from '../Common'

const Step4Professor = ({ form, set, errors, professores, onGoTo }) => {
    const { inp, lbl } = STYLES
    const hasErr = (k) => errors[k] ? " border-red-500 ring-red-100" : ""
    const getProfessor = () => professores.find(p => p.id === parseInt(form.professorId))

    return (
        <div className="space-y-6">
            <div>
                <label className={lbl}>Professor responsável</label>
                <div className="flex gap-2">
                    <select className={inp + hasErr('professorId')} value={form.professorId} onChange={e => set('professorId', e.target.value)}>
                        <option value="">Selecione o professor...</option>
                        {professores.map(p => <option key={p.id} value={p.id}>{p.nomeProf || p.nome}</option>)}
                    </select>
                    <CadastrarBtn label="Cadastrar professor" onClick={() => onGoTo('professores')} />
                </div>
                <ErrorHint error={errors.professorId} />
            </div>
            {form.professorId && getProfessor() && <PreviewCard icon={User} title={getProfessor().nomeProf || getProfessor().nome} subtitle={getProfessor().emailProf || getProfessor().email} />}
        </div>
    )
}

export default Step4Professor
