const url = $request.url;
let body = $response.body;

if (body) {
  try {
    let obj = JSON.parse(body);
    let modified = false;

    const disableAd = (target) => {
      if (target && typeof target === "object") {
        target.enabled = false;
        target.overtime = 0;
        if ("ad" in target) target.ad = null;
        return true;
      }
      return false;
    };

    if (obj.data && disableAd(obj.data.start_ad)) modified = true;
    if (disableAd(obj.start_ad)) modified = true;
    if (obj.data && disableAd(obj.data.splash_ad)) modified = true;
    if (disableAd(obj.splash_ad)) modified = true;

    if (modified) {
      console.log(`[JavDB-Startup] 已禁用开屏配置: ${url}`);
      body = JSON.stringify(obj);
    }
  } catch (e) {
    console.log(`[JavDB-Startup] JSON 解析失败: ${e.message}`);
  }
}

$done({ body });
