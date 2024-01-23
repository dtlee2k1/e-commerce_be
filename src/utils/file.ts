import fs from 'fs'
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
