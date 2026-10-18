import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UserProfile, UserRole } from '../types';
import {
  User,
  Mail,
  Building,
  Shield,
  Save,
  X,
  UserCheck,
  CheckCircle2,
  PlusCircle,
  Trash2,
  Sparkles
} from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
];

export const EditUserModal: React.FC = () => {
  const {
    isEditUserModalOpen,
    setIsEditUserModalOpen,
    editingUser,
    updateUser,
    addUser,
    deleteUser,
    users,
    currentUser,
    switchUserRole
  } = useApp();

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>(currentUser.id);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState<UserRole>('founder_ceo');
  const [avatar, setAvatar] = useState(PRESET_AVATARS[0]);

  // Sync state when modal opens or editingUser changes
  useEffect(() => {
    if (editingUser) {
      setSelectedUserId(editingUser.id);
      setName(editingUser.name);
      setEmail(editingUser.email);
      setTitle(editingUser.title);
      setCompany(editingUser.company);
      setRole(editingUser.role);
      setAvatar(editingUser.avatar);
      setIsCreatingNew(false);
    } else {
      setSelectedUserId(currentUser.id);
      setName(currentUser.name);
      setEmail(currentUser.email);
      setTitle(currentUser.title);
      setCompany(currentUser.company);
      setRole(currentUser.role);
      setAvatar(currentUser.avatar);
      setIsCreatingNew(false);
    }
  }, [editingUser, currentUser, isEditUserModalOpen]);

  if (!isEditUserModalOpen) return null;

  const handleSelectUser = (u: UserProfile) => {
    setIsCreatingNew(false);
    setSelectedUserId(u.id);
    setName(u.name);
    setEmail(u.email);
    setTitle(u.title);
    setCompany(u.company);
    setRole(u.role);
    setAvatar(u.avatar);
  };

  const handleStartCreateNew = () => {
    setIsCreatingNew(true);
    setName('');
    setEmail('');
    setTitle('Finance & Ops Specialist');
    setCompany('PT. Solusi Optima Laju');
    setRole('founder_partner');
    setAvatar(PRESET_AVATARS[3]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (isCreatingNew) {
      const newId = addUser({
        name: name.trim(),
        email: email.trim(),
        title: title.trim(),
        company: company.trim(),
        role,
        avatar,
        isLoggedIn: false,
        authProvider: 'google_sso'
      });
      switchUserRole(newId);
    } else {
      updateUser(selectedUserId, {
        name: name.trim(),
        email: email.trim(),
        title: title.trim(),
        company: company.trim(),
        role,
        avatar
      });
    }

    setIsEditUserModalOpen(false);
  };

  const handleSwitchImmediately = () => {
    switchUserRole(selectedUserId);
    setIsEditUserModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Ubah &amp; Kelola Pengguna (User Management)
              </h3>
              <p className="text-xs text-slate-500">
                Pilih pengguna untuk login langsung atau ubah data profil &amp; perannya
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditUserModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Switcher Strip */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">
              1. Pilih Pengguna yang Ingin Diubah / Digunakan:
            </span>
            <button
              type="button"
              onClick={handleStartCreateNew}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Tambah Pengguna Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {users.map(u => {
              const isSelected = !isCreatingNew && u.id === selectedUserId;
              const isActiveLogin = u.id === currentUser.id;

              return (
                <div
                  key={u.id}
                  onClick={() => handleSelectUser(u)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 relative ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-200'
                      : 'border-slate-200 hover:bg-slate-50 bg-white'
                  }`}
                >
                  <img
                    src={u.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold text-slate-900 truncate">
                      {u.name}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {u.title}
                    </p>
                    {isActiveLogin && (
                      <span className="inline-block mt-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        Aktif Login
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form to Edit or Create */}
        <form onSubmit={handleSave} className="space-y-4 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
              {isCreatingNew ? '2. Form Tambah Pengguna Baru' : `2. Edit Profil: ${name || 'Pengguna'}`}
            </span>

            {!isCreatingNew && selectedUserId !== currentUser.id && (
              <button
                type="button"
                onClick={handleSwitchImmediately}
                className="px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Ganti ke Akun Ini Sekarang</span>
              </button>
            )}
          </div>

          {/* Name & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Contoh: Ferdi Yunanto"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Jabatan / Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Contoh: Founder & Technical Lead"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Email & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Alamat Email (Google SSO) *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Contoh: fyunanto@gmail.com"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Perusahaan / Instansi *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Contoh: PT. Solusi Optima Laju"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Tingkat Akses / Role RBAC *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                {
                  id: 'founder_ceo',
                  label: 'Co-Founder & CEO',
                  desc: 'Akses penuh seluruh modul, laba rugi, anggaran & quotation'
                },
                {
                  id: 'founder_partner',
                  label: 'Co-Founder & Finance',
                  desc: 'Akses operasional keuangan, pencatatan kas & tagihan'
                },
                {
                  id: 'client',
                  label: 'Client (Viewer)',
                  desc: 'Hanya melihat Quotation & Invoice proyek terkait'
                }
              ].map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setRole(item.id as UserRole)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    role === item.id
                      ? 'border-orange-500 bg-orange-50 font-bold text-orange-950 ring-2 ring-orange-200'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-extrabold">{item.label}</p>
                  <p className="text-[10px] text-slate-500 font-normal mt-0.5 leading-tight">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Avatar Selector */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Pilih Foto Profil (Avatar)
            </label>
            <div className="flex items-center gap-3">
              <img
                src={avatar}
                alt="Selected Avatar"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500 shrink-0"
              />
              <div className="flex flex-wrap items-center gap-2">
                {PRESET_AVATARS.map((picUrl, idx) => (
                  <img
                    key={idx}
                    src={picUrl}
                    alt=""
                    onClick={() => setAvatar(picUrl)}
                    className={`w-9 h-9 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform ${
                      avatar === picUrl ? 'ring-2 ring-orange-500 ring-offset-1' : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div>
              {!isCreatingNew && users.length > 1 && (
                !isConfirmingDelete ? (
                  <button
                    type="button"
                    onClick={() => setIsConfirmingDelete(true)}
                    className="px-3.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Pengguna</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 p-1.5 bg-rose-50 border border-rose-300 rounded-xl">
                    <span className="text-[11px] font-bold text-rose-700">Yakin hapus akun ini?</span>
                    <button
                      type="button"
                      onClick={() => {
                        deleteUser(selectedUserId);
                        setIsConfirmingDelete(false);
                        setIsEditUserModalOpen(false);
                      }}
                      className="px-2.5 py-1 bg-rose-600 text-white rounded-lg text-[10px] font-extrabold hover:bg-rose-700 cursor-pointer"
                    >
                      Ya, Hapus
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsConfirmingDelete(false)}
                      className="px-2 py-1 bg-slate-200 text-slate-700 rounded-lg text-[10px] font-semibold hover:bg-slate-300 cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>
                )
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditUserModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isCreatingNew ? 'Simpan Pengguna Baru' : 'Simpan Perubahan'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
