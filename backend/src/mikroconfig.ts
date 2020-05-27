import { EntityManager, EntityRepository, MikroORM } from 'mikro-orm'
import { Event, EventTag, User } from './entity'
import { Book } from './entity/Book'
import { Image } from './entity/Image'

export const DI = {} as {
  orm: MikroORM
  em: EntityManager
  bookRepository: EntityRepository<Book>
  userRepos: EntityRepository<User>
  eventRepos: EntityRepository<Event>
  eventTagRepos: EntityRepository<EventTag>
  imageRepos: EntityRepository<Image>
}
