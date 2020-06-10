import { createWriteStream, readFileSync } from 'fs'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Image } from '../../entity'

const baseImgDir = '/../../../images'
@Resolver()
export class ImageFactoryResolver {
  @Query(() => Image)
  async getImg(@Arg('id') id: string): Promise<Image | null> {
    const data = readFileSync(__dirname + `${baseImgDir}/${id}.png`)
    const img = new Image()
    img.data = data
    img.contentType = 'image/png'
    return img
  }

  @Mutation(() => Boolean)
  async createPhoto(@Arg('input', () => GraphQLUpload) file: FileUpload): Promise<Boolean> {
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
