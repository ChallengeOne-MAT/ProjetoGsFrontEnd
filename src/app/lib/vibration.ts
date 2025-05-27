// lib/vibration.ts

export function triggerVibration(pattern: number[] = [300, 100, 300]): boolean {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    return navigator.vibrate(pattern);
  }
  return false; // Não suportado
}
