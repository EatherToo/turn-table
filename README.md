# turn-table 是一个抽奖大转盘的 vue 组件

##### [项目地址](https://github.com/EatherToo/turn-table)

## 使用方法

```
npm install prize-turn-table

import turnTable from 'prize-turn-table'

<turn-table :prize-list="prizeList"></turn-table>

```

##### [demo 地址](https://eathertoo.github.io/turn-table/)

### 组件属性说明

- `size:Number | String` 转盘大小
  接收数字类型或字符串类型的数据  
  此属性类型为字符串时,此字符串必须是 px,rem 结尾的字符串  
  此属性类型为数字时单位默认为 px;
- `prizeList: Array` 奖品列表  
  格式为:
  ```
  {
    icon: '', // 奖品图片
    name: "奖品1", // 奖品名称
  },
  {
    icon: '',
    name: "奖品2"
  },
  ```
- `getPrize: Function` 抽奖函数  
  获取抽奖结果的函数,由父组件传递,默认取随机数
- `count: Number` 抽奖次数
- `spinConfig: Object` 装盘旋转参数,有三个属性
  ```
  {
    duration: 4000, // 旋转时间
    circle: 8, // 旋转圈数
    mode: 'ease-out' // 过渡类型 (详情请查看MDN transition属性说明)
  }
  ```
- `strict: Boolean` 严格模式  
  此属性为 true 时,指针停止在扇形的随机位置  
  此属性为 false 时,指针停留在扇形的中间
