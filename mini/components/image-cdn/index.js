const URL = "https://raw.githubusercontent.com/blazer233/image-here/main/miniApp/";
Component({
  properties: {
    icon: {
      type: String,
      value: "",
    },
    cls: {
      type: String,
      value: "",
    },
  },
  data: {
    baseurl: URL,
  },
});
