---
title: Ξ [Android] 1. Quick Start
author: Soonhyung Hwang
date: 2023-10-18
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

1. Prerequisites
   1. Requirement

      * SDK 24 or higher
      * Kotlin 1.6 or higher

   2. Creating application

      * To use the SDK, you must first sign up for a membership in the user console on the web and then create an application. Direct membership is currently limited. If you would like to sign up, please contact Jocoos.

   3. Getting access token from server

      * You need an access token to use the SDK. The application server uses the FlipFlop Lite API to get an access token and passes it to the client
      *  For more information on using the API, refer the [FlipFlop Lite - Member Login API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login) documentation.
2. Installing SDK
   1. Add the code below to build.gradle in the root of your project.

      ```kotlin
      allprojects {
          repositories {
              maven { url 'https://jitpack.io' }
          }
      }
      ```

   2. Add the code below to the build.gradle of the module you want to use the SDK for.

      ```kotlin
      dependencies {
        implementation(‘com.jocoos.jocoos-public:ff-lite-android-sdk:1.3.10’) {
          transitive = true
        }
      }
      ```

   3. You need app permissions to use the SDK. You must have these permissions before you can go live. Add the following to your AndroidManifest.xml.

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
3. Initializing SDK
   * Before you can use the features provided by the SDK, you need to initialize the SDK. Add the code below to your application's onCreate().

     ```
     // connect to flipflop dev server
     val server = FFLServer.DEV
     FlipFlopLite.initialize(context = applicationContext, server = server)
     ```
4. Streaming live
   1. Create an FFLStreamingView that connects to the StreamingFragment you use for live broadcasting. (The following will take up the entire camera screen.)

      ```
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

   2. Create a StramingFragment for live broadcasting.

      1. Creates an FFLStreamer instance for live broadcasting. When creating an instance, you need access token.

      ```
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

   3. Connect events to receive information that the SDK tells your application

      ```
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
                                      // streaming is prepared
                                  }
                                  StreamState.PREPARING - {
                                      // streaming is preparing
                                  }
                                  StreamState.STARTED -> {
                                      // streaming is started
                                  }
                                  StreamState.STOPPED -> {
                                      // streaming is stopped
                                  }
                                  StreamState.CLOSED -> {
                                      // streaming is closed
                                  }
                              }
                          }
                          is StreamerEvent.StreamerError -> {
                              // handle error
                          }
                          else -> {
                          
                          }
                      }
                  }
              }
          }
      }
      ```

   4. Starting live streaming

      1. Call the FFLStreamer's enter() and start() functions to start broadcasting, and call the stop() and exit() functions to end broadcasting. For more information on why you need to call two functions instead of one, see a later article.

      ```kotlin
      // start streaming
      streamer?.enter()
      streamer?.start()
      
      // stop streaming
      streamer?.stop()
      streamer?.exit()
      ```
5. Watching live
   1. Create a View for the StreamingViewFragment.

      ```
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

   2. Create a StreamingViewFragment for viewing live.

      1. Create an FFLLivePlayer instance for live viewing. When creating an instance, you need access token, video room ID, and channel ID.

      ```
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

   3. Connect events to receive information that the SDK tells your application.

      ```
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
                                      // player is prepared
                                  }
                                  PlayerState.STARTED -> {
                                      // player is started
                                  }
                                  PlayerState.BUFFERING -> {
                                      // player is buffering
                                  }
                                  PlayerState.STOPPED -> {
                                      // player is stopped
                                  }
                                  PlayerState.CLOSED -> {
                                      // player is closed
                                  }
                              }
                          }
                          is PlayerEvent.PlayerError -> {
                              // handle error
                          }
                      }
                  }
              }
          }
      }
      ```

   4. Watching live

      1. Call FFLLivePlayer's enter() and start() functions to start watching, and stop() and exit() to end watching. See a later article on why you need to call two functions instead of one.

      ```
      // start watching live
      player?.enter()
      player?.start()
      
      // stop watching live
      player?.stop()
      player?.exit()
      ```
6. Next step
   * This is just a quick overview of how to use the SDK. For more information, check out the following articles.

