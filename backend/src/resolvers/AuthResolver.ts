import bcrypt from 'bcryptjs'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../entity'
import { AuthInput, SignUpInput, UserResponse, UsersResponse } from '../graphql-types'
import { MyContext } from '../graphql-types/MyContext'
import { DI } from '../mikroconfig'

const invalidLoginResponse = {
  errors: [
    {
      path: 'email',
      message: 'invalid login',
    },
  ],
}

@Resolver()
export class AuthResolver {
  @Query(() => UsersResponse)
  async getAllUsers() {
    const users = await DI.em.find(User, {})

    return { users }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('input')
    { email, password, name }: SignUpInput,
    @Ctx() ctx: MyContext,
  ): Promise<UserResponse> {
    const hashedPassword = await bcrypt.hash(password, 12)
    const existingUser = await DI.userRepos.findOne({ email })
    if (existingUser) {
      return {
        errors: [
          {
            path: 'email',
            message: 'already in use',
          },
        ],
      }
    } else {
      const user = new User()
      user.password = hashedPassword
      user.email = email
      user.name = name
      DI.userRepos.persist(user)
      console.log('user.id', user)
      ctx.req.session!.userId = user.id
      console.log('ctx.req.session!.userId', ctx.req.session!.userId)
      return { user }
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { email, password }: AuthInput,
    @Ctx() ctx: MyContext,
  ): Promise<UserResponse> {
    const user = await DI.userRepos.findOne({ email })
    console.log('user', user)
    if (!user) {
      return invalidLoginResponse
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return invalidLoginResponse
    }
    ctx.req.session!.userId = user.id
    return { user }
  }

  @Mutation(() => User, { nullable: true })
  async auth(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined
    }

    const user = await DI.userRepos.findOne({ id: ctx.req.session!.userId })
    return user || undefined
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    console.log('ctx.req.session!.userId', ctx.req.session!.userId)
    if (!ctx.req.session!.userId) {
      return undefined
    }
    const user = await DI.userRepos.findOne({ id: ctx.req.session!.userId })
    return user || undefined
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
