import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../utils/formatters';
import {
  Sliders,
  AlertTriangle,
  CheckCircle2,
  BellRing,
  Edit2,
  Save,
  X,
  Plus,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const BudgetView: React.FC = () => {
  const {
    budgets,
    updateBudgetLimit,
    transactions,
    budgetAlerts,
    sendNotification,
    currentUser
  } = useApp();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLimit, setEditLimit] = useState<string>('');
  const [editThreshold, setEditThreshold] = useState<number>(80);

  const startEdit = (id: string, currentLimit: number, currentThreshold: number) => {
    setEditingId(id);
    setEditLimit(String(currentLimit));
    setEditThreshold(currentThreshold);
  };

  const saveEdit = (id: string) => {
    const limitNum = parseFloat(editLimit);
    if (!isNaN(limitNum) && limitNum > 0) {
      updateBudgetLimit(id, limitNum, editThreshold);
    }
    setEditingId(null);
  };

  // Test push notification simulation
  const handleTestPushNotification = () => {
    sendNotification({
      title: '🚨 Test Peringatan: Ambang Batas Anggaran',
      message: 'Notifikasi otomatis aktif: Biaya operasional telah mendekati batas kuota yang ditentukan untuk SOL Agency.',
      type: 'alert',
      linkTab: 'budgets',
      targetAudience: 'both'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Sistem Proteksi Arus Kas</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Kontrol Batas Anggaran (Budget Limits &amp; Alert)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tentukan ambang batas pengeluaran bulanan per pos beban. Sistem akan memicu notifikasi push otomatis jika batas terlampaui.
          </p>
        </div>

        <button
          onClick={handleTestPushNotification}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer self-start sm:self-center"
        >
          <BellRing className="w-4 h-4 text-orange-400" />
          <span>Simulasi Notifikasi Push</span>
        </button>
      </div>

      {/* Grid of Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {budgets.map(b => {
          const alertInfo = budgetAlerts.find(a => a.category === b.category) || {
            spent: 0,
            limit: b.monthlyLimit,
            percent: 0,
            isOver: false
          };

          const isEditing = editingId === b.id;
          const isWarning = !alertInfo.isOver && alertInfo.percent >= (b.warningThresholdPercent || 80);
          const isOver = alertInfo.isOver;

          return (
            <div
              key={b.id}
              className={`p-5 rounded-2xl bg-white border transition-all shadow-xs ${
                isOver
                  ? 'border-rose-300 ring-2 ring-rose-100'
                  : isWarning
                  ? 'border-amber-300 ring-2 ring-amber-100'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Top */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    {b.category}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                        isOver
                          ? 'bg-rose-100 text-rose-800'
                          : isWarning
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isOver ? (
                        <>
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          <span>MELEBIHI BATAS!</span>
                        </>
                      ) : isWarning ? (
                        <>
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>MENDEKATI LIMIT ({alertInfo.percent.toFixed(0)}%)</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>AMAN ({alertInfo.percent.toFixed(0)}%)</span>
                        </>
                      )}
                    </span>

                    <span className="text-[11px] text-slate-400">
                      Ambang: {b.warningThresholdPercent || 80}%
                    </span>
                  </div>
                </div>

                {currentUser.role !== 'client' && (
                  <div>
                    {!isEditing ? (
                      <button
                        onClick={() => startEdit(b.id, b.monthlyLimit, b.warningThresholdPercent || 80)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Ubah Batas Anggaran"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => saveEdit(b.id)}
                          className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                          title="Simpan"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Batal"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-4 space-y-1.5">
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOver
                        ? 'bg-rose-600'
                        : isWarning
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, alertInfo.percent)}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-500">Terpakai: </span>
                    <span className="font-bold font-mono text-slate-900">
                      {formatRupiah(alertInfo.spent)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Batas Kuota: </span>
                    <span className="font-bold font-mono text-slate-900">
                      {formatRupiah(b.monthlyLimit)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Mode Inputs */}
              {isEditing && (
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      Batas Bulanan (IDR)
                    </label>
                    <input
                      type="number"
                      value={editLimit}
                      onChange={e => setEditLimit(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      Ambang Alarm (%)
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={editThreshold}
                      onChange={e => setEditThreshold(parseInt(e.target.value) || 80)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Status Note */}
              <div className="mt-3 text-[11px] text-slate-500">
                {isOver ? (
                  <span className="text-rose-600 font-medium">
                    ⚠️ Pengeluaran telah melampaui kuota sebesar {formatRupiah(alertInfo.spent - b.monthlyLimit)}. Evaluasi pengeluaran kategori ini.
                  </span>
                ) : isWarning ? (
                  <span className="text-amber-700 font-medium">
                    ⚠️ Pengeluaran mendekati batas kuota ({alertInfo.percent.toFixed(0)}%). Sisa anggaran: {formatRupiah(b.monthlyLimit - alertInfo.spent)}.
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium">
                    ✓ Sisa kuota aman: {formatRupiah(b.monthlyLimit - alertInfo.spent)}
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Guide & Rules */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-orange-600" />
          <span>Cara Kerja Fitur Pengendalian Anggaran SOL Agency:</span>
        </h4>
        <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
          <li>Pengeluaran dihitung secara real-time berdasarkan transaksi yang dicatat pada bulan berjalan.</li>
          <li>Ketika pengeluaran mencapai ambang batas (default 80%), sistem akan mengirimkan notifikasi peringatan dini.</li>
          <li>Ketika pengeluaran melewati 100%, sistem akan memunculkan banner peringatan merah di dasbor utama untuk Ferdi Yunanto dan Reza Pratama.</li>
          <li>Kedua partner dapat menyesuaikan limit kapan saja sesuai proyeksi pendapatan proyek.</li>
        </ul>
      </div>

    </div>
  );
};
