---
sidebar_position: 2
---

# 튜토리얼

## 1. 사전 준비

   1. 요구 사항

      * Android SDK 24 이상
      * Kotlin 1.6 이상

   2. 애플리케이션 생성

      * SDK를 사용하려면 먼저 웹 사용자 콘솔에서 회원 가입 후 애플리케이션을 생성해야 합니다. 현재 직접 가입은 제한되어 있으므로, 가입을 원하시면 Jocoos에 문의하시기 바랍니다.

   3. 서버에서 액세스 토큰 받기

      * SDK를 사용하려면 액세스 토큰이 필요합니다. 애플리케이션 서버는 플립플랍 클라우드 API를 사용하여 액세스 토큰을 받아 클라이언트에 전달합니다.
      * API 사용에 대한 자세한 내용은 [플립플랍 클라우드 - 회원 로그인 API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login) 문서를 참고하세요.
      * 액세스 토큰에 대한 자세한 내용은 Core Concepts의 Authentication 섹션을 참고하세요.

## 2. SDK 설치

   1. 플립플랍 클라우드 Android SDK를 가져오기 위한 저장소를 지정해야 합니다.

      1. 사용하는 Gradle 버전에 따라 추가할 코드의 위치가 다를 수 있습니다.

      2. Gradle 6.8 이상을 사용하는 경우 settings.gradle에, Gradle 6.7 이하를 사용하는 경우 build.gradle에 다음 코드를 추가하세요.

      ```kotlin
      // settings.gradle
      // Gradle 6.8 이상
      dependencyResolutionManagement {
          repositories {
              maven { url 'https://jitpack.io' }
          }
      }
      
      // build.gradle
      // Gradle 6.7 이하
      allprojects {
          repositories {
              maven { url 'https://jitpack.io' }
          }
      }
      ```

   2. SDK를 사용할 모듈의 build.gradle에 아래 코드를 추가하세요.

      ```kotlin
      dependencies {
        implementation('com.jocoos.jocoos-public:ff-lite-android-sdk:1.8.2') {
          transitive = true
        }
      }
      ```

   3. SDK를 사용하려면 앱 권한이 필요합니다. AndroidManifest.xml에 아래 내용을 추가하세요.

      ```xml
      <uses-permission android:name="android.permission.INTERNET"/>
      <uses-permission android:name="android.permission.CAMERA"/>
      <uses-permission android:name="android.permission.RECORD_AUDIO"/>
      <uses-permission
          android:name="android.permission.WRITE_EXTERNAL_STORAGE"
          tools:ignore="ScopedStorage" />
      <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"
          android:maxSdkVersion="32" />
      <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
      <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
      
      <uses-feature android:name="android.hardware.camera.autofocus"/>
      <uses-feature
          android:name="android.hardware.camera"
          android:required="false" />
      ```

      1. 라이브 방송을 시작하기 전에 관련 권한을 획득해야 합니다.

         > 참고: [Android 런타임 권한](https://developer.android.com/training/permissions/requesting)

         아래는 권한 요청을 위한 코드 예시입니다.

      ```kotlin
      private var permissions = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
          arrayOf(
              Manifest.permission.INTERNET,
              Manifest.permission.CAMERA,
              Manifest.permission.RECORD_AUDIO,
              Manifest.permission.READ_MEDIA_IMAGES,
          )
      } else {
          arrayOf(
              Manifest.permission.INTERNET,
              Manifest.permission.CAMERA,
              Manifest.permission.RECORD_AUDIO,
              Manifest.permission.READ_EXTERNAL_STORAGE,
          )
      }
      private var permissionGranted = false
      
      override fun onCreate(savedInstanceState: Bundle?) {
          super.onCreate(savedInstanceState)
      
          permissionGranted = requestPermission(permissions)
      }
      
      override fun onRequestPermissionsResult(
          requestCode: Int,
          permissions: Array<out String>,
          grantResults: IntArray
      ) {
          super.onRequestPermissionsResult(requestCode, permissions, grantResults)
          permissionGranted =
              grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED }
          when (requestCode) {
              PERMISSIONS_REQUEST -> {
                  if (permissionGranted) {
                      initialized()
                  } else {
                      // 라이브 권한이 필요합니다
                  }
              }
              else -> {
      
              }
          }
      }
      
      private fun requestPermission(permissions: Array<String>): Boolean {
           var mustRequest = false
          for (permission in permissions) {
              if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
                  mustRequest = true
                  break
              }
          }
          if (mustRequest) {
              ActivityCompat.requestPermissions(this, permissions, PERMISSIONS_REQUEST)
              }
          return !mustRequest
      }
      ```

## 3. SDK 초기화

   * SDK 기능을 사용하려면 SDK를 초기화해야 합니다. 애플리케이션의 onCreate()에 아래 코드를 추가하세요.

     ```kotlin
     // flipflop 개발 서버에 연결
     val server = FFLServer.DEV
     FlipFlopLite.initialize(context = applicationContext, server = server)
     ```

## 4. 라이브 스트리밍

   1. 라이브 방송을 위한 StreamingFragment 클래스와 View를 생성합니다, streaming_fragment.xml.

   2. streaming_fragment.xml에 FFLStreamingView를 생성합니다. (다음은 카메라 화면 전체를 차지합니다.)

      ```xml
      <?xml version="1.0" encoding="utf-8"?>
      <androidx.constraintlayout.widget.ConstraintLayout
         xmlns:android="http://schemas.android.com/apk/res/android"
         xmlns:app="http://schemas.android.com/apk/res-auto"
         xmlns:tools="http://schemas.android.com/tools"
         android:layout_width="match_parent"
         android:layout_height="match_parent">
      
        <com.jocoos.flipflop.view.FFLStreamingView
           android:id="@+id/streamingView"
           android:layout_width="match_parent"
           android:layout_height="match_parent"
           android:background="@color/black"
           app:layout_constraintBottom_toBottomOf="parent"
           app:layout_constraintTop_toTopOf="parent" />
      
      </androidx.constraintlayout.widget.ConstraintLayout>
      ```

   3. StreamingFragment에서 FFLStreamer 인스턴스를 생성합니다. ACCESS_TOKEN에는 플립플랍 클라우드 API에서 받은 토큰을 입력합니다.

      ```kotlin
      class StreamingFragment : Fragment() {
          private var streamer: FFLStreamer? = null
      
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              val streamer = FlipFlopLite.getStreamer(ACCESS_TOKEN)
          }
      }
      ```

   4. prepare() 함수를 호출하여 FFLStreamer를 초기화합니다. prepare() 함수는 FFLStreamingView와 FFStreamerConfig를 매개변수로 받습니다.

      * FFStreamerConfig에서 다음을 설정할 수 있습니다.

        | key | description | default |
        | --- | --- | --- |
        | width | 비디오 너비 | 1280 |
        | height | 비디오 높이 | 720 |
        | videoBitrate | 비디오 비트레이트 | 3000 \* 1024 |
        | keyFrameInterval | 키 프레임 간격 | 2 |
        | fps | 프레임 속도 | 30 |
        | sampleRate | 오디오 샘플링 속도 | 48000 |
        | audioBitrate | 오디오 비트레이트 | 128 \* 1024 |
        | cameraPos | 카메라 위치(front 또는 back) | front |

      ```kotlin
      class StreamingFragment : Fragment() {
          private var streamer: FFLStreamer? = null
      
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              val streamer = FlipFlopLite.getStreamer(accessToken)
              streamer?.prepare(requireContext(), binding.streamingView, FFStreamerConfig(videoBitrate = 2000 * 1024, fps = 30, sampleRate = 44100))
          }
      }
      ```

   5. 라이브 제목 설정

      1. 라이브 목록을 가져올 때 표시할 라이브의 제목입니다.

      ```kotlin
      val title = "This is live!"
      streamer?.setVideoInfo(title)
      ```

   6. 라이브 방송 중 애플리케이션에 정보를 알리는 이벤트를 연결합니다.

      * 지원되는 이벤트 중 이번 튜토리얼에서는 다음 이벤트만 연결합니다. 개별 항목에 대한 자세한 설명은 "핸들링 이벤트" 섹션을 참고하세요.

        | event | description |
        | --- | --- |
        | StreamerStateChanged | FFStreamer의 상태를 알립니다. |
        | BroadcastStateChanged | 미디어 스트리밍의 상태를 알립니다. |

      ```kotlin
      class StreamingFragment : Fragment() {
          private var streamer: FFLStreamer? = null
      
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              val streamer = FlipFlopLite.getStreamer(accessToken).apply {
                  prepare(requireContext(), binding.streamingView)
              }
              
              lifecycleScope.launch {
                  streamer?.streamerEvent.collect {
                    event ->
                      when (event) {
                          is StreamerEvent.StreamStateChanged -> {
                              when (event.state) {
                                  StreamState.PREPARED -> {
                                      // 스트리밍이 준비됨
                                  }
                                  StreamState.STARTED -> {
                                      // 스트리밍 시작됨
                                  }
                                  StreamState.STOPPED -> {
                                      // 스트리밍 중지됨
                                  }
                                  StreamState.CLOSED -> {
                                      // 스트리밍 종료됨
                                  }
                              }
                          }
                          is StreamerEvent.LiveExists -> {
                              // 종료되지 않은 비디오 방이 존재함
                              // 이전 라이브를 재시작할지 여부를 결정합니다.
                          }
                          is StreamerEvent.StreamerError -> {
                              // 오류 처리
                          }
                          else -> {
                              // 현재 무시
                          }
                      }
                  }
              }
          }
      }
      ```

      * StreamerState 이벤트

        | state | description |
        | --- | --- |
        | PREPARED | 라이브 준비 완료 |
        | STARTED | 라이브 스트림이 시작됨. 이 상태는 시청자가 방송을 볼 수 있다는 것을 의미하지는 않습니다. |
        | STOPPED | 라이브 스트림이 중단됨. |
        | CLOSED | 라이브가 종료됨. |

      * BroadcastState 이벤트

        | state | description |
        | --- | --- |
        | ACTIVE | 라이브가 진행 중임을 알립니다 (시청자가 방송을 볼 수 있음). |
        | INACTIVE | 라이브가 중단되었음을 알립니다 (시청자가 방송을 볼 수 없음). |

      > StreamerState와 BroadcastState의 차이점: StreamerState는 FFLStreamer의 로컬 상태를 나타내며, BroadcastState는 미디어 서버가 정상적으로 스트리밍하고 있는지를 나타냅니다.
      >
      > 라이브 방송이 성공적으로 시작되면 이벤트가 다음 순서로 발생해야 합니다.
      >
      > \: StreamerState.PREPARED -\> StreamerState.STARTED -\> BroadcastState.ACTIVE

   7. 라이브 스트리밍 시작

      1. 라이브 송출을 시작할 때는 enter()와 start() 함수를 순서대로 호출합니다. enter() 함수는 플립플랍 클라우드 서버에 라이브 시작을 알리고, start() 함수는 미디어 서버에 스트리밍을 시작합니다.

      > 정상적으로 스트리밍 중인지 확인하기: start() 함수를 호출하면 StreamerState.STARTED 이벤트가 먼저 발생하고, BroadcastState.ACTIVE 이벤트가 조금 후에 발생합니다.
      >
      > STARTED와 ACTIVE 사이에는 약간의 시간이 있을 수 있으므로, 진행 중임을 사용자에게 UI로 표시하는 것이 좋습니다.

      ```kotlin
      // 채팅 시작
      streamer?.enter()
      // 스트리밍 시작
      streamer?.start()
      ```

## 5. 라이브 스트리밍 제어

   1. 카메라 제어

      1. 카메라 앱에서 제공하는 것과 유사한 카메라 제어 기능 제공

      ```kotlin
      let liveManager = streamer?.liveManager()
      // 카메라 전환
      liveManager?.switchCamera()
      ```

      | method | description |
      | --- | --- |
      | switchCamera | 카메라 앞/뒤 전환 |
      | videoMirror | 카메라 미러 전환 |
      | zoom | 카메라 줌 설정 |
      | setPointOfInterest | 카메라 초점 설정 |
      | enableAutoFocus | 자동 초점 활성화 |
      | disableAutoFocus | 자동 초점 비활성화 |
      | tapToFocus | 수동 초점 설정 |
      | getExposureCompensationRange | 카메라 노출 정보(min, max, step)를 가져옴 |
      | exposureCompensation | 카메라 노출 설정 |

   2. 비디오 또는 오디오 음소거

      1. 오디오나 비디오를 보내지 않는 기능 제공
         1. 비디오를 보내지 않으려면 muteVideo() 함수를 호출합니다. 현재 오디오 음소거 여부는 isAudioMuted() 함수로 확인할 수 있습니다.
         2. 오디오를 보내지 않으려면 muteAudio() 함수를 호출합니다. 현재 비디오 음소거 여부는 isVideoMuted() 함수로 확인할 수 있습니다.

      ```kotlin
      streamer?.liveManager()?.muteAudio(true)
      // 또는
      streamer?.liveManager()?.muteVideo(true)
      ```

   3. 필터 적용

      1. 다양한 비디오 효과를 위한 다섯 가지 필터 제공
         * TONE_DARK, TONE_DRAMATIC_COOL, TONE_VIVID_DARK, TONE_VIVID_WARM, TONE_WARM

      ```kotlin
      // 다크 필터 적용
      streamer?.liveManager()?.setFilter(TONE_DARK)
      ```

   4. 이미지 효과 적용

      1. 라이브 영상에 애니메이션 GIF를 합성하는 기능 제공.

      > 예: 제품을 판매 중일 때 품절 상태를 재미있는 애니메이션 이미지로 영상에 포함할 수 있습니다.

      ```kotlin
      // raw 디렉토리에서 애니메이션 gif 로드
      val inputStream: InputStream = resources.openRawResource(GIF_RES_ID)
      val scaleMode = FFScaleMode.NONE
      streamer?.liveManager()?.setOverlayImage(inputStream, scaleMode)
      ```

   5. 비트레이트 조정

      1. 비트레이트를 수동으로 조정하지 않고 자동으로 조정하려면 enableAdaptiveBitrate() 함수를 사용하여 adaptiveBitrate 값을 설정할 수 있습니다. disableAdaptiveBitrate() 함수를 호출하면 네트워크 상태에 따라 자동으로 비트레이트를 조정하며, 네트워크와 무관하게 고정된 비트레이트 값으로 방송됩니다.
      2. 라이브 시작 전에 prepare() 함수(FFStreamerConfig)의 매개변수로 비트레이트를 지정할 수 있었습니다. 라이브 중에는 setVideoBitrateOnFly() 함수를 사용하여 비트레이트 값을 변경할 수 있습니다. 항상 고정된 비트레이트로 실행하거나 네트워크가 좋지 않을 때 낮은 비트레이트로 방송하고 싶을 때 사용하십시오.

      ```kotlin
      // 적응형 비트레이트 적용
      streamer?.liveManager()?.enableAdaptiveBitrate()
      // 또는
      streamer?.liveManager()?.disableAdaptiveBitrate()
      
      // 비디오 비트레이트 적용
      let bitrate = 3000 * 1024
      streamer?.liveManager()?.setVideoBitrateOnFly(bitrate)
      ```

   6. 이미지 표시

      1. showImage() 함수는 라이브 방송 중 이미지 표시, hideImage() 함수는 이미지를 제거하고 카메라 화면을 다시 표시하는 데 사용됩니다.
      2. 이미지를 표시할 때 애니메이션을 지정할 수 있습니다. 다음과 같은 애니메이션을 사용할 수 있습니다.

          | animation | description |
          | --- | --- |
          | NONE | 애니메이션 없이 직접 이미지를 표시합니다. |
          | FADE_IN_OUT | 카메라 화면이 페이드 아웃되고 이미지가 페이드 인됩니다. |
          | SLIDE_TO_LEFT | 카메라 화면이 왼쪽으로 사라지고 이미지가 오른쪽에서 나타납니다. |
          | SLIDE_TO_TOP | 카메라 화면이 위쪽으로 사라지고 이미지가 아래쪽에서 나타납니다. |
          | SLIDE_TO_CAMERA_BOTTOM | 카메라 화면이 지정된 비율(cameraRatio)만큼 아래로 내려가고 이미지가 지정된 비율만큼 올라갑니다. |
          | FADE_IN_PIP | 이미지는 서서히 나타나고 카메라 화면은 지정한 크기(pipRatio)와 위치(pipTop, pipRight)로 표시됩니다. |
          | ENTER_TOP | 카메라 화면이 사라지고 이미지가 위쪽에서 나타납니다. |
          | ENTER_FADE_IN | 카메라 화면이 즉시 사라지고 이미지가 서서히 나타납니다. |

      3. 기타 매개변수는 아래에 설명되어 있습니다.

          | Parameter | Description |
          | --- | --- |
          | duration | 애니메이션의 지속 시간을 지정합니다. |
          | pipTop | FADE_IN_PIP 사용 시 카메라 화면이 View의 상단에서 얼마나 떨어져야 하는지를 지정합니다.<br />View 높이의 비율(0.0~1.0f)로 지정합니다.<br />예: 0.1로 설정하면 카메라 화면은 View 높이의 10% 만큼 상단에서 떨어진 위치에 배치됩니다. |
          | pipRight | FADE_IN_PIP 사용 시 카메라 화면이 View의 오른쪽에서 얼마나 떨어져야 하는지를 지정합니다.<br />View 너비의 비율(0.0~1.0f)로 지정합니다.<br />예: 0.2로 설정하면 카메라 화면은 View 너비의 20% 만큼 오른쪽에서 떨어진 위치에 배치됩니다. |
          | pipRatio | FADE_IN_PIP 사용 시 카메라 화면을 얼마나 축소할지를 지정합니다.<br />View 전체 크기의 비율(0.0~1.0f)로 지정합니다.<br />예: 0.2로 설정하면

 카메라 화면은 전체 View 크기의 20%로 축소됩니다. |
          | cameraRatio | SLIDE_TO_CAMERA_BOTTOM 애니메이션 효과를 사용할 때 지정합니다.<br />View 전체 크기의 비율(0.0~1.0f)로 지정합니다.<br />예: 0.7로 설정하면 카메라 화면은 View 전체의 70%를 하단에서 차지하고, View의 상단 30%에는 이미지가 표시됩니다. |

      * Ex: ENTER_TOP

        ```kotlin
        val bitmap: Bitmap = BITMAP_IMAGE
        val transitionParams = FFTransitionParams(
            transitionType = FFTransitionType.ENTER_TOP,
            duration = 1000
        )
        streamer?.liveManager()?.showImage(bitmap, FFScaleMode.CENTER_FIT, transitionParams)
        ```

      * Ex: FADE_IN_PIP

        ```kotlin
        val bitmap: Bitmap = BITMAP_IMAGE
        val transitionParams = FFTransitionParams(
            transitionType = FFTransitionType.FADE_IN_PIP,
            duration = 1000,
            pipTop = 0.2,
            pipRight = 0.2,
            pipRatio = 0.2
        )
        streamer?.liveManager()?.showImage(bitmap, FFScaleMode.CENTER_FIT, transitionParams)
        ```

## 6. 라이브 채팅

   1. 메시지 전송: sendMessage() 함수를 호출하여 채팅 메시지를 보낼 수 있습니다. 이 함수는 suspend 함수이므로 코루틴 내에서 호출해야 합니다.

      ```kotlin
      val message = "Hello!"
      streamer?.liveChat().sendMessage(message)
      ```

   2. 메시지 수신: 메시지가 들어오면 FFLStreamer의 streamerEvent에서 MessageReceived 이벤트가 발생합니다.

      | event | description |
      | --- | --- |
      | MessageReceived | 채팅 메시지가 들어왔음을 알립니다. |

      * MessageReceived 이벤트가 발생하면 다른 사용자가 보낸 메시지를 다음과 같이 처리합니다.

        ```kotlin
        class StreamingFragment : Fragment() {
            ...
        
            override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
                ...
                
                lifecycleScope.launch {
                    streamer?.streamerEvent.collect { event ->
                        when (event) {
                            ...
                            is StreamerEvent.MessageReceived -> {
                                handleMessage(event.message)
                            }
                            ...
                        }
                    }
                }
            }
            
            private fun handleMessage(message: FFLMessage) {
                when (message.origin) {
                    Origin.MEMBER -> {
                        // 회원이 보낸 메시지
                    }
                    else -> {
                        // 현재 무시
                    }
                }
            }
        }
        ```

      * FFLMessage의 내용은 다음과 같습니다.

      | field | description | note |
      | --- | --- | --- |
      | origin | 메시지 유형: MEMBER, APP, SYSTEM | MEMBER: 회원이 보낸 메시지, APP: 앱에서 보낸 메시지, SYSTEM: 시스템에서 보낸 메시지 |
      | appUserId | 사용자 ID |  |
      | appUsername | 사용자 이름 |  |
      | customType | 메시지 구분을 위한 사용자 정의 유형 | origin이 SYSTEM 유형인 경우, "JOINED", "LEFTED", "CHANNEL_STAT_UPDATED"일 수 있습니다. |
      | message | 사용자가 보낸 메시지 |  |
      | participantCount | 참가자 수 |  |

## 7. 라이브 스트리밍 종료

   1. 라이브를 종료할 때는 stop()과 exit() 함수를 순서대로 호출하여 방송을 종료합니다.

      ```kotlin
      // 스트리밍 중지
      streamer?.stop()
      // 채팅 종료
      streamer?.exit()
      ```

## 8. 라이브 시청

   1. 라이브 시청 전 준비 단계로, 다음 네 가지 값이 필요합니다. 액세스 토큰은 위 1.3절에서 설명한 대로 애플리케이션 서버를 통해 얻을 수 있으며, 나머지 항목은 FlipFlop Lite의 [플립플랍 클라우드 - 회원 비디오룸 가져오기 API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-Member-VideoRoom-API.html#get-videorooms)를 통해 얻을 수 있습니다. 이 값들은 SDK에서 직접 제공되지 않으므로, 액세스 토큰과 마찬가지로 애플리케이션 서버를 통해 직접 얻어 클라이언트에 전달해야 합니다.

      1. 액세스 토큰, 비디오룸 ID, 채널 ID, 라이브 URL

   2. 라이브를 시청하기 위한 화면인 StreamingViewFragment 클래스와 그 View를 위한 streaming_view_fragment.xml을 생성합니다.

   3. streaming_view_fragment.xml에서 라이브 시청을 위한 View, FFLLiveView를 생성합니다.

      ```xml
      <?xml version="1.0" encoding="utf-8"?>
      <androidx.constraintlayout.widget.ConstraintLayout
         xmlns:android="http://schemas.android.com/apk/res/android"
         xmlns:app="http://schemas.android.com/apk/res-auto"
         xmlns:tools="http://schemas.android.com/tools"
         android:layout_width="match_parent"
         android:layout_height="match_parent">
      
        <com.jocoos.flipflop.view.FFLLiveView
           android:id="@+id/livePlayerView"
           android:layout_width="match_parent"
           android:layout_height="match_parent"
           android:background="@color/black"
           app:layout_constraintBottom_toBottomOf="parent"
           app:layout_constraintTop_toTopOf="parent" />
      
      </androidx.constraintlayout.widget.ConstraintLayout>
      ```

   4. StreamingViewFragment에서 라이브 시청을 위한 FFLLivePlayer 인스턴스를 생성합니다.

      1. 라이브 시청을 위해 SDK는 FFLLivePlayer를 제공합니다. FFLLivePlayer를 사용하여 쉽게 라이브를 시청하고, 채팅 메시지를 주고받을 수 있습니다.

      2. 인스턴스를 생성할 때 사용자 정보, 액세스 토큰, 비디오룸 ID, 채널 ID가 필요합니다.

         ```kotlin
         class StreamingViewFragment : Fragment() {
             private var _binding: StreamingViewFragmentBinding? = null
             private val binding get() = _binding!!
             
             private var player: FFLLivePlayer? = null
             
             override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
                 val streamer = FlipFlopLite.getLivePlayer(ACCESS_TOKEN, VIDEOROOM_ID, CHANNEL_ID)
             }
         }
         ```

      3. StreamingViewFragment는 ViewBinding을 사용하여 streaming_view_fragment.xml과 연결하고, prepare() 함수를 호출하여 초기화합니다.

         ```kotlin
         class StreamingViewFragment : Fragment() {
             private var _binding: StreamingViewFragmentBinding? = null
             private val binding get() = _binding!!
          
             private var player: FFLLivePlayer? = null
          
             override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
                     val streamer = FlipFlopLite.getLivePlayer(ACCESS_TOKEN, VIDEOROOM_ID, CHANNEL_ID).apply {
                     prepare(requireContext(), binding.livePlayerView)
                 }
             }
         }
         ```

   5. 라이브 시청 중 발생하는 이벤트를 연결합니다. 이번 튜토리얼에서는 라이브 시청과 관련된 PlayerStateChanged 이벤트를 연결합니다. 개별 항목에 대한 자세한 설명은 "이벤트 처리" 부분을 참고하세요.

      1. PlayerStateChanged 이벤트는 라이브 시청 중 플레이어 상태가 변경되었음을 알립니다.

         | event | description |
         | --- | --- |
         | PlayerStateChanged | 라이브 시청 중 플레이어의 상태가 변경되었음을 알립니다. |
         | BroadcastStateChanged | 미디어 스트리밍의 라이브 상태를 알립니다. |

      2. PlayerStateChanged 이벤트의 PlayerState 내용은 다음과 같습니다.

         | state | description |
         | --- | --- |
         | PREPARED | 라이브 시청 준비 완료. |
         | STARTED | 라이브 시청 시작됨. |
         | BUFFERING | 라이브 시청이 일시 중지됨. |
         | STOPPED | 라이브 시청 중지됨. |
         | COMPLETED | 라이브가 종료됨. |
         | CLOSED | 라이브 시청 종료됨. |

      3. BroadcastStateChanged 이벤트의 BroadcastState 내용은 다음과 같습니다.

         | state | description |
         | --- | --- |
         | ACTIVE | 라이브가 진행 중임을 알립니다 (시청자가 방송을 볼 수 있음). |
         | INACTIVE | 라이브가 중단되었음을 알립니다 (시청자가 방송을 볼 수 없음). |

      ```kotlin
      class StreamingViewFragment : Fragment() {
          private var player: FFLLivePlayer? = null
          
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              val streamer = FlipFlopLite.getLivePlayer(ACCESS_TOKEN, VIDEOROOM_ID, CHANNEL_ID).apply {
                  prepare(requireContext(), binding.livePlayerView)
              }
              
              lifecycleScope.launch {
                  player?.livePlayerEvent?.collect { event ->
                      when (event) {
                          is PlayerEvent.PlayerStateChanged -> {
                              when (event.state) {
                                  PlayerState.PREPARED -> {
                                      // 플레이어가 준비됨
                                  }
                                  PlayerState.STARTED -> {
                                      // 플레이어가 시작됨
                                  }
                                  PlayerState.BUFFERING -> {
                                      // 플레이어가 버퍼링 중
                                  }
                                  PlayerState.STOPPED -> {
                                      // 플레이어가 중지됨
                                  }
                                  PlayerState.CLOSED -> {
                                      // 플레이어가 종료됨
                                  }
                                  PlayerState.COMPLETED -> {
                                      // 라이브가 종료됨
                                  }
                              }
                          }
                          is PlayerEvent.BroadcastStateChanged -> {
                              when (event.state) {
                                  BroadcastState.ACTIVE -> {
                                      // 라이브 시작됨
                                  }
                                  BroadcastState.INACTIVE -> {
                                      // 라이브 중단됨
                                  }
                              }
                          }
                          is PlayerEvent.PlayerError -> {
                              // 오류 처리
                          }
                      }
                  }
              }
          }
      }
      ```

   6. 라이브 시청

      1. FFLLivePlayer의 enter()와 start() 함수를 호출하여 라이브 시청을 시작합니다.

         > enter()와 start() 함수로 나뉜 이유는, 시청하기 전에 채팅 메시지를 주고받을 수 있도록 하기 위함입니다.
         >
         > 시청을 시작할 때는 PlayerEvent.STARTED 이벤트가 발생합니다. 이미 미디어 서버가 BroadcastState가 ACTIVE 상태이므로 사용자는 ACTIVE 이벤트를 받지 않습니다. 사용자가 시청을 시작한 후 서버의 상태가 변경되면 BroadcastStateChanged 이벤트를 수신할 수 있습니다.

      ```kotlin
      // 채팅 시작
      player?.enter()
      // 라이브 시청 시작
      player?.start()
      ```

   7. 채팅 메시지 전송 및 수신

      1. 채팅 메시지 전송. 이 함수는 suspend 함수이므로 코루틴 내에서 호출해야 합니다.

          ```kotlin
          val message = "Hello!"
          player?.liveChat().sendMessage(message)
          ```

      2. 사용자가 보낸 메시지를 수신하려면 다음과 같이 처리합니다. 사용자가 보낸 메시지도 MessageReceived 이벤트로 들어오므로, 메시지가 제대로 전송되었는지 확인할 수 있습니다.

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
                      Origin.MEMBER -> {
                          // 사용자가 보낸 메시지
                      }
                      else -> {
                          // 현재 무시
                      }
                  }
              }
          }
          ```

   8. 라이브 시청 종료

      1. stop() 및 exit() 함수를 호출하여 시청을 종료합니다.

      ```kotlin
      // 라이브 시청 종료
      player?.stop()
      // 채팅 종료
      player?.exit()
      ```
