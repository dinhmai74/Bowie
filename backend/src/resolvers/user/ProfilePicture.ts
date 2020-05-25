import { createWriteStream, mkdir, readFileSync } from 'fs'
import { GraphQLUpload } from 'graphql-upload'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { MyContext } from '../../graphql-types/MyContext'
import { Upload } from '../../graphql-types/Upload'
import { DI } from '../../mikroconfig'
import { Image } from '../../graphql-types/Image'

const baseImgDir = '/../../../images'

@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Ctx() ctx: MyContext,
    @Arg('picture', () => GraphQLUpload)
    file: Upload,
  ): Promise<boolean> {
    const { createReadStream, filename } = file
    console.log('file', file)
    if (!ctx.req.session!.userId) return false

    const imgDir = `${baseImgDir}/${ctx.req.session!.userId}`
    console.log('newDir', imgDir)
    const user = await DI.userRepos.findOne({ id: ctx.req.session!.userId })
    console.log('user', user)
    mkdir(
      __dirname + imgDir,
      {
        recursive: true,
      },
      // @ts-ignore
      (err) => {
        if (err) {
          console.log('err', err)
          return false
        }
      },
    )

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `${imgDir}/${filename}`))
        .on('finish', () => {
          if (!user) return resolve(false)
          if (!user!.avatar) user!.avatar = new Image()
          user!.avatar.contentType = 'image/png'
          user!.avatar.data = readFileSync(__dirname + `${imgDir}/${filename}`)
          DI.userRepos.persist(user)
          resolve(true)
        })
        .on('error', () => reject(false)),
    )
  }
}
