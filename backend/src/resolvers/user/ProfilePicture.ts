import { createWriteStream, mkdir, readFileSync } from 'fs'
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

    const imgDir = `${baseImgDir}/${ctx.req.session!.userId}`
    const user = await DI.userRepos.findOne({ id: ctx.req.session!.userId })
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
        .on('finish', async () => {
          const tempId = v4()
          const img = new Image()
          img.data = readFileSync(__dirname + `${imgDir}/${filename}`)
          img.contentType = 'image/png'
          img.tempId = tempId
          await DI.imageRepos.persist(img)
          const imgSave = await DI.imageRepos.findOne({ tempId })

          if (!user) return resolve(false)
          user.avatarId = imgSave!.id
          await DI.em.flush()
          // DI.userRepos.persist(user)
          resolve(true)
        })
        .on('error', () => reject(false)),
    )
  }
}
