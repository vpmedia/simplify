import { http, HttpResponse } from 'msw';

export const fetchHandlers = [
  http.get('http://localhost:3000/test.json', () => {
    const response = HttpResponse.json(
      {
        success: true,
        method: 'GET',
      },
      { status: 200 }
    );
    return response;
  }),
  http.post('http://localhost:3000/test.json', () => {
    const response = HttpResponse.json(
      {
        success: true,
        method: 'POST',
      },
      { status: 200 }
    );
    return response;
  }),
  http.post('http://localhost:3000/test_error.json', () => {
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
