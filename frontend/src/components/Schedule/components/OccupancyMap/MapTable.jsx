import React from 'react';
import { OCCUPANCY_CONFIG } from '../../config/OccupancyMapConfig';

const MapTable = ({ dias, gridData, cursos, TIME_SLOTS, filters }) => {
    const { DIAS_ABREV } = OCCUPANCY_CONFIG;

    const formatarData = (data) => {
        if (!data) return '';
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    return (
        <div className="flex-1 overflow-auto p-8 bg-gray-50/30">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full border-collapse text-[11px]">
                    <thead>
                        <tr className="bg-[#1c1aa3] text-white">
                            <th className="p-4 text-center font-bold sticky left-0 z-30 bg-[#1c1aa3] border-r border-white/10 w-40">Horários</th>
                            {dias.map((dia, idx) => (
                                <th key={dia} className="p-3 text-center font-black uppercase tracking-wider border-l border-white/10 min-w-[150px]">
                                    {DIAS_ABREV[idx]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TIME_SLOTS.map(slot => (
                            <tr key={slot.id} className="group hover:bg-blue-50/10 transition-colors border-b border-gray-100">
                                <td className="p-4 font-bold text-gray-500 text-center sticky left-0 z-20 bg-gray-50/50 group-hover:bg-blue-50 transition-colors border-r border-gray-100">
                                    {slot.label}
                                </td>
                                {dias.map(dia => {
                                    const items = gridData[slot.id]?.[dia] || [];
                                    return (
                                        <td key={`${slot.id}-${dia}`} className="p-2 border-l border-gray-50 align-top min-h-[60px] text-center">
                                            {items.length === 0 ? (
                                                <span className="text-[10px] text-gray-200">---</span>
                                            ) : (
                                                items.map(h => {
                                                    const curso = cursos.find(c => c.id === h.cursoId);
                                                    return (
                                                        <div key={h.id} 
                                                            className="mb-2 p-3 rounded-xl text-[10px] leading-tight border border-transparent hover:border-gray-200 transition-all"
                                                        >
                                                            <div className="font-black text-[#1c1aa3] text-[11px] mb-1">
                                                                {curso?.siglaCurso || curso?.sigla || 'DISC'}
                                                            </div>
                                                            <div className="text-gray-500 font-bold mb-1">
                                                                ({formatarData(h.dataInicio)} - {formatarData(h.dataFim)})
                                                            </div>
                                                            {filters.salaId === 'all' && (
                                                                <div className="text-[9px] font-black text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded-full mt-1">
                                                                    {h.salaNome || 'Sala'}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MapTable;
