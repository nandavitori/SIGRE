import { Edit2, Trash2, Plus } from 'lucide-react'

const DataList = ({ list, cfg, activeTab, onEdit, onDelete, onAdd }) => {
    if (list.length === 0) {
        return (
            <div className="text-center py-14 px-6">
                <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: cfg.colorBg }}>
                    <cfg.icon size={20} style={{ color: cfg.color }} />
                </div>
                <p className="text-sm font-bold text-gray-500">Nenhum(a) {cfg.singular.toLowerCase()} cadastrado(a)</p>
                <p className="text-xs text-gray-400 mt-1 mb-5">Clique no botão abaixo para adicionar</p>
                <button onClick={onAdd}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-all"
                    style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)` }}>
                    <Plus size={13} /> Adicionar {cfg.singular.toLowerCase()}
                </button>
            </div>
        )
    }

    return (
        <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
            {list.map(item => {
                let hiddenSigla = item.sigla || item.matriculaDisciplina || item.matricula || '';
                if (typeof hiddenSigla === 'string' && hiddenSigla.includes('| META:')) {
                    hiddenSigla = hiddenSigla.split('| META:')[0].trim();
                }
                const fallbackId = item.id || item.idProfessor || item.idDisciplina || item.idCurso || item.idSala || item.idPeriodo;

                return (
                    <div key={fallbackId}
                        className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-3 min-w-0">
                            {item.cor ? (
                                <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ background: item.cor }} />
                            ) : (
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: cfg.colorBg }}>
                                    <cfg.icon size={13} style={{ color: cfg.color }} />
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                    {item[cfg.labelKey] || item.semestre || 'Sem nome'}
                                </p>
                                {item.email && <p className="text-xs text-gray-400 truncate">{item.email}</p>}
                                {hiddenSigla && <p className="text-xs text-gray-400">{hiddenSigla}</p>}
                                {item.tipo && <p className="text-xs text-gray-400 capitalize">{item.tipo}</p>}
                                {item.descricao && activeTab === 'periodos' && <p className="text-xs text-gray-400 truncate">{item.descricao}</p>}
                            </div>
                        </div>
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4">
                            <button onClick={() => onEdit(item)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg transition-all hover:scale-110"
                                style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                                <Edit2 size={12} />
                            </button>
                            <button onClick={() => onDelete(fallbackId)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg transition-all hover:scale-110"
                                style={{ background: '#fee2e2', color: '#dc2626' }}>
                                <Trash2 size={12} />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default DataList
