import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppoinntmentService from '@modules/appointments/services/CreateAppoinntmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppoinntmentService = new CreateAppoinntmentService(
      fakeAppointmentsRepository,
    );

    const apppointment = await createAppoinntmentService.execute({
      date: new Date(),
      provider_id: '123',
    });

    expect(apppointment).toHaveProperty('id');
    expect(apppointment.provider_id).toBe('123');
  });

  it('should not be able to create a new appointment in the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppoinntmentService = new CreateAppoinntmentService(
      fakeAppointmentsRepository,
    );

    const testDate = new Date(2020, 4, 10);

    await createAppoinntmentService.execute({
      date: testDate,
      provider_id: '123',
    });

    expect(
      createAppoinntmentService.execute({
        date: testDate,
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
