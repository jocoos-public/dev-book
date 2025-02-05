---
sidebar_position: 2
---

# 비디오 트랜스코딩

:::info

플립플랍 클라우드를 사용하기 위해서는 사용자로 가입하는 단계가 선행 되어야 합니다. 하지만 현재는 정책상 문의를 통해서 가입 요청만 받고 있습니다. 플립플랍 클라우드를 가입 및 그에 따른 추후 사용 절차는 [사용자 가입 및 사용 절차](./1-sign-up.md)를 참고 바랍니다.

:::

## 개요

플립플랍 클라우드에서 비디오를 트랜스코딩을 통해 압축하여 저장할 수 있습니다. 더 나아가 비디오를 업로드하여 트랜스코딩된 결과물을 저장하는 방식을 게시물 형태로 관리하여 만약 여러분의 서비스에서 동영상 게시물을 컨텐츠로 제공하는 기능이 있다면 플립플랍 클라우드를 통해 트랜스코딩한 비디오들을 게시물 형태로 조회하는 기능을 연동해서 사용할 수 있습니다. 만약 비디오 트랜스코딩 결과물만 필요하다면 게시물 형태로 저장되는 비디오를 일정한 규칙에 따라 저장한 다음에 필요한 상황에 맞게 조회해서 비디오의 정보를 사용할 수 있습니다.

이 문서는 플립플랍 클라우드에서 비디오 트랜스코딩을 하는 방법 및 연동하는 방법과 절차에 대해서 안내합니다.

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

### 플립플랍 앱 생성

플립플랍 클라우드의 모든 기능은 앱이라는 단위 안에서 이루어지며 비디오 트랜스코딩 및 저장 기능은 현재 `플립플랍 앱`에서만 지원 됩니다. `비콜로 앱`에서는 현재 지원 되지 않지만 빠른 시일 내에 지원이 될 계획입니다.

:::note

앱의 종류와 차이점에 대해서는 [주요 개념 > 앱 문서의 플립플랍 클라우드 앱 종류 문서](../2-key-concepts/apps.md#플립플랍-클라우드-앱의-종류)를 참고 바랍니다.

:::

가입 문의를 통해 계정을 발급 받는 과정에서 라이브 방송 기능 사용에 대한 문의를 하셨다면 계정 정보와 함께 그 계정으로 생성한 `플립플랍 앱`에 대한 정보도 같이 제공될 수 있습니다. [유저 콘솔](https://console-sandbox.filpflop.cloud)에 접속해서 로그인한 후에 보이는 나의 앱 목록에서 이미 생성된 앱에 대한 정보를 확인할 수 있습니다. 앱 이름이 `vicollo_`로 시작하는 경우 `비콜로 앱`이며, 아닌 경우에는 `플립플랍 앱` 입니다. 이미 생성 되어 있는 `플립플랍 앱`이 존재하고 그 앱의 API key/secret 정보를 알고 있으면 다음 단계로 진행해도 됩니다. 이미 생성 되어 있는 `플립플랍 앱`이 존재 하지만 API key/secret에 대한 정보를 분실 했거나 알지 못한다면 [support@jocoos.com](mailto:supoort@jocoos.com)으로 문의해 주시기 바랍니다. 만약 생성 되어 있는 `플립플랍 앱`이 없는 경우에는 앱을 생성해야 합니다.

앱 생성은 [유저 콘솔](https://console-sandbox.filpflop.cloud)의 앱 목록 화면 우측 상단에 있는 `Create` 버튼을 눌러서 생성할 수 있습니다. 현재 [유저 콘솔](https://console-sandbox.filpflop.cloud)에서 생성되는 모든 앱은 `플립플랍 앱`이므로 팝업창에서 요구하는 정보만 입력한 후에 `Create App` 버튼을 누르면 됩니다.

앱이 생성되면 `App creation complete` 팝업창에 API key/secret 정보가 나타나게 됩니다. 이 정보는 `플립플랍 앱` server API를 호출할 때 필요한 정보이며 API secret은 팝업 창을 닫으면 다시 확인할 수 없으니 노출되지 않도록 기록하여 보관해야 합니다. API key/secret 정보를 잘 기록한 후에 `Complete` 버튼을 눌러 팝업 창을 닫을 수 있습니다.

## 개괄

사전 작업인 사용자 가입과 `플립플랍 앱` 생성이 완료 되었다면 이제 라이브 방송을 진행하기 위한 직접적인 작업을 할 수 있습니다. 전체적인 과정은 다음과 같은 단계로 이루어 집니다.

1. 멤버 생성/등록
2. 비디오 포스트 생성
3. 비디오 포스트 상세 설정 (트랜스코딩 사양등)
4. 원본 비디오 파일 업로드 및 트랜스코딩 진행상황/결과 확인

이후는 위의 단계들을 기준으로 각 단계에 대한 구체적인 설명 및 세부적인 방송 설정이나 기능에 대한 설명입니다. 두 단원으로 나눠서 먼저 [유저 콘솔](https://console-sandbox.filpflop.cloud)을 통해서 비디오 트랜스코딩을 진행하는 방법을 설명한 후에 `플립플랍 앱 서버 API`를 사용하여 다른 서비스에 `플립플랍 앱`의 비디오 트랜스코딩 기능을 어떻게 연동시켜 사용할 수 있는지 안내 되어 있습니다.

## 유저 콘솔로 비디오 트랜스코딩 해보기

먼저 웹브라우저를 통해 [유저 콘솔](https://console-sandbox.filpflop.cloud)에 접속하신 후에 발급 받은 계정 정보로 로그인을 합니다.

### 1. 멤버 생성/등록

:::info

플립플랍 클라우드는 다른 서비스에서 비디오 관련 기능을 플립플랍 클라우드로 부터 쉽게 가져다 사용이 가능하도록 하는데에 초점이 맞춰져 있고 그것을 가능하게 하기 위해 `앱`과 `멤버`라는 개념이 존재 합니다. 문서를 더 읽기에 앞서 주요 개념 상세의 [앱](../2-key-concepts/apps.md)과 [멤버](../2-key-concepts/members.md)을 참고 바랍니다.

:::

`플립플랍 앱` 내에서 모든 기능은 `멤버` 기준으로 동작하게 됩니다. 따라서 라이브 방송 역시 `멤버`에 의해 이루어져야 하고, `플립플랍 앱`에 멤버를 생성해 줘야 합니다. 멤버는 [유저 콘솔](https://console-sandbox.filpflop.cloud)에서 앱을 선택한 후에 `App Users` 화면에서 우측 상단에 있는 `Create` 버튼을 누른 후 나타나는 팝업창에서 `멤버`에 대한 정보를 입력하여 생성할 수 있습니다. `멤버`를 생성하는데 가장 필수적인 속성은 `appUserId`이며 이것은 `멤버`를 구분하기 위한 식별자 입니다. `멤버`의 `appUserId`는 특정한 규칙에 따라 고유하도록 부여해야 합니다. 만약 다른 서비스에 `플립플랍 앱`을 연동하여 사용자에게 라이브 방송 기능을 제공하고자 한다면 다른 서비스의 사용자에 대한 고유 식별자를 `appUserId`로 사용할 것을 권장 드립니다.

### 2. 비디오 포스트 생성

비디오 트랜스코딩을 하기 위해서는 트랜스코딩 작업과 결과물의 저장 단위인 `비디오 포스트`를 먼저 생성해야 합니다. [유저 콘솔](https://console-sandbox.filpflop.cloud)에서 `앱`을 선택한 후에 `VideoPosts` 화면으로 이동하면 생성된 `비디오 포스트` 목록을 조회할 수 있습니다. 그리고 우측 상단에 있는 `Create` 버튼을 누른 후 나타나는 팝업 창에서 `비디오 포스트`에 대한 정보를 입력하여 생성할 수 있습니다.

![비디오 포스트 생성](/img/quickstart-transcoding/create_video_post.png)

입력할 수 있는 정보에 대한 설명은 다음과 같습니다.

- AppUserId (필수): `비디오 포스트`를 작성한 `멤버`의 `appUserId`로 `비디오 포스트`가 생성되면 `appUserId`를 가진 `멤버`가 생성한 `비디오 포스트`가 됨
- Title (선택): `비디오 포스트`의 제목
- Description (선택): `비디오 포스트`에 대한 설명
- Access Level (필수): `비디오 포스트`에 대한 다른 `멤버`와 그 외의 사람들의 접근 범위에 대한 값으로 현재는 원본 파일 또는 트랜스코딩된 파일에 대한 URL만 있으면 누구나 시청이 가능한 `Public`만 선택 가능

### 3. 비디오 포스트 상세 설정 (트랜스코딩 사양등)

생성 후에 목록에 보이는 생성된 `비디오 포스트`를 선택하면 다음과 같이 상세 정보가 표시된 화면으로 이동 합니다.

![비디오 포스트 상세 화면](/img/quickstart-transcoding/video_post_detail.png)

이 화면에서 `트랜스코딩 프로파일`과 같은 세부 설정 및 트랜스코딩하여 저장 하고자 하는 원본 비디오 파일을 업로드할 수 있습니다. `Update Profiles` 버튼을 누르면 다음과 같은 화면에서 `트랜스코딩 프로파일`들에 대한 설정을 할 수 있습니다.

![비디오 포스트 트랜스코딩 프로파일 설정 화면](/img/quickstart-transcoding/video_post_transcoding_profiles.png)

`비디오 포스트`에 명시할 수 있는 `트랜스코딩 프로파일`의 종류는 다음의 세가지 입니다.

- `비디오 트랜스코딩 프로파일`: `비디오 포스트`에 업로드 되는 원본 비디오 파일을 어떻게 트랜스코딩할 것인지에 대한 프로파일
  - 명시하지 않으면 `플립플랍 클라우드`에서 지정된 기본 `트랜스코딩 프로파일`을 사용
- `썹네일 트랜스코딩 프로파일`: 원본 비디오 파일을 트랜스코딩하는 과정에서 썸네일을 추출하는 방식에 대한 프로파일
  - 명시하지 않으면 thumbnail을 추출하지 않음
- `프리뷰 트랜스코딩 프로파일`: 원본 비디오 파일을 트랜스코딩하는 과정에서 프리뷰(애니메이션 GIF나 WEBP)를 추출하는 방식에 대한 프로파일
  - 명시하지 않으면 프리뷰를 추출하지 않음

:::info

`플립플랍 클라우드`에서 현재 설정할 수 있는 트랜스코딩 프로파일들은 일반적인 목적에 따라 몇가지의 종류만 존재 하지만 필요에 따라 원하는 트랜스코딩 프로파일을 요청하면 특정 `앱`에서만 사용 가능한 `트랜스코딩 프로파일`을 생성해 드립니다.

:::

### 4. 원본 비디오 파일 업로드 및 트랜스코딩 진행상황/결과 확인

트랜스코딩할 원본 비디오 파일을 업로드할 수 있는 방법은 두가지 입니다. 파일을 `Drop a file to upload, or click to select it.` 영역을 클릭해서 선택하거나 드래그앤 드롭하여 업로드할 파일을 지정할 수 있습니다. 파일이 지정 되면 바로 업로드가 시작 되며, 업로드가 완료 되면 바로 트랜스코딩 작업이 대기열에 추가되고 작업 순서가 되면 트랜스코딩이 진행 됩니다.

트랜스코딩 과정을 `State` 부분에서 확인할 수 있습니다.

![비디오 포스트 트랜스코딩 진행 상황 보기](/img/quickstart-transcoding/transcoding.png)

트랜스코딩이 완료 되면 다음 화면과 같이 `Files` 부분에서 트랜스코딩 작업의 결과물들을 확인하실 수 있습니다.

![비디오 포스트 트랜스코딩 결과 확인](/img/quickstart-transcoding/transcoded.png)

## 플립플랍 앱 서버 API 사용하기

### 사용 용도

[유저 콘솔](https://console-sandbox.filpflop.cloud)을 통해 `플립플랍 클라우드`를 사용한 모습과 API를 사용한 모습의 차이는 다음과 같습니다.

![유저콘솔과 API 차이](/img/user-console-vs-api.jpg)

하지만 `플립플랍 앱`을 통해 RTMP 방송 기능을 제공하려고 하는 모든 사람들에게 [유저 콘솔](https://console-sandbox.filpflop.cloud)에 대한 접근 권한을 줄 수 없습니다. 따라서 플립플랍 클라우드에서는 API를 제공하여 다음과 같이 사용이 가능하도록 하고 있습니다.

![API로 서비스 연동](/img/ffc-Integration-with-api.jpg)

### 사용 방법

API 요청에 사용할 Base URL은 https://api-sandbox.flipflop.cloud 입니다. 요청에 `Authorization` 헤더를 다음과 같이 지정해 줍니다.

```plaintext
Basic {API key/secret을 ':'를 사이에 둔 문자열을 base64 인코딩한 문자열}
```

:::danger

서버 API는 웹/모바일 앱에서 사용하면 API key/secret이 노출되어 오남용의 문제가 발생하여 플립플랍 클라우드의 안정적인 운영 및 사용자의 금전적 피해가 발생할 수 있으니 꼭 서버에서만 사용해야 합니다.

:::

### API 유형에 따른 API 분류와 관련 문서 링크

#### 멤버 관련 API

`플립플랍 앱`의 `멤버` 등록/생성, 그리고 정보 변경과 같은 작업을 할 수 있는 API 입니다.

- 멤버 등록 및 정보 변경 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%A9%A4%EB%B2%84%20%EA%B4%80%EB%A0%A8/AppsServerApiMembersController_upsertMember) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%A9%A4%EB%B2%84-%EA%B4%80%EB%A0%A8/operation/AppsServerApiMembersController_upsertMember))
- 멤버 목록 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%A9%A4%EB%B2%84%20%EA%B4%80%EB%A0%A8/AppsServerApiMembersController_listMembers) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%A9%A4%EB%B2%84-%EA%B4%80%EB%A0%A8/operation/AppsServerApiMembersController_listMembers))
- 멤버 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%A9%A4%EB%B2%84%20%EA%B4%80%EB%A0%A8/AppsServerApiMembersController_getMember) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%A9%A4%EB%B2%84-%EA%B4%80%EB%A0%A8/operation/AppsServerApiMembersController_getMember))
- 멤버 삭제 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%A9%A4%EB%B2%84%20%EA%B4%80%EB%A0%A8/AppsServerApiMembersController_deleteMember) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%A9%A4%EB%B2%84-%EA%B4%80%EB%A0%A8/operation/AppsServerApiMembersController_deleteMember))

#### 비디오 포스트 관련 API

- `비디오 포스트` 생성 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_createVideoPost) | [API Document](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_createVideoPost))
- `비디오 포스트` 목록 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_listVideoPosts) | [API Document](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_listVideoPosts))
- `비디오 포스트` 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_getVideoPost) | [API Document](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_getVideoPost))
- `비디오 포스트` 업데이트 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_updateVideoPost) | [API Document](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_updateVideoPost))
- `비디오 포스트` 삭제 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_deleteVideoPost) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_deleteVideoPost))

#### 트랜스코딩 프로파일 관련 API

`비디오 포스트`를 API를 생성/갱신할 때 `트랜스코딩 프로파일`을 지정하실 때 지정 가능한 `트랜스코딩 프로파일`의 종류를 알아보기 위한 API

- `트랜스코딩 프로파일` 목록 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%ED%8A%B8%EB%9E%9C%EC%8A%A4%EC%BD%94%EB%94%A9%20%ED%94%84%EB%A1%9C%ED%8C%8C%EC%9D%BC%20%EA%B4%80%EB%A0%A8/AppsServerApiTranscodingProfilesController_listTranscodingProfiles) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%ED%8A%B8%EB%9E%9C%EC%8A%A4%EC%BD%94%EB%94%A9-%ED%94%84%EB%A1%9C%ED%8C%8C%EC%9D%BC-%EA%B4%80%EB%A0%A8/operation/AppsServerApiTranscodingProfilesController_listTranscodingProfiles))
- `트랜스코딩 프로파일` 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%ED%8A%B8%EB%9E%9C%EC%8A%A4%EC%BD%94%EB%94%A9%20%ED%94%84%EB%A1%9C%ED%8C%8C%EC%9D%BC%20%EA%B4%80%EB%A0%A8/AppsServerApiTranscodingProfilesController_getTranscodingProfile) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%ED%8A%B8%EB%9E%9C%EC%8A%A4%EC%BD%94%EB%94%A9-%ED%94%84%EB%A1%9C%ED%8C%8C%EC%9D%BC-%EA%B4%80%EB%A0%A8/operation/AppsServerApiTranscodingProfilesController_getTranscodingProfile))
  
목록을 조회한 후에 `비디오 포스트`의 videoProfileId, thumbnailProfileId, previewProfileId 값을 원하는 `트랜스코딩 프로파일`을 type에 맞춰 id 값을 지정해 사용 합니다.

#### 파일 업로드 관련 API

`비디오 포스트`에는 다음의 3가지 종류의 파일에 대한 업로드가 가능합니다.

- 원본 파일: 트랜스코딩을 하여 저장할 원본 비디오 파일
- 썸네일 파일: 비디오의 썸네일을 `트랜스코딩 프로파일`로 추출하지 않고 직접 파일 업로드를 통해 지정하고 싶은 경우
- 프리뷰 파일: 비디오의 프리뷰를 `트랜스코딩 프로파일`로 추출하지 않고 직접 파일 업로드를 통해 지정하고 싶은 경우

모든 파일 업로드는 공통적으로 업로드 URL을 요청하는 API를 호출하여 응답받은 URL에 파일을 업로드한 후에 업로드가 완료 되었음을 알리는 API를 호출하는 과정으로 진행 됩니다. 다만 원본 파일의 경우 용량이 다른 두 경우 보다 클 것을 고려해 분할 업로드를 지원하고 있습니다. 따라서 원본 비디오 파일 업로드시에는 업로드 URL 요청할 때 몇개로 분할하여 업로드할 것인지 지정할 수 있습니다. 업로드 URL에 파일을 업로드할 때에는 URL에 `PUT` 메소드를 사용하여 업로드를 요청하며, 분할 업로드를 하게 되는 경우에는 업로드 요청에 대한 응답에 있는 `eTag` 값들에 대한 배열을 업로드 완료 API 요청시 본문으로 사용해야 합니다.

파일을 비슷한 크기로 n개로 분할할 때 각 파일 조각의 start, end byte 계산하는 방식은 다음과 계산 합니다.

```javascript
partSize = Math.ceil(fileSize / n);
start = partSize * (partNumber - 1); // part number는 1 부터 시작
end = Math.min(start + partSize - 1, fileSize - 1); // inclusive
```

- 원본 비디오 파일
  - URL 요청 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_requestVideoPostUploadUrls) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_requestVideoPostUploadUrls))
  - 업로드 완료 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_completeVideoPostUploads) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_completeVideoPostUploads))
- 썸네일 파일
  - URL 요청 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_requestVideoPostThumbnailUploadUrl) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_requestVideoPostThumbnailUploadUrl))
  - 업로드 완료 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_completeVideoPostThumbnailUpload) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_completeVideoPostThumbnailUpload))
- 프리뷰 파일
  - URL 요청 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_requestVideoPostPreviewUploadUrl) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_requestVideoPostPreviewUploadUrl))
  - 업로드 완료 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_completeVideoPostPreviewUpload) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_completeVideoPostPreviewUpload))

#### 웹훅 등록

`플립플랍 클라우드`를 사용하여 `비디오 포스트`의 state 변화에 대해서 실시간으로 알고 싶은 경우에는 웹훅을 등록하여 알 수 있습니다.

[유저 콘솔](https://console-sandbox.filpflop.cloud)에서 `앱`이 선택된 상태에서 화면 좌측에 있는 사이드바의 `settings` 버튼을 통해 `앱` 설정 화면에 진입하면 웹훅을 등록할 수 있습니다.

![웹훅 등록 화면](/img/quickstart-transcoding/register-webhook.png)

웹훅 등록시 입력해야 하는 정보는 다음과 같습니다.

- Callback URL (필수): 웹훅이 호출될 URL
- Callback ID (필수): 웹훅이 허가받지 않은 호출이 되는 것을 방지하기 위해 basic auth scheme에서 사용할 username. Endpoint에 basic auth 처리를 해주지 않는다면 아무 값이나 넣어도 상관 없음
- Callback Password (필수): 웹훅이 허가받지 않은 호출이 되는 것을 방지하기 위해 basic auth scheme에서 사용할 password. Endpoint에 basic auth 처리를 해주지 않는다면 아무 값이나 넣어도 상관 없음

웹훅을 등록 하면 `POST` 메서드로 다음 형태의 JSON 본문이 전달 됩니다.

```typescript
{
  "videoPostId": number, // `비디오 포스트`의 id
  "videoPostVideoPostState": string // VideoPost의 state
}
```
