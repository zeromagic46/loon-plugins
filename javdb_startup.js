const url = $request.url;
let body = $response.body;

if (body) {
  try {
    let obj = JSON.parse(body);
    let modified = false;

    // 1. 禁用开屏广告配置
    const adKeys = new Set(["start_ad", "splash_ad", "launch_ad"]);
    // 2. 清空启动公告/弹窗配置
    const noticeKeys = new Set(["notice", "notices", "announcement", "announcements", "popup", "alert", "dialog"]);

    const walkAndClean = (node) => {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) {
        node.forEach(walkAndClean);
        return;
      }
      for (const key of Object.keys(node)) {
        const val = node[key];
        if (adKeys.has(key) && val && typeof val === "object") {
          val.enabled = false;
          val.overtime = 0;
          if ("ad" in val) val.ad = null;
          modified = true;
        } else if (noticeKeys.has(key) && val !== null) {
          if (Array.isArray(val)) {
            node[key] = [];
            modified = true;
          } else if (typeof val === "object") {
            if ("enabled" in val) val.enabled = false;
            if ("show" in val) val.show = false;
            if ("content" in val) val.content = "";
            if ("title" in val) val.title = "";
            node[key] = null;
            modified = true;
          } else if (typeof val === "string" && val.includes("公告")) {
            node[key] = "";
            modified = true;
          }
        } else if (val && typeof val === "object") {
          walkAndClean(val);
        }
      }
    };

    walkAndClean(obj);

    if (modified) {
      console.log(`[JavDB-Startup] 已清理开屏与公告配置: ${url}`);
      body = JSON.stringify(obj);
    } else {
      const dataKeys = obj.data && typeof obj.data === "object" ? Object.keys(obj.data).join(",") : "";
      console.log(`[JavDB-Startup] 未命中公告字段 | topKeys: ${Object.keys(obj).join(",")} | dataKeys: ${dataKeys}`);
    }
  } catch (e) {
    console.log(`[JavDB-Startup] JSON 解析失败: ${e.message}`);
  }
}

$done({ body });
