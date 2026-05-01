import { ChevronLeft, ArrowRight, Check } from 'lucide-react'

const FormFooter = ({ step, isSaving, handleNext, handleBack, handleSubmit, horarioEdit }) => {
    return (
        <div className="px-8 py-4 border-t border-gray-100 bg-gray-50/70 flex justify-between items-center">
            <button type="button" onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-500 text-sm font-semibold hover:bg-gray-200 transition-colors">
                <ChevronLeft size={15} />{step === 1 ? 'Cancelar' : 'Voltar'}
            </button>
            {step < 5
                ? <button type="button" onClick={handleNext}
                    className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-white text-sm font-bold transition-all shadow-lg active:scale-95"
                    style={{ background: 'linear-gradient(135deg,#1c1aa3,#4f46e5)', boxShadow: '0 4px 16px rgba(28,26,163,0.28)' }}>
                    Continuar <ArrowRight size={15} />
                </button>
                : <button type="button" onClick={handleSubmit} disabled={isSaving}
                    className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-white text-sm font-bold disabled:opacity-50 transition-all"
                    style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)', boxShadow: isSaving ? 'none' : '0 4px 16px rgba(22,163,74,0.25)' }}>
                    {isSaving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Salvando...
                        </>
                    ) : (
                        <>
                            <Check size={15} />{horarioEdit ? 'Atualizar Horário' : 'Salvar Horário'}
                        </>
                    )}
                </button>
            }
        </div>
    )
}

export default FormFooter
