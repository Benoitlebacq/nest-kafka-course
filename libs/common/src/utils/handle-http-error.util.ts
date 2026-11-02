import { HttpException, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
export function handleHttpError(error: unknown, serviceName: string): never {
  if (error instanceof AxiosError) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as { message?: string };

      throw new HttpException(data?.message || 'An error occurred', status);
    }

    if (error.request) {
      throw new HttpException(
        `${serviceName} is unavailable`,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  if (error instanceof HttpException) {
    throw error;
  }

  throw new HttpException(
    'Internal server error',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}
