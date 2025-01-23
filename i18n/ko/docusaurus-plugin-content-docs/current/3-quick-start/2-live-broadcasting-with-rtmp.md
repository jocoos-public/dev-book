---
sidebar_position: 2
---

# 라이브 방송 RTMP로 진행하기

:::info

플립플랍 클라우드를 사용하기 위해서는 사용자로 가입하는 단계가 선행 되어야 합니다. 하지만 현재는 정책상 문의를 통해서 가입 요청만 받고 있습니다. 플립플랍 클라우드를 가입 및 그에 따른 추후 사용 절차는 [사용자 가입 및 사용 절차](./1-sign-up.md)를 참고 바랍니다.

:::

## 개요

플립플랍 클라우드에서 대량의 시청자를 대상으로 라이브 방송을 진행하기에 적합한 기능으로 RTMP로 방송하기 기능이 제공되고 있습니다. 이 기능은 방송을 하고자 하는 사람이 RTMP를 사용하여 방송을 송출하여 다른 사람들이 RTMP, FLV over HTTP, HLS, 그리고 MPEG-DASH로 방송을 시청할 수 있게 해 줍니다.

이 문서는 RTMP 스트림 송출을 통한 라이브 방송 진행 방법과 그 과정에서 설정할 수 있는 여러가지 기능에 대해서 설명하고 있습니다.

## 사전 정보

플립플랍 클라우드는 사용 목적에 따라 테스트를 위한 환경과 상업적 사용을 위한 환경이 별도로 운영 되고 있습니다. 각 환경별 정보는 다음과 같습니다.

| Endpoint 유형 | Sandbox 환경 | Production 환경 |
|:---:|:---:|:---:|
| 유저 콘솔 | https://console-sandbox.flipflop.cloud | https://console.flipflop.cloud |
  | API | https://portal-sandbox.flipflop.cloud | https://portal.flipflop.cloud |
| RTMP 송출 | rtmp://media-sandbox.flipflop.cloud | rtmp://media.flipflop.cloud |
| Swagger UI | https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server | https://portal.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server |
| API 문서 | https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server | https://portal.flipflop.cloud/open-api/ko/docs/ffc-app-server |

:::warning

본 문서는 테스트를 위한 설명을 목적을 두고 있기 때문에 모든 정보를 sadnbox 환경 기준으로 작성 되었습니다.

:::

## 선행조건

### 플립플랍 앱 생성

플립플랍 클라우드의 모든 기능은 앱이라는 단위 안에서 이루어지며 RTMP 스트림으로 라이브 방송 진행하는 기능은 현재 `플립플랍 앱`에서만 지원 됩니다. `비콜로 앱`에서는 현재 지원 되지 않지만 빠른 시일 내에 지원이 될 계획입니다.

:::note

앱의 종류와 차이점에 대해서는 [주요 개념 > 앱 문서의 플립플랍 클라우드 앱 종류 문서](../2-key-concepts/apps.md#플립플랍-클라우드-앱의-종류)를 참고 바랍니다.

:::

가입 문의를 통해 계정을 발급 받는 과정에서 라이브 방송 기능 사용에 대한 문의를 하셨다면 계정 정보와 함께 그 계정으로 생성한 `플립플랍 앱`에 대한 정보도 같이 제공될 수 있습니다. [유저 콘솔](https://console-sandbox.filpflop.cloud)에 접속해서 로그인한 후에 보이는 나의 앱 목록에서 이미 생성된 앱에 대한 정보를 확인할 수 있습니다. 앱 이름이 `vicollo_`로 시작하는 경우 `비콜로 앱`이며, 아닌 경우에는 `플립플랍 앱` 입니다. 이미 생성 되어 있는 `플립플랍 앱`이 존재하고 그 앱의 API key/secret 정보를 알고 있으면 다음 단계로 진행해도 됩니다. 이미 생성 되어 있는 `플립플랍 앱`이 존재 하지만 API key/secret에 대한 정보를 분실 했거나 알지 못한다면 [support@jocoos.com](mailto:supoort@jocoos.com)으로 문의해 주시기 바랍니다. 만약 생성 되어 있는 `플립플랍 앱`이 없는 경우에는 앱을 생성해야 합니다.

앱 생성은 [유저 콘솔](https://console-sandbox.filpflop.cloud)의 앱 목록 화면 우측 상단에 있는 `Create` 버튼을 눌러서 생성할 수 있습니다. 현재 [유저 콘솔](https://console-sandbox.filpflop.cloud)에서 생성되는 모든 앱은 `플립플랍 앱`이므로 팝업창에서 요구하는 정보만 입력한 후에 `Create App` 버튼을 누르면 됩니다.

앱이 생성되면 `App creation complete` 팝업창에 API key/secret 정보가 나타나게 됩니다. 이 정보는 `플립플랍 앱` server API를 호출할 때 필요한 정보이며 API secret은 팝업 창을 닫으면 다시 확인할 수 없으니 노출되지 않도록 기록하여 보관해야 합니다. API key/secret 정보를 잘 기록한 후에 `Complete` 버튼을 눌러 팝업 창을 닫을 수 있습니다.

## 사전 준비

라이브 방송 기능을 직접 경험하기 위해서는 RTMP 스트림을 송출할 수 있는 방법을 알고 있어야 합니다. 다음 목록은 RTMP 스트림을 송출할 수 있는 소프트웨어들에 대한 예시 목록입니다.

- Open Broadcaster Software
- XSplit Broadcaster
- FFmpeg
- GStreamer

위의 소프트웨어가 아니더라도 RTMP 스트림을 송출할 수 있는 방법을 알고 있어야지만 라이브 방송을 진행할 수 있습니다.

## 개괄

사전 작업인 사용자 가입과 `플립플랍 앱` 생성이 완료 되었다면 이제 라이브 방송을 진행하기 위한 직접적인 작업을 할 수 있습니다. 전체적인 과정은 다음과 같은 단계로 이루어 집니다.

1. 멤버 생성/등록
2. 비디오룸 생성
3. RTMP 스트림 송출
4. 비디오룸 방송 시작
5. 시청자들에게 방송 시청
6. 비디오룸 방송 종료

이후는 위의 단계들을 기준으로 각 단계에 대한 구체적인 설명 및 세부적인 방송 설정이나 기능에 대한 설명입니다. 두 단원으로 나눠서 먼저 [유저 콘솔](https://console-sandbox.filpflop.cloud)을 통해서 라이브 방송을 진행하는 방법을 설명한 후에 라이브 방송을 진행하는데 필요한 `플립플랍 앱 서버 API`에 대한 설명을 통해 다른 서비스에 `플립플랍 앱`을 어떻게 연동시켜 사용할 수 있는지 설명 되어 있습니다.

## 유저 콘솔로 라이브 방송 해보기

### 1. 멤버 생성/등록

:::info

플립플랍 클라우드는 다른 서비스에서 비디오 관련 기능을 플립플랍 클라우드로 부터 쉽게 가져다 사용이 가능하도록 하는데에 초점이 맞춰져 있고 그것을 가능하게 하기 위해 `앱`과 `멤버`라는 개념이 존재 합니다. 문서를 더 읽기에 앞서 주요 개념 상세의 [앱](../2-key-concepts/apps.md)과 [멤버](../2-key-concepts/members.md)을 참고 바랍니다.

:::

`플립플랍 앱` 내에서 모든 기능은 `멤버` 기준으로 동작하게 됩니다. 따라서 라이브 방송 역시 `멤버`에 의해 이루어져야 하고, `플립플랍 앱`에 멤버를 생성해 줘야 합니다. 멤버는 [유저 콘솔](https://console-sandbox.filpflop.cloud)에서 앱을 선택한 후에 `App Users` 화면에서 우측 상단에 있는 `Create` 버튼을 누른 후 나타나는 팝업창에서 `멤버`에 대한 정보를 입력하여 생성할 수 있습니다. `멤버`를 생성하는데 가장 필수적인 속성은 `appUserId`이며 이것은 `멤버`를 구분하기 위한 식별자 입니다. `멤버`의 `appUserId`는 특정한 규칙에 따라 고유하도록 부여해야 합니다. 만약 다른 서비스에 `플립플랍 앱`을 연동하여 사용자에게 라이브 방송 기능을 제공하고자 한다면 다른 서비스의 사용자에 대한 고유 식별자를 `appUserId`로 사용할 것을 권장 드립니다.

### 2. 비디오룸 생성

라이브 방송은 `비디오룸` 단위로 진행 됩니다. 따라서 `비디오룸`을 생성해야 합니다. [유저 콘솔](https://console-sandbox.filpflop.cloud)에서 앱을 선택한 후에 `VideoRooms` 화면으로 이동하면 생성된 `비디오룸` 목록을 조회할 수 있습니다. 그리고 우측 상단에 있는 `Create` 버튼을 누른 후 나타나는 팝업창에서 `비디오룸`에 대한 정보를 입력하여 생성할 수 있습니다. 입력해야 하는 속성에 대한 설명은 다음과 같습니다.

- Type (필수): 라이브 방송을 위해서는 ‘Broadcast RTMP’를 선택
- Title (필수): 라이브 방송이 진행되는 `비디오룸`의 제목
- Description (선택): 라이브 방송이 진행되는 `비디오룸`에 대한 설명
- Access Level (필수): 라이브 방송이 진행되는 `비디오룸`에 대한 다른 `멤버` 또는 사람들의 접근 범위에 대한 값으로 현재는 라이브 방송에 대한 URL만 있으면 누구나 시청이 가능한 `Public`만 선택 가능
- AppUserId (필수): 라이브 방송을 하려고 하는 `멤버`의 `appUserId`로 `비디오룸`이 생성되면 `appUserId`를 가진 `멤버`가 생성한 `비디오룸`이 됨
- ScheduledAt (필수): 라이브 방송을 시작할 시간 표시용으로 이 값이 특별한 기능에 사용되지는 않습니다.

### 3. RTMP 스트림 송출

[유저 콘솔](https://console-sandbox.filpflop.cloud)에서 앱을 선택한 후에 `VideoRooms` 화면에서 [이전 단계(2. 비디오룸 생성)](#1-멤버-생성등록)에서 생성한 `비디오룸`을 선택하면 다음과 같은 화면이 나타납니다. 이 화면에 RTMP 스트림을 송출을 위한 정보와 방송 진행 상태 등에 대한 정보를 확인할 수 있습니다.

![Broadcast RTMP 비디오룸 상세 화면](/img/video-room-broadcast-rtmp-detail.png)

RTMP 스트림 송출 소프트웨어에 송출 URL을 입력하거나 사용해야 합니다. 송출 URL은 `비디오룸` 상세 화면의 `StreamKey` 영역의 `IngestURL`과 `StreamKey` 항목을 '/'를 사이에 두고 조합한 문자열 입니다. 송출 URL의 형식은 다음과 같습니다.

```plaintext
rtmp://media-sandbox.flipflop.cloud/live/{StreamKey}
```

`StreamKey`는 `비디오룸`의 속성이 아닌 `멤버`의 속성으로 같은 `멤버`가 생성한 `비디오룸`에서는 모두 동일한 값이 표시 됩니다. 이 값을 통해 플립플랍 클라우드는 어떤 `멤버`가 RTMP 스트림을 송출하는지 구별하게 됩니다.

:::info

RTMP 스트림 송출 URL외의 다른 설정은 소프트웨어에 따라 상이할 수 있으므로 소프트웨어의 사용자 매뉴얼을 참고하거나 [support@jocoos.com](mailto:support@jocoos)으로 문의 바랍니다.

:::

:::note

컴퓨터에서는 RTMP 스트림 송출 소프트웨어로 할 수 있고 모바일에서 RTMP 송출하는 앱을 사용하거나 플립플랍 클라우드에서 제공되는 [안드로이드/iOS SDK](/category/sdk-documentation)를 사용하거나 다른 RTMP 송출 오픈소스 라이브러리를 사용하여 송출 앱을 제작하여 사용할 수도 있습니다.

:::

송출된 RTMP 스트림은 기본적으로 RTMP로만 시청 가능하도록 제공됩니다. 만약 다른 형식으로 시청이 가능하도록 하고 싶으신 경우에는 URL 뒤에 mode라는 쿼리 파라미터 값을 추가하면 됩니다. 현재 사용 가능한 mode는 다음과 같습니다.

- `RTMP`: 송출된 RTMP 스트림을 RTMP로 시청가능
  - 송출된 RTMP 스트림 그대로를 시청할 수 있는
    - FLV over HTTPS URL 생성
    - RTMP URL 생성
- `CMAF`: 송출된 RTMP 스트림을 CMAF(HLS와 MPEG-DASH)로 시청 가능
  - 360p, 720p variant stream 지원
  - 시청 가능한
    - HLS용 m3u8 URL 생성
    - MPEG-DASH용 mpd URL 생성
- `RTMP_CMAF`: 송출된 RTMP 스트림을 RTMP와 CMAF(HLS와 MPEG-DASH)로 시청 가능
  - 위의 두 mode 합친 결과

송출된 RTMP 스트림을 시청자들이 CMAF 방식으로 시청하게 하고 싶으시면 송출 스트림 URL의 형식은 다음과 같습니다.

```plaintext
rtmp://media-sandbox.flipflop.cloud/live/{StreamKey}?mode=CMAF
```

:::note

이 밖에 송출된 스트림이 가로/세로 영상인지 여부를 설정할 수도 있는데, 이 설정은 현재 유저 콘솔에서 설정이 불가합니다.

:::

RTMP 스트림을 송출하게 되면 `StreamKey` 영역의 `StreamKey State` 부분을 통해서 스트림키의 상태가 변경됨을 아실 수 있습니다. 각상태의 설명은 다음과 같습니다.

- `INACTIVE` - 스트림키로 스트림 송출이 없는 상태
- `ACTIVE_PREP` - 스트림키로 스트림 송출이 성공적으로 인지 된 상태
  - 이 상태에서 스트림 송출이 중단 되면 `INACTIVE` 상태로 전환
- `ACTIVE` - 스트림키로 송출된 스트림이 시청 가능한 형태로 변환된 상태
  - 이 상태에서 스트림 송출이 중단 되면 `INACTIVE` 상태로 전환
  - 이 상태에서 방송을 시작하면 `ACTIVE_LIVE` 상태로 전환
- `ACTIVE_LIVE` - 스트림키로 송출된 스트림이 시청 가능한 형태로 변환되어 비디오룸을 통해 시청 가능한 URL들이 노출되는 상태
  - 이 상태에서 스트림 송출이 중단 되면 `INACTIVE_LIVE` 상태로 전환
- `INACTIVE_LIVE` - 스트림키로 송출된 스트림이 중단 되어 방송이 중단 되었지만 다시 스트림 송출을 통해 방송이 재개될 수 있는 상태
  - 이 상태에서 스트림 송출이 다시 시작 되면 `ACTIVE_LIVE_PREP` 상태로 전환
  - 이 상태에서 방송을 종료하면 `INACTIVE` 상태로 전환
- `ACTIVE_LIVE_PREP` - 방송이 중단 되었다가 스트림 송출이 다시 재개 됨을 성공적으로 인지된 상태
  - 이 상태에서 스트림 송출이 중단되면 `INACTIVE_LIVE`로 상태 전환
  - 이 상태에서 송출된 스트림이 시청 가능한 형태로 변환되면 `ACTIVE_LIVE` 상태로 변환

송출된 스트림이 변환되어 시청 가능한 경우는 스트림키의 상태가 `ACTIVE`와 `ACTIVE_LIVE`인 경우이고, 이때는 변환되어 출력되는 형식에 따른 시청 가능한 URL 정보가 스트림키에 현재 채워지게 됩니다.

### 4. 비디오룸 방송 시작

`멤버`의 스트림키로 RTMP 스트림을 송출하여 스트림키의 상태가 `ACTIVE` 상태가 되면 해당 멤버가 생성한 비디오룸에서 방송을 시작할 수 있습니다. 한 스트림키로 동시에 두개 이상의 방송을 하지 못하기 때문에 멤버는 동시에 두개 이상의 방송을 하지 못합니다. 따라서 한 비디오룸에서 방송을 시작한 경우에 스트림 송출을 중단 하더라도 방송이 종료되지 않으면 다른 비디오룸에서 방송을 새로 시작할 수 없습니다.

방송 시작을 위해서는 송출되는 RTMP 스트림을 방송하기 위한 비디오룸의 상세 화면에서 `Start Live` 버튼을 클릭하면 됩니다.

비디오룸에서 방송이 시작되면 스트림키의 상태가 `ACTIVE_LIVE`로 전환되고, 해당 비디오룸의 URL 정보들이 방송을 시청 가능한 URL들로 채워져서 노출 되어 비디오룸을 매개로 방송을 시청할 수 있게 됩니다.

방송이 시작 되면 비디오룸 상세 화면에서 현재 방송되는 영상이 재생됩니다. 다만 현재는 방송 출력 모드가 CMAF 형식을 포함하는 경우에만 한해서 재생 되고 있습니다. 따라서 출력 모드가 RTMP 형식만 선택된 경우에는 StreamKey 영역의 RTMP Play URL 혹은 HTTP-FLV Play URL을 다른 미디어 재생기를 통해 재생하여 확인해야 합니다.

[이전 단계(3. RTMP 스트림 송출)](#3-rtmp-스트림-송출)에서 스트림키의 상태를 설명하면서 간단하게 설명 되었듯이 방송중에 스트림 송출이 중단되면 방송이 중단 되고 그 상태에서 다시 스트림 송출이 되면 방송이 바로 재개 됩니다.

### 5. 시청자들에게 방송 시청

방송이 진행중인 상태에서 방송을 시청하려고 하는 사람들에게 플립플랍 클라우드 API를 사용해서 비디오룸의 정보를 조회하여 시청 가능한 URL을 조회할 수 있게 하든지 아니면 직접 [유저 콘솔](https://console-sandbox.filpflop.cloud)을 통해 `비디오룸`의 URL 정보들을 방송을 시청하게 하고픈 사람들에게 공유해서 방송을 시청하게 할 수 있습니다. URL이 있으면 누구든지 시청 가능한 이유는 비디오룸의 접근제한 설정이 현재는 `Public`만 지원하기 때문이며 추후에는 접근 범위를 세분화하여 조절이 가능하도록 기능이 추가될 예정입니다.

### 6. 비디오룸 방송 종료

방송을 종료하면 방송중에 스트림 송출을 중단 했을 때 스트림 송출을 재개해서 방송을 재개할 수 있는것과 다르게 방송이 다시 시작 될 수 없습니다.
방송을 종료하는 정석적이고 권장 드리는 방법은 스트림 송출을 중단하고 스트림키의 상태가 `INACTIVE_LIVE`가 되었을 때 비디오룸 상세 화면에 보이면 `End Live` 버튼을 클릭하는 것입니다.

이와 다른 방법으로는 방송을 강제 종료하는 방법이 있습니다. 이 방법을 사용하면 어떤 시점이든지 방송 종료가 가능하지만 멤버의 스트림키가 갱신되어 변경되어 스트림키 조회를 다시 하고 스트림 송출 소프트웨어에서의 설정을 변경해야 하는 번거로움이 있을 수 있습니다. 방송 강제 종료시에 스트림키를 갱신하는 이유는 스트림키가 탈취되어 스트림키의 주인의 의도와 다르게 사용되어 불건전한 내용이 방송이 될 경우 다시 방송을 쉽게 진행할 수 없도록 하기 위함 입니다.

방송이 종료 되면 스트림키의 상태는 다시 `INACTIVE`로 초기화 되어 다른 비디오룸에서 방송을 다시 시작할 수 있는 상태가 됩니다.

종료된 방송은 자동으로 방송 시작 시점 부터 종료된 시점까지의 라이브 스트림의 녹화본을 VOD 형태로 시청할 수 있도록 전환하는 작업이 진행 됩니다. VOD는 `비디오 포스트`를 자동으로 생성시켜 녹화본을 원본을 올린 후에 VOD에 적합한 트랜스코딩 프로파일을 사용하여 트랜스코딩하게 됩니다.

VOD로 전환되는 `비디오 포스트`에 대한 정보는 `비디오룸` 상세 화면에서 영상 재생영역 오른편에 있는 `비디오룸` 정보 영역에서 `video-post id` 값을 통해서 알 수 있습니다. `비디오룸`의 VOD State가 `ARCHIVING`이면 트랜스코딩이 이루어지는 중이고, `ARCHIVED`로 전환되면 트랜스코딩이 끝난 상태가 되어 `비디오 포스트` 상세 화면에서 결과물을 확인할 수 있습니다. `Video-post id` 값을 클릭하시면 바로 해당 `비디오 포스트`의 상세 화면으로 이동하게 됩니다.

## 플립플랍 앱 서버 API 사용하기

### 사용 용도

[유저 콘솔](https://console-sandbox.filpflop.cloud)을 통해 플립플랍 클라우드를 사용한 모습은 다음과 같습니다.

![유저콘솔로 RTMP 방송하기](/img/flipflop-cloud-rtmp-broadcast-with-user-console.png)

하지만 `플립플랍 앱`을 통해 RTMP 방송 기능을 제공하려고 하는 모든 사람들에게 [유저 콘솔](https://console-sandbox.filpflop.cloud)에 대한 접근 권한을 줄 수 없습니다. 따라서 플립플랍 클라우드에서는 API를 제공하여 다음과 같이 사용이 가능하도록 하고 있습니다.

![API로 RTMP 방송하기](/img/flipflop-cloud-rtmp-broadcast-with-api.png)

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
- 멤버 로그인 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%A9%A4%EB%B2%84%20%EA%B4%80%EB%A0%A8/AppsServerApiMembersController_loginMember) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%A9%A4%EB%B2%84-%EA%B4%80%EB%A0%A8/operation/AppsServerApiMembersController_loginMember))
- 멤버 스트림키 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%A9%A4%EB%B2%84%20%EA%B4%80%EB%A0%A8/AppsServerApiMembersController_getMemberStreamKey) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%A9%A4%EB%B2%84-%EA%B4%80%EB%A0%A8/operation/AppsServerApiMembersController_getMemberStreamKey))

#### 비디오룸 관련 API

방송을 위한 `비디오룸` 생성 및 정보 변경 그리고 방송 제어를 할 수 있는 API 입니다.

- 비디오룸 생성 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoRoomsController_createVideoRoom) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoRoomsController_createVideoRoom))
- 비디오룸 목록 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoRoomsController_listVideoRooms) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoRoomsController_listVideoRooms))
- 비디오룸 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoRoomsController_getVideoRoom) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoRoomsController_getVideoRoom))
- 비디오룸 정보 변경 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoRoomsController_updateVideoRoom) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoRoomsController_updateVideoRoom))
- 비디오룸 방송 시작하기 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoRoomsController_startRtmpBroadcast) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoRoomsController_startRtmpBroadcast))
- 비디오룸 방송 종료 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoRoomsController_endRtmpBroadcast) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4%EB%A3%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoRoomsController_endRtmpBroadcast))

#### 스트림키 관련 API

방송을 하는 `멤버`들의 `스트림키` 관리를 위한 API 입니다.

- `스트림키` 목록 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EC%8A%A4%ED%8A%B8%EB%A6%BC%ED%82%A4%20%EA%B4%80%EB%A0%A8/AppsServerApiStreamKeysController_listStreamKeys) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EC%8A%A4%ED%8A%B8%EB%A6%BC%ED%82%A4-%EA%B4%80%EB%A0%A8/operation/AppsServerApiStreamKeysController_listStreamKeys))
- `스트림키` 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EC%8A%A4%ED%8A%B8%EB%A6%BC%ED%82%A4%20%EA%B4%80%EB%A0%A8/AppsServerApiStreamKeysController_getStreamKey) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EC%8A%A4%ED%8A%B8%EB%A6%BC%ED%82%A4-%EA%B4%80%EB%A0%A8/operation/AppsServerApiStreamKeysController_getStreamKey))
- `스트림키` 정보 변경 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EC%8A%A4%ED%8A%B8%EB%A6%BC%ED%82%A4%20%EA%B4%80%EB%A0%A8/AppsServerApiStreamKeysController_updateStreamKey) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EC%8A%A4%ED%8A%B8%EB%A6%BC%ED%82%A4-%EA%B4%80%EB%A0%A8/operation/AppsServerApiStreamKeysController_updateStreamKey))

#### 트랜스코딩 프로파일 관련 API

스트림키의 트랜스코딩 프로파일 설정을 위해 트랜스코딩 프로파일 조회를 위한 API 입니다.

- 트랜스코딩 프로파일 목록 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%ED%8A%B8%EB%9E%9C%EC%8A%A4%EC%BD%94%EB%94%A9%20%ED%94%84%EB%A1%9C%ED%8C%8C%EC%9D%BC%20%EA%B4%80%EB%A0%A8/AppsServerApiTranscodingProfilesController_listTranscodingProfiles) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%ED%8A%B8%EB%9E%9C%EC%8A%A4%EC%BD%94%EB%94%A9-%ED%94%84%EB%A1%9C%ED%8C%8C%EC%9D%BC-%EA%B4%80%EB%A0%A8/operation/AppsServerApiTranscodingProfilesController_listTranscodingProfiles))
- 트랜스코딩 프로파일 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%ED%8A%B8%EB%9E%9C%EC%8A%A4%EC%BD%94%EB%94%A9%20%ED%94%84%EB%A1%9C%ED%8C%8C%EC%9D%BC%20%EA%B4%80%EB%A0%A8/AppsServerApiTranscodingProfilesController_getTranscodingProfile) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%ED%8A%B8%EB%9E%9C%EC%8A%A4%EC%BD%94%EB%94%A9-%ED%94%84%EB%A1%9C%ED%8C%8C%EC%9D%BC-%EA%B4%80%EB%A0%A8/operation/AppsServerApiTranscodingProfilesController_getTranscodingProfile))

#### 비디오 포스트 관련 API

방송 종료 후에 VOD 형태로 변환된 `비디오 포스트`를 조회하는 API 입니다.

- `비디오 포스트` 목록 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_listVideoPosts) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_listVideoPosts))
- `비디오 포스트` 조회 ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server#/%EB%B9%84%EB%94%94%EC%98%A4%20%ED%8F%AC%EC%8A%A4%ED%8A%B8%20%EA%B4%80%EB%A0%A8/AppsServerApiVideoPostsController_getVideoPost) | [API 문서](https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server#tag/%EB%B9%84%EB%94%94%EC%98%A4-%ED%8F%AC%EC%8A%A4%ED%8A%B8-%EA%B4%80%EB%A0%A8/operation/AppsServerApiVideoPostsController_getVideoPost))
