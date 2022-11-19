import { ajax } from "../../http";
import { formatDate } from "../../utils/util";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tab: ['⏱ 进行中', '⛳️ 已结束'],
    active: 0,
    allList: [[], []], // 0：进行中  1：已结束
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
    this.getAllTasks();
  },
  bindTabClick(e) {
    const { allList } = this.data;
    const { index } = e.currentTarget.dataset;
    if (index == this.data.active) return;
    this._updataMsgList(allList[index]);
    this.setData({ active: index, msgList: this.data.msgList });
  },
  bindToDetail(e) {
    const { msgId, status } = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `../detail/index?msgId=${msgId}&status=${status}`,
    })
  },
  async getAllTasks() {
    const { allList } = this.data;
    const [, res] = await ajax("getAllTasks");
    console.log('获取任务数据', res);
    let list = [];
    if (res && res.data && res.data.data && res.data.data.length) {
      let dataInfo = res.data.data;
      console.log(JSON.stringify(dataInfo))
      // 此处仅展示状态为未领取的任务，过滤状态已经被领取和已完成的数据。(status: 0 未领取;  1 已领取进行中; 2 已完成)
      list = dataInfo.filter(s => s.status != 0);
      list.forEach((it) => {
        const date = new Date(it.createTime);
        it.title = `捐赠需求${it._id}`; // 显示的标题
        it.timestamp = date.getTime();
        it.date = formatDate(date, 'yyyy年MM月dd日 HH:mm:ss'); // 显示的时间
        it.desc = '需求物资为：'; // 显示的描述文本
        it.materials.forEach((dIt, dIdx) => {
          const detail = dIt.name + dIt.count + dIt.unit;
          it.desc += `${detail + (dIdx == it.materials.length - 1 ? '。' : '；')}`;
        });
        // 显示的进程状态
        if (it.status == 1) {
          it.progressText = '进行中';
          allList[0].push(it);
        } else {
          it.progressText = '已完成';
          allList[1].push(it);
        }
      });
      // 按创建时间，最新的优先展示
      allList[0].sort((a, b) => b.timestamp - a.timestamp);
      allList[1].sort((a, b) => b.timestamp - a.timestamp);
      console.log('获取捐赠场次任务信息', list);
    }
    this._updataMsgList(allList[0]);
    this.setData({ allList, msgList: this.data.msgList });
  },
  _updataMsgList(data) {
    this.data.msgList.data = data;
    this.data.msgList.loading = false;
    this.data.msgList.empty = !data || !data.length;
  },
})