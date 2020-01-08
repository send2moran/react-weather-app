export function getMyLocation(callback, onError) {
  const p = new Promise(function(resolve, reject) {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser")
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        e => {
          reject(e)
        }
      )
    }
  })
  return p
}
