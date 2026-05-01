import React from 'react';
import { useOccupancyMap } from './hooks/useOccupancyMap';
import { OccupancyMapService } from './services/OccupancyMapService';

// Sub-componentes
import MapHeader from './components/OccupancyMap/MapHeader';
import MapFilters from './components/OccupancyMap/MapFilters';
import MapTable from './components/OccupancyMap/MapTable';
import MapLegend from './components/OccupancyMap/MapLegend';

const OccupancyMap = ({ isOpen, onClose }) => {
    const { 
        salas, 
        allSalas,
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
    } = useOccupancyMap();

    const handleDownloadPDF = () => {
        OccupancyMapService.generatePDF(
            gridData, 
            salas, 
            cursos, 
            periodoAtual, 
            filters, 
            allSalas, 
            professores
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="bg-white w-full max-w-[95vw] h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                
                <MapHeader 
                    periodoDesc={periodoAtual?.descricao} 
                    onDownload={handleDownloadPDF} 
                    onClose={onClose} 
                />

                <MapFilters 
                    filters={filters}
                    updateFilter={updateFilter}
                    salas={allSalas}
                    cursos={cursos}
                    professores={professores}
                    periodos={periodos}
                    periodoAtivo={periodoAtivo}
                    setPeriodoAtivo={setPeriodoAtivo}
                />

                <MapTable 
                    dias={DIAS} 
                    gridData={gridData} 
                    cursos={cursos} 
                    TIME_SLOTS={TIME_SLOTS}
                    filters={filters}
                />
                
                <MapLegend cursos={cursos} />

            </div>
        </div>
    );
};

export default OccupancyMap;
