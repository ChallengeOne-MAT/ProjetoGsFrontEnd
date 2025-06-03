export default function callEmergency(type: 'police' | 'fire' | 'ambulance') {
  let number = '';
  switch(type) {
    case 'police': number = '190'; break;
    case 'fire': number = '193'; break;
    case 'ambulance': number = '192'; break;
  }
if (typeof window !== 'undefined') {
  window.location.href = `tel:${number}`;
}
}
