import { createWriteStream, mkdir, readFileSync, unlinkSync, existsSync } from 'fs'
import { GraphQLUpload } from 'graphql-upload'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { v4 } from 'uuid'
import { Image } from '../../entity/Image'
import { MyContext } from '../../graphql-types/MyContext'
import { Upload } from '../../graphql-types/Upload'
import { DI } from '../../mikroconfig'

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

    const imgDir = `${baseImgDir}`
    const id = v4()
    const user = await DI.userRepos.findOne({ id: ctx.req.session!.userId })

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `${imgDir}/${id}.png`))
        .on('finish', async () => {
          if (user && existsSync(__dirname + `${imgDir}/${user.avatarId}.png`)) {
            unlinkSync(__dirname + `${imgDir}/${user.avatarId}.png`)
          }
          user!.avatarId = id
          DI.em.flush()
          resolve(true)
        })
        .on('error', () => reject(false)),
    )
  }
}
