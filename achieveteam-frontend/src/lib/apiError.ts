import axios, { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status: number | null;
  data: any | null;
}

export function parseApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? null;
    const data = error.response?.data;

    return {
      message: (data as any)?.message || error.message || 'API Error',
      status,
      data: data ?? null,
    };
  }

  if (error instanceof Error) {
    return { 
      message: error.message, 
      status: null, 
      data: null 
    };
  }

  return { 
    message: 'An unknown error occurred', 
    status: null, 
    data: null 
  };
}


export function handleApiError(error: unknown): ApiError {
  const parsed = parseApiError(error);

  switch (parsed.status) {
    case 400:
      parsed.message = (parsed.data as any)?.message || 'Bad Request. Please check your input.';
      break;
    case 401:
      parsed.message = 'Unauthorized. Please login.';
      break;
    case 403:
      parsed.message = 'Forbidden. You do not have permission.';
      break;
    case 404:
      parsed.message = 'Resource not found.';
      break;
    case 500:
      parsed.message = 'Internal Server Error. Try again later.';
      break;
    case 503:
      parsed.message = 'Service unavailable. Please try later.';
      break;
    default:
      // Keep the message from parseApiError if no specific case matches
      break;
  }

  console.error(`API Error [${parsed.status}]:`, parsed.message);
  return parsed;
}