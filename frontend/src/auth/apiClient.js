
export function createAuthenticatedFetch(getToken) {
  return async function authenticatedFetch(url, options = {}) {
    const token = getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Se il token è scaduto o non valido, possiamo gestire l'errore qui
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }

    return response;
  };
}
