import React from 'react';
import { X, Download, Map as MapIcon } from 'lucide-react';

const MapHeader = ({ periodoDesc, onDownload, onClose }) => {
    return (
        <div className="px-8 py-6 border-b flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    <MapIcon size={28} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Mapa de Ocupação</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {periodoDesc || 'Sem Período Selecionado'}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 font-medium">Visualização completa por sala e turno</span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <button 
                    onClick={onDownload}
                    className="group flex items-center gap-2 px-6 py-3 bg-[#1c1aa3] text-white rounded-xl font-bold text-sm hover:bg-[#151382] transition-all active:scale-95 shadow-lg shadow-blue-200"
                >
                    <Download size={18} className="group-hover:bounce" />
                    Baixar PDF Completo
                </button>
                <button 
                    onClick={onClose} 
                    className="p-3 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
                >
                    <X size={24} />
                </button>
            </div>
        </div>
    );
};

export default MapHeader;
