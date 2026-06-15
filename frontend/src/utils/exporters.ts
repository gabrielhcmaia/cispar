/**
 * Utilitários de exportação genéricos e tipados, reaproveitáveis por qualquer tela.
 *
 * - CSV: gera download real via Blob nativo (sem dependências).
 * - PDF: implementação mockada/estruturada que abre uma janela de impressão
 *        (Salvar como PDF). Pode ser substituída por jspdf futuramente sem
 *        alterar quem consome `exportToPdf`.
 */

export interface ExportColumn<T> {
  header: string;
  accessor: (row: T) => string;
}

function escapeCsv(value: string): string {
  const needsQuotes = /[";\n\r]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Exporta as linhas para um arquivo CSV (download real). */
export function exportToCsv<T>(
  filename: string,
  columns: ExportColumn<T>[],
  rows: T[]
): void {
  const header = columns.map((column) => escapeCsv(column.header)).join(';');
  const body = rows
    .map((row) => columns.map((column) => escapeCsv(column.accessor(row))).join(';'))
    .join('\r\n');
  const csv = body.length > 0 ? `${header}\r\n${body}` : header;

  // BOM (﻿) garante acentuação correta ao abrir no Excel.
  const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exporta as linhas para PDF (mock estruturado via janela de impressão).
 * Substitua por uma lib (ex.: jspdf + autotable) quando necessário.
 */
export function exportToPdf<T>(
  title: string,
  columns: ExportColumn<T>[],
  rows: T[]
): void {
  const printWindow = window.open('', '_blank', 'width=900,height=650');
  if (!printWindow) {
    window.alert(
      'Não foi possível abrir a janela de exportação. Verifique o bloqueador de pop-ups do navegador.'
    );
    return;
  }

  const headerHtml = columns.map((column) => `<th>${escapeHtml(column.header)}</th>`).join('');
  const bodyHtml = rows
    .map(
      (row) =>
        `<tr>${columns.map((column) => `<td>${escapeHtml(column.accessor(row))}</td>`).join('')}</tr>`
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(title)}</title>
    <style>
      * { font-family: Arial, Helvetica, sans-serif; }
      body { margin: 32px; color: #03012c; }
      h1 { font-size: 20px; margin-bottom: 16px; }
      table { width: 100%; border-collapse: collapse; font-size: 13px; }
      th, td { border: 1px solid #c4bbaf; padding: 8px 10px; text-align: left; }
      thead th { background: #190e4f; color: #fff; }
      tbody tr:nth-child(even) { background: #f5f3f1; }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(title)}</h1>
    <table>
      <thead><tr>${headerHtml}</tr></thead>
      <tbody>${bodyHtml}</tbody>
    </table>
  </body>
</html>`;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
