import fs from 'fs'
import fsPromise from 'fs/promises'
import { DATA_DIR } from '~/constants/dir'

export const initFolder = () => {
  ;[DATA_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      // Nếu không tồn tại, tạo thư mục
      fs.mkdirSync(dir, {
        recursive: true // tạo nested folder
      })
    }
  })
}

export const readFileAsync = async (filePath: string) => {
  try {
    const data = await fsPromise.readFile(filePath)
    return JSON.parse(data.toString())
  } catch (error) {
    return []
  }
}

export const writeFileAsync = async (filePath: string, data: any[]) => {
  await fsPromise.writeFile(filePath, JSON.stringify(data))
}
