const Logger = (message:string, type:'SUCCESS' | 'ERROR' | 'WARNING') => {
  const text = `| LOG | ${type} | ${message} |`

  switch (type) {
    case 'SUCCESS':
      console.log(text)
      break

    case 'WARNING':
      console.warn(text)
      break

    case 'ERROR':
      console.error(text)
      break
  }
}

export default Logger
