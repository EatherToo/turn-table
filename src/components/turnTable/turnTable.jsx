import '../style/turnTable.css'
import { prizeList } from '../config'
const CIRCLE_ANGLE = 360
const turnTable = {
  name: 'turnTable',
  props: {
    // 转盘大小
    size: {
      type: [Number, String],
      default: 300,
    },
    // 奖品列表
    prizeList: {
      type: Array,
      default: () => {
        return prizeList
      },
    },
    // 获取抽奖结果函数
    getPrize: {
      type: Function,
      default: () => {
        return false
      },
    },
    // 抽奖次数
    count: {
      type: Number,
      default: 10,
    },
    spinConfig: {
      type: Object,
      default: () => {
        return {
          duration: 4000, // 旋转时间
          circle: 8, // 旋转圈数
          mode: 'ease-out',
        }
      },
    },
    strict: {
      type: Boolean,
      default: true,
    },
    // 是否添加抽奖背景图片
    ifBackImg: {
      type: Boolean,
      default: true,
    },
    // 抽奖间隔背景颜色选项
    colors: {
      type: Array,
      default: () => ['#FFFFFF', '#F96C1C'],
    },
    // 抽奖间隔文字颜色选项
    textColors: {
      type: Array,
      default: () => ['#F96C1C', '#FFFFFF'],
    },
    // 默认背景图片
    backImg: {
      type: String | Object,
      default: '',
    },
    // 是否展示转盘中间的文字
    ifCenterText: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      count_: 0,
      duration: 3000, // 转盘旋转时间
      rotateAngle: 0, // 旋转角度
      angleList: [], // 指针最终停留角度的列表
      prizeIndex: 0, // 抽中奖品的下标
      angle: 30, // 扇形弧度
      isRotating: false, // 是否正在旋转
      allFontSize: '300px', // 转盘大小
      config: {}, // 转盘旋转参数
      bgStyle: {},
      bodyStyle: {},
    }
  },
  mounted() {
    // 若size是一个数字
    if (!isNaN(this.size)) {
      this.allFontSize = this.size + 'px'
    } else {
      this.allFontSize = this.size
    }
    this.hasBackgroung()
    // 初始化
    this.count_ = this.count
    this.angleList = []
    // 是否正在旋转
    this.isRotating = false
    // 旋转配置
    this.config = this.spinConfig
    if (!this.config.mode) {
      this.config.mode = 'ease-out'
      this.config = { ...this.config }
    }
    if (!this.config.mode) {
      this.config.circle = 8
      this.config = { ...this.config }
    }
    if (!this.config.mode) {
      this.config.duration = 4000
      this.config = { ...this.config }
    }
    // 初始化抽奖转盘
    this.initialize()
  },
  computed: {
    // 旋转样式
    rotateStyle() {
      return {
        '-webkit-transition': `transform ${this.config.duration}ms ${this.config.mode}`,
        transition: `transform ${this.config.duration}ms ${this.config.mode}`,
        '-webkit-transform': `rotate(${this.rotateAngle}deg)`,
        transform: `rotate(${this.rotateAngle}deg)`,
      }
    },
    // 若奖品数量为单数
    extendItem() {
      if (this.prizeList.length % 2 === 0) {
        return []
      } else {
        return [{ icon: '', name: '谢谢惠顾!' }]
      }
    },
  },
  watch: {
    count(val) {
      this.count_ = val
    },
    spinConfig(val) {
      this.config = val
      if (!this.config.mode) {
        this.config.mode = 'ease-out'
        this.config = { ...this.config }
      }
      if (!this.config.mode) {
        this.config.circle = 8
        this.config = { ...this.config }
      }
      if (!this.config.mode) {
        this.config.duration = 4000
        this.config = { ...this.config }
      }
    },
    size() {
      if (!isNaN(this.size)) {
        this.allFontSize = this.size + 'px'
      } else {
        this.allFontSize = this.size
      }
    },
    ifBackImg() {
      this.hasBackgroung()
    },
  },
  methods: {
    /**
     * 初始化转盘参数
     */
    initialize() {
      // 指针最终停留角度的列表
      this.angleList = []
      // 奖项数量
      const prizeNum =
        this.prizeList.length + (this.prizeList.length % 2 === 0 ? 0 : 1)
      // 单个扇形的弧度
      this.angle = CIRCLE_ANGLE / prizeNum

      // 计算最终停留角度列表,因为指针要停在扇形中间,所以要加上指针偏移扇形弧度
      for (let i = 0; i < prizeNum; i++) {
        // 指针偏移弧度
        let offset
        if (this.strict) {
          offset = this.random(this.angle, 5)
        } else {
          offset = this.angle / 2
        }
        this.angleList.push(i * this.angle + offset)
      }
    },
    /**
     * 转盘开始旋转
     */
    beginRotate() {
      // 抽奖次数为0或正在旋转时
      if (this.count_ === 0 || this.isRotating) {
        return
      }
      // 获取奖品下标,getPrize函数由父组件传递进来,若未传递,则使用默认的算法
      if (this.getPrize() === false) {
        this.prizeIndex = this.random(this.prizeList.length - 1)
      } else {
        this.prizeIndex = this.getPrize()
      }
      // 抽奖次数减一
      this.count_--
      // 调用旋转函数
      this.rotating()
    },
    random(max, min = 0) {
      return parseInt(Math.random() * (max - min + 1) + min)
    },
    rotating() {
      // 将旋转状态置为true
      this.isRotating = true

      /**
       * 计算旋转角度
       * 计算规则为: 当前指针停留角度 加 旋转圈数 加 奖项停留角度 还要减去多出来的角度
       */
      this.rotateAngle =
        this.rotateAngle + // 当前指针停留角度
        this.config.circle * CIRCLE_ANGLE + // 旋转圈数
        this.angleList[this.prizeIndex] - // 奖项停留角度
        (this.rotateAngle % CIRCLE_ANGLE) // 回到初始位置
      // 旋转结束后，允许再次触发
      setTimeout(() => {
        this.rotateOver()
      }, this.config.duration + 1000)
    },
    // 旋转结束
    rotateOver() {
      this.isRotating = false
      this.$emit('rotate-over', this.prizeIndex)
    },
    // 是否展示北京图片
    hasBackgroung() {
      if (this.ifBackImg) {
        // 若展示背景图片,整个转盘大小保持不变,可转动部分按比例缩小
        this.bgStyle = {
          fontSize: this.allFontSize,
        }
        // 若传递了背景图片进来
        if (this.backImg && this.backImg !== '') {
          this.bgStyle.backgroundImage = `url(${this.backImg})`
        }
        this.bodyStyle = {
          fontSize: '0.75em',
          textAlign: 'center',
        }
      } else {
        this.bgStyle = {}
        this.bodyStyle = {
          fontSize: this.allFontSize,
          textAlign: 'center',
        }
      }
    },
  },
  render() {
    return (
      <div class={this.ifBackImg ? 'turn-table-bg' : ''} style={this.bgStyle}>
        <div style={this.bodyStyle} class="turn-table-body">
          <div class="turn-table-content">
            <div class="turn-table-box">
              <div class="turn-table-arrow" onClick={this.beginRotate}>
                {this.ifCenterText ? (
                  <label style={{ fontSize: '0.008em', color: '#F22E00' }}>
                    {this.count_ + '次'}
                  </label>
                ) : (
                  ''
                )}
              </div>
              <div class="turn-table-box-items" style={this.rotateStyle}>
                {this.prizeList.concat(this.extendItem).map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{ transform: `rotate(${index * this.angle}deg)` }}
                      class="prize-list"
                    >
                      <div
                        class="prize-item"
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? this.colors[0] : this.colors[1],
                          color:
                            index % 2 === 0
                              ? this.textColors[0]
                              : this.textColors[1],
                          transform: `rotate(${this.angle}deg)`,
                        }}
                      >
                        <div
                          style={{ transform: `rotate(-${this.angle / 2}deg)` }}
                          class="prize-info-item"
                        >
                          <div class="prize-pic">
                            {item.icon ? <img src={item.icon} /> : ''}
                          </div>
                          <div class="prize-text">{item.name}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export default turnTable