// pages/shareappmessage/index.js
import Toast from "tdesign-miniprogram/toast/index";
import { ajax } from "../../http";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navigation: { type: "dots" },
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,
    task: 1,
    msgId: "",
    details: {
      title:
        "<h2>疫情防控志愿服务活动工作方案</h2><p>为扎实推进时代文明实践工作，充分发挥法律服务志愿者队伍作用，弘扬法治精神，传播法治正能量，积极服务疫情防控重点工作，切实提升全县群众疫情防控法治意识，特制定如下活动方案。</p><p>一、活动主题：</p><p>“党旗在基层飘扬”</p><p>二、活动时间：</p><p>20_年8月9日-8月11日</p><p>二、参加人员:</p><p>全体党员律师及法律服务志愿者队伍</p><p>三、活动内容：</p><p>1、为全县八个防疫检查点捐赠物资;</p><p>2、开展“疫情防控代岗一小时”志愿服务</p><p>3、开展“疫情防控法治同行”专项法治宣传</p><p>4、在各防疫点张贴疫情防控法律服务公示牌</p>",
      images: ["/image/fy1.jpeg", "/image/fy2.jpeg", "/image/fy3.jpeg"],
      desc: ["/image/fy1.jpeg", "/image/fy2.jpeg", "/image/fy3.jpeg"],
      activityList: ["核酸", "疫情", "防控"],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ task, msgId }) {
    this.setData({ task: +task, msgId });
    this.initData();
  },
  async bindnav() {
    const { task, msgId } = this.data;
    let message;
    if (!task) {
      wx.navigateTo({ url: "/pages/adddream/index" });
    } else {
      const [, res] = await ajax("getUnhandledTasks", { task_id: msgId });
      if (res) {
        this.setData({ task: 0 });
        message = "成功领取，请您完成之后再来打卡吧~";
      } else {
        message = "请求失败";
      }
      Toast({ selector: "#t-toast", message });
    }
  },
  async initData() {
    const { msgId } = this.data;
    const [, res] = await ajax("getTaskById", { id: msgId });
    if (res) {
      this.setData({ details: res.data });
    }
  },
});
