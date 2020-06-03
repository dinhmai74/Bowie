import { Query, Resolver, UseMiddleware, Arg, Mutation } from 'type-graphql'
import { DI } from '../../mikroconfig'
import { Image } from '../../entity'
import { GraphQLUpload } from 'graphql-upload'
import { Upload } from '../../graphql-types/Upload'
import { createWriteStream } from 'fs'

const baseImgDir = '/../../../images'
@Resolver()
export class ImageFactoryResolver {
  @Query(() => Image)
  async getImg(@Arg('id') id: string): Promise<Image | null> {
    const img = await DI.imageRepos.findOne(id)
    return img
  }

  @Mutation(() => Boolean)
  async createPhoto(@Arg('input', () => GraphQLUpload) file: Upload): Promise<Boolean> {
    const { createReadStream, filename } = file
    const imgDir = `${baseImgDir}`

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `${imgDir}/${filename}`))
        .on('finish', async () => {
          // find old avatar and delete if have
          resolve(true)
        })
        .on('error', () => reject(false)),
    )
  }
}
