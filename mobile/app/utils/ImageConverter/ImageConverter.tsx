import { getBase64Uri } from 'utils'
import base64 from 'base64-js'

export const getBase64UriFromUnknownSource = (data: any) => {
  let uri: string
  if (data?.data) uri = getBase64Uri(base64.fromByteArray(data?.data))
  else uri = getBase64Uri(data)

  return uri
}
