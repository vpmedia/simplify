import { http, HttpResponse } from 'msw';

export const fetchHandlers = [
  http.get('/test.json', () => {
    const response = HttpResponse.json(
      {
        success: true,
        method: 'GET',
      },
      { status: 200 }
    );
    return response;
  }),
  http.post('/test.json', () => {
    const response = HttpResponse.json(
      {
        success: true,
        method: 'POST',
      },
      { status: 200 }
    );
    return response;
  }),
  http.post('/test_error.json', () => {
    const response = HttpResponse.json(
      {
        success: false,
        method: 'POST',
      },
      { status: 404 }
    );
    return response;
  }),
];
