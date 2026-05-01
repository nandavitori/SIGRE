import React from 'react';
import { Filter, Calendar } from 'lucide-react';

const MapFilters = ({ 
    filters, 
    updateFilter, 
    salas, 
    cursos, 
    professores, 
    periodos, 
    periodoAtivo, 
    setPeriodoAtivo 
}) => {
    const selectClass = "bg-white border border-gray-200 text-gray-700 text-xs rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none transition-all hover:border-blue-300";

    return (
        <div className="px-8 py-4 bg-white border-b border-gray-100 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 mr-2">
                <Filter size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Filtros</span>
            </div>

            {/* Filtro Semestre (Período) */}
            <div className="flex-1 min-w-[150px]">
                <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                    <select 
                        value={periodoAtivo} 
                        onChange={(e) => setPeriodoAtivo(parseInt(e.target.value))}
                        className={selectClass + " pl-9 font-bold text-blue-900 bg-blue-50/50 border-blue-100"}
                    >
                        {periodos.map(p => (
                            <option key={p.id} value={p.id}>{p.descricao}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Filtro Sala */}
            <div className="flex-1 min-w-[140px]">
                <select 
                    value={filters.salaId} 
                    onChange={(e) => updateFilter('salaId', e.target.value)}
                    className={selectClass}
                >
                    <option value="all">Todas as Salas</option>
                    {salas.map(s => (
                        <option key={s.id} value={s.id}>{s.nomeSala || s.nome}</option>
                    ))}
                </select>
            </div>

            {/* Filtro Turma/Curso */}
            <div className="flex-1 min-w-[140px]">
                <select 
                    value={filters.cursoId} 
                    onChange={(e) => updateFilter('cursoId', e.target.value)}
                    className={selectClass}
                >
                    <option value="all">Todas as Turmas</option>
                    {cursos.map(c => (
                        <option key={c.id} value={c.id}>{c.siglaCurso || c.sigla} - {c.nomeCurso || c.nome}</option>
                    ))}
                </select>
            </div>

            {/* Filtro Professor */}
            <div className="flex-1 min-w-[140px]">
                <select 
                    value={filters.professorId} 
                    onChange={(e) => updateFilter('professorId', e.target.value)}
                    className={selectClass}
                >
                    <option value="all">Todos os Professores</option>
                    {professores.map(p => (
                        <option key={p.id} value={p.id}>{p.nomeProf || p.nome}</option>
                    ))}
                </select>
            </div>

            {/* Limpar Filtros */}
            {(filters.salaId !== 'all' || filters.cursoId !== 'all' || filters.professorId !== 'all') && (
                <button 
                    onClick={() => {
                        updateFilter('salaId', 'all');
                        updateFilter('cursoId', 'all');
                        updateFilter('professorId', 'all');
                    }}
                    className="text-[10px] font-black text-red-500 hover:text-red-600 uppercase tracking-tighter px-2 transition-colors"
                >
                    Limpar
                </button>
            )}
        </div>
    );
};

export default MapFilters;
