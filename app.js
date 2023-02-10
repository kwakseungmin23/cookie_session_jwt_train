const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
  let expire = new Date();
  expire.setMinutes(expire.getMinutes() + 20); // 만료 시간을 20분으로 설정합니다.

  res.cookie("name", "sparta", {
    expire,
  });
  return res.status(200).end();
});

app.get("/get-cookie", (req, res) => {
  //const cookie = req.headers.cookie;
  const cookies = req.cookies; //cookie parser middleware 을 적용했다.
  console.log(cookies); // name=sparta
  return res.status(200).json({ cookies });
});

app.listen(5002, () => {
  console.log(5002, "server listening on");
});
