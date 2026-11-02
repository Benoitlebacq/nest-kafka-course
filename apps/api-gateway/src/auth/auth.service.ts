import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SERVICES_PORTS } from '@app/common';
import { handleHttpError } from '@app/common/utils/handle-http-error.util';

@Injectable()
export class AuthService {
  private readonly authServiceUrl =
    process.env.AUTH_SERVICE_URL ||
    `http://localhost:${SERVICES_PORTS.AUTH_SERVICE}`;

  constructor(private readonly httpService: HttpService) {}

  async register(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<any>(`${this.authServiceUrl}/register`, data),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'Auth service');
    }
  }

  async login(data: { email: string; password: string }): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<any>(`${this.authServiceUrl}/login`, data),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'Auth service');
    }
  }

  async getProfile(token: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<any>(`${this.authServiceUrl}/profile`, {
          headers: { Authorization: token },
        }),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'Auth service');
    }
  }
}
