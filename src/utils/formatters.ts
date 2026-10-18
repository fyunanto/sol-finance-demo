export function formatRupiah(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return 'Rp 0';
  return 'Rp ' + Math.round(amount).toLocaleString('id-ID');
}

export function formatRupiahFull(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return 'Rp 0,-';
  return 'Rp. ' + Math.round(amount).toLocaleString('id-ID') + ',-';
}

export function formatDateIndo(dateStr: string): string {
  if (!dateStr) return '-';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

export function formatDateEnglish(dateStr: string): string {
  if (!dateStr) return '-';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

// Convert number to Indonesian Words (Terbilang)
export function angkaKeTerbilang(nilai: number): string {
  const bilangan = [
    '',
    'Satu',
    'Dua',
    'Tiga',
    'Empat',
    'Lima',
    'Enam',
    'Tujuh',
    'Delapan',
    'Sembilan',
    'Sepuluh',
    'Sebelas'
  ];

  function hitung(n: number): string {
    if (n < 12) return bilangan[n];
    if (n < 20) return hitung(n - 10) + ' Belas';
    if (n < 100) return hitung(Math.floor(n / 10)) + ' Puluh ' + hitung(n % 10);
    if (n < 200) return 'Seratus ' + hitung(n - 100);
    if (n < 1000) return hitung(Math.floor(n / 100)) + ' Ratus ' + hitung(n % 100);
    if (n < 2000) return 'Seribu ' + hitung(n - 1000);
    if (n < 1000000) return hitung(Math.floor(n / 1000)) + ' Ribu ' + hitung(n % 1000);
    if (n < 1000000000) return hitung(Math.floor(n / 1000000)) + ' Juta ' + hitung(n % 1000000);
    if (n < 1000000000000) return hitung(Math.floor(n / 1000000000)) + ' Miliar ' + hitung(n % 1000000000);
    return '';
  }

  const hasil = hitung(Math.floor(Math.abs(nilai))).trim();
  return (hasil ? hasil : 'Nol') + ' Rupiah';
}

// English words converter
export function numberToWordsEnglish(n: number): string {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(num: number): string {
    if (num === 0) return '';
    if (num < 20) return a[num];
    if (num < 100) return b[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + a[num % 10] : '');
    if (num < 1000) return a[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + inWords(num % 100) : '');
    if (num < 1000000) return inWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + inWords(num % 1000) : '');
    if (num < 1000000000) return inWords(Math.floor(num / 1000000)) + ' Million' + (num % 1000000 !== 0 ? ' ' + inWords(num % 1000000) : '');
    return '';
  }

  const res = inWords(Math.floor(Math.abs(n))).trim();
  return (res ? res : 'Zero') + ' Rupiah';
}

export function exportToCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  // Add BOM for Microsoft Excel UTF-8 recognition
  const BOM = '\uFEFF';
  const csvContent = BOM + [
    headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(','),
    ...rows.map(row =>
      row.map(cell => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')
    )
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
