---
sidebar_position: 4
---

# 비콜로 비디오룸 웹앱에서 사용하기

:::info

플립플랍 클라우드를 사용하기 위해서는 사용자로 가입하는 단계가 선행 되어야 합니다. 하지만 현재는 정책상 문의를 통해서 가입 요청만 받고 있습니다. 플립플랍 클라우드를 가입 및 그에 따른 추후 사용 절차는 [사용자 가입 및 사용 절차](./1-sign-up.md)를 참고 바랍니다.

:::

## 개요

플립플랍 클라우드는 화상회의 기능을 제공하며, 이를 여러분의 서비스에 손쉽게 통합하여 사용자들에게 화상회의 기능을 간편하게 제공할 수 있습니다.

이 문서는 iFrame을 사용하여 Vicollo의 화상회의 기능을 여러분의 웹 앱에 통합하는 방법과 통합 과정에서 적용할 수 있는 다양한 설정에 대해 안내합니다.

## 사전 정보

플립플랍 클라우드는 사용 목적에 따라 테스트를 위한 환경과 상업적 사용을 위한 환경이 별도로 운영 되고 있습니다. 각 환경별 정보는 다음과 같습니다.

| Endpoint 유형 | Sandbox 환경 | Production 환경 |
|:---:|:---:|:---:|
| 유저 콘솔 | https://console-sandbox.flipflop.cloud | https://console.flipflop.cloud |
  | API | https://portal-sandbox.flipflop.cloud | https://portal.flipflop.cloud |
| Swagger UI | https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server | https://portal.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server |
| API 문서 | https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server | https://portal.flipflop.cloud/open-api/ko/docs/ffc-app-server |

:::warning

본 문서는 테스트를 위한 설명을 목적을 두고 있기 때문에 모든 정보를 sadnbox 환경 기준으로 작성 되었습니다.

:::

## 선행조건

### 비콜로 언매니지드 앱 생성

플립플랍 클라우드의 모든 기능은 앱이라는 단위 안에서 이루어지며 비콜로의 화상회의 기능을 여러분의 서비스에 가져다 사용하는 것은 `언매니지드` 형태로 동작하는 `비콜로 앱`인 `비콜로 언매니지드 앱`을 통해서만 가능합니다. 이 문서에서는 `비콜로 언매니지드 앱`만 다루기 때문에 이하에서는 `비콜로 앱`으로만 표기 합니다.

:::note

앱의 종류와 차이점에 대해서는 [주요 개념 > 앱 문서의 플립플랍 클라우드 앱 종류 문서](../2-key-concepts/apps.md#플립플랍-클라우드-앱의-종류)를 참고 바랍니다.

:::

가입 문의를 통해 계정을 발급 받는 과정에서 여러분의 서비스에 비콜로를 사용하는 방법에 대한 문의를 하셨다면 계정 정보와 함께 그 계정으로 생성한 `비콜로 앱`에 대한 정보가 같이 제공 됩니다. 현재는 사용자가 `비콜로 앱`을 생성할 수 있는 방법이 제공되지 않아 다른 목적으로 계정 발급을 받아 생성된 `비콜로 앱`이 없다면 별도로 문의를 통해 생성을 요청해야 합니다. 빠른 시일 내에 비콜로를 별다른 절차 없이 사용할 수 있도록 노력하겠습니다.

### 비콜로 앱 서버 API 호출하기

현재 `비콜로 앱`의 관리 및 운영을 하기 위한 GUI 환경의 어드민 페이지는 개발 중에 있습니다. 따라서 현재는 운영을 API로 해야 합니다. GUI 환경의 어드민 페이지는 빠른 시일내에 사용이 가능하도록 개발하도록 노력 하겠습니다.

API 요청에 사용할 Base URL은 https://portal-sandbox.flipflop.cloud 입니다. 요청에 `Authorization` 헤더를 다음과 같이 지정해 줍니다.

```plaintext
Basic {API key/secret을 ':'를 사이에 둔 문자열을 base64 인코딩한 문자열}
```

:::danger

서버 API는 웹/모바일 앱에서 사용하면 API key/secret이 노출되어 오남용의 문제가 발생하여 플립플랍 클라우드의 안정적인 운영 및 사용자의 금전적 피해가 발생할 수 있으니 꼭 서버에서만 사용해야 합니다.

:::

## 개괄

`비콜로`의 화상회의 기능을 사용하기 위한 전체적인 과정은 다음과 같은 단계로 이루어집니다.

1. 멤버 생성/등록
2. 비디오룸 생성
3. 비디오룸 초대 URL 생성

## 웹앱에 비콜로 비디오룸 사용하기

### 1. 멤버 생성/등록

여러분의 서비스 사용자들은 Vicollo 앱에 등록되어야 합니다. 모든 사용자를 사전에 등록할 필요는 없지만, 필요할 때마다 사용자를 등록하는 것은 필수적입니다. 등록 시 가장 중요한 정보는 **`appUserId`**로, 이는 여러분의 서비스에서의 고유 사용자 ID에 해당해야 합니다. Vicollo와 여러분의 서비스 간의 백엔드 통합을 쉽게 하기 위해, 사용자 이름과 같은 사람이 읽을 수 있는 식별자보다는 데이터베이스의 기본 키를 문자열 타입으로 변환한 값을 사용하는 것을 권장합니다. 

또한, Vicollo 내에서 표시될 **화면 이름**(screen name)을 등록할 수도 있습니다. 사용자 등록 API는 사용자 정보의 지속적인 동기화를 지원합니다. 예를 들어, 사용자가 여러분의 서비스에서 화면 이름을 변경하면, **`appUserId`**를 사용해 화면 이름을 업데이트하면 정보가 여러분의 서비스와 Vicollo 앱 간에 동기화됩니다.

멤버 생성/조회/수정 작업을 위한 API는 다음을 참고하십시오.

- 멤버 생성/등록 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/vicollo-app-server#/%EB%B9%84%EC%BD%9C%EB%A1%9C%20%EC%95%B1%20%EB%A9%A4%EB%B2%84/VicolloAppsServerApiMembersController_upsertMember) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/vicollo-app-server#tag/%EB%B9%84%EC%BD%9C%EB%A1%9C-%EC%95%B1-%EB%A9%A4%EB%B2%84/operation/VicolloAppsServerApiMembersController_upsertMember))
- 멤버 목록 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/vicollo-app-server#/%EB%B9%84%EC%BD%9C%EB%A1%9C%20%EC%95%B1%20%EB%A9%A4%EB%B2%84/VicolloAppsServerApiMembersController_getMembers) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/vicollo-app-server#tag/%EB%B9%84%EC%BD%9C%EB%A1%9C-%EC%95%B1-%EB%A9%A4%EB%B2%84/operation/VicolloAppsServerApiMembersController_getMembers))
- 멤버 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/vicollo-app-server#/%EB%B9%84%EC%BD%9C%EB%A1%9C%20%EC%95%B1%20%EB%A9%A4%EB%B2%84/VicolloAppsServerApiMembersController_getMember) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/vicollo-app-server#tag/%EB%B9%84%EC%BD%9C%EB%A1%9C-%EC%95%B1-%EB%A9%A4%EB%B2%84/operation/VicolloAppsServerApiMembersController_getMember))

### 2. 비디오룸 생성

비디오룸(Video-room)은 소유자 또는 생성자를 가지고 있으며, 이는 Vicollo 앱의 멤버입니다. 요청 및 응답에서 소유자 또는 생성자는 Vicollo 앱 멤버 ID(**`appUserId`**)로 지정됩니다. 만약 지정하지 않을 경우, 기본적으로 Vicollo 앱 소유자에 해당하는 멤버가 비디오룸의 소유자가 됩니다.  

선택적으로 지정할 수 있는 필드로는 **제목(title)**, **설명(description)**, 그리고 **예약 시간(scheduled time)**이 있습니다. 이러한 선택적 필드는 조회하거나 정보를 제공하는 데에만 사용되며, 다른 목적은 없습니다.

비디오룸 생성/조회/수정을 위한 API는 다음을 참고하십시오.

- 비디오룸 생성 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/vicollo-app-server#/%EB%B9%84%EC%BD%9C%EB%A1%9C%20%EC%95%B1%EC%9D%98%20%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8%20%EA%B4%80%EB%A0%A8/VicolloAppsServerApiVideoRoomsController_createVideoRoom) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/vicollo-app-server#tag/%EB%B9%84%EC%BD%9C%EB%A1%9C-%EC%95%B1%EC%9D%98-%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8-%EA%B4%80%EB%A0%A8/operation/VicolloAppsServerApiVideoRoomsController_createVideoRoom))
- 비디오룸 목록 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/vicollo-app-server#/%EB%B9%84%EC%BD%9C%EB%A1%9C%20%EC%95%B1%EC%9D%98%20%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8%20%EA%B4%80%EB%A0%A8/VicolloAppsServerApiVideoRoomsController_listVideoRooms) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/vicollo-app-server#tag/%EB%B9%84%EC%BD%9C%EB%A1%9C-%EC%95%B1%EC%9D%98-%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8-%EA%B4%80%EB%A0%A8/operation/VicolloAppsServerApiVideoRoomsController_listVideoRooms))
- 비디오룸 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/vicollo-app-server#/%EB%B9%84%EC%BD%9C%EB%A1%9C%20%EC%95%B1%EC%9D%98%20%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8%20%EA%B4%80%EB%A0%A8/VicolloAppsServerApiVideoRoomsController_getVideoRoom) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/vicollo-app-server#tag/%EB%B9%84%EC%BD%9C%EB%A1%9C-%EC%95%B1%EC%9D%98-%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8-%EA%B4%80%EB%A0%A8/operation/VicolloAppsServerApiVideoRoomsController_getVideoRoom))
- 비디오룸 업데이트 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/vicollo-app-server#/%EB%B9%84%EC%BD%9C%EB%A1%9C%20%EC%95%B1%EC%9D%98%20%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8%20%EA%B4%80%EB%A0%A8/VicolloAppsServerApiVideoRoomsController_updateVideoRoom) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/vicollo-app-server#tag/%EB%B9%84%EC%BD%9C%EB%A1%9C-%EC%95%B1%EC%9D%98-%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8-%EA%B4%80%EB%A0%A8/operation/VicolloAppsServerApiVideoRoomsController_updateVideoRoom))

### 3. 멤버를 위한 비디오룸 URL 생성

생성된 비디오룸의 URL 형식은 다음과 같습니다:

```plaintext
http://{vicollo_base_url}/room/join/{roomCode}
```

이 URL은 로그인한 사용자만 접근할 수 있습니다. 사용자들이 수동으로 로그인 과정을 거치지 않도록 하기 위해, 비디오룸 URL에 쿼리 매개변수로 전달할 키를 생성할 수 있습니다. 이 키는 Vicollo 앱 서버의 "멤버 로그인(Login Member)" API 호출 응답을 Base64로 인코딩하여 얻습니다.

멤버를 위한 인증 정보를 발급하거나, 키 쿼리 매개변수를 포함한 임베드(embed) URL을 바로 생성하기 위한 API는 아래를 참고하십시오.

- 멤버 로그인 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/vicollo-app-server#/%EB%B9%84%EC%BD%9C%EB%A1%9C%20%EC%95%B1%20%EB%A9%A4%EB%B2%84/VicolloAppsServerApiMembersController_loginMember) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/vicollo-app-server#tag/%EB%B9%84%EC%BD%9C%EB%A1%9C-%EC%95%B1-%EB%A9%A4%EB%B2%84/operation/VicolloAppsServerApiMembersController_loginMember))
- 멤버를 위한 비디오룸 URL 생성 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/vicollo-app-server#/%EB%B9%84%EC%BD%9C%EB%A1%9C%20%EC%95%B1%EC%9D%98%20%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8%20%EA%B4%80%EB%A0%A8/VicolloAppsServerApiVideoRoomsController_getVideoRoomEmbedUrl) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/vicollo-app-server#tag/%EB%B9%84%EC%BD%9C%EB%A1%9C-%EC%95%B1%EC%9D%98-%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8-%EA%B4%80%EB%A0%A8/operation/VicolloAppsServerApiVideoRoomsController_getVideoRoomEmbedUrl))

**멤버 임베드 URL 생성** API는 다음 값을 사용하여 URL을 생성합니다:

- **appId**: 앱의 ID  
- **roomUUID**: 비디오룸의 고유 코드(UUID)  
- **userAuthKey**: 멤버 로그인 API 응답을 Base64로 인코딩한 문자열  

생성된 URL의 형식은 다음과 같습니다:

```plaintext
https://sandbox.vicollo.live/vicollo-apps/${appID}/rooms/join/${roomUUID}?key=${userAuthKey}
```

#### 추가 쿼리 매개변수

URL에 아래와 같은 선택적 쿼리 매개변수를 추가하여 동작을 사용자 정의할 수 있습니다:

| **매개변수**       | **가능한 값**                         | **설명**                                                                                       |
|--------------------|---------------------------------------|----------------------------------------------------------------------------------------------|
| **isObserver**     | `true` \| `false`                    | 관찰자 모드 활성화.                                                                            |
| **drawLayoutType** | `fixed-grid` \| `scroll`             | 주요 화면(예: 화이트보드)과 보조 화면(사용자 카메라)의 레이아웃을 지정.                         |
| **drawLayoutPosition** | `top` \| `bottom` \| `left` \| `right` | 주요 화면에 대한 보조 화면의 위치를 지정.                                                      |
| **displayName**    | URL 친화적인 문자열                  | 비디오룸에서 표시될 사용자 이름을 설정.                                                       |

각 매개변수는 URL 쿼리 문자열로 추가되며, `&`로 구분하고 `=`로 값을 할당합니다.

**예시 URL (추가 매개변수 포함):**

```plaintext
https://sandbox.vicollo.live/vicollo-apps/app123/rooms/join/roomUUID123?key=authKey123&isObserver=true&drawLayoutType=scroll&drawLayoutPosition=bottom&displayName=JohnDoe
```

#### 관찰자 모드

**관찰자 모드**(`isObserver=true`)를 활성화하면 참가자의 상호작용이 다음과 같이 제한됩니다:

- 사용자 입장/퇴장에 대한 알림 및 채팅 메시지가 표시되지 않습니다.
- 멤버 탭과 참가자 수에 포함되지 않습니다.
- 카메라 뷰가 비활성화됩니다.
- 오디오는 기본적으로 꺼져 있지만 수동으로 다시 활성화할 수 있습니다.
- 기타 모든 기능은 일반 사용자와 동일한 권한으로 이용 가능합니다.

#### 레이아웃 설정

**레이아웃 매개변수**는 주요 화면(예: 화이트보드)과 보조 화면(예: 사용자 카메라)의 배치를 정의합니다:

- **`drawLayoutType`**: 보조 화면의 배치 방식 지정:
  - `fixed-grid`: 보조 화면을 격자 형태(현재는 2x2)로 표시.
  - `scroll`: 보조 화면을 스크롤 가능한 목록으로 표시.
- **`drawLayoutPosition`**: 주요 화면에 대한 보조 화면의 위치 지정:
  - `top`, `bottom`, `left`, 또는 `right`.

주요 화면이 비활성화된 경우(예: 화이트보드 비활성화 시), 기본 레이아웃은 격자형 레이아웃으로 돌아갑니다.

:::warning

레이아웃 시스템은 아직 개발 중이며, 다양한 사용 사례를 더 직관적이고 일반적으로 처리할 수 있도록 변경될 수 있습니다. 그러나 위 설정은 현재 시스템에서 제공하는 기능을 반영한 것입니다.

:::

#### 용어 정리 및 개념

- **스크린(Screen):**  
  간단히 말해, `스크린`은 사용자의 송출된 비디오 스트림, 화면 공유, 그리고 비디오룸 화이트보드를 포함한 화면을 의미합니다.

- **레이아웃(Layouts):**
  - **그리드 레이아웃(Grid Layout):**
    스크린이 격자 형태로 표시되며, 꽉 차지 않은 행(row)은 중앙 정렬됩니다.
  - **고정 그리드 레이아웃(Fixed-Grid Layout):**
    스크린이 격자 형태로 표시되며, 행이 채워질 때 왼쪽부터 순차적으로 위치가 채워집니다.
  - **스크롤 레이아웃(Scroll Layout):**
    스크린이 행(row) 또는 열(column) 형태로 표시되며, 화면이 가시 영역을 초과할 경우 스크롤이 가능해집니다.
  - **포커스 레이아웃(Focused Layout):**
    특정 메인 스크린이 다른 스크린보다 더 크게 표시되는 레이아웃입니다. 포커스 레이아웃이 아닌 다른 레이아웃을 사용할 경우 모든 스크린은 동일한 크기로 표시됩니다. 포커스 레이아웃은 다음 두 속성에 의해 정의됩니다:
    - **layoutType:** 메인 스크린 외의 스크린에 적용할 레이아웃 유형으로, `fixed-grid`(현재는 2x2로 고정) 또는 `scroll`을 선택할 수 있습니다.
    - **layoutPosition:** 메인 스크린을 기준으로 다른 스크린이 배치되는 위치로, `top`, `bottom`, `left`, `right` 중 하나를 선택할 수 있습니다.

- **모드(Modes):**
  - **수동(Manual):**
    사용자가 비디오룸의 레이아웃을 완전히 조정할 수 있는 권한을 가집니다.
  - **자동(Automatic):**
    다른 사용자의 행동이 사용자 화면에 영향을 미칩니다. 예를 들어, 누군가 화이트보드를 사용하거나 비디오 화면을 공유하기 시작하면, `자동` 모드에 있는 다른 모든 사용자의 화면이 포커스 레이아웃으로 전환됩니다.

#### 레이아웃 변경 예시

- **초기 상태:** 자동 모드 + 그리드 레이아웃  
- **사용자 또는 다른 참가자가 화이트보드나 화면 공유를 활성화할 경우:** 자동 모드 + 포커스 레이아웃(포커스 레이아웃의 유형과 위치는 임베드 URL에서 지정됨)
  - **사용자가 그리드/포커스 레이아웃 토글 버튼을 사용하여 레이아웃을 변경할 경우:** 수동 모드 + 선택한 레이아웃
  - **결정 이유:** 사용자가 레이아웃을 변경하는 행동을 할 때, 이는 사용자가 레이아웃에 대한 제어를 원한다고 간주하기 때문입니다.
- 현재 사용자가 임의로 자동 모드로 돌아갈 수 있는 방법은 제공되지 않습니다.
- **모든 사용자가 화이트보드 또는 화면 공유를 비활성화할 경우:** 모든 사용자는 현재의 레이아웃을 유지한 채 자동 모드로 돌아갑니다.

### 4. URL iFrame에서 띄우기

웹페이지 내에서 비디오룸을 iFrame으로 표시하려면, iFrame의 **`src`** 속성을 [3단계](#3-멤버를-위한-비디오룸-url-생성)에서 얻은 비디오룸 URL로 설정하면 됩니다.

## 웹훅으로 이벤트 받기

### 비콜로 앱 이벤트 웹훅

비콜로 앱에서 발생하는 이벤트는 앱에 **콜백 API(웹훅)**를 등록하여 수신할 수 있습니다. 이러한 이벤트는 앱을 관리하고 운영하는 데 유용한 정보를 제공합니다.

콜백 API를 등록하려면 다음 API 문서를 참고하세요:
[**비콜로 앱에 콜백 API 등록**](https://portal-sandbox.flipflop.cloud/vicollo-apps-server-api-docs#tag/Vicollo-App-Information-and-Settings/operation/VicolloAppsServerApiController_setCallbackApi)

### 이벤트 데이터 구조

이벤트 정보는 **POST 요청**의 JSON 페이로드 형식으로 등록된 콜백 API 엔드포인트로 전송됩니다.  
JSON 페이로드의 구조는 다음과 같습니다:

```json
{
  "id": "string",                  // 이벤트 ID
  "type": "string",                // 이벤트 타입
  "app": {                         // 이벤트가 발생한 앱의 정보
    "id": "number",                // 앱 ID
    "state": "string",             // 앱 상태
    "name": "string",              // 앱 이름
    "defaultRtmpOutputMode": "string"  // 비콜로와 관련 없음
  },
  "data": "object",                // 이벤트의 추가 정보
  "createdAt": "string"            // ISO 문자열 형식의 이벤트 발생 날짜 및 시간
}
```

### 이벤트 타입

아래는 비콜로 앱을 관리 및 운영하는 데 유용한 주요 이벤트 타입과 `data` 필드의 예시입니다.

#### 1. **`VIDEO_ROOM_PARTICIPANT_JOINED`**

참가자가 비디오룸에 입장했을 때 발생합니다.
**페이로드 예시:**

```json
{
  "videoRoom": {
    "id": "number",
    "state": "string",
    "videoRoomState": "string",
    "type": "VIDEO_CONFERENCE",
    "title": "string | null",
    "channelId": "number",
    "sessionNo": "number"
  },
  "appUser": {
    "appUserId": "string",
    "appUserName": "string | null",
    "channelMemberType": "string",
    "customData": "object | null"
  },
  "joinedAt": "string"  // ISO 문자열 형식의 입장 시간
}
```

#### 2. **`VIDEO_ROOM_PARTICIPANT_LEFT`**

참가자가 비디오룸에서 퇴장했을 때 발생합니다.
**페이로드 예시:**

```json
{
  "videoRoom": {
    "id": "number",
    "state": "string",
    "videoRoomState": "string",
    "type": "VIDEO_CONFERENCE",
    "title": "string | null",
    "channelId": "number",
    "sessionNo": "number"
  },
  "appUser": {
    "appUserId": "string",
    "appUserName": "string | null",
    "channelMemberType": "string",
    "customData": "object | null"
  },
  "leftAt": "string"  // ISO 문자열 형식의 퇴장 시간
}
```

#### 3. **`VIDEO_ROOM_EGRESS_ENDED`**

비디오룸의 출력 스트림(egress)이 종료되었을 때 발생합니다.
**페이로드 예시:**

```json
{
  "videoRoom": {
    "id": "number",
    "state": "string",
    "videoRoomState": "string",
    "type": "VIDEO_CONFERENCE",
    "title": "string | null",
    "channelId": "number",
    "sessionNo": "number"
  }
}
```

#### 4. **`MEMBER_CREATED`**

새로운 멤버가 생성되었을 때 발생합니다.
**페이로드 형식:** 추후 확정(TBD).

#### 5. **`MEMBER_UPDATED`**

멤버의 정보가 업데이트되었을 때 발생합니다.
**페이로드 형식:** 추후 확정(TBD).

#### 6. **`VIDEO_ROOM_SCHEDULED`**

비디오룸이 예약되었을 때 발생합니다.
**페이로드 형식:** 추후 확정(TBD).

:::note

- 페이로드 내 모든 시간 정보는 **ISO 문자열 형식**입니다.
- 이러한 이벤트를 활용하여 앱의 상태를 동기화하고, 사용자 활동을 모니터링하며, 비디오룸의 라이프사이클 이벤트를 효과적으로 관리할 수 있습니다.

:::

## 테스트 해보기

iFrame 임베딩 테스트 페이지가 제공되어 편리하게 사용할 수 있습니다. 테스트 페이지의 URL은 다음과 같습니다:
https://static.jocoos.com/vicollo/samples/sandbox.html

테스트 페이지를 사용하려면 다음 6가지 값을 입력해야 합니다:

1. **App Id:** 앱의 ID
2. **Room code:** 비디오룸의 UUID
3. **isObserver:** 사용자가 관찰자로 입장할지 여부 (`true` 또는 `false`)
4. **drawLayoutType:** `fixed-grid` 또는 `scroll` 중 하나
5. **drawLayoutPosition:** `top`, `bottom`, `left`, `right` 중 하나
6. **key:** 앱 사용자의 액세스 토큰(로그인 결과 값)

입력란에 적절한 값을 채운 뒤, **`Load iFrame by key`** 버튼을 누르면 해당 사용자를 위한 비콜로 비디오룸이 iFrame 안에서 로드됩니다.

입력란의 값은 쿼리 매개변수(query params)를 통해 전달할 수도 있습니다. 예를 들어, 다음 URL은 `123`, `abc`, `123abc`를 각각 **App Id**, **Room Code**, **Key**로 사용합니다:

```plaintext
https://static.jocoos.com/vicollo/samples/sandbox.html?appId={appId}&roomCode={videoRoomUUID}&key={userAccessToken}
```
