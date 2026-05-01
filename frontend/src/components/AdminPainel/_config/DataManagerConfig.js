import { z } from 'zod'
import { Users, BookOpen, GraduationCap, Building2, Calendar, Layers } from 'lucide-react'

export const CONFIG = {
    professores: {
        title: 'Professores', singular: 'Professor', endpoint: 'professors', labelKey: 'nomeProf',
        icon: Users, color: '#1d4ed8', colorBg: '#dbeafe',
        fields: [
            { front: 'nome', back: 'nomeProf', label: 'Nome completo', type: 'text', ph: 'Ex: João Silva' },
            { front: 'email', back: 'emailProf', label: 'E-mail', type: 'email', ph: 'joao@uepa.br' },
            { front: 'matricula', back: 'matriculaProf', label: 'Matrícula / SIAPE (opcional)', type: 'text', ph: 'Ex: 123456' },
        ],
        validationSchema: z.object({
            nomeProf: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
            emailProf: z.string().email('E-mail inválido'),
            matriculaProf: z.string().optional().or(z.literal('')),
        })
    },
    disciplinas: {
        title: 'Disciplinas', singular: 'Disciplina', endpoint: 'disciplines', labelKey: 'nomeDisciplina',
        icon: BookOpen, color: '#7c3aed', colorBg: '#ede9fe',
        fields: [
            { front: 'nome', back: 'nomeDisciplina', label: 'Nome da disciplina', type: 'text', ph: 'Ex: Cálculo I' },
            { front: 'matricula', back: 'matriculaDisciplina', label: 'Código/Sigla', type: 'text', ph: 'Ex: MAT001' },
            { front: 'cursoId', back: 'cursoId', label: 'Curso (opcional)', type: 'dynamic-select', listName: 'cursos' },
        ],
        validationSchema: z.object({
            nomeDisciplina: z.string().min(2, 'O nome da disciplina é obrigatório'),
            matriculaDisciplina: z.string().min(2, 'O código/sigla é obrigatório'),
            cursoId: z.coerce.number().optional().nullable(),
        })
    },
    cursos: {
        title: 'Cursos', singular: 'Curso', endpoint: 'courses', labelKey: 'nomeCurso',
        icon: GraduationCap, color: '#0891b2', colorBg: '#cffafe',
        fields: [
            { front: 'nome', back: 'nomeCurso', label: 'Nome do curso', type: 'text', ph: 'Ex: Engenharia de Software' },
            { front: 'sigla', back: 'siglaCurso', label: 'Sigla', type: 'text', ph: 'Ex: BES' },
            { front: 'cor', back: 'corCurso', label: 'Cor de identificação', type: 'color' },
        ],
        validationSchema: z.object({
            nomeCurso: z.string().min(3, 'O nome do curso é obrigatório'),
            siglaCurso: z.string().min(2, 'A sigla é obrigatória'),
            corCurso: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor inválida'),
        })
    },
    tiposSala: {
        title: 'Tipos de sala', singular: 'Tipo de sala', endpoint: 'room-types', labelKey: 'nome',
        icon: Layers, color: '#475569', colorBg: '#f1f5f9',
        fields: [
            { front: 'nome', back: 'nome', label: 'Nome do tipo', type: 'text', ph: 'Ex: Laboratório' },
        ],
        validationSchema: z.object({
            nome: z.string().min(2, 'O nome do tipo é obrigatório'),
        })
    },
    salas: {
        title: 'Salas', singular: 'Sala', endpoint: 'rooms', labelKey: 'nomeSala',
        icon: Building2, color: '#059669', colorBg: '#d1fae5',
        fields: [
            { front: 'nome', back: 'nomeSala', label: 'Nome da sala', type: 'text', ph: 'Ex: 101' },
            {
                front: 'tipo', back: 'tipoSalaId', label: 'Tipo de sala', type: 'dynamic-select',
                listName: 'tiposSala', listLabelKey: 'nome'
            },
            { front: 'capacidade', back: 'capacidade', label: 'Capacidade', type: 'number', ph: 'Ex: 40' }
        ],
        validationSchema: z.object({
            nomeSala: z.string().min(1, 'O nome da sala é obrigatório'),
            tipoSalaId: z.coerce.number().int().min(1, 'O tipo de sala é obrigatório'),
            capacidade: z.coerce.number().int().min(1, 'A capacidade deve ser maior que zero'),
        })
    },
    periodos: {
        title: 'Períodos', singular: 'Período', endpoint: 'periods', labelKey: 'semestre',
        icon: Calendar, color: '#d97706', colorBg: '#fef3c7',
        fields: [
            { front: 'semestre', back: 'semestre', label: 'Semestre', type: 'text', ph: 'Ex: 2025.1' },
            { front: 'descricao', back: 'descricao', label: 'Descrição', type: 'text', ph: 'Ex: Primeiro Semestre' },
            { front: 'dataInicio', back: 'dataInicio', label: 'Data início', type: 'date' },
            { front: 'dataFim', back: 'dataFim', label: 'Data fim', type: 'date' },
        ],
        validationSchema: z.object({
            semestre: z.string().min(4, 'O semestre é obrigatório'),
            descricao: z.string().optional(),
            dataInicio: z.string().min(1, 'Data de início é obrigatória'),
            dataFim: z.string().min(1, 'Data de fim é obrigatória'),
        })
    },
}
