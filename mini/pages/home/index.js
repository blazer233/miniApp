import {
  ajax
} from "../../http";
import {
  formatDate
} from "../../utils/util";
const CARD_CONFIG = [
  [{
      name: '受助方',
      filed: 'aided_user',
      unit: '人',
      num: ''
    },
    {
      name: '捐赠方',
      filed: 'donor',
      unit: '人',
      num: ''
    },
  ],
  [{
      name: '需求物资',
      filed: 'aided_demand',
      unit: '件',
      num: ''
    }, // 不分类计件
    {
      name: '捐赠物资',
      filed: 'material',
      unit: '件',
      num: ''
    },
  ],
  [{
      name: '任务总数',
      filed: 'task_total',
      unit: '个',
      num: ''
    },
    {
      name: '已完成任务',
      filed: 'task_finished',
      unit: '个',
      num: ''
    },
  ],
];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardData: {
      loading: true,
      data: null,
    },
    msgList: {
      data: [],
      empty: false,
      loading: true,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getStats();
    this.getAllTasks();
  },
  // 查看详情
  bindToDetail(e) {
    const {
      msgId,
      status
    } = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `../detail/index?msgId=${msgId}&task=${status}`,
    })
  },
  // 获取统计数据
  async getStats() {
    const config = CARD_CONFIG;
    const [, res] = await ajax("getStats");
    if (res) {
      config.forEach((it1) => {
        it1.forEach((it2) => {
          it2.num = res[it2.filed] || 0;
        });
      });
    }
    this.data.cardData.loading = false;
    this.data.cardData.data = config;
    console.log('获取统计数据', res, config);
    this.setData({
      cardData: this.data.cardData
    });
  },
  async getAllTasks() {
    let list = [];
    const [, res] = await ajax("getAllTasks");
    console.log('获取任务数据', res);
    if (res && res.data && res.data.data && res.data.data.length) {
      let dataInfo = [{
        "_id": "21525c6d634e6f2500a28f753df98938",
        "createTime": "2022-10-18T09:17:17.005Z",
        "materials": [{
          "count": 1,
          "id": "1111",
          "name": "羽绒服",
          "unit": "件"
        }],
        "remark": "特殊说明",
        "status": 2,
        "updateTime": "2022-10-18T09:17:23.382Z",
        "handler_id": "ofIzb5RYpOkR6iz_LF5XsgoFHNe0",
        "aided_user": {
          "_id": "eb860d36634e6d3e00cc1f4a0402210a",
          "age": 18,
          "name": "小胡",
          "phone": "888888",
          "sex": "男"
        }
      },{
        "_id": "21525c6d634e6f2500a28f753df98938",
        "createTime": "2022-10-18T09:17:17.005Z",
        "materials": [{
          "count": 1,
          "id": "1111",
          "name": "羽绒服",
          "unit": "件"
        }],
        "remark": "特殊说明",
        "status": 2,
        "updateTime": "2022-10-18T09:17:23.382Z",
        "handler_id": "ofIzb5RYpOkR6iz_LF5XsgoFHNe0",
        "aided_user": {
          "_id": "eb860d36634e6d3e00cc1f4a0402210a",
          "age": 18,
          "name": "小胡",
          "phone": "888888",
          "sex": "男"
        }
      },{
        "_id": "21525c6d634e6f2500a28f753df98938",
        "createTime": "2022-10-18T09:17:17.005Z",
        "materials": [{
          "count": 1,
          "id": "1111",
          "name": "羽绒服",
          "unit": "件"
        }],
        "remark": "特殊说明",
        "status": 2,
        "updateTime": "2022-10-18T09:17:23.382Z",
        "handler_id": "ofIzb5RYpOkR6iz_LF5XsgoFHNe0",
        "aided_user": {
          "_id": "eb860d36634e6d3e00cc1f4a0402210a",
          "age": 18,
          "name": "小胡",
          "phone": "888888",
          "sex": "男"
        }
      },{
        "_id": "21525c6d634e6f2500a28f753df98938",
        "createTime": "2022-10-18T09:17:17.005Z",
        "materials": [{
          "count": 1,
          "id": "1111",
          "name": "羽绒服",
          "unit": "件"
        }],
        "remark": "特殊说明",
        "status": 2,
        "updateTime": "2022-10-18T09:17:23.382Z",
        "handler_id": "ofIzb5RYpOkR6iz_LF5XsgoFHNe0",
        "aided_user": {
          "_id": "eb860d36634e6d3e00cc1f4a0402210a",
          "age": 18,
          "name": "小胡",
          "phone": "888888",
          "sex": "男"
        }
      },{
        "_id": "21525c6d634e6f2500a28f753df98938",
        "createTime": "2022-10-18T09:17:17.005Z",
        "materials": [{
          "count": 1,
          "id": "1111",
          "name": "羽绒服",
          "unit": "件"
        }],
        "remark": "特殊说明",
        "status": 2,
        "updateTime": "2022-10-18T09:17:23.382Z",
        "handler_id": "ofIzb5RYpOkR6iz_LF5XsgoFHNe0",
        "aided_user": {
          "_id": "eb860d36634e6d3e00cc1f4a0402210a",
          "age": 18,
          "name": "小胡",
          "phone": "888888",
          "sex": "男"
        }
      },{
        "_id": "21525c6d634e6f2500a28f753df98938",
        "createTime": "2022-10-18T09:17:17.005Z",
        "materials": [{
          "count": 1,
          "id": "1111",
          "name": "羽绒服",
          "unit": "件"
        }],
        "remark": "特殊说明",
        "status": 2,
        "updateTime": "2022-10-18T09:17:23.382Z",
        "handler_id": "ofIzb5RYpOkR6iz_LF5XsgoFHNe0",
        "aided_user": {
          "_id": "eb860d36634e6d3e00cc1f4a0402210a",
          "age": 18,
          "name": "小胡",
          "phone": "888888",
          "sex": "男"
        }
      }]

      // 此处仅展示状态为未领取的任务，过滤状态已经被领取和已完成的数据。(status: 0 未领取;  1 已领取进行中; 2 已完成)
      list = dataInfo.filter(s => s.status == 2);
      list.forEach((it) => {
        const date = new Date(it.createTime);
        it.title = `捐赠需求`; // 显示的标题
        // 显示的进程状态
        if (it.status == 0) {
          it.progressText = '待领取';
        } else if (it.status == 1) {
          it.progressText = '进行中';
        } else {
          it.progressText = '已完成';
        }
        it.timestamp = date.getTime();
        it.date = formatDate(date, 'yyyy年MM月dd日 HH:mm:ss'); // 显示的时间
        it.desc = '需求物资为：'; // 显示的描述文本
        it.materials.forEach((dIt, dIdx) => {
          const detail = dIt.name + dIt.count + dIt.unit;
          it.desc += `${detail + (dIdx == it.materials.length - 1 ? '。' : '；')}`;
        });
      });
      list.sort((a, b) => b.timestamp - a.timestamp); // 按创建时间，最新的优先展示
      console.log('获取捐赠场次任务信息', list);
    }
    this.data.msgList.data = list;
    this.data.msgList.loading = false;
    this.data.msgList.empty = !list || !list.length;
    this.setData({
      msgList: this.data.msgList
    });
  },
})