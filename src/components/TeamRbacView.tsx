import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  Users,
  User,
  Shield,
  Key,
  Check,
  X,
  Lock,
  UserCheck,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';

export const TeamRbacView: React.FC = () => {
  const { users, currentUser, switchUserRole, setIsAuthModalOpen, openEditUserModal } = useApp();

  const permissionsMatrix = [
    {
      feature: 'Pencatatan Buku Kas (Pemasukan, Pengeluaran, Modal)',
      founder_ceo: true,
      founder_partner: true,
      client: false,
      desc: 'Menambah, mengubah, dan menghapus catatan keuangan harian'
    },
    {
      feature: 'Laporan Laba Rugi Real-Time (P&L)',
      founder_ceo: true,
      founder_partner: true,
      client: false,
      desc: 'Melihat ringkasan margin, gross profit, dan laba operasional bersih'
    },
    {
      feature: 'Kontrol Anggaran & Peringatan Ambang Batas',
      founder_ceo: true,
      founder_partner: true,
      client: false,
      desc: 'Menetapkan batas pengeluaran bulanan dan ambang batas alarm (80%)'
    },
    {
      feature: 'Pembuatan & Edit Quotation Penawaran',
      founder_ceo: true,
      founder_partner: true,
      client: false,
      desc: 'Menerbitkan penawaran harga resmi dengan kop surat SOL Agency'
    },
    {
      feature: 'Konversi Quotation ke Invoice Tagihan',
      founder_ceo: true,
      founder_partner: true,
      client: false,
      desc: 'Mengubah penawaran yang disetujui menjadi tagihan invoice'
    },
    {
      feature: 'Pencatatan Pembayaran DP 50% & Pelunasan',
      founder_ceo: true,
      founder_partner: true,
      client: false,
      desc: 'Mengonfirmasi dana masuk ke rekening Mandiri dan sinkronisasi kas'
    },
    {
      feature: 'Lihat & Cetak Dokumen PDF Resmi',
      founder_ceo: true,
      founder_partner: true,
      client: true,
      desc: 'Akses melihat tampilan cetak PDF quotation dan invoice'
    },
    {
      feature: 'Ekspor Data ke Format Excel (CSV)',
      founder_ceo: true,
      founder_partner: true,
      client: false,
      desc: 'Download dataset pembukuan untuk rekonsiliasi akuntansi'
    },
    {
      feature: 'Manajemen Keamanan OAuth2 & Hak Akses',
      founder_ceo: true,
      founder_partner: false,
      client: false,
      desc: 'Pengaturan SSO Google Workspace dan otorisasi tim'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Tata Kelola Tim &amp; Keamanan</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Pengguna Berbasis Peran (RBAC)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Struktur akses tim 2-person startup SOL Agency (PT Solusi Optima Laju) beserta portal akses aman untuk klien.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => openEditUserModal()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-center"
          >
            <UserCheck className="w-4 h-4" />
            <span>+ Kelola / Tambah Pengguna</span>
          </button>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-center"
          >
            <Key className="w-4 h-4 text-orange-400" />
            <span>Status Autentikasi OAuth2</span>
          </button>
        </div>
      </div>

      {/* User Profiles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map(u => {
          const isCurrent = u.id === currentUser.id;

          return (
            <div
              key={u.id}
              className={`p-5 rounded-2xl bg-white border transition-all shadow-xs flex flex-col justify-between ${
                isCurrent ? 'border-orange-500 ring-2 ring-orange-100' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      u.role === 'founder_ceo'
                        ? 'bg-orange-100 text-orange-800 border border-orange-200'
                        : u.role === 'founder_partner'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {u.role === 'founder_ceo'
                      ? 'Co-Founder & CEO'
                      : u.role === 'founder_partner'
                      ? 'Co-Founder & Finance'
                      : 'Client (Viewer)'}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-bold text-sm text-slate-900">{u.name}</h3>
                  <p className="text-xs text-slate-500">{u.title}</p>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">{u.email}</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{u.company}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Google SSO Terverifikasi</span>
                </div>
              </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => openEditUserModal(u)}
                    className="w-full py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-orange-600" />
                    <span>Ubah Data Pengguna Ini</span>
                  </button>

                  {isCurrent ? (
                    <div className="w-full py-1.5 px-3 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                      <UserCheck className="w-4 h-4" />
                      <span>Sedang Digunakan Saat Ini</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => switchUserRole(u.id)}
                      className="w-full py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Beralih ke Profil Ini
                    </button>
                  )}
                </div>
            </div>
          );
        })}
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              Matriks Tingkat Akses Fitur (Permission Matrix)
            </h3>
            <p className="text-xs text-slate-500">
              Hak akses operasional dan batasan privasi antara Co-Founders dan Klien eksternal
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider bg-slate-100/50">
                <th className="py-3 px-4 w-1/2">Modul / Fitur Aplikasi</th>
                <th className="py-3 px-3 text-center">Ferdi Yunanto (CEO)</th>
                <th className="py-3 px-3 text-center">Reza Pratama (Finance)</th>
                <th className="py-3 px-3 text-center">Klien Eksternal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionsMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{item.feature}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    {item.founder_ceo ? (
                      <span className="inline-flex p-1 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    ) : (
                      <span className="inline-flex p-1 rounded-full bg-slate-100 text-slate-400">
                        <X className="w-4 h-4" />
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {item.founder_partner ? (
                      <span className="inline-flex p-1 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    ) : (
                      <span className="inline-flex p-1 rounded-full bg-slate-100 text-slate-400">
                        <X className="w-4 h-4" />
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {item.client ? (
                      <span className="inline-flex p-1 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    ) : (
                      <span className="inline-flex p-1 rounded-full bg-slate-100 text-slate-400">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
