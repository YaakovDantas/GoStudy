import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppoinntmentService from '@modules/appointments/services/CreateAppoinntmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const service = container.resolve(CreateAppoinntmentService);

    const appointment = await service.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}
