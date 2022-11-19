import Toast from "tdesign-miniprogram/toast/index";
import { ajax } from "../../http";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    labels: [],
    locationState: {},
  },
  addLabels() {
    this.setData({ visible: true });
  },
  onInputValue(e) {
    const { item } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [`locationState.${item}`]: value,
    });
  },
  addLabels() {
    this.setData({ visible: true });
  },
  onCheckDefaultAddress({ detail }) {
    const { value } = detail;
    this.setData({
      "locationState.isDefault": value,
    });
  },
  cancelHandle() {
    this.setData({ visible: false });
  },
  confirmHandle() {
    const { labels, locationState } = this.data;
    if (!locationState.labelValue) return;
    this.setData({
      visible: false,
      labels: [...labels, locationState.labelValue],
      "locationState.labelValue": "",
    });
  },

  onPickLabels(e) {
    const { item } = e.currentTarget.dataset;
    this.data.labels.splice(item, 1);
    this.setData({
      labels: this.data.labels,
    });
  },
  async formSubmit() {
    const {
      locationState: { name, phone, event },
    } = this.data;
    if (!name) {
      Toast({ selector: "#t-toast", message: "请填写姓名" });
      return;
    }
    if (!phone) {
      Toast({ selector: "#t-toast", message: "请填写联系方式" });
      return;
    }
    if (!event) {
      Toast({ selector: "#t-toast", message: "请填写事件描述" });
      return;
    }
    // const [, res] = await ajax("getTaskById", { id: msgId });
    // if (res) {
    //   this.setData({ details: res.data });
    // }
  },
});
