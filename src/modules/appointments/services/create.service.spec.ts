import CreateAppointmentService from './create.service'
import FakeAppointmentRepository from '../repositories/fakes/appointment_repository.fake'
import AppError from '@shared/errors/app.error'

describe('Create Appointment Service', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    )

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      providerId: '123456',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.providerId).toBe('123456')
  })

  it('Should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    )

    const date = new Date(2020, 4, 10, 11)

    await createAppointmentService.execute({
      date,
      providerId: '123456',
    })

    expect(
      createAppointmentService.execute({
        date,
        providerId: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
