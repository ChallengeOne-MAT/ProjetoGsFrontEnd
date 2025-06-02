import type { NextApiRequest, NextApiResponse } from 'next';
import { enviarMensagemWhatsApp } from '../../lib/twilio'; // função do passo anterior

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { contatos, linkMapa } = req.body;

  const contentSid = 'HXb5b62575e6e4ff6129ad7c8efe1f983e'; // seu template no Twilio
  const agora = new Date();
  const data = agora.toLocaleDateString('pt-BR');
  const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  try {
    for (const contato of contatos) {
      await enviarMensagemWhatsApp(
        contato.telefone,
        contentSid,
        { '1': data, '2': hora, '3': linkMapa } 
      );
    }

    return res.status(200).json({ sucesso: true });
  } catch (e) {
    console.error('Erro ao enviar pelo Twilio:', e);
    return res.status(500).json({ erro: 'Erro ao notificar via Twilio' });
  }
}
