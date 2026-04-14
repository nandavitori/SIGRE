import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../services/api';

export const ScheduleContext = createContext();

function datePart(isoOrDate) {
    if (!isoOrDate) return '';
    const s = String(isoOrDate);
    return s.includes('T') ? s.split('T')[0] : s.slice(0, 10);
}

/** Monta corpo de criação/atualização de reserva alinhado ao backend (Pydantic). */
function buildReservationApiPayload(disciplinas, professores, d) {
    const uid = Number(localStorage.getItem('userId'));
    const ds = datePart(d.dataInicio);
    const de = datePart(d.dataFim);
    const startLocal = `${ds}T${d.horarioInicio}:00`;
    const endLocal = `${de}T${d.horarioFim}:00`;
    const disc = disciplinas.find(x => x.id === d.disciplinaId);
    const prof = professores.find(x => x.id === d.professorId);
    const discNome = disc?.nomeDisciplina || 'Alocação';
    const profNome = prof?.nomeProf || '';
    return {
        fk_usuario: uid,
        salaId: d.salaId,
        professorId: d.professorId,
        disciplinaId: d.disciplinaId,
        cursoId: d.cursoId,
        periodoId: d.periodoId,
        tipo: 'AULA',
        dia_horario_inicio: new Date(startLocal).toISOString(),
        dia_horario_saida: new Date(endLocal).toISOString(),
        diaSemana: d.diaSemana,
        dataInicio: new Date(startLocal).toISOString(),
        dataFim: new Date(endLocal).toISOString(),
        uso: discNome,
        justificativa: profNome ? `${discNome} — ${profNome}` : discNome,
        status: 'APPROVED',
    };
}

function buildReservationPatchPayload(disciplinas, professores, d) {
    const base = buildReservationApiPayload(disciplinas, professores, d);
    const { fk_usuario, status, ...rest } = base;
    return rest;
}

export const useSchedule = () => {
    const context = useContext(ScheduleContext);
    if (!context) throw new Error('useSchedule deve ser usado dentro de ScheduleProvider');
    return context;
};

export const ScheduleProvider = ({ children }) => {
    const [cursos, setCursos] = useState([]);
    const [salas, setSalas] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [periodoAtivo, setPeriodoAtivo] = useState(null);
    const [loading, setLoading] = useState(false);

    const recarregarDados = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        console.log("Atualizando dados...");
        setLoading(true);
        try {
            const [resCursos, resSalas, resPeriodos, resAloc, resProfs, resDiscs] = await Promise.all([
                api.get('/courses/'),
                api.get('/rooms/'),
                api.get('/periods/'),
                api.get('/reservations/'),
                api.get('/professors/'),
                api.get('/disciplines/'),
            ]);

            setCursos(Array.isArray(resCursos.data) ? resCursos.data : []);
            setSalas(Array.isArray(resSalas.data) ? resSalas.data : []);
            
            const periodosFmt = Array.isArray(resPeriodos.data) 
                ? resPeriodos.data.map(p => ({
                    id: p.id,
                    semestre: p.semestre,
                    descricao: p.descricao,
                    dataInicio: p.dataInicio ? p.dataInicio.split('T')[0] : '',
                    dataFim: p.dataFim ? p.dataFim.split('T')[0] : ''
                }))
                : [];
            setPeriodos(periodosFmt);
            
            if (periodosFmt.length > 0 && !periodoAtivo) setPeriodoAtivo(periodosFmt[0].id);

            // Backend returns { items: [...] } for reservations
            const alocItems = resAloc.data?.items || [];
            setHorarios(alocItems.map(aloc => ({
                id: aloc.id,
                diaSemana: aloc.diaSemana,
                horarioInicio: aloc.horarioInicio,
                horarioFim: aloc.horarioFim,
                dataInicio: aloc.dataInicio ? aloc.dataInicio.split('T')[0] : '',
                dataFim: aloc.dataFim ? aloc.dataFim.split('T')[0] : '',
                cursoId: aloc.cursoId,
                salaId: aloc.salaId,
                periodoId: aloc.periodoId,
                disciplina: aloc.disciplina,
                professor: aloc.professor,
                semestre: aloc.semestre
            })));

            setProfessores(Array.isArray(resProfs.data) ? resProfs.data : []);
            setDisciplinas(Array.isArray(resDiscs.data) ? resDiscs.data : []);

        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        recarregarDados();
    }, []);

    const createItem = async (endpoint, data, stateSetter, formatter) => {
        try {
            const response = await api.post(endpoint, data);
            const novoItem = formatter ? formatter(response.data) : response.data;
            stateSetter(prev => [...prev, novoItem]);
            return novoItem.id;
        } catch (error) {
            console.error(`Erro ao criar:`, error);
            alert("Erro ao salvar.");
            return null;
        }
    };

    const adicionarPeriodo = (d) => createItem('/periods/', d, setPeriodos, (r) => ({ ...r, dataInicio: r.dataInicio.split('T')[0], dataFim: r.dataFim.split('T')[0] }));
    const adicionarProfessor = (d) => createItem('/professors/', d, setProfessores);
    const adicionarDisciplina = (d) => createItem('/disciplines/', d, setDisciplinas);
    const adicionarCurso = (d) => createItem('/courses/', d, setCursos);
    const adicionarSala = (d) => createItem('/rooms/', d, setSalas);

    const adicionarHorario = async (novoHorario) => {
        try {
            const body = buildReservationApiPayload(disciplinas, professores, novoHorario);
            if (!body.fk_usuario) {
                alert('Sessão inválida: faça login novamente.');
                return;
            }
            await api.post('/reservations/', body);
            recarregarDados();
            alert("Horário salvo!");
        } catch (error) {
            console.error(error); alert("Erro ao salvar horário.");
        }
    };

    const atualizarHorario = async (id, dados) => {
        try {
            const baseId = String(id).split(':')[0];
            const body = buildReservationPatchPayload(disciplinas, professores, dados);
            await api.patch(`/reservations/${baseId}`, body);
            recarregarDados();
            alert("Horário atualizado!");
        } catch (error) { console.error(error); alert("Erro ao atualizar."); }
    }

    const removerHorario = async (id) => {
        if (!window.confirm("Tem certeza?")) return;
        try {
            await api.delete(`/reservations/${id}`);
            setHorarios(prev => prev.filter(h => h.id !== id));
            alert("Excluído!");
        } catch (error) { console.error(error); alert("Erro ao excluir."); }
    }

    return (
        <ScheduleContext.Provider value={{
            cursos, salas, periodos, horarios, professores, disciplinas, periodoAtivo, setPeriodoAtivo, loading,
            adicionarHorario, atualizarHorario, removerHorario,
            adicionarPeriodo, adicionarProfessor, adicionarDisciplina, adicionarCurso, adicionarSala,
            recarregarDados 
        }}>
            {children}
        </ScheduleContext.Provider>
    );
};