# turn-table 是一个抽奖大转盘的 vue 组件

##### [项目地址](https://github.com/EatherToo/turn-table)

### 有任何问题欢迎提 issue

## 使用方法

```
npm install prize-turn-table

import turnTable from 'prize-turn-table'

<turn-table :prize-list="prizeList"></turn-table>

```

#### [demo 地址](https://eathertoo.github.io/turn-table/)

![demo.gif](https://raw.githubusercontent.com/EatherToo/turn-table/pages/asserts/demo.gif)

### 组件抛出事件说明

- 当转盘停止转动时,组件抛出一个 `@rotate-over` 事件,同时带出一个整型值,该值为中奖奖项在 prizeList 中的下标
- 转盘开始转动之前,组件抛出一个 `@rotate-start` 事件

### 组件 slot 说明

- 组件有一个 slot, `centerText` 显示在指针图标的中间,用法如下:

  ```
  <turnTable>
      <span slot="centerText">100次</span>
    </turnTable>
  ```

### 组件属性说明

- `size:Number | String` 转盘大小
  接收数字类型或字符串类型的数据  
  此属性类型为字符串时,此字符串必须是 px,rem 结尾的字符串  
  此属性类型为数字时单位默认为 px;
- `prizeList: Array` 奖品列表  
  说明: 当奖品个数为单数时会自动补一个 **谢谢惠顾** 选项
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
  此函数必须有一个整型返回值,**<font color="red">该返回值表示 prizeList 中中奖奖项的下标</font>**
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

- `ifBackImg: Boolean` 是否加上背景图片
  此属性为 true 时,有转盘背景图片  
  此属性为 false 时,无转盘背景图片

- `colors: Array` 抽奖扇形间隔背景颜色选项
  示例：
  ```
  [
    '#FFFFFF',
    '#F96C1C'
  ]
  ```
- `textColors: Array` 抽奖扇形间隔文字颜色选项
  示例：

  ```
  [
    '#F96C1C',
    '#FFFFFF'
  ]
  ```

- `backImg:String`　背景图片
  说明：仅当`ifBackImg`值为`true`时生效，若未指定值则取用默认值
- `ifCenterText:Boolean` 是否展示转盘中间文字  
  当 slot centerText 存在时此属性<font color="red">失效</font>

- `arrowSize:String` 转盘指针大小
  指定转盘中间指针图标的尺寸
- `arrowImg: String` 转盘指针图片
  指定转盘中间指针图片
