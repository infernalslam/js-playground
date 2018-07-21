const delay = (time) => {
  return new Promise((resolve, reject) => {
    if (!time) reject(new Error('delay no time!'))
    setTimeout(() => {
      resolve(time)
    }, time)
  })
}

export default delay
