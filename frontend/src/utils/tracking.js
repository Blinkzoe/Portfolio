export function trackAction(sectionName) {
  // Capturamos la URL actual y también los parámetros por si viene de redes sociales (UTM, etc.)
  const currentUrl = window.location.href;
  
  fetch('/api/track', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      section: sectionName,
      page: currentUrl, // Manda la URL completa con todo y parámetros de procedencia
      timestamp: new Date().toISOString()
    })
  }).catch(() => {});
}