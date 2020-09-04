import ListAllDayAvailabity from '../list-provider-day-availability.service'
import FakeAppointmentRepository from '../../repositories/fakes/appointment_repository.fake'

let listAvailability: ListAllDayAvailabity
let fakeAppointRepository: FakeAppointmentRepository

describe('Show All Providers', () => {
  beforeEach(() => {
    fakeAppointRepository = new FakeAppointmentRepository()
    listAvailability = new ListAllDayAvailabity(fakeAppointRepository)
  })

  it('Should be able to list the day availability from provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 22, 11, 0, 0).getTime()
    })

    fakeAppointRepository.create({
      date: new Date(2020, 4, 22, 8, 0, 0),
      providerId: 'providerId',
      userId: 'userId',
    })

    fakeAppointRepository.create({
      date: new Date(2020, 4, 22, 14, 0, 0),
      providerId: 'providerId',
      userId: 'userId',
    })

    const available = await listAvailability.execute({
      day: 22,
      year: 2020,
      month: 5,
      providerId: 'providerId',
    })

    expect(available).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 14, available: false },
        { hour: 16, available: true },
      ])
    )
  })
})
