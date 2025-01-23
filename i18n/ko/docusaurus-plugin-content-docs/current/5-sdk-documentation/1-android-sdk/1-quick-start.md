---
sidebar_position: 1
---

# 빠른 시작

## 1. 사전 준비

1. 요구 사항

    * SDK 24 이상
    * Kotlin 1.6 이상

2. 애플리케이션 생성

    * SDK를 사용하려면 먼저 웹 사용자 콘솔에서 회원 가입 후 애플리케이션을 생성해야 합니다. 현재 직접 가입은 제한되어 있으므로, 가입을 원하시면 Jocoos에 문의하시기 바랍니다.

3. 서버에서 액세스 토큰 받기

    * SDK를 사용하려면 액세스 토큰이 필요합니다. 애플리케이션 서버는 플립플랍 클라우드 API를 사용하여 액세스 토큰을 받아 클라이언트에 전달합니다.
    * API 사용에 대한 자세한 내용은 [플립플랍 클라우드 - 회원 로그인 API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login) 문서를 참고하세요.

## 2. SDK 설치

   1. 프로젝트 루트의 build.gradle에 아래 코드를 추가하세요.

      ```kotlin
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

   3. SDK를 사용하려면 앱 권한이 필요합니다. 라이브 방송을 시작하기 전에 아래 권한을 AndroidManifest.xml에 추가하세요.

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

## 3. SDK 초기화

   * SDK에서 제공하는 기능을 사용하려면 SDK를 초기화해야 합니다. 애플리케이션의 onCreate()에 아래 코드를 추가하세요.

     ```kotlin
     // flipflop 개발 서버에 연결
     val server = FFLServer.DEV
     FlipFlopLite.initialize(context = applicationContext, server = server)
     ```

## 4. 라이브 스트리밍

   1. FFLStreamingView를 생성하여 라이브 방송을 위한 StreamingFragment에 연결합니다. (아래 코드는 전체 카메라 화면을 차지합니다.)

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

   2. 라이브 방송을 위한 StreamingFragment를 생성합니다.

      1. FFLStreamer 인스턴스를 생성합니다. 인스턴스를 생성할 때는 액세스 토큰이 필요합니다.

      ```kotlin
      class StreamingFragment : Fragment() {
          private var streamer: FFLStreamer? = null
      
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              val streamer = FlipFlopLite.getStreamer(
                  accessToken,
              ).apply {
                  prepare(requireContext(), binding.streamingView)
              }
          }
      }
      ```

   3. SDK에서 제공하는 이벤트를 연결하여 정보를 수신합니다.

      ```kotlin
      class StreamingFragment : Fragment() {
          private var streamer: FFLStreamer? = null
      
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              val streamer = FlipFlopLite.getStreamer(
                  accessToken,
              ).apply {
                  prepare(requireContext(), binding.streamingView)
              }
              
              lifecycleScope.launch {
                  streamer?.streamerEvent.collect { event ->
                      when (event) {
                          is StreamerEvent.StreamStateChanged -> {
                              when (event.state) {
                                  StreamState.PREPARED -> {
                                      // 스트리밍 준비 완료
                                  }
                                  StreamState.PREPARING -> {
                                      // 스트리밍 준비 중
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
                          is StreamerEvent.StreamerError -> {
                              // 오류 처리
                          }
                          else -> {
                          
                          }
                      }
                  }
              }
          }
      }
      ```

   4. 라이브 스트리밍 시작

      1. FFLStreamer의 enter()와 start() 함수를 호출하여 방송을 시작하고, stop()과 exit() 함수를 호출하여 방송을 종료합니다. 두 개의 함수를 호출하는 이유에 대한 자세한 내용은 이후 문서에서 설명합니다.

      ```kotlin
      // 스트리밍 시작
      streamer?.enter()
      streamer?.start()
      
      // 스트리밍 중지
      streamer?.stop()
      streamer?.exit()
      ```

## 5. 라이브 시청

   1. StreamingViewFragment를 위한 View를 생성합니다.

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

   2. 라이브 시청을 위한 StreamingViewFragment를 생성합니다.

      1. 라이브 시청을 위한 FFLLivePlayer 인스턴스를 생성합니다. 인스턴스를 생성할 때는 액세스 토큰, 비디오 룸 ID, 채널 ID가 필요합니다.

      ```kotlin
      class StreamingViewFragment : Fragment() {
          private var player: FFLLivePlayer? = null
          
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              val streamer = FlipFlopLite.getLivePlayer(
                  accessToken,
                  VIDEOROOM_ID,
                  CHANNEL_ID
              ).apply {
                  prepare(requireContext(), binding.livePlayerView)
              }
          }
      }
      ```

   3. SDK에서 제공하는 이벤트를 연결하여 정보를 수신합니다.

      ```kotlin
      class StreamingViewFragment : Fragment() {
          private var player: FFLLivePlayer? = null
          
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              val streamer = FlipFlopLite.getLivePlayer(
                  accessToken,
                  VIDEOROOM_ID,
                  CHANNEL_ID
              ).apply {
                  prepare(requireContext(), binding.livePlayerView)
              }
              
              lifecycleScope.launch {
                  player?.livePlayerEvent?.collect { event ->
                      when (event) {
                          is PlayerEvent.PlayerStateChanged -> {
                              when (event.state) {
                                  PlayerState.PREPARED -> {
                                      // 플레이어 준비 완료
                                  }
                                  PlayerState.STARTED -> {
                                      // 플레이어 시작됨
                                  }
                                  PlayerState.BUFFERING -> {
                                      // 플레이어 버퍼링 중
                                  }
                                  PlayerState.STOPPED -> {
                                      // 플레이어 중지됨
                                  }
                                  PlayerState.CLOSED -> {
                                      // 플레이어 종료됨
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

   4. 라이브 시청

      1. FFLLivePlayer의 enter()와 start() 함수를 호출하여 라이브 시청을 시작하고, stop()과 exit()을 호출하여 시청을 종료합니다. 두 개의 함수를 호출하는 이유는 이후 문서에서 설명합니다.

      ```kotlin
      // 라이브 시청 시작
     

      player?.enter()
      player?.start()
      
      // 라이브 시청 종료
      player?.stop()
      player?.exit()
      ```

## 6. 다음 단계

* SDK 사용에 대한 간략한 개요입니다. 자세한 정보는 아래 문서를 참고하세요.
