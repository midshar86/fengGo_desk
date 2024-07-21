// 自定义一个插件, 使得通过this访问指定属性时调用响应函数
// 导入echarts
import * as echarts from 'echarts'
export const customedPlugin = {
  install(app) {
    // 存储所有的echarts实例
    let echartsInstance = []
    // 通过Object.defineProperties方法设置目标属性的getter方法, 使得当访问目标属性时, 返回一个函数
    Object.defineProperties(app.config.globalProperties, {
      // 创建k线图
      $k: {
        get() {
          // 返回一个箭头函数, 接收一个dom元素的id值作为echarts图表展示的容器
          return (id, charts) => {
            const myChart = echarts.init(document.getElementById(id));
            const option = {
              title: {
                text: 'K线图数据展示'
              },
              tooltip: {
                show: true
              },
              xAxis: {
                data: charts.x
              },
              yAxis: {},
              series: [
                {
                  type: 'candlestick',
                  data: charts.val
                }
              ]
            };

            option && myChart.setOption(option);
            // 在数组中存放echats实例
            echartsInstance.push(myChart)
            // 实现图标的响应式放大与缩放
            window.addEventListener("resize", () => {
              myChart.resize()
            })
          }
        }
      },
      // 创建柱状图
      $bar: {
        get() {
          return (id, charts) => {
            const myChart = echarts.init(document.getElementById(id));
            const rowData = []
            const colData = []
            // 遍历传入的参数数组
            charts.forEach(item => {
              rowData.push(item.x)
              colData.push(item.val)
            })
            let option = {
              tooltip: {
                show: true
              },
              title: {
                text: "直方图数据展示"
              },
              xAxis: {
                type: 'category',
                data: rowData
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  type: 'bar',
                  showBackground: true,
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#83bff6' },
                      { offset: 0.5, color: '#188df0' },
                      { offset: 1, color: '#188df0' }
                    ])
                  },
                  emphasis: {
                    itemStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#2378f7' },
                        { offset: 0.7, color: '#2378f7' },
                        { offset: 1, color: '#83bff6' }
                      ])
                    }
                  },
                  data: colData
                }
              ]
            };

            option && myChart.setOption(option);
            // 在数组中存放echarts实例
            echartsInstance.push(myChart)
            // 实现图标的响应式放大与缩放
            window.addEventListener("resize", () => {
              myChart.resize()
            })
          }
        }
      },
      // 创建折线图
      $line: {
        get() {
          return (id, charts) => {
            const myChart = echarts.init(document.getElementById(id));
            const rowData = []
            const colData = []
            charts.forEach(item => {
              rowData.push(item.x)
              colData.push(item.val)
            })
            const option = {
              tooltip: {
                show: true,
                axisPointer: {
                  type: 'cross',
                  snap: true
                }
              },
              title: {
                text: "折线图数据展示"
              },
              xAxis: {
                type: 'category',
                data: rowData
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  data: colData,
                  type: 'line',
                  smooth: true
                }
              ]
            };

            option && myChart.setOption(option);
            // 在数组中存放echarts实例
            echartsInstance.push(myChart)
            window.addEventListener("resize", () => {
              myChart.resize()
            })
          }
        }
      },
      // 清空所有的echarts实例
      $clear: {
        get() {
          return () => {
            echartsInstance.forEach(item => item.dispose())
            echartsInstance = []
          }
        }
      }
    })
  }
}