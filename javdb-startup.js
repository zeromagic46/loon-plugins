try {
  const body = JSON.parse($response.body);
  if (body && body.data) {
    body.data.splash_ad = { enabled: false, overtime: 0, ad: null };
    console.log("JavDB 开屏已关闭");
  }
  $done({ body: JSON.stringify(body) });
} catch (e) {
  console.log("JavDB 开屏脚本出错: " + e);
  $done({});
}
