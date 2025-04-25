<script setup>
import { ref, onUnmounted, watch } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const presetUrls = [
  {
    group: '百度',
    children: [
      { label: '百度 A', value: 'https://nd-static.bdstatic.com/m-static/wp-brand/img/login-banner.ef9a409c.png'},
      { label: '百度 B', value: 'https://nd-static.bdstatic.com/m-static/wp-brand/img/banner.5783471b.png' },
    ]
  },
  {
    group: '大学',
    children: [
      { label: '上海纽约大学', value: 'https://cdn.shanghai.nyu.edu/sites/default/files/adminssionnew.mp4' }
    ],
  },
  {
    group: '运营商',
    children: [
      { label: '联通公免', value: 'https://m1.ad.10010.com/small_video/uploadImg/1598021193891.jpg' },
      { label: '移动', value: 'https://pc-dl.migufun.com:8443/channelpackage/mgame-2djSBy.exe' },
      { label: '电信', value: 'https://desk.ctyun.cn/desktop/software/clientsoftware/download/5961fa22ee369eba433da6b0247eb11f' }
    ],
  },
  {
    group: '直播平台',
    children: [
      { label: '虎牙', value: 'https://a.msstatic.com/huya/hd/h5/static-source/main/credentials/yyzz-2024.png' },
      { label: '斗鱼', value: 'https://sta-op.douyucdn.cn/front-publish/static-file-master/copyright/zz.35070da08b305866d24fcd7d5c78beb5.3897289.jpg'},
      { label: 'CCTV', value: 'https://dh5.cntv.myhwcdn.cn/asp/h5e/hls/1200/0303000a/3/default/ec48b9f8c76e49af842d4942914ad663/1.ts' }
    ],
  },
  {
    group: '视频平台',
    children: [
      { label: '爱奇艺', value: 'https://bdcdncnc.inter.71edge.com/cdn/pca/20231130/10.9.1.7348/channel/1701328986348/IQIYIsetup_z43.exe' },
      { label: '哔哩哔哩', value: 'https://activity.hdslb.com/blackboard/static/20210604/4d40bc4f98f94fbc71c235832ce3efd4/hJEhL6jGOY.zip' }
    ],
  },
  {
    group: '购物平台',
    children: [
      { label: '京东', value: 'https://img20.360buyimg.com/openfeedback/jfs/t1/233068/10/31070/1350947/67b9eabfFee81ecd2/b77931ef8e8c84c7.png' },
      { label: '拼多多', value: 'https://cd.pddpic.com/volantis-open/volantis-common/app/com.xunmeng.workBench/Release_32bf1eb96aa26d0ac5ad841f0df7db2d.exe' }
  ],
  },
  {
    group: '网易',
    children: [
      { label: '网易数帆', value: 'https://nos.netease.com/cloud-website-bucket/202410291619084ed3d7ba-f374-44f1-a7cc-7a3cff4be239.jpeg' },
      { label: '网易云游戏', value: 'https://nsh.gdl.netease.com/cloudgame_macos/NSH_cloud_game_for_mac_1.4.6_2023_06-02-11.dmg'}
    ],
  },
  {
    group: '腾讯',
    children: [
      { label: '微信', value: 'https://res.wx.qq.com/t/fed_upload/b04d69b5-a173-49c3-990b-a8509c63fee7/banner.2x47d04f.png' },
      { label: '腾讯云', value: 'https://cosbrowser-1253960454.cos.ap-shanghai.myqcloud.com/releases/cosbrowser-setup-2.11.23.exe'},
      { label: 'LOL', value: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg' },
      { label: '腾讯视频', value: 'https://puui.qpic.cn/vpic_cover/g3346tki83w/g3346tki83w_hz.jpg' },
      { label: '腾讯CDN', value: 'https://game.gtimg.cn/images/nz/web202106/index/bc_part1.gif?0.3190485611376561' },
      { label: 'WeGame', value: 'https://wegame.gtimg.com/g.55555-r.c4663/wegame-home/sc02-03.514d7db8.png' }
    ]
  },
  {
    group: '手机',
    children: [
      { label: 'VIVO', value: 'https://wwwstatic.vivo.com.cn/vivoportal/files/resource/funtouch/1651200648928/images/os2-jude-video.mp4' },
      { label: 'OPPO', value: 'https://www.oppo.com/content/dam/oppo_com/cn/mkt/about/assets/videos-kv-tvc-1280.mp4' },
      { label: '小米', value: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/Ultra_U/pc/ultra_2_2.mp4' },
      { label: '华为', value: 'https://res-video.hc-cdn.com/cloudbu-site/china/zh-cn/HuaweiCloudStack/sanxiadianli.mp4' },
    ]
  },
  {
    group: '其他大厂',
    children: [
      { label: '360', value: 'https://p0.qhimg.com/t11098f6bcd1cf2e00a3a8cec51.png' },
      { label: '阿里CDN', value: 'https://img.alicdn.com/imgextra/i1/O1CN01xA4P9S1JsW2WEg0e1_!!6000000001084-2-tps-2880-560.png' },
      { label: '字节跳动', value: 'https://lf9-cdn-tos.bytecdntp.com/cdn/yuntu-index/1.0.4/case/maiteng/detailbg.png' },
      { label:'快手', value: 'https://alimov2.a.kwimgs.com/upic/2024/11/18/17/BMjAyNDExMTgxNzM0NTFfMjQ2MzY1ODI4MV8xNDg5NTc1NTQwNDBfMl8z_b_Ba0e085802ad867415b13e560bab69dd2.mp4'}
    ],
  },
  {
    group: '海外大厂',
    children: [
      {label:'微软', value: 'https://cdn.microsoftstore.com.cn/media/product_long_description/3781-00000/2_dupn50xr/4h0yzz2_360.jpg'},
      { label: '必应背景图', value: 'https://s.cn.bing.net/th?id=OHR.BlackHeron_ZH-CN6764711050_UHD.jpg'},
      { label: 'Cachefly', value: 'https://cachefly.cachefly.net/100mb.test' },
      { label: 'Cloudflare', value: 'https://speed.cloudflare.com/__down?bytes=25000000' }
    ]
  }
];


const selectedUrl = ref(presetUrls[1].children[0].value)
const customUrl = ref('')
const isCustomUrl = ref(false)
const limit = ref(true)
const isRunning = ref(false)
const startTime = ref(null)
const totalBytes = ref(0)
const currentSpeed = ref(0)
const speedHistory = ref([])
const lastBytes = ref(0)
const fileUrl = ref(selectedUrl)
const targetBytesValue = ref('100') // 目标流量数值
const targetBytesUnit = ref('GB') // 目标流量单位
let speedInterval
const abortController = ref(null)

const units = {
  MB: 1048576,
  GB: 1073741824,
  TB: 1099511627776
}

const unitOptions = [
  { label: 'MB', value: 'MB' },
  { label: 'GB', value: 'GB' },
  { label: 'TB', value: 'TB' }
]

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]
}

// 计算目标流量的字节数
const getTargetBytes = () => {
  if (!limit) return 1099511627776000
  if (!targetBytesValue.value) return 0
  const value = parseFloat(targetBytesValue.value)
  if (isNaN(value)) return 0
  return Math.floor(value * units[targetBytesUnit.value])
}

const formatDuration = (ms) => {
  if (!ms) return '00:00:00'
  const seconds = Math.floor(ms / 1000)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

const startDownload = async () => {
  if (!fileUrl.value) {
    MessagePlugin.warning(t('message_urlRequired'))
    return
  }

  try {
    isRunning.value = true
    startTime.value = Date.now()
    lastBytes.value = totalBytes.value
    abortController.value = new AbortController()

    speedInterval = setInterval(() => {
      const now = Date.now()
      speedHistory.value.push({
        timestamp: now,
        bytes: totalBytes.value
      })
      
      // 只保留最近 5 秒的数据
      const fiveSecondsAgo = now - 5000
      speedHistory.value = speedHistory.value.filter(item => item.timestamp > fiveSecondsAgo)
      
      if (speedHistory.value.length >= 2) {
        const oldestRecord = speedHistory.value[0]
        const latestRecord = speedHistory.value[speedHistory.value.length - 1]
        const timeDiff = (latestRecord.timestamp - oldestRecord.timestamp) / 1000 // 转换为秒
        const bytesDiff = latestRecord.bytes - oldestRecord.bytes
        
        currentSpeed.value = Math.round(bytesDiff / timeDiff)
      } else {
        currentSpeed.value = 0
      }

      // 检查是否达到目标流量
      const targetBytes = getTargetBytes()

      if (limit.value && (targetBytes > 0 && totalBytes.value >= targetBytes)) {
        MessagePlugin.success(t('message_targetReached'))
        stopDownload()
      }
    }, 1000)

    const downloadThread = async () => {
      while (isRunning.value) {
        const url = new URL(fileUrl.value)
        url.searchParams.set('_t', Date.now().toString() + '-' + Math.random().toString(36).substring(2))
        
        try {
          const response = await fetch(url.toString(), {
            signal: abortController.value.signal,
            referrerPolicy: 'no-referrer'
          })
          const reader = response.body.getReader()

          while (true) {
            const { done, value } = await reader.read()
            if (done || !isRunning.value) break
            totalBytes.value += value.length

            const targetBytes = getTargetBytes()
            if (limit.value && (targetBytes > 0 && totalBytes.value >= targetBytes)) {
              MessagePlugin.success(t('message_targetReached'))
              stopDownload()
              break
            }
          }
        } catch (error) {
          if (error.name === 'AbortError') {
            break
          }
          throw error
        }
      }
    }

    const threads = []
    const threadNum = isMultiThread.value ? Math.min(Math.max(threadCount.value, 1), 32) : 1
    
    for (let i = 0; i < threadNum; i++) {
      threads.push(downloadThread())
    }

    await Promise.all(threads)
  } catch (error) {
    if (error.name !== 'AbortError') {
      MessagePlugin.error(t('message_downloadError') + error.message)
    }
    stopDownload()
  }
}

const stopDownload = () => {
  isRunning.value = false
  if (abortController.value) {
    abortController.value.abort()
    abortController.value = null
  }
  clearInterval(speedInterval)
  speedHistory.value = []
  currentSpeed.value = 0
}

onUnmounted(() => {
  stopDownload()
})

// 监听自定义地址开关和输入框变化
watch(isCustomUrl, (val) => {
  if (!val) {
    fileUrl.value = selectedUrl.value
  } else {
    fileUrl.value = customUrl.value
  }
})

watch(selectedUrl, (val) => {
  if (!isCustomUrl.value) {
    fileUrl.value = val
  }
})

watch(customUrl, (val) => {
  if (isCustomUrl.value) {
    fileUrl.value = val
  }
})
const isMultiThread = ref(true)
const threadCount = ref(5)

// 切换语言
const toggleLanguage = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
}
</script>

<template>
  <div class="container">
    <t-card :title="t('title')" header-bordered class="card">
      <t-space direction="vertical" size="large" style="width: 100%">
          <template v-if="!isCustomUrl">
            <t-select
              v-model="selectedUrl"
              :options="presetUrls"
              :disabled="isRunning"
              style="width: 100%"
            />
          </template>
          <template v-else>
            <t-input
              v-model="customUrl"
              :placeholder="t('customUrl_placeholder')"
              :disabled="isRunning"
            />
          </template>
          <template v-if="limit">
        <t-input-adornment>
          <t-input
            v-model="targetBytesValue"
            :placeholder="t('targetTraffic_placeholder')"
            :disabled="isRunning"
            type="number"
          />
          <template #append>
            <t-select
              v-model="targetBytesUnit"
              autoWidth
              :options="unitOptions"
              :disabled="isRunning"
            />
          </template>
        </t-input-adornment>
      </template>
        <template v-if="isMultiThread">
          <t-input-adornment>
            <t-input-number
              style="width: -webkit-fill-available;margin-right: 5px;"
              v-model="threadCount"
              :placeholder="t('multiThread_placeholder')"
              :disabled="isRunning"
              type="number"
              :min="1"
              :max="32"
            />
            <template #append>
              <span style="padding: 0 8px;">{{ t('multiThread_unit') }}</span>
            </template>
          </t-input-adornment>
        </template>
        <div style="display: flex;justify-content: space-between;">
          <span>
            {{ t('multiThread_label') }}&nbsp;
            <t-switch
              v-model="isMultiThread"
              :disabled="isRunning"
              size="large"
            ></t-switch>
          </span>
          <span>
            {{ t('targetTraffic_label') }}&nbsp;
            <t-switch
              v-model="limit"
              :disabled="isRunning"
              size="large"
            ></t-switch>
          </span>
          <span>
            {{ t('customUrl_label') }}&nbsp;
            <t-switch
              v-model="isCustomUrl"
              :disabled="isRunning"
              size="large"
            ></t-switch>
          </span>
        </div>
        <t-button
          :theme="isRunning ? 'danger' : 'primary'"
          block
          @click="isRunning ? stopDownload() : startDownload()"
        >
          {{ isRunning ? t('button_stop') : t('button_start') }}
        </t-button>
        <template v-if="limit">
          <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="Math.floor(totalBytes/getTargetBytes()*100)" :status="'active'" />
        </template>
        <t-space break-line style="display: flex;justify-content: space-around;flex-direction: row;">
          <t-statistic :title="t('statistics_runningTime')" :value="startTime ? Date.now() - startTime : 0" :format="formatDuration" />
          <t-statistic :title="t('statistics_currentSpeed')" :value="currentSpeed" :format="formatBytes" unit="/s" />
          <t-statistic :title="t('statistics_usedTraffic')" :value="totalBytes" :format="formatBytes"/>
        </t-space>
        
      </t-space>
      
      <!-- 语言切换按钮 -->
      <div style="position: absolute; top: 10px; right: 10px;">
        <t-button theme="default" @click="toggleLanguage">
          {{ t('language') }}: {{ locale === 'zh' ? '中文' : 'English' }}
        </t-button>
      </div>
    </t-card>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  background: url(https://s.cn.bing.net/th?id=OHR.StLouisArch_ZH-CN0442955735_UHD.jpg);
  background-size: cover;
}

.card {
  width: 100%;
  max-width: 1200px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
