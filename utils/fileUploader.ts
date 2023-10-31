const makedir = async (entries: (FileSystemEntry | null)[]) => {
  const systems = entries.map((entry) => traverse(entry, {}))
  const data = await Promise.all(systems)
  return data.reduce((json, value) => {
    json[Object.keys(value)[0]] = Object.values(value)[0]
    return json
  }, {})

  async function traverse(
    entry: FileSystemEntry | null,
    fs: { [key: string]: {} }
  ) {
    if (entry && entry.isDirectory) {
      fs[entry.name] = {}
      // @ts-ignore
      let dirReader = entry.createReader()
      await new Promise((res: (value?: unknown) => void, rej) => {
        dirReader.readEntries(async (entries: FileSystemEntry[]) => {
          for (let e of entries) {
            await traverse(e, fs[entry.name])
          }
          res()
        }, rej)
      })
    } else if (entry && entry.isFile) {
      await new Promise((res: (value?: unknown) => void, rej) => {
        const allowedTypes: string[] = ['mp4', 'mov', 'avi', 'flv', 'wmv']
        // @ts-ignore
        entry.file((file) => {
          // only return filtered file types
          const type = file?.name.substring(file?.name.lastIndexOf('.') + 1)
          if (allowedTypes.includes(type)) {
            fs[entry.name] = file
            res()
          }
        }, rej)
      })
    }
    return fs
  }
}

const readDroppedItems = async (dt: DataTransfer | null) => {
  if (dt) {
    const entries = [...dt.items]
      .map((item) => {
        return item.webkitGetAsEntry ? item.webkitGetAsEntry() : null
      })
      .filter((entry) => entry)

    if (entries.length) {
      try {
        const output = await makedir(entries)
        if (output) {
          return output
        }
      } catch (error) {
        console.error(error)
        throw Error('Security Limitations')
      }
    } else {
      // Handle Files
    }
  } else {
    return true
  }
}

export default readDroppedItems
