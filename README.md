# cookie_session_jwt_train

# cookie, session, jwt training

practicing & understanding how works session, cookie, JWT with node, express

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
