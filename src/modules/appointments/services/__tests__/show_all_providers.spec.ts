import FakeUserRepository from '@modules/users/repositories/fakes/user_repository.fake'
import ShowAllProvidersService from '../show-all-providers.service'

let fakeUserRepository: FakeUserRepository
let showAllProviders: ShowAllProvidersService

describe('Show All Providers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()

    showAllProviders = new ShowAllProvidersService(fakeUserRepository)
  })

  it('Should be able to list all providers', async () => {
    const userOne = await fakeUserRepository.create({
      name: 'User1',
      email: 'user_one@exemplo.com',
      password: '12345678',
    })

    const userTwo = await fakeUserRepository.create({
      name: 'User2',
      email: 'user_two@exemplo.com',
      password: '12345678',
    })

    const userTree = await fakeUserRepository.create({
      name: 'User3',
      email: 'user_tree@exemplo.com',
      password: '12345678',
    })

    const providers = await showAllProviders.execute({ expectId: userTwo.id })

    expect(providers).toHaveLength(2)
    expect(providers).toEqual([userOne, userTree])
  })
})
