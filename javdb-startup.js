try {
  const url = ($request && $request.url) || "";
  const body = JSON.parse($response.body);
  if (body && body.data) {
    if (/\/api\/v1\/startup/.test(url)) {
      body.data.splash_ad = { enabled: false, overtime: 0, ad: null };
      console.log("[JavDB] 开屏已关闭");
    } else if (/\/api\/v1\/ads/.test(url)) {
      body.data.enabled = false;
      body.data.ads = {};
      console.log("[JavDB] 页内广告已清空");
    }
  }
  $done({ body: JSON.stringify(body) });
} catch (e) {
  console.log("[JavDB] 脚本出错: " + e);
  $done({});
}
