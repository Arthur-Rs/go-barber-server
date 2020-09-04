import 'reflect-metadata'
import { startOfHour, isBefore, getHours, format } from 'date-fns'
import LocalePTBR from 'date-fns/locale/pt-BR'

import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/app.error'

import Appointment from '@modules/appointments/infra/typeorm/entities/appointments.entity'

import CreateAppointmentDTO from '@modules/appointments/dtos/create_appointment.dto'

import IAppointmentRepository from '@modules/appointments/repositories/appointment_repository.interface'
import IUserRepository from '@modules/users/repositories/user_repository.interface'
import INotificationRepository from '@modules/notifications/repositories/notification-repository.interface'

@injectable()
class CreateAppointment {
  constructor(
    @inject('AppointmentRepository')
    private AppointmentRepository: IAppointmentRepository,
    @inject('UserRepository')
    private UserRepository: IUserRepository,
    @inject('notification-repository')
    private NotificationRepository: INotificationRepository
  ) {}

  public async execute(data: CreateAppointmentDTO): Promise<Appointment> {
    const { date, userId, providerId } = data

    const ParsedDate = startOfHour(date)
    const findDate = await this.AppointmentRepository.findByDate(ParsedDate)
    const provider = await this.UserRepository.findById(providerId)
    const user = await this.UserRepository.findById(userId)

    if (getHours(date) < 8 || getHours(date) > 17) {
      throw new AppError('Scheduling to be between 8am and 6pm', 400)
    }

    if (!provider || !user) {
      throw new AppError('This provider not exist', 400)
    }

    if (userId === providerId) {
      throw new AppError('You cannot create an appointment with yourself', 400)
    }

    if (findDate) {
      throw new AppError('This appointment is already booked', 400)
    }

    if (isBefore(date, Date.now())) {
      throw new AppError(
        'It is not possible to create appointments in the past',
        400
      )
    }

    const newAppointment = await this.AppointmentRepository.create({
      date: ParsedDate,
      userId,
      providerId,
    })

    const dateFormated = format(
      ParsedDate,
      "dd 'de' MMMM 'de' yyyy', ás' H:mm'h'",
      { locale: LocalePTBR }
    )

    await this.NotificationRepository.create({
      recipientID: providerId,
      content: `Você tem um novo agendamento de ${user.name}, para o dia ${dateFormated}`,
    })

    return newAppointment
  }
}

export default CreateAppointment
