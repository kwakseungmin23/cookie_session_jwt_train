const express = require("express");
const cookieParser = require("cookie-parser"); //using cookie-parser library.
const app = express();

const jwt = require("jsonwebtoken");
const payloadData = {
  myPayLoadData: 1234,
};
const token = jwt.sign(payloadData, "mysecretKey"); // JWT 만들기.
console.log(token);
const decodedValue = jwt.decode(token);
console.log("복호화한 token", decodedValue);
// jwt 검증 verify
// const decodedValueByVerify = jwt.verify(token, "mysecretKey");
// console.log("decodedverify:", decodedValueByVerify);
// jwt 검증 에러
// const decodedValueByVerifyError = jwt.verify(token, "mysecretKey wrong");
// console.log("decodedverify:", decodedValueByVerifyError);

// JWT -> JSON DATA 를 안전하게 교환 사용 가능.
// 여러가지 암호화 알고리즘 사용 가능.
// header , payload => 개발자가 원하는 데이터 저장 , signature => 토큰이 정상인지 확인.
// JWT 비밀 키를 모르더라도 Decode(해독, 복호화) 가능합니다. => 중요 정보 포함 X
// 데이터를 교환하고 관리하는 방식인 쿠키/세션,BUT JWT 는 단순히 데이터 표현하는 형식이다.
// JWT DATA 를 BROWSER 로 보내도 쿠키처럼 자동 저장이 되지는 않습니다.
// 서버에 데이터를 저장하지 않기 때문에 Statelessful Server 을 관리할 수 있습니다.
// stateless=> server의 생사에 관련없이 작동 // stateful => 서버의 생사에 따라 동작 다름.
// 세션 -> stateful , 서버의 끄고 킴에 따라 동작 달라짐.
// header.payload.signature 형태.
// 위변조 여부를 확인 가능. BUT 누구든지 내부 정보를 확인 가능. JWT 는 언제 쓰이나 ?
// 암호화 된 데이터는 다양한 수단(쿠키,로컬스토리지) 등을 통해 저장되어, API 서버에 요청할 때
// 서버 요구 HTTP 인증 양식에 맞게 인증을 시도한다.

app.use(cookieParser()); //cookie parser middleware

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

app.listen(5001, () => {
  console.log(5001, "server listening on");
});
