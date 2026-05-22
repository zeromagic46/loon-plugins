var obj = JSON.parse($response.body);
if (obj.data) {
  obj.data.enabled = false;
  obj.data.ads = {};
}
$done({ body: JSON.stringify(obj) });
