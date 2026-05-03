import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, BookOpen, XCircle, UserPlus, Loader2, Pencil } from 'lucide-react';
import api from '../../services/api';
import { getCursos } from '../../services/CouserService';

const PAPEL_STYLES = {
    aluno:     { label: 'Aluno',     bg: '#ede9fe', color: '#7c3aed' },
    professor: { label: 'Professor', bg: '#dbeafe', color: '#1d4ed8' },
};

const UsuarioCard = ({ u, onAprovar, onRecusar, onDeletar, onVisualizar, showAprovar, showDesativar, showReativar }) => {
    const PapelIcon = u.papel === 'professor' ? BookOpen : GraduationCap;
    const papelCfg = PAPEL_STYLES[u.papel] || PAPEL_STYLES.aluno;

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-all group">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: papelCfg.bg }}>
                    <PapelIcon size={16} style={{ color: papelCfg.color }} />
                </div>
                <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-800 text-sm">{u.nome}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: papelCfg.bg, color: papelCfg.color }}>
                            {papelCfg.label}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">@{u.username} · {u.email}</p>
                    {u.curso && <p className="text-[11px] text-gray-400 mt-0.5">Curso: {u.curso}</p>}
                </div>
            </div>
            <div className="flex gap-2 ml-4">
                <button
                    onClick={() => onVisualizar(u)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                >
                    Ver/Editar
                </button>
                {showAprovar && (
                    <>
                        <button onClick={() => onRecusar(u.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-red-200 text-red-500 hover:bg-red-50">Recusar</button>
                        <button onClick={() => onAprovar(u.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-600 text-white hover:bg-green-700">Aprovar</button>
                    </>
                )}
                {showDesativar && (
                    <button onClick={() => onRecusar(u.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold border text-gray-400 hover:bg-gray-50">Desativar</button>
                )}
                {showReativar && (
                    <button onClick={() => onAprovar(u.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-green-200 text-green-600 hover:bg-green-50">Ativar</button>
                )}
                <button onClick={() => onDeletar(u.id)} className="p-1.5 text-gray-300 hover:text-red-500 transition-colors">
                    <XCircle size={18} />
                </button>
            </div>
        </div>
    );
};

export default function UserManagement({ usuarios, onAprovar, onRecusar, onDeletar, onUsuarioCriado }) {
    const [criando, setCriando] = useState(false)
    const [salvandoEdicao, setSalvandoEdicao] = useState(false)
    const [cursos, setCursos] = useState([])
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null)
    const [formEdicao, setFormEdicao] = useState({
        nome: '',
        email: '',
        username: '',
        telefone: '',
        papel: 'aluno',
        matricula: '',
        siape: '',
        departamento: '',
        status: 'pendente',
        cursoId: '',
        senha: '',
    })
    const [formNovo, setFormNovo] = useState({
        nome: '', email: '', username: '', senha: '', papel: 'aluno', matricula: '', cursoId: '',
    })

    useEffect(() => {
        getCursos().then(setCursos).catch(() => setCursos([]))
    }, [])

    const handleCriarUsuario = async (e) => {
        e.preventDefault()
        const { nome, email, username, senha, papel, matricula, cursoId } = formNovo
        if (!nome?.trim() || !email?.trim() || !senha?.trim()) {
            alert('Preencha nome, e-mail e senha.')
            return
        }
        if (papel === 'aluno' && !cursoId) {
            alert('Selecione o curso do aluno.')
            return
        }
        setCriando(true)
        try {
            const baseUser = email.split('@')[0].replace(/[^a-zA-Z0-9._-]/g, '') || 'usuario'
            const payload = {
                nome: nome.trim(),
                email: email.trim(),
                username: (username || baseUser).trim(),
                senha,
                papel,
                matricula: matricula.trim() || undefined,
            }
            if (cursoId) {
                payload.cursoId = Number(cursoId)
            }
            await api.post('/users/', payload)
            setFormNovo({ nome: '', email: '', username: '', senha: '', papel: 'aluno', matricula: '', cursoId: '' })
            if (onUsuarioCriado) onUsuarioCriado()
            alert('Usuário criado. Ele aparecerá na lista conforme o status definido pelo servidor.')
        } catch (err) {
            const d = err.response?.data?.detail
            alert(typeof d === 'string' ? d : 'Não foi possível criar o usuário.')
        } finally {
            setCriando(false)
        }
    }

    const pendentes = usuarios.filter(u => u.status === 'pendente');
    const ativos = usuarios.filter(u => u.status === 'aprovado');
    const recusados = usuarios.filter(u => u.status === 'recusado');

    const abrirModalEdicao = (u) => {
        setUsuarioSelecionado(u)
        setFormEdicao({
            nome: u.nome || '',
            email: u.email || '',
            username: u.username || '',
            telefone: u.telefone || '',
            papel: u.papel || 'aluno',
            matricula: u.matricula || '',
            siape: u.siape || '',
            departamento: u.departamento || '',
            status: u.status || 'pendente',
            cursoId: u.cursoId ? String(u.cursoId) : '',
            senha: '',
        })
    }

    const fecharModalEdicao = () => {
        setUsuarioSelecionado(null)
        setSalvandoEdicao(false)
    }

    const salvarEdicao = async (e) => {
        e.preventDefault()
        if (!usuarioSelecionado?.id) return
        if (!formEdicao.nome.trim() || !formEdicao.email.trim()) {
            alert('Nome e e-mail são obrigatórios.')
            return
        }

        setSalvandoEdicao(true)
        try {
            const payload = {
                nome: formEdicao.nome.trim(),
                email: formEdicao.email.trim(),
                username: formEdicao.username.trim() || undefined,
                telefone: formEdicao.telefone.trim() || undefined,
                papel: formEdicao.papel,
                matricula: formEdicao.matricula.trim() || undefined,
                siape: formEdicao.siape.trim() || undefined,
                departamento: formEdicao.departamento.trim() || undefined,
                status: formEdicao.status,
                cursoId: formEdicao.cursoId ? Number(formEdicao.cursoId) : undefined,
                senha: formEdicao.senha.trim() || undefined,
            }
            await api.put(`/users/${usuarioSelecionado.id}`, payload)
            if (onUsuarioCriado) onUsuarioCriado()
            fecharModalEdicao()
            alert('Dados do usuário atualizados com sucesso.')
        } catch (err) {
            const detail = err?.response?.data?.detail
            alert(typeof detail === 'string' ? detail : 'Não foi possível atualizar o usuário.')
        } finally {
            setSalvandoEdicao(false)
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight italic">GERENCIAR USUÁRIOS</h3>
                <p className="text-sm text-gray-500">Controle de acesso e permissões do Campus.</p>
            </div>

            <form onSubmit={handleCriarUsuario} className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 space-y-3">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                    <UserPlus size={18} /> Novo usuário (admin)
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                    <input className="px-3 py-2 rounded-xl border text-sm" placeholder="Nome completo"
                        value={formNovo.nome} onChange={e => setFormNovo(f => ({ ...f, nome: e.target.value }))} />
                    <input className="px-3 py-2 rounded-xl border text-sm" placeholder="E-mail" type="email"
                        value={formNovo.email} onChange={e => setFormNovo(f => ({ ...f, email: e.target.value }))} />
                    <input className="px-3 py-2 rounded-xl border text-sm" placeholder="Username (opcional)"
                        value={formNovo.username} onChange={e => setFormNovo(f => ({ ...f, username: e.target.value }))} />
                    <input className="px-3 py-2 rounded-xl border text-sm" placeholder="Senha inicial" type="password"
                        value={formNovo.senha} onChange={e => setFormNovo(f => ({ ...f, senha: e.target.value }))} />
                    <select className="px-3 py-2 rounded-xl border text-sm"
                        value={formNovo.papel} onChange={e => setFormNovo(f => ({ ...f, papel: e.target.value }))}>
                        <option value="aluno">Aluno</option>
                        <option value="professor">Professor</option>
                    </select>
                    <input className="px-3 py-2 rounded-xl border text-sm" placeholder="Matrícula / SIAPE (opcional)"
                        value={formNovo.matricula} onChange={e => setFormNovo(f => ({ ...f, matricula: e.target.value }))} />
                    {(formNovo.papel === 'aluno' || formNovo.papel === 'professor') && (
                        <div className="sm:col-span-2">
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">Curso {formNovo.papel === 'aluno' ? '(obrigatório para aluno)' : '(opcional)'}</label>
                            <select className="w-full px-3 py-2 rounded-xl border text-sm bg-white"
                                value={formNovo.cursoId} onChange={e => setFormNovo(f => ({ ...f, cursoId: e.target.value }))}>
                                <option value="">{formNovo.papel === 'aluno' ? 'Selecione o curso…' : 'Sem curso vinculado'}</option>
                                {cursos.map(c => (
                                    <option key={c.id || c.idCurso} value={String(c.id || c.idCurso)}>{c.nomeCurso || c.nome}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                <button type="submit" disabled={criando}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold disabled:opacity-50">
                    {criando ? <Loader2 size={16} className="animate-spin" /> : null}
                    Cadastrar usuário
                </button>
            </form>

            {usuarios.length === 0 ? (
                <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-100">
                    <Users size={40} className="mx-auto mb-3 text-gray-200" />
                    <p className="text-gray-500 text-sm">Nenhum usuário na lista ainda — use o formulário acima para criar o primeiro.</p>
                </div>
            ) : (
                <>
                    {pendentes.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500" /> Aguardando Aprovação
                            </h4>
                            {pendentes.map(u => (
                                <UsuarioCard key={u.id} u={u} onAprovar={onAprovar} onRecusar={onRecusar} onDeletar={onDeletar} onVisualizar={abrirModalEdicao} showAprovar />
                            ))}
                        </div>
                    )}

                    {ativos.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-green-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500" /> Usuários Ativos
                            </h4>
                            {ativos.map(u => (
                                <UsuarioCard key={u.id} u={u} onAprovar={onAprovar} onRecusar={onRecusar} onDeletar={onDeletar} onVisualizar={abrirModalEdicao} showDesativar />
                            ))}
                        </div>
                    )}

                    {recusados.length > 0 && (
                        <div className="space-y-3 opacity-60">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gray-400" /> Inativos/Recusados
                            </h4>
                            {recusados.map(u => (
                                <UsuarioCard key={u.id} u={u} onAprovar={onAprovar} onRecusar={onRecusar} onDeletar={onDeletar} onVisualizar={abrirModalEdicao} showReativar />
                            ))}
                        </div>
                    )}
                </>
            )}

            {usuarioSelecionado && (
                <div className="fixed inset-0 z-[210] bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-4">
                    <form onSubmit={salvarEdicao} className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-lg font-black text-slate-900">Visualizar/Editar Usuário</h4>
                            <button type="button" onClick={fecharModalEdicao} className="text-gray-400 hover:text-gray-600">
                                <XCircle size={20} />
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                            <input className="px-3 py-2 rounded-xl border text-sm" placeholder="Nome"
                                value={formEdicao.nome} onChange={e => setFormEdicao(f => ({ ...f, nome: e.target.value }))} />
                            <input className="px-3 py-2 rounded-xl border text-sm" placeholder="E-mail" type="email"
                                value={formEdicao.email} onChange={e => setFormEdicao(f => ({ ...f, email: e.target.value }))} />
                            <input className="px-3 py-2 rounded-xl border text-sm" placeholder="Username"
                                value={formEdicao.username} onChange={e => setFormEdicao(f => ({ ...f, username: e.target.value }))} />
                            <input className="px-3 py-2 rounded-xl border text-sm" placeholder="Telefone"
                                value={formEdicao.telefone} onChange={e => setFormEdicao(f => ({ ...f, telefone: e.target.value }))} />
                            <input className="px-3 py-2 rounded-xl border text-sm" placeholder="Matrícula"
                                value={formEdicao.matricula} onChange={e => setFormEdicao(f => ({ ...f, matricula: e.target.value }))} />
                            <input className="px-3 py-2 rounded-xl border text-sm" placeholder="SIAPE"
                                value={formEdicao.siape} onChange={e => setFormEdicao(f => ({ ...f, siape: e.target.value }))} />
                            <input className="sm:col-span-2 px-3 py-2 rounded-xl border text-sm" placeholder="Departamento"
                                value={formEdicao.departamento} onChange={e => setFormEdicao(f => ({ ...f, departamento: e.target.value }))} />
                            <select className="px-3 py-2 rounded-xl border text-sm"
                                value={formEdicao.papel} onChange={e => setFormEdicao(f => ({ ...f, papel: e.target.value }))}>
                                <option value="aluno">Aluno</option>
                                <option value="professor">Professor</option>
                                <option value="admin">Admin</option>
                            </select>
                            <select className="px-3 py-2 rounded-xl border text-sm"
                                value={formEdicao.status} onChange={e => setFormEdicao(f => ({ ...f, status: e.target.value }))}>
                                <option value="pendente">Pendente</option>
                                <option value="aprovado">Aprovado</option>
                                <option value="recusado">Recusado</option>
                            </select>
                            <select className="sm:col-span-2 px-3 py-2 rounded-xl border text-sm bg-white"
                                value={formEdicao.cursoId} onChange={e => setFormEdicao(f => ({ ...f, cursoId: e.target.value }))}>
                                <option value="">Sem curso vinculado</option>
                                {cursos.map(c => (
                                    <option key={c.id || c.idCurso} value={String(c.id || c.idCurso)}>{c.nomeCurso || c.nome}</option>
                                ))}
                            </select>
                            <div className="sm:col-span-2">
                                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">
                                    Redefinir senha (opcional)
                                </label>
                                <input className="w-full px-3 py-2 rounded-xl border text-sm" type="password" placeholder="Nova senha"
                                    value={formEdicao.senha} onChange={e => setFormEdicao(f => ({ ...f, senha: e.target.value }))} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button type="button" onClick={fecharModalEdicao} className="px-4 py-2 rounded-xl border text-sm font-semibold">
                                Cancelar
                            </button>
                            <button type="submit" disabled={salvandoEdicao}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold disabled:opacity-50">
                                {salvandoEdicao ? <Loader2 size={16} className="animate-spin" /> : <Pencil size={14} />}
                                Salvar alterações
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
