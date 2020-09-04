import CreateAppointmentService from '../create.service'

import FakeAppointmentRepository from '../../repositories/fakes/appointment_repository.fake'
import FakeUserRepository from '@modules/users/repositories/fakes/user_repository.fake'
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/notification-repository.fake'

import AppError from '@shared/errors/app.error'

let fakeAppointmentRepository: FakeAppointmentRepository
let fakeUserRepository: FakeUserRepository
let fakeNotificationRepository: FakeNotificationRepository

let createAppointment: CreateAppointmentService

describe('Create Appointment Service', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    fakeUserRepository = new FakeUserRepository()
    fakeNotificationRepository = new FakeNotificationRepository()

    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeUserRepository,
      fakeNotificationRepository
    )
  })

  it('Should be able to create a new appointment', async () => {
    const provider = await fakeUserRepository.create({
      name: 'provider',
      email: 'provider@example.com',
      password: '1234',
    })

    const user = await fakeUserRepository.create({
      name: 'User',
      email: 'user@example.com',
      password: '1234',
    })

    const appointment = await createAppointment.execute({
      date: new Date(2022, 4, 22, 14),
      providerId: user.id,
      userId: provider.id,
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.providerId).toBe(user.id)
  })

  it('Should not be able to create a new appointment with yourself', async () => {
    const user = await fakeUserRepository.create({
      name: 'User',
      email: 'user@example.com',
      password: '12345678',
    })

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 22, 14),
        providerId: user.id,
        userId: user.id,
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2022, 4, 22, 14),
        providerId: user.id,
        userId: user.id,
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create two appointment on the same time', async () => {
    const date = new Date(2022, 4, 22, 14)

    const provider = await fakeUserRepository.create({
      name: 'provider',
      email: 'provider@example.com',
      password: '12345678',
    })

    const user = await fakeUserRepository.create({
      name: 'user',
      email: 'user@example.com',
      password: '12345678',
    })

    await createAppointment.execute({
      date,
      providerId: provider.id,
      userId: user.id,
    })

    await expect(
      createAppointment.execute({
        date,
        providerId: provider.id,
        userId: user.id,
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 22).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 20, 10),
        providerId: 'Usuario',
        userId: 'userID',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should only create an appointment between 8 am and 5 pm', async () => {
    const provider = await fakeUserRepository.create({
      name: 'User',
      email: 'user@example.com',
      password: '12345678',
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 2),
        providerId: provider.id,
        userId: 'userID',
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 22),
        providerId: provider.id,
        userId: 'userID',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
