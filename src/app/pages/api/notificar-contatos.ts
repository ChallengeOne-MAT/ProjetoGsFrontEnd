import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const client = twilio(accountSid, authToken);

const contentSid = 'HXb5b62575e6e4ff6129ad7c8efe1f983e'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { contatos, linkMapa } = req.body;

  if (!contatos || !Array.isArray(contatos) || contatos.length === 0) {
    return res.status(400).json({ error: 'Lista de contatos inválida.' });
  }

  if (!linkMapa) {
    return res.status(400).json({ error: 'Link do mapa não informado.' });
  }

  const agora = new Date();
  const data = agora.toLocaleDateString('pt-BR');
  const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  try {
    for (const contato of contatos) {
      const telefone = contato.telefone.replace(/\D/g, '');

      await client.messages.create({
        to: `whatsapp:+${telefone}`,
        from: 'whatsapp:+14155238886', 
        contentSid,
        contentVariables: JSON.stringify({
          '1': data,
          '2': hora,
          '3': linkMapa,
        }),
      });
    }

    return res.status(200).json({ sucesso: true });
  } catch (error) {
    console.error('Erro ao enviar mensagens via Twilio:', error);
    return res.status(500).json({ erro: 'Erro ao enviar mensagens via Twilio.' });
  }
}
