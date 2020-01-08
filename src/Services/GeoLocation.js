export function getMyLocation() {
  const p = new Promise(function(resolve, reject) {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser")
    } else {
      setTimeout(() => {
        reject('geo timeout')
      }, 10000)
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
