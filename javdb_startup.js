var obj = JSON.parse($response.body);
if (obj.data && obj.data.splash_ad) {
  obj.data.splash_ad.enabled = false;
  obj.data.splash_ad.ad = null;
}
$done({ body: JSON.stringify(obj) });
