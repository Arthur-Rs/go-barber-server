import { getCustomRepository, getRepository } from 'typeorm'
import AppointmentRepository from '../../repositories/appointment.repository'
import { startOfHour, parseISO } from 'date-fns'
import AppError from '../../errors/app.error'
import { uuid } from 'uuidv4'
import User from '../../entities/user.entity'
import Appointment from '../../entities/appointments.entity'

interface Request {
  id: string
  date: string
}

class CreateAppointment {
  public async execute({ date, id }: Request): Promise<Appointment> {
    const appointRepository = getCustomRepository(AppointmentRepository)
    const userRepository = getRepository(User)

    const formatedDate = startOfHour(parseISO(date))
    const findDate = await appointRepository.findByDate(formatedDate)

    if (findDate) {
      throw new AppError('This appointment is already booked', 400)
    }

    const provider = await userRepository.findOne({ where: { id } })

    if (!provider) {
      throw new AppError('This user not exist', 400)
    }

    const newAppointment = appointRepository.create({
      id: uuid(),
      date,
      provider,
    })

    await appointRepository.save(newAppointment)

    delete newAppointment.provider.password
    return newAppointment
  }
}

export default new CreateAppointment()
