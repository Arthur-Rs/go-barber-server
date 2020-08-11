import { getCustomRepository, getRepository } from 'typeorm'
import AppointmentRepository from '../../repositories/appointment.repository'
import { startOfHour } from 'date-fns'
import AppError from '../../errors/app.error'
import { uuid } from 'uuidv4'
import User from '../../entities/user.entity'
import Appointment from '../../entities/appointments.entity'

interface Request{
  providerId: string
  date: Date
}

class CreateAppointment {
  public async execute ({ date, providerId }:Request): Promise<Appointment> {
    const appointRepository = getCustomRepository(AppointmentRepository)
    const userRepository = getRepository(User)

    const formatedDate = startOfHour(date)
    const findDate = await appointRepository.findByDate(formatedDate)

    if (findDate) {
      throw new AppError('This appointment is already booked', 400)
    }

    const provider = await userRepository.findOne({ where: { id: providerId } })

    if (provider) {
      throw new AppError('This user not exist', 400)
    }

    const newAppointment = appointRepository.create({
      id: uuid(),
      date,
      provider
    })

    await appointRepository.save(newAppointment)

    return newAppointment
  }
}

export default new CreateAppointment()
