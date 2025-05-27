export async function fetchAlertas() {
  const res = await fetch('/api/alertas');
  if (!res.ok) throw new Error('Erro ao buscar alertas');
  return res.json();
}
