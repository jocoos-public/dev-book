---
title: Ξ [Android] 3. Core Concepts
author: Soonhyung Hwang
date: 2023-10-18
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

## Connecting to Server

By default, FlipFlop Lite provides two kinds of servers: one to use during pre-service development (the development server) and one to use when providing the actual service (the production server).

you specify the server to use when initializing the SDK like below.

```
// connect to flipflop dev server
val server = FFLServer.DEV // or FFLServer.PROD
FlipFlopLite.initialize(applicationContext, server = server)
```

FlipFlop Lite also provides a dedicated server upon request. The advantage of a dedicated server is that by building a separate server for your service, you can customize the server according to your requirements. In this case, you initialize the SDK by entering the server address directly as shown below.

```
// connect to a dedicated server
val serverUri = "SERVER_ADDRESS" // replace SERVER_ADDRESS to your server address
FlipFlopLite.initialize(applicationContext, serverUri = serverUri)
```

## Authentication

For a FlipFlop SDK to successfully connect to the server, it needs an access token.

Access token is not provided in the SDK, so you need to get it separately through the [Member Login API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login)

> Getting an access token: It is recommended to get the access token from FlipFlop Lite through the application server and then pass it to the client. We do not recommend using the Member Login API directly on the client to get the access token.

You need the following items to get an access token.

* AppKey, AppSecret: It is generated when you create an application in the user console.
* appUserId, appUserName, appUserProfileImgUrl
  * 'appUserId' is required. 'appUserName' and 'appUserProfileImgUrl' are optional.

> We recommend that you use the same user information as the service you're creating

Flow for getting an access token

1. Signing up in the user console
2. Creating an application
3. Saving the 'AppKey' and 'AppSecret' generated when creating the application
4. Using the Member Login API with the 'AppKey' and 'AppSecret' to get an access token
5. Passing the access token to the client

## Handling Events

The FlipFlop Lite Android SDK uses Flow to notify event into the application.

Here are the events that each class provides

| class | event |
| --- | --- |
| FFLStreamer | streamerEvent |
| FFLLivePlayer | livePlayerEvent |
| FFLVodPlayer | vodPlayerEvent |

1. You can receive events in FFLStreamer like below

```
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

* Events provided

| event | description |
| --- | --- |
| StreamerStateChanged | notify the state of the FFStreamer. |
| BroadcastStateChanged | notify the state of the live streaming |
| LiveExists | notify that there is a live that hasn't finished yet |
| StreamAlarmPublished | notify about network state in live streaming |
| CameraZoomChanged | notify that camera zoom has been changed |
| VideoBitrateChanged | notify that the video bitrate has been changed |
| ChannelOpened | notify that channel is opened |
| MessageReceived | notify that a message is received |
| StreamerError | notify that error happend |

Let's take a closer look at each of these events.

* StreamerStateChanged event

  | state | description |
  | --- | --- |
  | PREPARED | notify that you're ready to go live. |
  | STARTED | notify that your live stream has started. This status does not mean that viewers can see your live. |
  | STOPPED | notify that the live stream has been stopped. |
  | CLOSED | notify that the live has finished. |
* BroadcastStateChanged event

  | state | description |
  | --- | --- |
  | ACTIVE | notify that the live is in progress: viewers can see the live. |
  | INACTIVE | notify that the live has been stopped: viewers are unable to watch your live. |

  > Difference between StreamerState and BroadcastState: StreamerState refers to the state of the FFLStreamer locally, while BroadcastState refers to whether your live is streamed normally by the media server.
  >
  > When the live streaming is started by calling the FFLStreamer's start() function, the StreamerState is changed to STARTED. However, this does not mean that the viewers will be able to see your live; it may take some time for the media server to prepare for viewers to see your live. Once this preparation is complete and the server is ready to broadcast live to viewers, the BroadcastState will be changed to ACTIVE.
  * In a normal case, when using FFLStreamer to broadcast live, the following state will occur in sequence. Since it may take some time to go from STARTED to ACTIVE, we recommend showing something like "In Progress..." in the UI.
    * StreamerState.PREPARED -\> Streamer.State.STARTED -\> BroadcastState.ACTIVE
* LiveExists event
  * A user can't have more than one live at the same time, so the previous live must finish before a new live starts. If there is a live that hasn't finished, LiveExists event is notified. When the LiveExists event is received, the ongoing live information is provided: videoRoom.id. So, if you want to restart the previous live, call the restart() function of the FFLStreamer with the videoRoom id.

  ```kotlin
  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
      lifecycleScope.launch {
          streamer?.streamerEvent.collect { event ->
              when (event) {
                  is StreamerEvent.LiveExists -> {
                      // exists live that is not closed
                      // decide whether or not restarting previous live
                      streamer.restart(event.videoRoom.id)
                  }
                  ...
              }
          }
      }
  }
  ```
* StreamAlarmPublished event

  | state | description |
  | --- | --- |
  | NORMAL | live streaming is ok |
  | ALERT_1 | the state of live streaming is slightly poor |
  | ALERT_2 | live state is worse than alert_1 |
  | ALERT_3 | live state is worse than alert_2 |

  * The AlarmState by alarm events currently has three levels, with higher numbers indicating worse conditions.
  * The values of the AlarmState are not called in order: if the network state suddenly goes bad, ALERT_3 might be called first.
* CameraZoomChanged event
  * Zoom events can occur in two ways.
    1. you call FFLStreamer's liveManager()?.zoom() function so that you change the zoom value directly.
    2. pinch zoom in FFLStreamerView
* VideoBitrateChanged event
  * the bitrate value will be adjusted based on network conditions if you enabled adaptive bitrate configuration.
  * applying adaptive bitrate in live streaming

  ```kotlin
  // call after prepare()
  streamer?.liveManager()?.enableAdaptiveBitrate()
  ```
* ChannelOpened event
  * A chat message will be sent after this event has happened.
* MessageReceived event
  * For more information, see the "Chat Messages" part.
* StreamError event
  * For more information, see the "Handling Error" part.

## Chat Messages

1. Sending a chat message

   1. To send a chat message, call the liveChat()?.sendMessage() function on the FFLStreamer or FFLLivePlayer.

   > The sendMessage() function is a suspend function and must be called inside a coroutine.

   ```kotlin
   // call it inside coroutine
   // FFLStreamer
   streamer?.liveChat()?.sendMessage("Hello")
   
   // FFLLivePlayer
   livePlayer?.liveChat()?.sendMessage("Good day")
   ```

2. Receiving a chat message

   1. You can receive chat messages in the MessageReceived events of FFLStreamer.streamerEvent and FFLLivePlayer.playerEvent.

   2. The message delivered in the MessageReceived event is of type FFLMessage, with the following content

      | field | description | note |
      | --- | --- | --- |
      | origin | message type. MEMBER, APP, SYSTEM | MEMBER: sending by member, APP: sending by app, SYSTEM: sending by system |
      | appUserId | user id |  |
      | appUsername | username |  |
      | customType | custom type to distinguish message | if origin is of type SYSTEM, it can be "JOINED", "LEAVED", "CHANNEL_STAT_UPDATED". |
      | message | user sent messages |  |
      | participantCount | number of participants |  |

   3. Handling messages

      1. Handling user join and leave
         1. user joined
            1. message.origin: Origin.SYSTEM
            2. message.customType: "JOINED"
         2. user left
            1. message.origin: Origin.SYSTEM
            2. message.customType: "LEAVED"
      2. Handling the number of participants
         1. message.origin: Origin.SYSTEM
         2. message.customType: "CHANNEL_STAT_UPDATED"
      3. Handling user sent messages
         1. message.origin: Origin.MEMBER

   4. Code snippet for receiving messages in FFLStreamer.

      ```
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
                      // message sent by app
                  }
                  Origin.MEMBER -> {
                      // message sent by member
                  }
                  Origin.SYSTEM -> {
                      // message sent by system
                      when (message.customType) {
                          "JOINED" -> {
                              // an user joined
                          }
                          "LEAVED" -> {
                              // an user left
                          }
                          "CHANNEL_STAT_UPDATED" -> {
                              // participant count is updated
                          }
                          else -> {
                              // ignore at the moment
                          }
                      }
                  }
                  else -> {
                      // ignore at the moment
                  }
              }
          }
      }
      ```

   5. Code snippet for receiving messages in FFLLivePlayer

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
                  Origin.APP -> {
                      // message sent by app
                  }
                  Origin.MEMBER -> {
                      // message sent by user
                  }
                  Origin.SYSTEM -> {
                      // message sent by system
                      when (message.customType) {
                          "JOINED" -> {
                              // an user joined
                          }
                          "LEAVED" -> {
                              // an user left
                          }
                          "CHANNEL_STAT_UPDATED" -> {
                              // participant count is updated
                          }
                          else -> {
                              // ignore at the moment
                          }
                      }
                  }
                  else -> {
                      // ignore at the moment
                  }
              }
          }
      }
      ```

## Handling Error

* SDK for Android notifies error code when error happened.
* These errors can be caused by the client app side or server side
  * StreamerError in FFLStreamer, PlayerError in FFLLivePlayer and FFLVodPlayer
* Error Events

  | Error | code | description |
  | --- | --- | --- |
  | MEDIA_CONNECTION_FAILED | 80100 | failed to connect to media server |
  | MEDIA_STREAMING_REQUEST_FAILED | 80101 | failed to start streaming |
  | MEDIA_STREAMING_SEND_FAILED | 80102 | failed to send data to media server |
  |  |  |  |
  | CHANNEL_UNEXPECTED_ERROR | 80200 | happened unexpected error |
  | CHANNEL_INVALID_MESSAGE | 80201 | failed to parse response |
  | CHANNEL_MESSAGE_SEND_ERROR | 80202 | failed to send a chat message |
  |  |  |  |
  | SERVER_ERROR | 80400 | failed to handle server response |
  | SERVER_UNEXPECTED_ERROR | 80401 | happened unexpected error |
  | SERVER_INVALID_VIDEO_ROOM_ID | 80402 | invalid video room id |
  | SERVER_STREAM_KEY_GET_ERROR | 80403 | failed to get stream key |
  | SERVER_VIDEO_ROOM_CREATE_ERROR | 80404 | failed to create video room |
  | SERVER_VIDEO_ROOM_GET_ERROR | 80405 | failed to get video room |
  | SERVER_VIDEO_ROOM_JOIN_ERROR | 80406 | failed to join video room |
  | SERVER_VIDEO_ROOM_START_ERROR | 80407 | failed to start video room |
  | SERVER_VIDEO_ROOM_LEAVE_ERROR | 80408 | failed to leave video room |
  | SERVER_VIDEO_ROOM_END_ERROR | 80409 | failed to end video room |
* code snippet for FFLStreamer

  ```
  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
      lifecycleScope.launch {
          streamer?.streamerEvent.collect { event ->
              when (event) {
                  is StreamerEvent.StreamerError -> {
                      // handle error: code and message
                  }
              }
          }
      }
  }
  ```
* code snippet for FFLLivePlayer

  ```
  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
      lifecycleScope.launch {
          player?.playerEvent.collect { event ->
              when (event) {
                  is PlayerEvent.PlayerError -> {
                      // handle error: code and message
                  }
              }
          }
      }
  }
  ```
