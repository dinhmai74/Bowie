import { ApolloError } from 'apollo-server-express'
import bcrypt from 'bcryptjs'
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { User } from '../../entity'
import { AuthInput, SignUpInput, UserWithAvt } from '../../graphql-types'
import { MyContext } from '../../graphql-types/MyContext'
import { isAuth } from '../../middleware/isAuth'
import { DI } from '../../mikroconfig'
import { ErrorMess } from '../../utils'

@Resolver()
export class AuthResolver {
  @Query(() => [User])
  async getAllUsers() {
    const users = await DI.em.find(User, {})

    return users
  }

  @Mutation(() => User)
  async register(
    @Arg('input')
    { email, password, name }: SignUpInput,
    @Ctx() ctx: MyContext,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)
    const existingUser = await DI.userRepos.findOne({ email })
    if (existingUser) throw new ApolloError(ErrorMess.user.emailUsed)

    const user = new User()
    user.password = hashedPassword
    user.email = email
    user.name = name
    await DI.userRepos.persist(user)
    const insertedUser = await DI.userRepos.findOne({ email })
    console.log('user.id', insertedUser)
    ctx.req.session!.userId = insertedUser?.id
    console.log('ctx.req.session!.userId', ctx.req.session!.userId)
    return user
  }

  @Mutation(() => User)
  async login(@Arg('input') { email, password }: AuthInput, @Ctx() ctx: MyContext): Promise<User> {
    const user = await DI.userRepos.findOne({ email })
    console.log('user', user)
    if (!user) throw new ApolloError(ErrorMess.user.invalidLogin)

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw new ApolloError(ErrorMess.user.invalidLogin)

    ctx.req.session!.userId = user.id
    return user
  }

  @Mutation(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async auth(@Ctx() ctx: MyContext): Promise<any> {
    const user = await DI.userRepos.findOne({ id: ctx.req.session!.userId })

    return user
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: MyContext): Promise<any> {
    const user = await DI.userRepos.findOne({ id: ctx.req.session!.userId })
    return user
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err)
          return rej(false)
        }
        ctx.res.clearCookie('qid')
        return res(true)
      }),
    )
  }
}
