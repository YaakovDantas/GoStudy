import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppoinntmentService from '../services/CreateAppoinntmentService';

const appointmentsRouter = Router();
const repository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
  return response.json(repository.all());
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const service = new CreateAppoinntmentService(repository);

    const appointment = service.execute({ provider, date: parsedDate });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
