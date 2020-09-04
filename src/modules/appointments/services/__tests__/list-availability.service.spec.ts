import ListAvailabilityService from '../list-availability.service'
import FakeAppointmentRepository from '../../repositories/fakes/appointment_repository.fake'

let listAvailability: ListAvailabilityService
let fakeAppointRepository: FakeAppointmentRepository

describe('Show All Providers', () => {
  beforeEach(() => {
    fakeAppointRepository = new FakeAppointmentRepository()
    listAvailability = new ListAvailabilityService(fakeAppointRepository)
  })

  it('Should be able to list the month availability from provider', async () => {
    const hours = Array.from({ length: 10 }, (_, index) => 8 + index)

    hours.forEach((hour) => {
      fakeAppointRepository.create({
        date: new Date(2020, 4, 20, hour, 0, 0),
        providerId: 'providerId',
        userId: 'userId',
      })
    })

    fakeAppointRepository.create({
      date: new Date(2020, 4, 22, 8, 0, 0),
      providerId: 'providerId',
      userId: 'userId',
    })

    const available = await listAvailability.execute({
      year: 2020,
      month: 5,
      providerId: 'providerId',
    })

    expect(available).toEqual(
      expect.arrayContaining([
        {
          day: 20,
          available: false,
        },
        {
          day: 22,
          available: true,
        },
        {
          day: 21,
          available: true,
        },
      ])
    )
  })
})
