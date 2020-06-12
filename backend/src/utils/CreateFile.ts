import { createWriteStream } from 'fs'
import { FileUpload } from 'graphql-upload'
const baseImgDir = '/../../images'

export const createImg = async (file: FileUpload, imgName: string) => {
  const { createReadStream } = await file

  const imgDir = `${baseImgDir}`

  return createReadStream().pipe(createWriteStream(__dirname + `${imgDir}/${imgName}`))
}
