---
sidebar_position: 1
---

# Quick Start

## 1. Prerequisites

   1. Requirement
      * SDK 24 or higher
      * Kotlin 1.6 or higher

   2. Creating application
      * To use the SDK, you must first sign up for a membership in the user console on the web and then create an application. Direct membership is currently limited. If you would like to sign up, please contact Jocoos.

   3. Getting access token from server
      * You need an access token to use the SDK. The application server uses the FlipFlop Cloud API to get an access token and passes it to the client

## 2. Installing SDK

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
        implementation(‘com.jocoos.jocoos-public:ffc-sdk-client-android:1.1.3’)
      }
      ```

   3. You need app permissions to use the SDK. You must have these permissions before you can go live. Add the following to your AndroidManifest.xml.

      ```xml
      <uses-permission android:name="android.permission.INTERNET"/>
      <uses-permission android:name="android.permission.CAMERA"/>
      <uses-permission android:name="android.permission.RECORD_AUDIO"/>
      
      <uses-feature
          android:name="android.hardware.camera"
          android:required="false" />
      ```

## 3. Usage

FlipFlop relies on the RECORD_AUDIO and CAMERA permissions to use the microphone and camera. These permission must be requested at runtime. Reference the sample app for an example

1. Managing video room
   * Call following method to get instance for video room

        ```kotlin
        // server_url: FlipFlop Cloud server address
        // access_token: access token
        val api = FFCloudSDK.api(serverUrl, accessToken)
        ```

   * Providing following functions
     * Creating video room
  
       ```kotlin
       // title: title
       // description: description
       // password: VideoRoom password for joining
       // customType: custom type
       // customData: custom data Key-Value Pair
       api.createVideoRoom(title, description, password, customType, customData)
       ```

     * Getting video room info

       ```kotlin
       // videoRoomId: video room's id
       api.getVideoRoom(videoRoomId)
       ```

     * Getting video room list

       ```kotlin
       // videoRomState: state
       // type: type
       // sortBy: sort
       // page: page number
       // pageSize: page size
       api.listVideoRooms(videoRoomState, type, sortBy, page, pageSize)
       ```

     * Getting webrtc information for joining in video room

       ```kotlin
       // videoRoomId: 
       // password: video room password
       // customData: custom data Key-Value Pair
       api.issueWebRtcVideoRoomToken(videoRoomId, password, customData)
       ```

2. Joining in a video room
   1. Creating video room instance
  
      ```kotlin
      // webRtcServerUrl, webRtcToken: values from issueWebRtcVideoRoomToken
      val videoRoom = FFCloudSDK.connectWebRtcVideoRoom(applicationContext, webRtcServerUrl, webRtcToken)
      // R.id.renderer: a view for participant's screen
      // R.id.local_camera: a view for my camera screen
      videoRoom.initVideoRenderer(findViewById<FFCSurfaceViewRenderer>(R.id.renderer))
      videoRoom.initVideoRenderer(findViewById<FFCTextureViewRenderer>(R.id.local_camera))
      ```

   2. Registering events
  
      ```kotlin
      videoRoom.events.collect { event ->
        when (event) {
          is FFCVideoRoomEvent.Disconnected -> {
              // video room was disconnected
          }
          is FFCVideoRoomEvent.TrackSubscribed -> {
              // the participant has subscribed to a track
          }
          is FFCVideoRoomEvent.TrackUnsubscribed -> {
              // a previously subscribed track has been unsubscribed
          }
          else -> {}
        }
      }
      ```

   3. Displaying my camera

      ```kotlin
      val renderer = findViewById<FFCTextureViewRenderer>(R.id.local_camera)
      videoRoom.attachLocalVideo(viewRenderer = renderer, enableMicrophone = false, enableCamera = true)
      ```

   4. Displaying participant's screen
      * connecting between track and view when 'TrackSubscribed' event happened

      ```kotlin
      val remoteRenderer = findViewById<FFCSurfaceViewRenderer>(R.id.renderer)
      videoRoom.attachRemoteVideo(track, remoteRenderer)
      ```

## 4. Reference

* [SDK Sample](https://github.com/jocoos-public/ffc-sdk-client-android-sample)
