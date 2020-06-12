import { CreateNewEventStoreModel, CreateNewEventStore } from './create-new-event-store'

test('can be created', () => {
  const instance: CreateNewEventStore = CreateNewEventStoreModel.create({})

  expect(instance).toBeTruthy()
})
