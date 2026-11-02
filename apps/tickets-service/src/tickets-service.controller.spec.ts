import { Test, TestingModule } from '@nestjs/testing';
import { TicketsServiceController } from './tickets-service.controller';
import { TicketsServiceService } from './tickets-service.service';

describe('TicketsServiceController', () => {
  let ticketsServiceController: TicketsServiceController;
  const ticketsServiceService = {
    purchase: jest.fn(),
    findMyTickets: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TicketsServiceController],
      providers: [
        { provide: TicketsServiceService, useValue: ticketsServiceService },
      ],
    }).compile();

    ticketsServiceController = app.get<TicketsServiceController>(
      TicketsServiceController,
    );
  });

  it('purchase passes the buyer id from the x-user-id header', async () => {
    const dto = { eventId: 'event-1', quantity: 2 };
    await ticketsServiceController.purchase(dto, 'user-1');
    expect(ticketsServiceService.purchase).toHaveBeenCalledWith(dto, 'user-1');
  });

  it('findMyTickets reads the user id', async () => {
    await ticketsServiceController.findMyTickets('user-1');
    expect(ticketsServiceService.findMyTickets).toHaveBeenCalledWith('user-1');
  });
});
