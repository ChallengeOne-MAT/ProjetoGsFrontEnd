// lib/twilio.ts
export async function enviarMensagemWhatsApp(
  numeroDestino: string,
  contentSid: string,
  contentVariables: Record<string, string>
) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;
  const from = 'whatsapp:+14155238886';
  const to = `whatsapp:${numeroDestino}`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const body = new URLSearchParams({
    From: from,
    To: to,
    ContentSid: contentSid,
    ContentVariables: JSON.stringify(contentVariables),
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Erro Twilio: ${JSON.stringify(data)}`);

  return data;
}
