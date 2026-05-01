import { Clock, Building2, BookOpen, GraduationCap, User, Check } from 'lucide-react'

const Step5Confirmacao = ({ form, salas, disciplinas, cursos, professores }) => {
    const getSala = () => salas.find(s => String(s.id) === String(form.salaId))
    const getDisciplina = () => disciplinas.find(d => d.id === parseInt(form.disciplinaId))
    const getCurso = () => cursos.find(c => c.id === parseInt(form.cursoId))
    const getProfessor = () => professores.find(p => p.id === parseInt(form.professorId))

    const summaryItems = [
        { Icon: Clock, label: 'Dia/Horário', v: `${form.diaSemana}, ${form.horarioInicio} – ${form.horarioFim}` },
        { Icon: Building2, label: 'Sala', v: getSala()?.nomeSala || getSala()?.nome },
        { Icon: BookOpen, label: 'Disciplina', v: getDisciplina()?.nomeDisciplina || getDisciplina()?.nome },
        { Icon: GraduationCap, label: 'Curso', v: getCurso() ? `${getCurso().nomeCurso || getCurso().nome}${(getCurso().siglaCurso || getCurso().sigla) ? ` (${getCurso().siglaCurso || getCurso().sigla})` : ''}` : '' },
        { Icon: User, label: 'Professor', v: getProfessor()?.nomeProf || getProfessor()?.nome },
    ]

    return (
        <div>
            <p className="text-sm text-gray-500 mb-5">Revise os dados antes de salvar.</p>
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 overflow-hidden">
                {summaryItems.map(({ Icon, label, v }) => (
                    <div key={label} className="flex items-center gap-4 px-5 py-4 bg-white hover:bg-gray-50 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <Icon size={14} className="text-gray-500" />
                        </div>
                        <span className="text-xs text-gray-400 w-20 shrink-0">{label}</span>
                        <span className="text-sm font-semibold text-gray-800 flex-1 truncate">{v || '—'}</span>
                        <Check size={13} className="text-green-500 shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Step5Confirmacao
