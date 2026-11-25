import { Platform } from 'react-native';

// Carrega as fontes e estilos globais na versão web
export function loadWebFonts() {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  if (document.getElementById('ironfit-fonts')) return;

  const link = document.createElement('link');
  link.id = 'ironfit-fonts';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Anton&family=Chakra+Petch:wght@400;500;600;700&family=Share+Tech+Mono&display=swap';
  document.head.appendChild(link);

  const style = document.createElement('style');
  style.textContent = `
    html, body { background: #050507; }
    ::selection { background: #FF1E3C; color: #fff; }
    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: #050507; }
    ::-webkit-scrollbar-thumb { background: #2a2a33; }
    ::-webkit-scrollbar-thumb:hover { background: #FF1E3C; }
  `;
  document.head.appendChild(style);
}
