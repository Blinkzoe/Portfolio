export function trackAction(sectionName) {
  fetch('/api/track', { // <--- Agregamos /api/ aquí
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      section: sectionName,
      timestamp: new Date().toISOString()
    })
  }).catch(() => {});
}