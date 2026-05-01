import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { OCCUPANCY_CONFIG } from '../config/OccupancyMapConfig';

export const OccupancyMapService = {
    generatePDF: (gridData, salas, cursos, periodoAtual, filters, allSalas, professores) => {
        const { DIAS, DIAS_ABREV, TIME_SLOTS, PDF, COLORS } = OCCUPANCY_CONFIG;
        const doc = new jsPDF({ 
            orientation: PDF.ORIENTATION, 
            format: PDF.FORMAT 
        });
        
        const formatarData = (data) => {
            if (!data) return '';
            const [ano, mes, dia] = data.split('-');
            return `${dia}/${mes}/${ano}`;
        };

        // Header Principal
        doc.setFontSize(PDF.FONT_SIZE_TITLE);
        doc.setTextColor(...COLORS.PRIMARY);
        doc.text(`Tabela de Horários - ${periodoAtual?.descricao || 'Semestre Ativo'}`, 14, 20);
        
        // Sub-header
        doc.setFontSize(PDF.FONT_SIZE_SUBTITLE);
        doc.setTextColor(COLORS.TEXT_DARK);
        doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 28);

        // Filtros
        let filterText = [];
        if (filters.salaId !== 'all') {
            const s = allSalas.find(x => String(x.id) === String(filters.salaId));
            filterText.push(`Sala: ${s?.nomeSala || s?.nome}`);
        }
        if (filters.cursoId !== 'all') {
            const c = cursos.find(x => x.id === parseInt(filters.cursoId));
            filterText.push(`Turma: ${c?.siglaCurso || c?.sigla}`);
        }
        if (filters.professorId !== 'all') {
            const p = professores.find(x => x.id === parseInt(filters.professorId));
            filterText.push(`Professor: ${p?.nomeProf || p?.nome}`);
        }

        if (filterText.length > 0) {
            doc.setFontSize(9);
            doc.setTextColor(100);
            doc.text(`Filtros: ${filterText.join(' | ')}`, 14, 34);
        }

        // Colunas: Horários + Dias
        const tableColumn = ["Horários", ...DIAS_ABREV];
        const tableRows = [];

        TIME_SLOTS.forEach(slot => {
            const rowData = [slot.label];
            DIAS.forEach(dia => {
                const hList = gridData[slot.id]?.[dia];
                if (hList && hList.length > 0) {
                    const content = hList.map(h => {
                        const curso = cursos.find(c => c.id === h.cursoId);
                        const sigla = curso?.siglaCurso || curso?.sigla || 'DISC';
                        const salaStr = filters.salaId === 'all' ? `\n(${h.salaNome || 'Sala'})` : '';
                        return `${sigla}\n(${formatarData(h.dataInicio)} - ${formatarData(h.dataFim)})${salaStr}`;
                    }).join('\n---\n');
                    rowData.push(content);
                } else {
                    rowData.push('---');
                }
            });
            tableRows.push(rowData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            theme: 'grid',
            styles: { 
                fontSize: PDF.FONT_SIZE_TABLE, 
                cellPadding: PDF.CELL_PADDING, 
                overflow: 'linebreak', 
                halign: 'center', 
                valign: 'middle',
                lineWidth: 0.1
            },
            headStyles: { 
                fillColor: COLORS.PRIMARY, 
                textColor: COLORS.TEXT_LIGHT, 
                halign: 'center', 
                fontStyle: 'bold', 
                fontSize: PDF.FONT_SIZE_HEAD 
            },
            columnStyles: {
                0: { fontStyle: 'bold', fillColor: COLORS.BG_GRAY, cellWidth: 35, halign: 'center' }
            },
            margin: { top: 40, bottom: 20 }
        });

        doc.save(`tabela_horarios_${periodoAtual?.descricao?.replace(/\s+/g, '_') || 'geral'}.pdf`);
    }
};
