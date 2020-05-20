import { Query, Resolver, UseMiddleware } from 'type-graphql'
import { BooksResponse } from '../graphql-types/BookResponse'
import { isAuth } from '../middleware/isAuth'
import { DI } from '../mikroconfig'

@Resolver()
export class BookResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  book() {
    return 'The Republic'
  }

  @Query(() => BooksResponse)
  async getBooks() {
    const books = await DI.bookRepository.findAll()

    return {
      books,
    }
  }
}
