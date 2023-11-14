---
title: Ξ [iOS] 2. Tutorial
author: Soonhyung Hwang
date: 2023-10-18
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

1. Prerequisites

   1. Requirements

      * iOS 14 or higher
      * Xcode 13.4.1 or higher
      * Swift 5.6.1 or higher

   2. Creating Application

      1. To use the SDK, you must first sign up for a membership in the user console on the web and then create an application. Direct membership is currently limited. If you would like to sign up, please contact Jocoos.

   3. Getting access token from server

      1. You need an access token to use the SDK. The application server uses the FlipFlop Lite API to get an access token and passes it to the client
      2. For more information on using the API, refer the [FlipFlop Lite - Member Login API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login)  documentation.
      3. For more information about access tokens, see the Authentication section of Core Concepts

2. Installing SDK

   1. Add the following to your Podfile

      ```markdown
      target ‘YourProject’ do
          use_frameworks!
      
          # Pods for FlipFlopSDK
          pod 'FlipFlopLiteSDK', '1.3.11'
      
      end

      post_install do |installer|
        installer.pods_project.targets.each do |target|
          target.build_configurations.each do |config|
            config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
            config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.0'
          end
        end
      end
      ```

   2. The SDK requires app permissions to use it. Please add the following permissions to your info.plist.

      ```text
      Privacy - Bluetooth Always Usage Description      
      Privacy - Camera Usage Description
      Privacy - Microphone Usage Description
      ```

   3. In AppDelegate.swift, you'll need to set an AVAudioSession on app startup.

      ```swift
      import AVFoundation
      let session = AVAudioSession.sharedInstance()
      do {
          try session.setCategory(.playAndRecord, mode: .default, options: [.defaultToSpeaker, .allowBluetooth])
          try session.setActive(true)
      } catch {
          print(error)
      }
      ```

3. Initializing SDK

Before you can use the features provided by the SDK, you'll need to initialize it. Use .dev to connect to a development server for testing, and .prod to connect to a production server when you're done with development.

> For the convenience of your development, FlipFlop Lite provides two servers: one for development (.dev) and testing, and one for production (.prod). The production server is the server that runs with the highest priority for stability, while the development server is where new features can be added and tested.

```swift
import FlipFlopLiteSDK

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // connect to flipflop dev server
    let config = FFLConfig(serverConfig: .dev)
    FlipFlopLite.initialize(config: config)
    
    let session = AVAudioSession.sharedInstance()
    do {
        try session.setCategory(.playAndRecord, mode: .default, options: [.defaultToSpeaker, .allowBluetooth])
        try session.setActive(true)
    } catch {
        print(error)
    }
}
```

4. Streaming Live

   1. Create a StreamingController and create an FFLStreamer instance for live broadcasting. In ACCESS_TOKEN, put the token you received through the FlipFlop Lite API.

   ```swift
   class StreamerViewController: UIViewController {
       let streamer = FlipFlopLite.getStreamer(accessToken: ACCESS_TOKEN)
   }
   ```

   2. Call prepare to initialize the FFLStreamer. The prepare() function takes a UIView as its first parameter and an FFStreamerConfig to control the contents of the stream as its second parameter.

      > The preview, which is a UIView, displays the camera screen.

      * You can set the following in FFStreamerConfig

      | Key | Description | default value |
      | --- | --- | --- |
      | preset | video width와 height | hd1280x720 |
      | videoBitrate | video bitrate | 2000 \* 1024 |
      | keyFrameInterval | key frame interval | 2 |
      | fps | framerate | 30 |
      | sampleRate | audio samplerate | 48000 |
      | audioBitrate | audio bitrate | 64 \* 1024 |
      | cameraPos | camera position(front or back) | .front |

   ```swift
   class StreamerViewController: UIViewController {
       @IBOutlet weak var preview: UIView!
       
       let streamer = FlipFlopLite.getStreamer(accessToken: ACCESS_TOKEN)
       
       override func viewDidLoad() {
           super.viewDidLoad()
   
           self.preview.bounds = self.view.bounds // full screen view
           let config = FFStreamerConfig()
           config.videoBitrate = 2500 * 1000
           config.cameraPos = .back
           self.streamer.prepare(preview: self.preview, config: config)
       }
   
   }
   ```

   3. Setting Live Title
      1. You can set the title of the live to be shown when the live list is imported.

   ```
   let title = "This is my first live!"
   self.streamer.setVideoInfo(title: title)
   ```

   4. Connecting an FFLStreamerDelegate to a StreamingController to receive SDK status information

      1. When using FFLStreamer, you can receive information about its internal state via events. You can use this information to check if your live stream is working properly, for example.
      2. The contents of FFLStreamerDelegate are shown below. The thread where the delegate is called may not be the main thread, so you should use DispatchQueue.main to call UI-related parts of the delegate.

      ````swift
      /// > Notice: The thread which the delegate will be called on, is not guranteed to be the `main` thread.
      /// If you will perform any UI update from the delegate, ensure the execution is from the `main` thread.
      ///
      /// ## Example usage
      /// ```swift
      /// func fflStreamer(_ streamer: FFLStreamer, didUpdateStreamerState streamerState: StreamerState) {
      ///   DispatchQueue.main.async {
      ///     // update UI here
      ///   }
      /// }
      /// ```
      public protocol FFLStreamerDelegate: AnyObject {
          // StreamerState is updated    
          func fflStreamer(_ streamer: FFLStreamer, didUpdate streamerState: StreamerState)
          // BroadcastState is updated
          func fflStreamer(_ streamer: FFLStreamer, didUpdate broadcastState: BroadcastState)
          // room for live streaming already exists 
          func fflStreamer(_ streamer: FFLStreamer, didExist videoRoom: FFLVideoRoom)
          // alarm is published
          func fflStreamer(_ streamer: FFLStreamer, didPublish alarmState: AlarmState)
          // video bitrate is changed
          func fflStreamer(_ streamer: FFLStreamer, didChangeVideoBitrate bitrate: Int)
          // camera zoom is changed
          func fflStreamer(_ streamer: FFLStreamer, didChangeZoom zoomFactor: CGFloat)
          // chat message is received
          func fflStreamer(_ streamer: FFLStreamer, didReceive message: FFLMessage)
          // Some error happened
          func fflStreamer(_ streamer: FFLStreamer, didFail error: FFError)
      }
      ````

      * StreamerState: FFLStreamer State

        | state | description |
        | --- | --- |
        | prepared | notify you that you're ready to go live. |
        | started | notify you that your live stream has started. This status does not mean that viewers can see you live. |
        | stopped | notify you that the live stream has been interrupted. |
        | closed | notify you that the live has ended. |
      * BroadcastState: Live State

        | state | description |
        | --- | --- |
        | active | notify you that the live is in progress (viewers can see the live). |
        | inactive | notify you that your live has been interrupted (viewers are unable to watch your live). |

      > Difference between StreamerState and BroadcastState: StreamerState refers to the state of the FFLStreamer locally, while BroadcastState refers to whether the media server is streaming normally.

      * AlarmState: Provides status information about the live streaming

        > The AlarmState received from alarm events currently has three levels, with higher numbers indicating worse conditions. The values of the AlarmState are not called in order: if the transmission suddenly goes bad, alert_3 might be called first.

        | state | description |
        | --- | --- |
        | normal | live streaming is ok |
        | alert_1 | the state of live streaming is slightly poor |
        | alert_2 | live state is worse than alert_1 |
        | alert_3 | live state is worse than alert_2 |

      3. Connect to the StreamingController like this

      ```swift
      extension StreamingController: FFLStreamerDelegate {
          func fflStreamer(_ streamer: FFLStreamer, didUpdate streamerState: StreamerState) {
              print("[STREAMER] didUpdateStreamerState: \(streamerState)")
              switch streamerState {
              case .prepared:
                  print("streamer is prepared")
              case .started:
                  print("streamer is started")
                  retryCount = 0
                  retryTimer?.invalidate()
                  retryTimer = nil
              case .stopped:
                  print("streamer is stopped")
              case .closed:
                  print("streamer is closed")
              default:
                  print("unknown streamState")
              }
          }
          
          func fflStreamer(_ streamer: FFLStreamer, didUpdate broadcastState: BroadcastState) {
              print("[STREAMER] didUpdateBroadcastState: \(broadcastState)")
              switch broadcastState {
              case .active:
                  print("broadcasting is active")
              case .inactive:
                  print("broadcasting is inactive")
              default:
                  print("unknown BroadcastState: \(broadcastState)")
              }
          }
          
          func fflStreamer(_ streamer: FFLStreamer, didExist videoRoom: FFLVideoRoom) {
              print("[STREAMER] didExistStartedVideoRoom: \(videoRoom.id)")
              // restart previous live streaming
              self.fflStreamer?.restart(videoRoomId: videoRoom.id)
          }
          
          func fflStreamer(_ streamer: FFLStreamer, didPublish alarmState: AlarmState) {
              print("[STREAMER] didPublishAlarm: \(alarmState)")
          }
          
          func fflStreamer(_ streamer: FFLStreamer, didChangeVideoBitrate bitrate: Int) {
              print("[STREAMER] didChangeVideoBitrate: \(bitrate)")
          }
          
          func fflStreamer(_ streamer: FFLStreamer, didChangeZoom zoomFactor: CGFloat) {
              print("[STREAMER] didChangeZoom: \(zoomFactor)")
          }
          
          func fflStreamer(_ streamer: FFLStreamer, didReceive message: FFLMessage) {
              print("[STREAMER] didReceiveMessage: ")
          }
          
          func fflStreamer(_ streamer: FFLStreamer, didFail error: FFError) {
              print("[STREAMER] didFail: \(error.code) / \(error.message)")
          }
      }
      ```

   5. When you start a live transmission, you call the enter() and start() functions. The enter() function is called first to tell the FlipFlop Lite server that you want to go live. Then, you call the start() function to start streaming to the media server.

      > Checking if you're streaming normally: When you call the start() function, the StreamerState.started event is fired first, followed by the BroadcastState.active event after a while.
      >
      > There may be a small time lapse between started and active, so it's a good idea to show the user that it's in progress with a UI in between.

   ```swift
   self.streamer?.enter()
   self.streamer?.start()
   ```

   6. Chat Message
      1. To send a chat message, use liveChat()?sendMessage() function.

         ```swift
         let text = "Hello!"
         self.streamer?.liveChat()?.sendMessage(message: text)
         ```

      2. When receiving chat messages, you can do so through the FFLStreamerDelegate described above.

         1. The content of an FFLMessage is as follows

            | field | description | note |
            | --- | --- | --- |
            | origin | message type. MEMBER, APP, SYSTEM | MEMBER: sending by member, APP: sending by app, SYSTEM: sending by system |
            | appUserId | user ID |  |
            | appUsername | username |  |
            | customType | Custom types to distinguish messages | If origin is of type SYSTEM, it can be "JOINED", "LEFTED", or "CHANNEL_STAT_UPDATED". |
            | message | User-sent messages |  |
            | participantCount | the number of participants |  |

      3. ```
         func handleMessage(message: FFLMessage) {
             switch message.origin {
                 case .app:
                     print("message sent by app")
                 case .members:
                     print("message sent by member")
                 case .system:
                     switch message.customType {
                     case "JOINED":
                         print("a user joined")
                     case "LEAVED":
                         print("a user left")
                     case "CHANNEL_STAT_UPDATED":
                         print("participant count is updated")
                     default:
                         break
                 }
             }
         }
         ```
   7. When you want to end a live broadcast, you call the stop() and exit() functions. Calling stop() stops the live stream. Before you call exit(), you can restart the live via start(). When you call exit(), the live ends and cannot be restarted (if you want to restart it, you'll need to open a new live).

   > Calling the exit() function notifies the FlipFlop Lite server that the live has ended. Once the FlipFlop Lite server has properly closed all live-related information, the StreamerState.closed event will be fired. Therefore, you should wait for the closed event to occur without moving the screen.
   >
   > This is because if you leave the screen before the closed event occurs, you may not be able to properly notify the server of the live shutdown.

   ```swift
   self.streamer?.stop()
   self.streamer?.exit()
   ```

5. Watching Live

   1. As a prelude to live viewing, you will need the following four values The access token can be obtained through the application server as described in section 1.3 above. The remaining items can be obtained through FlipFlop Lite's [FlipFlop Lite - Member Get VideoRooms API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-Member-VideoRoom-API.html#get-videorooms). These values are also not provided directly by the SDK, so like the access token, they must be obtained directly through the application server and passed to the client for use.

      1. access token, video room id, channel id, live url

   2. Create a StreamingViewController and create an FFLLivePlayer instance for live viewing. The ACCESS_TOKEN is the token received through the FlipFlop Lite API, and the VIDEO_ROOM_ID and CHANNEL_ID are the values received from the live list.

      ```swift
      class StreamerViewController: UIViewController {
          let livePlayer = FlipFlopLite.getLivePlayer(accessToken: ACCESS_TOKEN, videoRoomId: VIDEO_ROOM_ID, channelId: CHANNEL_ID)
      }
      ```

   3. Call the prepare() function to initialize the FFLLivePlayer. The prepare() function takes a UIView to view the broadcast screen as the first parameter and a URL to watch live as the second parameter.

      ```swift
      class StreamerViewController: UIViewController {
          @IBOutlet weak var view: UIView!
          let livePlayer = FlipFlopLite.getLivePlayer(accessToken: ACCESS_TOKEN, videoRoomId: VIDEO_ROOM_ID, channelId: CHANNEL_ID)
          
          override func viewWillAppear(_ animated: Bool) {
              super.viewWillAppear(animated)
              livePlayer.prepare(view: self.view, uri: LIVE_URL))
          }
          
      }
      ```

   4. Connecting an FFLLivePlayerDelegate to the StreamingViewController to receive SDK status information

      1. When using FFLLivePlayer, you can receive information about its internal state via events. You can use this information to check if the live viewing is going well, etc.

      2. The contents of the FFLLivePlayerDelegate are shown below. The thread where the delegate is called may not be the main thread, so you should use DispatchQueue.main to call UI-related parts of the delegate.

         ```swift
         public protocol FFLLivePlayerDelegate: AnyObject {
             // player state is updated
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate playerState: PlayerState)
             // broadcast state is updated
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate broadcastState: BroadcastState)
             // chat message is received
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didReceive message: FFLMessage)
             // some errror happened
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didFail error: FFError)
         }
         ```

         1. PlayerState notifies you the state of the FFLLivePlayer.

            | state | description |
            | --- | --- |
            | prepared | live player is ready to play live |
            | started | live player is playing live |
            | paused | live player has been paused |
            | stopped | live player has been stopped |
            | completed | live has been finished |
            | closed | 라이브 시청을 중지했다. |

         2. BroadcastState notifies you the state of your live stream.

            | state | description |
            | --- | --- |
            | active | notify you that the live is in progress: viewers can see the live |
            | inactive | notify you that your live has been interrupted: viewers are unable to watch your live |

      3. Connect to the StreamingViewController as shown below.

         ```swift
         extension StreamingViewController: FFLLivePlayerDelegate {
             // player state is updated
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate playerState: PlayerState) {
                 print("[LIVE PLAYER] didUpdatePlayerState: \(playerState)")
             }
             
             // broadcast state is updated
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate broadcastState: BroadcastState) {
                 print("[LIVE PLAYER] didUpdateBroadcastState: \(broadcastState)")
             }
             
             // chat message is received
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didReceive message: FFLMessage) {
                 print("[LIVE PLAYER] didReceiveMessage: \(message.message)")
             }
             
             // some errror happened
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didFail error: FFError) {
                 print("[LIVE PLAYER] didFail: \(error.code) / \(error.message)")
             }
         }
         ```

   5. When you want to start watching live, you call the enter() and start() functions.

      ```swift
      livePlayer.enter()
      livePlayer.start()
      ```

   6. Sending and Receiving chat messages

      1. To send a chat message, use the liveChat()?.sendMessage() function.

         ```swift
         let text = "Hello!"
         livePlayer.liveChat()?.sendMessage(message: text)
         ```

      2. You can receive chat messages through the events of the FFLLivePlayerDelegate described above.

         ```swift
         extension StreamingViewController: FFLLivePlayerDelegate {
             // chat message is received
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didReceive message: FFLMessage) {
                 print("[LIVE PLAYER] didReceiveMessage: \(message.message)")
             }
         }
         ```

   7. Call the stop() and exit() functions when you want to end the live watch.

      ```swift
      livePlayer.stop()
      livePlayer.exit()
      ```

