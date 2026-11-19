const raw = $response.body || "";
console.log("[JavDB] startup 命中，响应长度=" + raw.length + "，开头=" + raw.slice(0, 80));
try {
  const body = JSON.parse(raw);
  if (body && body.data) {
    body.data.splash_ad = { enabled: false, overtime: 0, ad: null };
    console.log("[JavDB] 开屏已关闭");
    $done({ body: JSON.stringify(body) });
  } else {
    console.log("[JavDB] 返回里没有 data 字段");
    $done({});
  }
} catch (e) {
  console.log("[JavDB] 解析出错: " + e);
  $done({});
}
