import {
  CheckInTicketDto,
  PurchaseTicketDto,
  SERVICES_PORTS,
} from '@app/common';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { handleHttpError } from '@app/common/utils/handle-http-error.util';

@Injectable()
export class TicketsService {
  private readonly ticketServiceUrl =
    process.env.TICKETS_SERVICE_URL ||
    `http://localhost:${SERVICES_PORTS.TICKETS_SERVICE}`;

  constructor(private readonly httpService: HttpService) {}

  async purchase(data: PurchaseTicketDto, userId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<any[]>(
          `${this.ticketServiceUrl}/purchase`,
          data,
          {
            headers: { 'x-user-id': userId },
          },
        ),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'tickets service');
    }
  }

  async findMyTickets(userId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<any[]>(`${this.ticketServiceUrl}/my-tickets`, {
          headers: { 'x-user-id': userId },
        }),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'tickets service');
    }
  }

  async findOne(id: string, userId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<any>(`${this.ticketServiceUrl}/${id}`, {
          headers: { 'x-user-id': userId },
        }),
      );

      return response.data;
    } catch (error) {
      handleHttpError(error, 'tickets service');
    }
  }

  async cancel(id: string, userId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<any>(
          `${this.ticketServiceUrl}/${id}/cancel`,
          {},
          { headers: { 'x-user-id': userId } },
        ),
      );
      return response.data;
    } catch (error) {
      handleHttpError(error, 'tickets service');
    }
  }

  async checkIn(data: CheckInTicketDto, organizerId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<any>(`${this.ticketServiceUrl}/check-in`, data, {
          headers: { 'x-user-id': organizerId },
        }),
      );
      return response.data;
    } catch (error) {
      handleHttpError(error, 'tickets service');
    }
  }

  async findEventTickets(eventId: string, organizerId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<any[]>(
          `${this.ticketServiceUrl}/event/${eventId}`,
          {
            headers: { 'x-user-id': organizerId },
          },
        ),
      );
      return response.data;
    } catch (error) {
      handleHttpError(error, 'tickets service');
    }
  }
}
