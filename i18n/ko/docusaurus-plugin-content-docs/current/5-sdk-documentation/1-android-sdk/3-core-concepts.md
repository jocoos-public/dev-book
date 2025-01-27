---
sidebar_position: 3
---

# 핵심 개념

## 서버 연결

기본적으로 FlipFlop Lite는 서비스 개발 중에 사용하는 개발 서버와 실제 서비스를 제공할 때 사용하는 프로덕션 서버 두 가지를 제공합니다.

SDK를 초기화할 때 사용할 서버를 다음과 같이 지정합니다.

```kotlin
// flipflop 개발 서버에 연결
val server = FFLServer.DEV // 또는 FFLServer.PROD
FlipFlopLite.initialize(applicationContext, server = server)
```

FlipFlop Lite는 요청 시 전용 서버도 제공합니다. 전용 서버의 장점은 별도의 서버를 구축하여 서비스에 맞게 맞춤화할 수 있다는 점입니다. 이 경우 아래와 같이 서버 주소를 직접 입력하여 SDK를 초기화합니다.

```kotlin
// 전용 서버에 연결
val serverUri = "SERVER_ADDRESS" // SERVER_ADDRESS를 서버 주소로 교체하세요
FlipFlopLite.initialize(applicationContext, serverUri = serverUri)
```

## 인증

FlipFlop SDK가 서버에 성공적으로 연결되려면 액세스 토큰이 필요합니다.

액세스 토큰은 SDK에서 제공되지 않으므로 [회원 로그인 API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login)를 통해 별도로 얻어야 합니다.

> 액세스 토큰 얻기: FlipFlop Lite를 통해 애플리케이션 서버에서 액세스 토큰을 얻은 후 클라이언트에 전달하는 것을 권장합니다. 클라이언트에서 직접 회원 로그인 API를 사용하여 액세스 토큰을 얻는 것은 권장하지 않습니다.

액세스 토큰을 얻기 위해 필요한 항목은 다음과 같습니다.

* AppKey, AppSecret: 사용자 콘솔에서 애플리케이션을 생성할 때 생성됩니다.
* appUserId, appUserName, appUserProfileImgUrl
  * 'appUserId'는 필수이며, 'appUserName'과 'appUserProfileImgUrl'은 선택 사항입니다.

> 서비스와 동일한 사용자 정보를 사용하는 것을 권장합니다.

액세스 토큰을 얻는 흐름

1. 사용자 콘솔에 가입
2. 애플리케이션 생성
3. 애플리케이션 생성 시 생성된 'AppKey'와 'AppSecret'을 저장
4. 'AppKey'와 'AppSecret'을 사용하여 회원 로그인 API를 통해 액세스 토큰 획득
5. 액세스 토큰을 클라이언트에 전달

## 이벤트 처리

플립플랍 클라우드 Android SDK는 Flow를 사용하여 애플리케이션에 이벤트를 전달합니다.

각 클래스가 제공하는 이벤트는 다음과 같습니다.

| 클래스 | 이벤트 |
| --- | --- |
| FFLStreamer | streamerEvent |
| FFLLivePlayer | livePlayerEvent |
| FFLVodPlayer | vodPlayerEvent |

1. FFLStreamer에서 이벤트를 수신하는 방법은 다음과 같습니다.

```kotlin
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    lifecycleScope.launch {
        streamer?.streamerEvent.collect { event ->
            when (event) {
                is StreamerEvent.StreamStateChanged -> {
                
                }
                ...
            }
        }
    }
}
```

* 제공되는 이벤트

| 이벤트 | 설명 |
| --- | --- |
| StreamerStateChanged | FFLStreamer의 상태를 알립니다. |
| BroadcastStateChanged | 라이브 스트리밍의 상태를 알립니다. |
| LiveExists | 아직 종료되지 않은 라이브가 있음을 알립니다. |
| StreamAlarmPublished | 네트워크 상태에 대한 알림을 제공합니다. |
| CameraZoomChanged | 카메라 줌이 변경되었음을 알립니다. |
| VideoBitrateChanged | 비디오 비트레이트가 변경되었음을 알립니다. |
| ChannelOpened | 채널이 열렸음을 알립니다. |
| MessageReceived | 메시지가 수신되었음을 알립니다. |
| StreamerError | 오류가 발생했음을 알립니다. |

각 이벤트를 자세히 살펴보겠습니다.

* StreamerStateChanged 이벤트

  | 상태 | 설명 |
  | --- | --- |
  | PREPARED | 라이브를 준비 완료했음을 알립니다. |
  | STARTED | 라이브 스트림이 시작되었음을 알립니다. 이 상태는 시청자가 방송을 볼 수 있음을 의미하지는 않습니다. |
  | STOPPED | 라이브 스트림이 중단되었음을 알립니다. |
  | CLOSED | 라이브가 종료되었음을 알립니다. |

* BroadcastStateChanged 이벤트

  | 상태 | 설명 |
  | --- | --- |
  | ACTIVE | 라이브가 진행 중임을 알립니다: 시청자가 방송을 볼 수 있습니다. |
  | INACTIVE | 라이브가 중단되었음을 알립니다: 시청자가 방송을 볼 수 없습니다. |

  > StreamerState와 BroadcastState의 차이점: StreamerState는 FFLStreamer의 로컬 상태를 나타내고, BroadcastState는 미디어 서버가 라이브를 정상적으로 스트리밍하는지 여부를 나타냅니다.
  >
  > FFLStreamer의 start() 함수를 호출하여 라이브 스트리밍을 시작할 때 StreamerState가 STARTED로 변경됩니다. 하지만 이 상태가 시청자들이 방송을 볼 수 있다는 의미는 아니며, 미디어 서버가 시청자들에게 방송을 준비하는 데 시간이 걸릴 수 있습니다. 준비가 완료되고 서버가 시청자들에게 라이브 방송을 제공할 준비가 되면 BroadcastState가 ACTIVE로 변경됩니다.
  * FFLStreamer를 사용하여 정상적으로 라이브를 방송할 때는 다음과 같은 상태가 순서대로 발생합니다. STARTED에서 ACTIVE로 전환되는 데 시간이 걸릴 수 있으므로 UI에서 "진행 중..." 등의 메시지를 표시하는 것을 권장합니다.
    * StreamerState.PREPARED -\> Streamer.State.STARTED -\> BroadcastState.ACTIVE

* LiveExists 이벤트
  * 사용자는 동시에 하나의 라이브만 진행할 수 있으므로 이전 라이브가 종료되어야 새 라이브가 시작될 수 있습니다. 아직 종료되지 않은 라이브가 있을 경우 LiveExists 이벤트가 발생합니다. LiveExists 이벤트가 수신되면 진행 중인 라이브의 정보가 제공됩니다: videoRoom.id. 이전 라이브를 다시 시작하려면 FFLStreamer의 restart() 함수와 videoRoom ID를 사용하여 라이브를 재시작합니다.

  ```kotlin
  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
      lifecycleScope.launch {
          streamer?.streamerEvent.collect { event ->
              when (event) {
                  is StreamerEvent.LiveExists -> {
                      // 종료되지 않은 라이브가 있음
                      // 이전 라이브를 재시작할지 결정
                      streamer.restart(event.videoRoom.id)
                  }
                  ...
              }
          }
      }
  }
  ```

* StreamAlarmPublished 이벤트

  | 상태 | 설명 |
  | --- | --- |
  | NORMAL | 라이브 스트리밍 상태가 양호함 |
  | ALERT_1 | 라이브 스트리밍 상태가 약간 나쁨 |
  | ALERT_2 | 라이브 상태가 ALERT_1보다 나쁨 |
  | ALERT_3 | 라이브 상태가 ALERT_2보다 나쁨 |

  * AlarmState는 현재 세 가지 레벨을 가지며, 숫자가 클수록 상태가 나쁨을 나타냅니다.
  * AlarmState 값은 순서대로 호출되지 않으며, 네트워크 상태가 급격히 나빠지면 ALERT_3이 먼저 호출될 수 있습니다.

* CameraZoomChanged 이벤트
  * 줌 이벤트는 두 가지 방식으로 발생할 수 있습니다.
    1. FFLStreamer의 liveManager()?.zoom() 함수를 호출하여 직접 줌 값을 변경합니다.
    2. FFLStreamerView에서 핀치 줌을 사용합니다.

* VideoBitrateChanged 이벤트
  * 네트워크 상태에 따라 비트레이트 값이 조정됩니다. 이는 어댑티브 비트레이트 구성을 활성화한 경우 적용됩니다.
  * 라이브 스트리밍에서 어댑티브 비트레이트 적용하기

  ```kotlin
  // prepare() 호출 후 실행
  streamer?.liveManager()?.enableAdaptiveBitrate()
  ```

* ChannelOpened 이벤트
  * 이 이벤트가 발생한 후에 채팅 메시지를 보낼 수 있습니다.

* MessageReceived 이벤트
  * 자세한 내용은 "채팅 메시지" 부분을 참조하세요.

* StreamError 이벤트
  * 자세한 내용은 "오류 처리" 부분을 참조하세요.

## 채팅 메시지

1. 채팅 메시지 보내기

   1. FFLStreamer 또는 FFLLivePlayer의 liveChat()?.sendMessage() 함수를 호출하여 채팅 메시지를 보낼 수 있습니다.

   > sendMessage() 함수는 suspend 함수이므로 코루틴 내에서 호출해야 합니다.

   ```kotlin
   // 코루틴 내에서 호출
   // FFLStreamer
   streamer?.liveChat()?.sendMessage("Hello")
   
   // FFLLivePlayer
   livePlayer?.liveChat()?.sendMessage("Good day")
   ```

2. 채팅 메시지 수신

   1. FFLStreamer.streamerEvent와 FFLLivePlayer.playerEvent의 MessageReceived 이벤트에서 채팅 메시지를 수신할 수 있습니다.

   2. MessageReceived 이벤트에서 전달

되는 메시지는 FFLMessage 타입이며, 다음과 같은 내용을 포함합니다.

      | 필드 | 설명 | 비고 |
      | --- | --- | --- |
      | origin | 메시지 유형: MEMBER, APP, SYSTEM | MEMBER: 사용자가 보낸 메시지, APP: 앱에서 보낸 메시지, SYSTEM: 시스템에서 보낸 메시지 |
      | appUserId | 사용자 ID |  |
      | appUsername | 사용자 이름 |  |
      | customType | 메시지를 구분하는 사용자 정의 유형 | SYSTEM일 경우 "JOINED", "LEAVED", "CHANNEL_STAT_UPDATED"일 수 있음 |
      | message | 사용자가 보낸 메시지 |  |
      | participantCount | 참가자 수 |  |

   3. 메시지 처리

      1. 사용자 참여 및 나가기 처리
         1. 사용자가 참여한 경우
            1. message.origin: Origin.SYSTEM
            2. message.customType: "JOINED"
         2. 사용자가 나간 경우
            1. message.origin: Origin.SYSTEM
            2. message.customType: "LEAVED"
      2. 참가자 수 처리
         1. message.origin: Origin.SYSTEM
         2. message.customType: "CHANNEL_STAT_UPDATED"
      3. 사용자가 보낸 메시지 처리
         1. message.origin: Origin.MEMBER

   4. FFLStreamer에서 메시지 수신 예시 코드

      ```kotlin
      class StreamingFragment : Fragment() {
          ...
      
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              // ...
              
              lifecycleScope.launch {
                  streamer?.streamerEvent.collect { event ->
                      when (event) {
                          // ...
                          is StreamerEvent.MessageReceived -> {
                              handleMessage(event.message)
                          }
                          // ...
                      }
                  }
              }
          }
          
          private fun handleMessage(message: FFLMessage) {
              when (message.origin) {
                  Origin.APP -> {
                      // 앱에서 보낸 메시지
                  }
                  Origin.MEMBER -> {
                      // 사용자가 보낸 메시지
                  }
                  Origin.SYSTEM -> {
                      // 시스템에서 보낸 메시지
                      when (message.customType) {
                          "JOINED" -> {
                              // 사용자가 참여함
                          }
                          "LEAVED" -> {
                              // 사용자가 나감
                          }
                          "CHANNEL_STAT_UPDATED" -> {
                              // 참가자 수 업데이트됨
                          }
                          else -> {
                              // 현재 무시
                          }
                      }
                  }
                  else -> {
                      // 현재 무시
                  }
              }
          }
      }
      ```

   5. FFLLivePlayer에서 메시지 수신 예시 코드

      ```kotlin
      class StreamingViewFragment : Fragment() {
          ...
      
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              ...
              
              lifecycleScope.launch {
                  player?.playerEvent.collect { event ->
                      when (event) {
                          ...
                          is PlayerEvent.MessageReceived -> {
                              handleMessage(event.message)
                          }
                          ...
                      }
                  }
              }
          }
          
          private fun handleMessage(message: FFLMessage) {
              when (message.origin) {
                  Origin.APP -> {
                      // 앱에서 보낸 메시지
                  }
                  Origin.MEMBER -> {
                      // 사용자가 보낸 메시지
                  }
                  Origin.SYSTEM -> {
                      // 시스템에서 보낸 메시지
                      when (message.customType) {
                          "JOINED" -> {
                              // 사용자가 참여함
                          }
                          "LEAVED" -> {
                              // 사용자가 나감
                          }
                          "CHANNEL_STAT_UPDATED" -> {
                              // 참가자 수 업데이트됨
                          }
                          else -> {
                              // 현재 무시
                          }
                      }
                  }
                  else -> {
                      // 현재 무시
                  }
              }
          }
      }
      ```

## 오류 처리

* Android SDK는 오류가 발생했을 때 오류 코드를 알립니다.
* 이러한 오류는 클라이언트 앱 측 또는 서버 측에서 발생할 수 있습니다.
  * FFLStreamer의 StreamerError, FFLLivePlayer 및 FFLVodPlayer의 PlayerError
* 오류 이벤트

  | 오류 | 코드 | 설명 |
  | --- | --- | --- |
  | MEDIA_CONNECTION_FAILED | 80100 | 미디어 서버에 연결 실패 |
  | MEDIA_STREAMING_REQUEST_FAILED | 80101 | 스트리밍 시작 요청 실패 |
  | MEDIA_STREAMING_SEND_FAILED | 80102 | 미디어 서버에 데이터 전송 실패 |
  |  |  |  |
  | CHANNEL_UNEXPECTED_ERROR | 80200 | 예기치 않은 오류 발생 |
  | CHANNEL_INVALID_MESSAGE | 80201 | 응답 메시지 파싱 실패 |
  | CHANNEL_MESSAGE_SEND_ERROR | 80202 | 채팅 메시지 전송 실패 |
  |  |  |  |
  | SERVER_ERROR | 80400 | 서버 응답 처리 실패 |
  | SERVER_UNEXPECTED_ERROR | 80401 | 예기치 않은 서버 오류 발생 |
  | SERVER_INVALID_VIDEO_ROOM_ID | 80402 | 잘못된 비디오 방 ID |
  | SERVER_STREAM_KEY_GET_ERROR | 80403 | 스트림 키 가져오기 실패 |
  | SERVER_VIDEO_ROOM_CREATE_ERROR | 80404 | 비디오 방 생성 실패 |
  | SERVER_VIDEO_ROOM_GET_ERROR | 80405 | 비디오 방 가져오기 실패 |
  | SERVER_VIDEO_ROOM_JOIN_ERROR | 80406 | 비디오 방 참여 실패 |
  | SERVER_VIDEO_ROOM_START_ERROR | 80407 | 비디오 방 시작 실패 |
  | SERVER_VIDEO_ROOM_LEAVE_ERROR | 80408 | 비디오 방 나가기 실패 |
  | SERVER_VIDEO_ROOM_END_ERROR | 80409 | 비디오 방 종료 실패 |

* FFLStreamer 예시 코드

  ```kotlin
  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
      lifecycleScope.launch {
          streamer?.streamerEvent.collect { event ->
              when (event) {
                  is StreamerEvent.StreamerError -> {
                      // 오류 처리: 코드 및 메시지
                  }
              }
          }
      }
  }
  ```

* FFLLivePlayer 예시 코드

  ```kotlin
  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
      lifecycleScope.launch {
          player?.playerEvent.collect { event ->
              when (event) {
                  is PlayerEvent.PlayerError -> {
                      // 오류 처리: 코드 및 메시지
                  }
              }
          }
      }
  }
  ```
