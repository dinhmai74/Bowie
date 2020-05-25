import { createWriteStream, mkdir } from 'fs'
import { GraphQLUpload } from 'graphql-upload'
import { Arg, Mutation, Resolver, Ctx } from 'type-graphql'
import { Upload } from '../../graphql-types/Upload'
import { DI } from '../../mikroconfig'
import { MyContext } from '../../graphql-types/MyContext'

const baseImgDir = '/../../../images'

@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Ctx() ctx: MyContext,
    @Arg('picture', () => GraphQLUpload)
    { createReadStream, filename }: Upload,
  ): Promise<boolean> {
    if (!ctx.req.session!.userId) return false

    const newDir = __dirname + baseImgDir + '/' + ctx.req.session!.userId
    console.log('newDir', newDir)
    mkdir(
      newDir,
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
        .pipe(createWriteStream(`${newDir}/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    )
  }
}
