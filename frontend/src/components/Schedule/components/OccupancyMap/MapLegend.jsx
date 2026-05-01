import React from 'react';

const MapLegend = ({ cursos }) => {
    return (
        <div className="px-8 py-4 bg-gray-50 border-t flex flex-wrap gap-6 items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Legenda Cursos:</span>
            <div className="flex flex-wrap gap-4">
                {cursos.slice(0, 10).map(curso => (
                    <div 
                        key={curso.id} 
                        className="flex items-center gap-2 cursor-help group relative"
                        title={curso.nomeCurso || curso.nome}
                    >
                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: curso.cor }}></div>
                        <span className="text-[10px] font-bold text-gray-600 uppercase group-hover:text-blue-600 transition-colors">
                            {curso.siglaCurso || curso.sigla}
                        </span>
                        
                        {/* Tooltip customizado (opcional, o 'title' já resolve, mas este é mais premium) */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                            {curso.nomeCurso || curso.nome}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                ))}
                {cursos.length > 10 && <span className="text-[10px] text-gray-400">+ {cursos.length - 10} mais</span>}
            </div>
        </div>
    );
};

export default MapLegend;
