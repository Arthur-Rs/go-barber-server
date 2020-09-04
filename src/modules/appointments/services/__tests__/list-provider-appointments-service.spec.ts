import ListProviderAppointments from '../list-provider-appointments.service'
import FakeAppointmentRepository from '../../repositories/fakes/appointment_repository.fake'

let listProviderAppointments: ListProviderAppointments
let fakeAppointRepository: FakeAppointmentRepository

describe('List Provider Appointments', () => {
  beforeEach(() => {
    fakeAppointRepository = new FakeAppointmentRepository()
    listProviderAppointments = new ListProviderAppointments(
      fakeAppointRepository
    )
  })

  it('Should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointRepository.create({
      date: new Date(2020, 4, 22, 12, 0, 0),
      providerId: 'provider',
      userId: 'user',
    })

    const appointment2 = await fakeAppointRepository.create({
      date: new Date(2020, 4, 22, 14, 0, 0),
      providerId: 'provider',
      userId: 'user',
    })

    const available = await listProviderAppointments.execute({
      day: 22,
      year: 2020,
      month: 5,
      providerId: 'provider',
    })

    expect(available).toEqual([appointment1, appointment2])
  })
})
