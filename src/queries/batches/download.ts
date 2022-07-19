import env from '../../environment';

export const downloadSummary = async (
  data: {
    id?: string | undefined;
    item: string;
    amount: number;
    unit: string;
  }[],
  batch: string
) => {
  const res = await fetch(`${env.API_URL}/download/general`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
      batch,
    }),
  });

  const buffer = await res.arrayBuffer();

  const blob = new Blob([buffer], { type: 'text/xlsx;charset=utf-8;' });
  saveFile(`${batch} GERAL.xlsx`, blob);
};

export const downloadOrders = async (
  data: {
    client: string;
    items: {
      id: string;
      name: string;
      amount: number;
      unit: string;
    }[];
  }[],
  batch: string
) => {
  const res = await fetch(`${env.API_URL}/download/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
      batch,
    }),
  });

  const buffer = await res.arrayBuffer();

  const blob = new Blob([buffer], { type: 'text/xlsx;charset=utf-8;' });
  saveFile(`${batch} PEDIDOS.xlsx`, blob);
};

const saveFile = (fileName: string, blob: Blob) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.append(link);
  link.click();
  setTimeout(() => link.remove(), 0);
};
