export const getToken = async () => {
  try {
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': 'WXhVX07Nsuy9MwvkHd1Z2ACwaoTjfUVi',
        'client_secret': 'bo5TGAIJuUDxbgoG',
      }),
    });
    if (!response.ok) {
      return { data: null, error: 'Failed to fetch token' };
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Unknown error' };
  }
};

export const fetchFlightDestinations = async (accessToken: string, code: string, date: string = '') => {
  try {
    const url = `https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${code || 'MAD'}${date ? `&departureDate=${date}` : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.amadeus+json',
        'Content-Type': 'application/vnd.amadeus+json',
      },
    });
    if (!response.ok) {
      return { data: null, error: 'Failed to fetch data' };
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message || 'Unknown error' };
  }
};
