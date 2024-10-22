---
sidebar_position: 1
---

# 플립플랍 앱 서버 API

플립플랍 앱 서버 API는 백엔드 서버에서 사용자의 요청을 대리해서 처리해 주거나 플립플랍 클라우드 기능을 비즈니스 로직에 따라 서비스를 운영하기 위해 해야 하는 일들이 있을 때 사용하는 API 입니다.

플립플랍 클라우드 `앱` 생성시 발급받은 API key와 secret을 인정정보로 사용해야 하며 API 요청시 HTTP 헤더에 `Authorization` 인증정보를 사용하는데 있어서 Basic 타입을 사용해야 하며 credential은 API key/secret을 ':'를 사이에 두고 합치 문자열을 base64 인코딩을 한 문자열을 사용해야 합니다.

다음 링크를 통해 API 문서와 API 호출을 swagger-ui를 확인해 주세요.

- [API 문서](https://portal.flipflop.cloud/open-api/ko/docs/ffc-app-server)
- [Swagger UI](https://portal.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server)