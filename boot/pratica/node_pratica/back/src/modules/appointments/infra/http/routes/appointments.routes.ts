import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const repository = getCustomRepository(AppointmentRepository);
//   return response.json(await repository.find());
// });

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
