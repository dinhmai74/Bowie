import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { FileUpload } from 'graphql-upload'
const baseImgDir = '/../../images'

export const createImg = async (file: FileUpload, imgName: string, collectionName?: string) => {
  const { createReadStream } = await file

  let imgDir = `${baseImgDir}`

  if (collectionName) imgDir += `/${collectionName}`

  if (!existsSync(__dirname + imgDir)) {
    mkdirSync(__dirname + imgDir)
  }

  return createReadStream().pipe(createWriteStream(__dirname + `${imgDir}/${imgName}`))
}
