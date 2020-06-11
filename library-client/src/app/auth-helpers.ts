const headers = new Headers();
headers.set('Content-Type', 'application/json');

const fetchRequestParams: Partial<RequestInfo> = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers,
};

const handleResponse = async (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  const error = await response.json();
  throw error;
};

const setAccessToken = ({ accessToken }: { accessToken: string }) => localStorage.setItem('authToken', accessToken);

export const auth = {
  getToken: () => localStorage.getItem('authToken'),
  isAuthenticated: () => !!localStorage.getItem('authToken'),
  login: (body: any): Promise<any> =>
    fetch('/api/auth/login', {
      ...fetchRequestParams,
      body: JSON.stringify(body),
    })
      .then(handleResponse)
      .then(setAccessToken),
  register: (body: any): Promise<any> =>
    fetch('/api/auth/register', {
      ...fetchRequestParams,
      body: JSON.stringify(body),
    })
      .then(handleResponse)
      .then(setAccessToken),
  logout: () => {
    localStorage.removeItem('authToken');
  },
};
