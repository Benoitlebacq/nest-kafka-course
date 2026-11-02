import { CreateEventDto, SERVICES_PORTS, UpdateEventDto } from '@app/common';
import { handleHttpError } from '@app/common/utils/handle-http-error.util';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventsService {
  private readonly eventServiceUrl =
    process.env.EVENTS_SERVICE_URL ||
    `http://localhost:${SERVICES_PORTS.EVENTS_SERVICE}`;

  constructor(private readonly httpService: HttpService) {}

  async create(
    data: CreateEventDto,
    userId: string,
    userRole: string,
  ): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<any>(this.eventServiceUrl, data, {
          headers: { 'x-user-id': userId, 'x-user-role': userRole },
        }),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'Events service');
    }
  }

  async findAll(): Promise<any[] | undefined> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<any[]>(this.eventServiceUrl),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'Events service');
    }
  }

  async findMyEvents(userId: string): Promise<any[] | undefined> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<any[]>(`${this.eventServiceUrl}/my-events`, {
          headers: { 'x-user-id': userId },
        }),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'Events service');
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<any>(`${this.eventServiceUrl}/${id}`),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'Events service');
    }
  }

  async update(
    id: string,
    data: UpdateEventDto,
    userId: string,
    userRole: string,
  ): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.put<any>(`${this.eventServiceUrl}/${id}`, data, {
          headers: { 'x-user-id': userId, 'x-user-role': userRole },
        }),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'Events service');
    }
  }

  async publish(id: string, userId: string, userRole: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<any>(
          `${this.eventServiceUrl}/${id}/publish`,
          {},
          {
            headers: { 'x-user-id': userId, 'x-user-role': userRole },
          },
        ),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'Events service');
    }
  }

  async cancel(id: string, userId: string, userRole: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<any>(
          `${this.eventServiceUrl}/${id}/cancel`,
          {},
          {
            headers: { 'x-user-id': userId, 'x-user-role': userRole },
          },
        ),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'Events service');
    }
  }
}
