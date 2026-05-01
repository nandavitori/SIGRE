import { STYLES } from '../../config/ScheduleFormConfig'
import { CadastrarBtn, ErrorHint } from '../Common'

const Step3DisciplinaCurso = ({ form, set, errors, disciplinas, cursos, onGoTo }) => {
    const { inp, lbl } = STYLES
    const hasErr = (k) => errors[k] ? " border-red-500 ring-red-100" : ""
    const getCurso = () => cursos.find(c => c.id === parseInt(form.cursoId))

    return (
        <div className="space-y-6">
            <div>
                <label className={lbl}>Disciplina</label>
                <div className="flex gap-2">
                    <select className={inp + hasErr('disciplinaId')} value={form.disciplinaId} onChange={e => set('disciplinaId', e.target.value)}>
                        <option value="">Selecione a disciplina...</option>
                        {disciplinas.map(d => <option key={d.id} value={d.id}>{d.nomeDisciplina || d.nome}</option>)}
                    </select>
                    <CadastrarBtn label="Cadastrar disciplina" onClick={() => onGoTo('disciplinas')} />
                </div>
                <ErrorHint error={errors.disciplinaId} />
            </div>
            <div>
                <label className={lbl}>Curso</label>
                <div className="flex gap-2">
                    <select className={inp + hasErr('cursoId')} value={form.cursoId} onChange={e => set('cursoId', e.target.value)}>
                        <option value="">Selecione o curso...</option>
                        {cursos.map(c => <option key={c.id} value={c.id}>{c.nomeCurso || c.nome}{(c.siglaCurso || c.sigla) ? ` (${c.siglaCurso || c.sigla})` : ''}</option>)}
                    </select>
                    <CadastrarBtn label="Cadastrar curso" onClick={() => onGoTo('cursos')} />
                </div>
                <ErrorHint error={errors.cursoId} />
            </div>
            {form.cursoId && getCurso() && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="w-4 h-4 rounded-full shrink-0" style={{ background: getCurso().corCurso || getCurso().cor }} />
                    <p className="text-sm font-semibold text-gray-700">{getCurso().nomeCurso || getCurso().nome}{(getCurso().siglaCurso || getCurso().sigla) && <span className="text-gray-400 font-normal"> ({getCurso().siglaCurso || getCurso().sigla})</span>}</p>
                </div>
            )}
        </div>
    )
}

export default Step3DisciplinaCurso
