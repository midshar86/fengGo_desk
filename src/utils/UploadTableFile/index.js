// 读取文件并转换成json数据
import * as XLSX from "xlsx"
export const handlerReadFile = (tableFile) => {
  // console.log(tableFile);
  return new Promise((resolve, reject) => {
    // 存储读取后的文件数据
    let resFile = ''
    // 新建一个FileReader类型
    const file = new FileReader()
    // 以arrayBuffer读取文件数据
    file.readAsArrayBuffer(tableFile)
    // 当文件读取成功
    file.onload = () => {
      // 将arrayBuffer读取成为工作簿(arrayBuffer数组存储在result中)
      const workBook = XLSX.read(file.result)
      // 在工作簿中索引第一个工作表
      const workSheet = workBook.Sheets[workBook.SheetNames[0]]
      // 将转换后的工作表数据存储
      resFile = XLSX.utils.sheet_to_json(workSheet)
    }
    // 读取失败
    file.onerror = (err) => {
      // 抛出错误
      reject(err)
    }
    // 文件读取结束
    file.onloadend = () => {
      // 返回读取结果
      resolve(resFile)
    }
  })
}