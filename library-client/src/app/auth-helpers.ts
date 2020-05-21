export const auth = {
  getToken: () => localStorage.getItem('authToken'),
  isAuthenticated: () => !!localStorage.getItem('authToken'),
  login: (body: any): Promise<any> =>
    fetch('/api/auth/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Bad credentials!');
      })
      .then(({ accessToken }) => localStorage.setItem('authToken', accessToken)),
  logout: () => {
    localStorage.removeItem('authToken');
  },
};
