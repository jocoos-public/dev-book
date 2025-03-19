---
sidebar_position: 1
---

# 빠른 시작

## 1. 필수 조건

1. 요구 사항
   * SDK 24 이상
   * Kotlin 1.6 이상

2. 애플리케이션 생성
   * SDK를 사용하려면 먼저 웹의 사용자 콘솔에서 회원 가입을 하고 애플리케이션을 생성해야 합니다. 현재 직접 회원 가입은 제한되어 있습니다. 가입을 원하시면 Jocoos에 문의하세요.

3. 서버에서 액세스 토큰 가져오기
   * SDK를 사용하려면 액세스 토큰이 필요합니다. 애플리케이션 서버는 FlipFlop Cloud API를 사용하여 액세스 토큰을 가져오고 이를 클라이언트에 전달합니다.

## 2. SDK 설치

1. 프로젝트 루트의 `build.gradle`에 아래 코드를 추가하세요.

   ```kotlin
   allprojects {
       repositories {
           maven { url 'https://jitpack.io' }
       }
   }
   ```

2. SDK를 사용할 모듈의 `build.gradle`에 아래 코드를 추가하세요.

   ```kotlin
   dependencies {
    implementation(‘com.jocoos.jocoos-public:ffc-sdk-client-android:1.1.3’)
   }
   ```

3. SDK를 사용하려면 애플리케이션에서 권한이 필요합니다. 라이브 방송을 시작하려면 다음 권한을 `AndroidManifest.xml`에 추가하세요.

   ```xml
   <uses-permission android:name="android.permission.INTERNET"/>
   <uses-permission android:name="android.permission.CAMERA"/>
   <uses-permission android:name="android.permission.RECORD_AUDIO"/>

   <uses-feature
       android:name="android.hardware.camera"
       android:required="false" />
   ```

## 3. 사용법

FlipFlop은 마이크 및 카메라 사용을 위해 `RECORD_AUDIO` 및 `CAMERA` 권한을 필요로 합니다. 이 권한은 런타임에서 요청해야 합니다. 예제는 샘플 앱을 참고하세요.

1. 비디오 룸 관리
   * 비디오 룸 인스턴스를 가져오기 위해 다음 메서드를 호출하세요.

        ```kotlin
        // server_url: FlipFlop Cloud 서버 주소
        // access_token: 액세스 토큰
        val api = FFCloudSDK.api(serverUrl, accessToken)
        ```

   * 다음 기능을 제공합니다.
     * 비디오 룸 생성
  
       ```kotlin
       // title: 제목
       // description: 설명
       // password: 비디오 룸 참가 비밀번호
       // customType: 사용자 정의 타입
       // customData: 사용자 정의 데이터 (Key-Value Pair)
       api.createVideoRoom(title, description, password, customType, customData)
       ```

     * 비디오 룸 정보 가져오기

       ```kotlin
       // videoRoomId: 비디오 룸 ID
       api.getVideoRoom(videoRoomId)
       ```

     * 비디오 룸 목록 가져오기

       ```kotlin
       // videoRoomState: 상태
       // type: 유형
       // sortBy: 정렬 기준
       // page: 페이지 번호
       // pageSize: 페이지 크기
       api.listVideoRooms(videoRoomState, type, sortBy, page, pageSize)
       ```

     * 비디오 룸 참가를 위한 WebRTC 정보 가져오기

       ```kotlin
       // videoRoomId: 비디오 룸 ID
       // password: 비디오 룸 비밀번호
       // customData: 사용자 정의 데이터 (Key-Value Pair)
       api.issueWebRtcVideoRoomToken(videoRoomId, password, customData)
       ```

2. 비디오 룸 참가
   1. 비디오 룸 인스턴스 생성
  
      ```kotlin
      // webRtcServerUrl, webRtcToken: issueWebRtcVideoRoomToken에서 가져온 값
      val videoRoom = FFCloudSDK.connectWebRtcVideoRoom(applicationContext, webRtcServerUrl, webRtcToken)
      // R.id.renderer: 참가자의 화면을 위한 뷰
      // R.id.local_camera: 내 카메라 화면을 위한 뷰
      videoRoom.initVideoRenderer(findViewById<FFCSurfaceViewRenderer>(R.id.renderer))
      videoRoom.initVideoRenderer(findViewById<FFCTextureViewRenderer>(R.id.local_camera))
      ```

   2. 이벤트 등록
  
      ```kotlin
      videoRoom.events.collect { event ->
        when (event) {
          is FFCVideoRoomEvent.Disconnected -> {
              // 비디오 룸 연결이 종료됨
          }
          is FFCVideoRoomEvent.TrackSubscribed -> {
              // 참가자가 트랙을 구독함
          }
          is FFCVideoRoomEvent.TrackUnsubscribed -> {
              // 구독한 트랙이 해제됨
          }
          else -> {}
        }
      }
      ```

   3. 내 카메라 화면 표시

      ```kotlin
      val renderer = findViewById<FFCTextureViewRenderer>(R.id.local_camera)
      videoRoom.attachLocalVideo(viewRenderer = renderer, enableMicrophone = false, enableCamera = true)
      ```

   4. 참가자 화면 표시
      * `TrackSubscribed` 이벤트 발생 시 트랙과 뷰를 연결

      ```kotlin
      val remoteRenderer = findViewById<FFCSurfaceViewRenderer>(R.id.renderer)
      videoRoom.attachRemoteVideo(track, remoteRenderer)
      ```

## 4. 참고 자료

* [SDK 샘플](https://github.com/jocoos-public/ffc-sdk-client-android-sample)
