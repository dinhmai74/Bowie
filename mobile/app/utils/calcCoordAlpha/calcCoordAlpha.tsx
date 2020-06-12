const earthRadiusInKM = 6371
const aspectRatio = 1

const deg2rad = angle => {
  return angle * 0.017453292519943295 // (angle / 180) * Math.PI;
}

const rad2deg = angle => {
  return angle * 57.29577951308232 // angle / Math.PI * 180
}
export const getCoordAlpha = (latitude: number, radiusInKM = 1.5) => {
  const radiusInRad = radiusInKM / earthRadiusInKM
  const longitudeDelta = rad2deg(radiusInRad / Math.cos(deg2rad(latitude)))
  const latitudeDelta = aspectRatio * rad2deg(radiusInRad)

  return { longitudeDelta, latitudeDelta }
}
