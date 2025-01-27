---
sidebar_position: 3
---

# 핵심 개념

## 서버 연결

기본적으로 FlipFlop Lite는 두 가지 서버를 제공합니다: 서비스 개발 중에 사용하는 개발 서버와 실제 서비스를 제공할 때 사용하는 운영 서버입니다.

SDK 초기화 시 아래와 같이 서버를 지정할 수 있습니다.

```swift
// flipflop 개발 서버에 연결
let config = FFLConfig(serverConfig: .dev)
FlipFlopLite.initialize(config: config)
```

FlipFlop Lite는 요청 시 전용 서버도 제공합니다. 전용 서버의 장점은 서비스에 맞게 서버를 별도로 구축하여 요구 사항에 맞게 맞춤 설정할 수 있다는 것입니다. 이 경우 아래와 같이 서버 주소를 직접 입력하여 SDK를 초기화합니다.

```swift
// 전용 서버에 연결
let config = FFLConfig(serverAddr: "SERVER_ADDRESS") // SERVER_ADDRESS를 실제 서버 주소로 교체하세요
FlipFlopLite.initialize(config: config)
```

## 인증

FlipFlop SDK가 서버에 성공적으로 연결되기 위해서는 액세스 토큰이 필요합니다.

액세스 토큰은 SDK에서 직접 제공되지 않으므로 [멤버 로그인 API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login)를 통해 별도로 획득해야 합니다.

> 액세스 토큰 받기: 애플리케이션 서버를 통해 FlipFlop Lite에서 액세스 토큰을 받아 클라이언트에 전달하는 것이 권장됩니다. 클라이언트에서 직접 멤버 로그인 API를 사용하여 액세스 토큰을 받는 것은 권장하지 않습니다.

액세스 토큰을 얻기 위해 필요한 항목은 다음과 같습니다.

* AppKey, AppSecret: 사용자 콘솔에서 애플리케이션을 생성할 때 생성됩니다.
* appUserId, appUserName, appUserProfileImgUrl
  * 'appUserId'는 필수 항목이며, 'appUserName'과 'appUserProfileImgUrl'은 선택 사항입니다.

> 생성 중인 서비스와 동일한 사용자 정보를 사용하는 것이 좋습니다.

액세스 토큰을 받는 흐름

1. 사용자 콘솔에서 회원 가입
2. 애플리케이션 생성
3. 애플리케이션 생성 시 생성된 'AppKey'와 'AppSecret' 저장
4. 'AppKey'와 'AppSecret'을 사용하여 멤버 로그인 API로 액세스 토큰 받기
5. 액세스 토큰을 클라이언트에 전달
