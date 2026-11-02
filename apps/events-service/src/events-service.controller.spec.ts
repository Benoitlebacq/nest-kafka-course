import { Test, TestingModule } from '@nestjs/testing';
import { EventsServiceController } from './events-service.controller';
import { EventsServiceService } from './events-service.service';

describe('EventsServiceController', () => {
  let eventsServiceController: EventsServiceController;
  const eventsServiceService = {
    create: jest.fn(),
    findAll: jest.fn(),
    publish: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EventsServiceController],
      providers: [
        { provide: EventsServiceService, useValue: eventsServiceService },
      ],
    }).compile();

    eventsServiceController = app.get<EventsServiceController>(
      EventsServiceController,
    );
  });

  it('create passes the organizer id from the x-user-id header', async () => {
    const dto = {
      title: 'Meetup NestJS',
      date: '2026-12-12T19:00:00.000Z',
      location: 'Lille',
      capacity: 3,
      price: 2500,
    };
    await eventsServiceController.create(dto, 'user-1');
    expect(eventsServiceService.create).toHaveBeenCalledWith(dto, 'user-1');
  });

  it('publish passes the user id and role', async () => {
    await eventsServiceController.publish('event-1', 'user-1', 'ADMIN');
    expect(eventsServiceService.publish).toHaveBeenCalledWith(
      'event-1',
      'user-1',
      'ADMIN',
    );
  });
});
