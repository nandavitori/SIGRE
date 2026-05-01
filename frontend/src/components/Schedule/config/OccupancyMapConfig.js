export const OCCUPANCY_CONFIG = {
    DIAS: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    DIAS_ABREV: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    
    // Horários de 50 minutos seguindo o padrão da imagem/UEPA
    TIME_SLOTS: [
        { id: 'M1', label: '07:30 - 08:20', start: '07:30', end: '08:20' },
        { id: 'M2', label: '08:20 - 09:10', start: '08:20', end: '09:10' },
        { id: 'M3', label: '09:20 - 10:10', start: '09:20', end: '10:10' },
        { id: 'M4', label: '10:10 - 11:00', start: '10:10', end: '11:00' },
        { id: 'M5', label: '11:10 - 12:00', start: '11:10', end: '12:00' },
        { id: 'M6', label: '12:00 - 12:50', start: '12:00', end: '12:50' },
        
        { id: 'T1', label: '13:30 - 14:20', start: '13:30', end: '14:20' },
        { id: 'T2', label: '14:20 - 15:10', start: '14:20', end: '15:10' },
        { id: 'T3', label: '15:10 - 16:00', start: '15:10', end: '16:00' },
        { id: 'T4', label: '16:15 - 17:05', start: '16:15', end: '17:05' },
        { id: 'T5', label: '17:05 - 17:55', start: '17:05', end: '17:55' },
        { id: 'T6', label: '17:55 - 18:45', start: '17:55', end: '18:45' },
    ],

    COLORS: {
        PRIMARY: [28, 26, 163], // #1c1aa3
        SECONDARY: [79, 70, 229], // #4f46e5
        TEXT_LIGHT: 255,
        TEXT_DARK: 100,
        BG_GRAY: [245, 245, 245],
        BG_WHITE: [255, 255, 255],
        BORDER_LIGHT: [240, 240, 240]
    },
    PDF: {
        ORIENTATION: 'landscape',
        FORMAT: 'a3',
        FONT_SIZE_TITLE: 22,
        FONT_SIZE_SUBTITLE: 10,
        FONT_SIZE_TABLE: 7,
        FONT_SIZE_HEAD: 9,
        CELL_PADDING: 2
    }
};
