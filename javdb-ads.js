$done({
  response: {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      success: 1,
      action: null,
      message: null,
      data: { enabled: false, ads: {} }
    })
  }
});
