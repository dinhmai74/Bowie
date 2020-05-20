import { EntityManager, EntityRepository, MikroORM } from 'mikro-orm'
import { User, Event, EventTag } from './entity'
import { Book } from './entity/Book'

export const DI = {} as {
  orm: MikroORM
  em: EntityManager
  bookRepository: EntityRepository<Book>
  userRepos: EntityRepository<User>
  eventRepos: EntityRepository<Event>
  eventTagRepos: EntityRepository<EventTag>
}
