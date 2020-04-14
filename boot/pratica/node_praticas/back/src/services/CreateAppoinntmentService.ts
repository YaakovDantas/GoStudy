import { startOfHour } from 'date-fns';
import Appointment from '../models/Appoitment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  private repository: AppointmentRepository;

  constructor(repository: AppointmentRepository) {
    this.repository = repository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.repository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }
    return this.repository.create({ provider, date: appointmentDate });
  }
}
