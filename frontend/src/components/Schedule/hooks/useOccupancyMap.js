import { useMemo, useState } from 'react';
import { useSchedule } from '../ScheduleContext';
import { OCCUPANCY_CONFIG } from '../config/OccupancyMapConfig';

export const useOccupancyMap = () => {
    const { salas, horarios, periodos, periodoAtivo, cursos, professores, setPeriodoAtivo } = useSchedule();
    const { DIAS, TIME_SLOTS } = OCCUPANCY_CONFIG;

    // Estados de filtro
    const [filters, setFilters] = useState({
        salaId: 'all',
        cursoId: 'all',
        professorId: 'all',
    });

    const periodoAtual = periodos.find(p => p.id === periodoAtivo);

    // Filtra horários do período ativo e aplica filtros de curso, professor e busca
    const filteredHorarios = useMemo(() => {
        return horarios.filter(h => {
            if (h.periodoId !== periodoAtivo) return false;
            if (filters.salaId !== 'all' && String(h.salaId) !== String(filters.salaId)) return false;
            if (filters.cursoId !== 'all' && h.cursoId !== parseInt(filters.cursoId)) return false;
            if (filters.professorId !== 'all' && h.professorId !== parseInt(filters.professorId)) return false;
            
            return true;
        }).map(h => {
            // Adiciona o nome da sala para exibição quando filtrado por 'todos'
            const sala = salas.find(s => s.id === h.salaId);
            return {
                ...h,
                salaNome: sala?.nomeSala || sala?.nome || '—'
            };
        });
    }, [horarios, periodoAtivo, filters, salas]);

    const gridData = useMemo(() => {
        const data = {};
        
        // Estrutura: data[slotId][dia] = [horarios]
        TIME_SLOTS.forEach(slot => {
            data[slot.id] = {};
            DIAS.forEach(dia => {
                data[slot.id][dia] = [];
            });
        });

        filteredHorarios.forEach(h => {
            const diaLimpo = h.diaSemana.split('-')[0];
            
            TIME_SLOTS.forEach(slot => {
                if (data[slot.id] && data[slot.id][diaLimpo]) {
                    // Lógica de interseção de horários
                    if (h.horarioInicio < slot.end && h.horarioFim > slot.start) {
                        data[slot.id][diaLimpo].push(h);
                    }
                }
            });
        });

        return data;
    }, [filteredHorarios, DIAS, TIME_SLOTS]);

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return {
        salas,
        allSalas: salas,
        cursos,
        professores,
        periodos,
        periodoAtual,
        periodoAtivo,
        setPeriodoAtivo,
        gridData,
        DIAS,
        TIME_SLOTS,
        filters,
        updateFilter
    };
};
