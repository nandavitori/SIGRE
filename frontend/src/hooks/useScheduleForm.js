import { useState, useEffect, useCallback } from 'react'

export const useScheduleForm = ({ 
    horarioEdit, 
    periodoAtivo, 
    periodos, 
    onSave, 
    onCancel, 
    onGoToCadastros, 
    restoreDraft 
}) => {
    const [step, setStep] = useState(1)
    const [isSaving, setIsSaving] = useState(false)
    const [errors, setErrors] = useState({})
    
    const [form, setForm] = useState({
        periodoId: String(periodoAtivo || ''), 
        dataInicio: '', 
        dataFim: '',
        diaSemana: '', 
        horarioInicio: '', 
        horarioFim: '',
        salaId: '', 
        disciplinaId: '', 
        cursoId: '', 
        professorId: '',
    })

    // Helper para atualizar campos e limpar erros
    const set = useCallback((k, v) => {
        setForm(f => ({ ...f, [k]: v }))
        setErrors(prev => {
            if (!prev[k]) return prev
            const next = { ...prev }
            delete next[k]
            return next
        })
    }, [])

    // Restaura rascunho ao voltar do Cadastros
    useEffect(() => {
        if (!restoreDraft || horarioEdit) return
        const draft = sessionStorage.getItem('scheduleFormDraft')
        const draftStep = sessionStorage.getItem('scheduleFormStep')
        if (draft) {
            try {
                setForm(JSON.parse(draft))
                if (draftStep) setStep(parseInt(draftStep))
            } catch (e) {
                console.error("Erro ao restaurar rascunho:", e)
            }
            sessionStorage.removeItem('scheduleFormDraft')
            sessionStorage.removeItem('scheduleFormStep')
        }
    }, [restoreDraft, horarioEdit])

    // Inicializa período ativo
    useEffect(() => {
        if (!horarioEdit && periodoAtivo && !form.periodoId) {
            set('periodoId', String(periodoAtivo))
        }
    }, [periodoAtivo, horarioEdit, form.periodoId, set])

    // Carrega dados para edição
    useEffect(() => {
        if (horarioEdit) {
            const p = periodos.find(p => p.id === horarioEdit.periodoId)
            setForm({
                periodoId: String(horarioEdit.periodoId || ''),
                dataInicio: (horarioEdit.dataInicio || p?.dataInicio || '').split('T')[0],
                dataFim: (horarioEdit.dataFim || p?.dataFim || '').split('T')[0],
                diaSemana: horarioEdit.diaSemana || '',
                horarioInicio: horarioEdit.horarioInicio || '',
                horarioFim: horarioEdit.horarioFim || '',
                salaId: String(horarioEdit.salaId || ''),
                disciplinaId: String(horarioEdit.disciplinaId || horarioEdit.disciplina?.id || ''),
                cursoId: String(horarioEdit.cursoId || ''),
                professorId: String(horarioEdit.professorId || horarioEdit.professor?.id || ''),
            })
        }
    }, [horarioEdit, periodos])

    // Salva rascunho e redireciona
    const handleGoTo = (tab) => {
        sessionStorage.setItem('scheduleFormDraft', JSON.stringify(form))
        sessionStorage.setItem('scheduleFormStep', String(step))
        onGoToCadastros(tab)
    }

    const validateStep = (s) => {
        const newErrors = {}
        if (s === 1) {
            if (!form.diaSemana) newErrors.diaSemana = 'Selecione o dia da semana'
            if (!form.horarioInicio) newErrors.horarioInicio = 'Obrigatório'
            if (!form.horarioFim) newErrors.horarioFim = 'Obrigatório'
            if (form.horarioInicio && form.horarioFim && form.horarioInicio >= form.horarioFim) {
                newErrors.horarioFim = 'Deve ser após o início'
            }
            if (!form.dataInicio) newErrors.dataInicio = 'Obrigatório'
            if (!form.dataFim) newErrors.dataFim = 'Obrigatório'
        }
        if (s === 2) {
            if (!form.salaId) newErrors.salaId = 'Selecione uma sala ou laboratório'
        }
        if (s === 3) {
            if (!form.disciplinaId) newErrors.disciplinaId = 'Selecione a disciplina'
            if (!form.cursoId) newErrors.cursoId = 'Selecione o curso'
        }
        if (s === 4) {
            if (!form.professorId) newErrors.professorId = 'Selecione o professor responsável'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (validateStep(step)) setStep(s => s + 1)
    }

    const handleBack = () => {
        setErrors({})
        if (step > 1) setStep(s => s - 1)
        else onCancel()
    }

    const handleSubmit = async () => {
        if (form.horarioInicio >= form.horarioFim) {
            alert('O horário de término deve ser maior que o de início.')
            return
        }

        setIsSaving(true)
        try {
            const payload = {
                cursoId: parseInt(form.cursoId),
                salaId: parseInt(form.salaId),
                professorId: parseInt(form.professorId),
                disciplinaId: parseInt(form.disciplinaId),
                periodoId: parseInt(form.periodoId),
                diaSemana: form.diaSemana,
                horarioInicio: form.horarioInicio,
                horarioFim: form.horarioFim,
                dataInicio: new Date(form.dataInicio).toISOString(),
                dataFim: new Date(form.dataFim).toISOString(),
            }
            await onSave(payload)
        } catch (err) {
            console.error('Error in handleSubmit:', err)
            alert('Não foi possível processar os dados do formulário. Verifique se todas as datas e horários estão corretos.')
        } finally {
            setIsSaving(false)
        }
    }

    return {
        step, setStep,
        form, setForm, set,
        errors, setErrors,
        isSaving,
        handleNext, handleBack,
        handleSubmit,
        handleGoTo
    }
}
