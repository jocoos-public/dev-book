---
title: Ξ [Android] 1. Tutorial
author: Soonhyung Hwang
date: 2023-10-10
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

1. Prerequisites

   1. Requirement

      * Android SDK 24 or higher
      * Kotlin 1.6 or higher

   2. Creating application

      * To use the SDK, you must first sign up for a membership in the user console on the web and then create an application. Direct membership is currently limited. If you would like to sign up, please contact Jocoos.

   3. Getting access token from server

      * You need an access token to use the SDK. The application server uses the FlipFlop Lite API to get an access token and passes it to the client
      * For more information on using the API, refer the [FlipFlop Lite API](https://jocoos-public.github.io/dev-book/jekyll/2023-07-02-Member_App_API.html) documentation.
      * For more information about access tokens, see the Authentication section of Core Concepts

2. Installing SDK

   1. You need to specify the repository to get the FlipFlop Lite Android SDK from.

      1. Depending on the version of Gradle you're using, the location of the code you need to add may vary.

      2. Add the following to settings.gradle if you are using Gradle 6.8 or later, or to build.gradle if you are using Gradle 6.7 or earlier

      ```kotlin
      // settings.gradle
      // Gradle 6.8 or higher
      dependencyResolutionManagement {
          repositories {
              maven { url 'https://jitpack.io' }
          }
      }
      
      // build.gradle
      // Gradle 6.7 or lower
      allprojects {
          repositories {
              maven { url 'https://jitpack.io' }
          }
      }
      
      ```

   2. Add the code below to the build.gradle of the module you want to use the SDK for.

      ```kotlin
      dependencies {
        implementation(‘com.jocoos.jocoos-public:ff-lite-android-sdk:1.3.5’) {
          transitive = true
        }
      }
      ```

   3. App permissions are required to use the SDK. Add the content below to your AndroidManifest.xml.

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

      1. You must obtain the relevant permissions before going live

         > 참고: [Android Runtime Permission](https://developer.android.com/training/permissions/requesting)

         The example below is a code snippet for a permission request

      ```
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
                      // need live permission
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

3. Initializing SDK

   * Before you can use the features provided by the SDK, you need to initialize the SDK. Add the code below to your application's onCreate().

     ```
     // connect to flipflop dev server
     val server = FFLServer.DEV
     FlipFlopLite.initialize(context = applicationContext, server = server)
     ```

4. Streaming Live

   1. Create a StreamingFragment class that corresponds to a screen for live broadcasting and a View for it, streaming_fragment.xml.

   2. In streaming_fragment.xml, create an FFLStreamingView, which is the View for the live broadcast. (The following will take up the entire camera screen.

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

   3. Create an FFLStreamer instance in the StreamingFragment. In ACCESS_TOKEN, put the token you received via the FlipFlop Lite API

      ```
      class StreamingFragment : Fragment() {
          private var streamer: FFLStreamer? = null
      
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              val streamer = FlipFlopLite.getStreamer(ACCESS_TOKEN)
          }
      }
      ```

   4. Call the prepare() function to initialize the FFLStreamer. The prepare() function takes an FFLStreamingView as its first parameter and an FFStreamerConfig as its second parameter.

      * You can set the following in FFStreamerConfig

        | key | description | default |
        | --- | --- | --- |
        | width | video width | 1280 |
        | height | video height | 720 |
        | videoBitrate | video bitrate | 3000 \* 1024 |
        | keyFrameInterval | key frame interval | 2 |
        | fps | framerate | 30 |
        | sampleRate | audio samplerate | 48000 |
        | audioBitrate | audio bitrate | 128 \* 1024 |
        | cameraPos | camera back or front | front |

      ```
      class StreamingFragment : Fragment() {
          private var streamer: FFLStreamer? = null
      
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              val streamer = FlipFlopLite.getStreamer(accessToken)
              streamer?.prepare(requireContext(), binding.streamingView, FFStreamerConfig(videoBitrate = 2000 * 1024, fps = 30, sampleRate = 44100))
          }
      }
      ```

   5. Set a title for the live.

      1. The title of the live to show when importing the live list.

      ```
      val title = "This is live!"
      streamer?.setVideoInfo(title)
      ```

   6. Connect an event to receive information that notifies your app during a live broadcast

      * Of the supported events, we'll only connect to the following for this tutorial. For a detailed description of the individual items, see "Handling Events".

        | event | description |
        | --- | --- |
        | StreamerStateChanged | notify the state of FFStreamer |
        | BroadcastStateChanged | notify the state of media streaming |

      ```
      class StreamingFragment : Fragment() {
          private var streamer: FFLStreamer? = null
      
          override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
              val streamer = FlipFlopLite.getStreamer(accessToken).apply {
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
                          is StreamerEvent.LiveExists -> {
                              // exists video room that is not closed
                              // decide whether or not restarting previous live
                          }
                          is StreamerEvent.StreamerError -> {
                              // handle error
                          }
                          else -> {
                              // ignore at the moment
                          }
                      }
                  }
              }
          }
      }
      ```

      * StreamerState Event

        | state | description |
        | --- | --- |
        | PREPARED | notify that you are ready to go live |
        | STARTED | notify that you that your live stream has started. This status does not mean that viewers can see you live. |
        | STOPPED | Notify that the live stream has been interrupted. |
        | CLOSED | Notify that the live has ended. |
      * BroadcastState Event

        | state | description |
        | --- | --- |
        | ACTIVE | notify that the live is in progress (meaning viewers can see the live). |
        | INACTIVE | notify that your live has been interrupted (meaning viewers are unable to watch your live). |

      > Difference between StreamerState and BroadcastState: StreamerState refers to the state of the FFLStreamer locally, while BroadcastState refers to whether the media server is streaming normally.
      >
      > If the live broadcast started successfully, events should occur in the following order
      >
      > \: StreamerState.PREPARED -\> StreamerState.STARTED -\> BroadcastState.ACTIVE

   7. Starting Live Streaming

      1. When you start a live transmission, you call the enter() and start() functions. The enter() function is called first to tell the FlipFlop Lite server that you want to go live. Then, you call the start() function to start streaming to the media server.

      > Checking if you're streaming normally: When you call the start() function, the StreamerState.STARTED event is fired first, followed by the BroadcastState.ACTIVE event a short time later.
      >
      > There may be some time between STARTED and ACTIVE, so it's a good idea to show the user that it's in progress with a UI in between.

      ```kotlin
      // start chatting
      streamer?.enter()
      // start streaming
      streamer?.start()
      ```

5. Controlling Live Streaming

   1. Controlling Camera

      1. Providing camera controls similar to those provided by the Camera app

      ```
      let liveManager = streamer?.liveManager()
      // switch camera
      liveManager?.switchCamera()
      ```

      | method | description |
      | --- | --- |
      | switchCamera | switch between camera front and back |
      | videoMirror | switch camera mirror |
      | zoom | setting camera zoom |
      | setPointOfInterest | camera focus |
      | enableAutoFocus | start auto focus |
      | disableAutoFocus | end auto focus |
      | tapToFocus | setting manual focus |
      | getExposureCompensationRange | getting camera exposure info(min, max, step for setting) |
      | exposureCompensation | setting camera exposure |

   2. Mute video or audio

      1. Provides a function that does not send audio or video
         1. When you don't want to send video, you call the muteVideo() function. You can tell if you are currently muting audio or not with the isAudioMuted() function.
         2. When you don't want to send audio, you call the muteAudio() function. The isVideoMuted() function tells us whether the video is currently mute or not.

      ```kotlin
      streamer?.liveManager()?.muteAudio(true)
      // or
      streamer?.liveManager()?.muteVideo(true)
      ```

   3. Applying filters

      1. We offer five filters below for a variety of video effects
         * TONE_DARK, TONE_DRAMATIC_COOL, TONE_VIVID_DARK, TONE_VIVID_WARM, TONE_WARM

      ```kotlin
      // apply dark filter
      streamer?.liveManager()?.setFilter(TONE_DARK)
      ```

   4. Applying Image Effect

      1. Provides the ability to composite animated GIFs over live footage.

      > Example: If you're selling a product and it's out of stock, you could include a fun animated out-of-stock image in your video.

      ```
      // load animated gif from raw directory
      val inputStream: InputStream = resources.openRawResource(GIF_RES_ID)
      val scaleMode = FFScaleMode.NONE
      streamer?.liveManager()?.setOverlayImage(inputStream, scaleMode)
      ```

   5. Adjusting bitrate

      1. If you don't want to manually adjust the bitrate and want it to do it automatically, you can set the adaptiveBitrate value with the enableAdaptiveBitrate() function. If you call the disableAdaptiveBitrate() function, the SDK will automatically adjust the bitrate according to the network conditions, and the live broadcast will be at a fixed bitrate value regardless of the network
      2. Before we went live, we could specify the bitrate as a parameter to the prepare() function (FFStreamerConfig). You can also change the bitrate after you go live: you can specify a value in the setVideoBitrateOnFly() function, which will change the bitrate of the video. Use this if you want it to always run at a fixed bitrate, or if your network is bad and you want to broadcast at a lower bitrate.

      ```
      // apply adaptive bitrate
      streamer?.liveManager()?.enableAdaptiveBitrate()
      // or
      streamer?.liveManager()?.disableAdaptiveBitrate()
      
      // apply video bitrate
      let bitrate = 3000 * 1024
      streamer?.liveManager()?.setVideoBitrateOnFly(bitrate)
      ```

   6. Showing image

      1. The showImage() function is used to show an image in the middle of a live broadcast, and the hideImage() function is used to remove the image and show the camera screen again.
      2. You can specify an animation when showing an image. The following animations are available

      | animation | description |
      | --- | --- |
      | NONE | Shows the image directly without animation. |
      | FADE_IN_OUT | The camera screen will fade out and the image will fade in. |
      | SLIDE_TO_LEFT | The camera screen disappears to the left, and the image appears on the right. |
      | SLIDE_TO_TOP | The camera screen disappears above, and the image appears below. |
      | SLIDE_TO_CAMERA_BOTTOM | The camera screen will be lowered by the specified percentage (cameraRatio) and the image will be raised by the specified percentage. |
      | FADE_IN_PIP | The image will gradually appear and the camera screen will show it at the size (pipRatio) and position (pipTop, pipRight) you specify. |
      | ENTER_TOP | The camera screen fades away, and the image appears from above. |
      | ENTER_FADE_IN | The camera screen immediately disappears, and the image gradually appears. |

      3. Other parameters are described below.

      | Parameter | Description |
      | --- | --- |
      | duration | Specifies the duration of the animation |
      | pipTop | Specifies how far the camera screen should be positioned from the top of the View when using FADE_IN_PIP.<br />It is specified as a ratio to the height of the View (0.0 to 1.0f)<br />Example: If set to 0.1, the camera screen will be positioned at a distance of 10% of the height of the View from the top |
      | pipRight | Specifies how far the camera screen should be positioned from the right side of the View when using FADE_IN_PIP<br />It is specified as a ratio to the width of the View (0.0 to 1.0f)<br />Example: If set to 0.2, the camera screen will be positioned at a distance of 20% of the width of the View from the right side |
      | pipRatio | Specifies how much to shrink the camera screen when using FADE_IN_PIP<br />It is specified as a ratio to the entire size of the View (0.0 to 1.0f)<br />Example: If set to 0.2, the camera screen will be reduced to 20% of the size compared to the entire View |
      | cameraRatio | Specifies when using the SLIDE_TO_CAMERA_BOTTOM animation effect<br />It is specified as a ratio to the entire size of the View (0.0 to 1.0f)<br />Example: If set to 0.7, the camera screen will occupy 70% of the entire View at the bottom, and the top 30% of the View will display the image |

      * Ex: ENTER_TOP

        ```
        val bitmap: Bitmap = BITMAP_IMAGE
        val transitionParams = FFTransitionParams(
            transitionType = FFTransitionType.ENTER_TOP,
            duration = 1000
        )
        streamer?.liveManager()?.showImage(bitmap, FFScaleMode.CENTER_FIT, transitionParams)
        
        ```
      * Ex: FADE_IN_PIP

        ```
        val bitmap: Bitmap = BITMAP_IMAGE
        val transitionParams = FFTransitionParams(
            transitionType = FFTransitionType.ENTER_TOP,
            duration = 1000,
            pipTop = 0.2,
            pipRight = 0.2,
            pipRatio = 0.2
        )
        streamer?.liveManager()?.showImage(bitmap, FFScaleMode.CENTER_FIT, transitionParams)
        
        ```

6. Chatting in Live

   1. Send a message: You can send a chat message by calling the sendMessage() function. This is a suspend function, so you need to call it inside a coroutine.

      ```
      val message = "Hello!"
      streamer?.liveChat().sendMessage(message)
      ```

   2. Receiving a message: When a message comes in, the MessageReceived event is fired on the FFLStreamer's streamerEvent.

      | event | description |
      | --- | --- |
      | MessageReceived | Notify you that a chat message has come in. |

      * When the MessageReceived event occurs, handle messages sent by other users as follows.

        ```
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
                        // message sent by member
                    }
                    else -> {
                        // ignore at the moment
                    }
                }
            }
        }
        ```
      * The content of an FFLMessage is as follows

      | field | description | note |
      | --- | --- | --- |
      | origin | message type: MEMBER, APP, SYSTEM | MEMBER: sending by member, APP: sending by app, SYSTEM: sending by system |
      | appUserId | user ID |  |
      | appUsername | username |  |
      | customType | Custom types to distinguish messages | If origin is of type SYSTEM, it can be "JOINED", "LEFTED", or "CHANNEL_STAT_UPDATED". |
      | message | User-sent messages |  |
      | participantCount | Number of participants |  |

7. Ending Live Streaming

   1. When we want to end the live, we call the stop() and exit() functions to end the broadcast.

      ```
      // stop streaming
      streamer?.stop()
      // close chatting
      streamer?.exit()
      ```

8. Watching Live

   1. As a prelude to live viewing, you will need the following four values The access token can be obtained through the application server as described in section 1.3 above. The remaining items can be obtained through FlipFlop Lite's [Video List API](https://github.com/jocoos-repos/ff-lite-api-kotlin-docs/blob/main/App-VideoRoom-API.md#VideoRoom-%EB%AA%A9%EB%A1%9D-%EC%A1%B0%ED%9A%8C). These values are also not provided directly by the SDK, so like the access token, they must be obtained directly through the application server and passed to the client for use.

      1. access token, video room id, channel id, live url

   2. Create a StreamingViewFragment class for the screen you're watching live, and a streaming_view_fragment.xml for its View.

   3. In streaming_view_fragment.xml, we create a View, FFLLiveView, for live viewing.

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

   4. In the StreamingViewFragment, we create an FFLLivePlayer instance that we use for live viewing.

      1. For live viewing, the SDK provides FFLLivePlayer. With FFLLivePlayer, you can easily watch live and send and receive chat messages.

      2. When creating an instance, you'll need user information, access token, video room ID, and channel ID.

         ```
         class StreamingViewFragment : Fragment() {
             private var _binding: StreamingViewFragmentBinding? = null
             private val binding get() = _binding!!
             
             private var player: FFLLivePlayer? = null
             
             override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
                 val streamer = FlipFlopLite.getLivePlayer(ACCESS_TOKEN, VIDEOROOM_ID, CHANNEL_ID)
             }
         }
         ```

      3. The StreamingViewFragment uses a ViewBinding to associate with streaming_view_fragment.xml and calls the prepare() function for initialization.

         ```
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

   5. Connect events that occur during live viewing. In this tutorial, we'll connect the PlayerStateChanged related to watching live. For more information on the individual items, please refer to the "Handling Event" part.

      1. The PlayerStateChanged event notifies you that the state of a player watching your live has changed.

         | event | description |
         | --- | --- |
         | PlayerStateChanged | notify that the status of a player watching your live has changed. |
         | BroadcastStateChanged | notify that the live status of the media streaming. |

      2. The contents of the PlayerState in the PlayerStateChangd event are as follows

         | state | description |
         | --- | --- |
         | PREPARED | notify ready to watch live. |
         | STARTED | notify that you started watching live. |
         | BUFFERING | notify that you were paused live viewing. |
         | STOPPED | notify that you stopped live watching |
         | COMPLETED | notify that live has been finished |
         | CLOSED | notify that you ended live watching |

      3. The BroadcastState in the BroadcastStateChanged event has the following contents

         | state | description |
         | --- | --- |
         | ACTIVE | notify you that the live is in progress (meaning viewers can see the live). |
         | INACTIVE | notify you that your live has been interrupted (meaning viewers are unable to watch your live). |

      ```
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
                                  PlayerState.COMPLETED -> {
                                      // live is completed
                                  }
                              }
                          }
                          is PlayerEvent.BroadcastStateChanged -> {
                              when (event.state) {
                                  BroadcastState.ACTIVE -> {
                                      // live has been started
                                  }
                                  BroadcastState.INACTIVE -> {
                                      // live has been stopped
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

   6. Watching Live

      1. Call FFLLivePlayer's enter() and start() functions to start watching.

         > The reason it's split into two functions, enter() and start(), rather than one function call: so that you can send and receive chat messages before you watch.
         >
         > When they start watching, the PlayerEvent.STARTED event is fired. Because the media server already has a BroadcastState of ACTIVE, the user does not receive an ACTIVE event. If the server's state changes after the user starts watching, you can receive a BroadcastStateChanged event.

      ```kotlin
      // start chatting
      player?.enter()
      // start watching live
      player?.start()
      ```

   7. Sending and Receiving chatting message

      1. Send a chat message. This is a suspend function, so you need to call it inside a coroutine.

      ```
      val message = "Hello!"
      player?.liveChat().sendMessage(message)
      ```

      2. To receive a message sent by a user, do the following The message you sent also comes in as a MessageReceived event, so you can verify that the message you sent was sent properly.

      ```
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
                      // message sent by user
                  }
                  else -> {
                      // ignore at the moment
                  }
              }
          }
      }
      ```

   8. Ending Live Watching

      1. Call the stop() and exit() functions to end the watch

      ```kotlin
      // stop watching live
      player?.stop()
      // close chatting
      player?.exit()
      ```

