const express = require("express");
const cookieParser = require("cookie-parser"); //using cookie-parser library.
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const app = express();
// const payloadData = {
//   myPayLoadData: 1234,
// };
// const token = jwt.sign(payloadData, "sparta"); // JWT 만들기.
// const decodedValue = jwt.decode(token); //복호화한 token

// jwt 검증 verify
// const decodedValueByVerify = jwt.verify(token, "mysecretKey");
// console.log("decodedverify:", decodedValueByVerify);
// jwt 검증 에러
// const decodedValueByVerifyError = jwt.verify(token, "mysecretKey wrong");
// console.log("decodedverify:", decodedValueByVerifyError);

app.use(cookieParser()); //cookie parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/set", (req, res) => {
  let expire = new Date();
  expire.setMinutes(expire.getMinutes() + 20); // 만료 시간을 20분으로 설정합니다.

  res.cookie("name", "nodejs", { expire }); // cookie 할당.
  return res.status(200).end();
});

app.get("/get", (req, res) => {
  //const cookie = req.headers.cookie;
  const cookies = req.cookies; //So cookie parser middleware, request can get cookie.
  console.log(cookies); // name=sparta
  return res.status(200).json({ cookies });
});

// 사용자의 정보를 저장할 자물쇠 필요
let session = {}; // key - value
app.get("/set-session", (req, res) => {
  const name = "sparta"; // 세션에 저장 데이터
  const uniqueInt = Date.now(); // 열쇠를 유니크 숫자로 줄 것.
  session[uniqueInt] = name; // 세션 객체에 프로퍼티 데이터 저장.

  res.cookie("sessionKey", uniqueInt);
  res.status(200).end();
});

app.get("/get-session", (req, res) => {
  const { sessionKey } = req.cookies;
  const sessionItem = session[sessionKey]; //session 자물쇠를 sessionkey 로 연다.
  console.log(sessionItem);
  res.status(200).json({ sessionItem });
});

// const payloadData = {
//   myPayLoadData: 1234,
// };
// const token = jwt.sign(payloadData, "sparta"); // JWT 만들기.
// const decodedValue = jwt.decode(token); //복호화한 token

app.post("/set-key", (req, res) => {
  const { key } = req.body;
  const token = jwt.sign({ key }, "sparta");
  res.cookie("toe", token);
  return res.status(200).end();
});

app.get("/get-key", (req, res) => {
  const { token } = req.cookies;
  const { key } = jwt.decode(token);
  return res.status(200).json({ key });
});

app.listen(5001, () => {
  console.log(5001, "server listening on");
});
