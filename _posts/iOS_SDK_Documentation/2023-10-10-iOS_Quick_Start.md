---
title: Ξ [iOS] 0. Quick Start
author: Soonhyung Hwang
date: 2023-10-10
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

1. Prerequisites

   1. Requirement
      * iOS 14 or higher
      * Xcode 13.4.1 or higher
      * Swift 5.6.1 or higher
   2. Creating Application
      1. To use the SDK, you must first sign up for a membership in the user console on the web and then create an application. Direct membership is currently limited. If you would like to sign up, please contact Jocoos.
   3. Getting Access Token from FlipFlop Lite Server
      1. To send and view live via the SDK, you need to get an access token from the server(due to security issues, the SDK does not provide a way to get an access token directly). You will need to implement your own server to get an access token using the FlipFlop Lite API and then drop it to the client app. For more information on using the API, see the [FlipFlop Lite API](https://jocoos-public.github.io/dev-book/jekyll/2023-07-02-Member_App_API.html) documentation.

2. Installing SDK

   1. Add to the Podfile.

      ```markdown
      target ‘YourProject’ do
          use_frameworks!
      
          # Pods for FlipFlopLiteSDK
          pod 'FlipFlopLiteSDK', '1.3.0'
      
      end
      ```

   2. The SDK requires app permissions to use it. Please add the following permissions to your info.plist.

      ```text
      Privacy - Bluetooth Always Usage Description      
      Privacy - Camera Usage Description
      Privacy - Microphone Usage Description
      ```

   3. In AppDelegate.swift, you'll need to set an AVAudioSession on app startu

      ```swift
      import AVFoundation
      import FlipFlopLiteSDK
      
      func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
         let session = AVAudioSession.sharedInstance()
         do {
             try session.setCategory(.playAndRecord, mode: .default, options: [.defaultToSpeaker, .allowBluetooth])
             try session.setActive(true)
         } catch {
             print(error)
         }
      }
      ```

3. Initializing SDK

Before you can use the features provided by the SDK, you'll need to initialize it. Use .dev to connect to a development server for testing, and .prod to connect to a production server when you're done with development

> For your development convenience, FlipFlop Lite provides a separate server (.dev) to access and test during development and a server (.prod) to access when running the actual service.

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

   1. Create a StreamingController and create an FFLStreamer instance for live broadcasting. In ACCESS_TOKEN, put the token you received through the FlipFlop Lite API

   ```swift
   class StreamingController: UIViewController {
       let streamer = FlipFlopLite.getStreamer(accessToken: ACCESS_TOKEN)
   }
   ```

   2. Call the prepare() function to initialize the FFLStreamer. The prepare() function requires a UIView to view the broadcast screen as a parameter. (You can create the UIView using a storyboard, SnapKit, or any other method you're comfortable with).

      > The preview, which is a UIView, displays the camera screen.

   ```swift
   class StreamingController: UIViewController {
       @IBOutlet weak var preview: UIView!
       
       let streamer = FlipFlopLite.getStreamer(accessToken: ACCESS_TOKEN)
       
       override func viewDidLoad() {
           super.viewDidLoad()
   
           self.preview.bounds = self.view.bounds // full screen view
           self.streamer.prepare(preview: self.preview)
       }
   
   }
   ```

   3. Call the enter() and start() functions in succession when starting a live broadcast.

   > Please refer to the later documentation for the reasons for the split between enter() and start().

   ```swift
   self.streamer?.enter()
   self.streamer?.start()
   ```

   3. When we want to end the live broadcast, we call the stop() and exit() functions in succession.

   > Please refer to the later documentation for the reasons for the split between stop() and exit().

   ```swift
   self.streamer?.stop()
   self.streamer?.exit()
   ```

5. Watching Live

   1. As a prelude to live viewing, you will need the following four values The access token can be obtained through the application server as described in section 1.3 above. The remaining items can be obtained through FlipFlop Lite's [Video List API](https://jocoos-public.github.io/dev-book/jekyll/2023-07-02-VideoRoom_App_API.html). These values are also not provided directly by the SDK, so like the access token, they must be obtained directly through the application server and passed to the client for use.

      1. access token, video room Id, channel Id, live url

   2. Create a StreamingViewController and create an FFLLivePlayer instance for live viewing. The ACCESS_TOKEN is the token received from the FlipFlop Lite API, and the VIDEO_ROOM_ID and CHANNEL_ID are the values received from the live list.

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

   4. When you want to start watching live, you call the enter() and start() functions

      ```swift
      livePlayer.enter()
      livePlayer.start()
      ```

   5. Call the stop() and exit() functions when you want to end the live watch.

      ```swift
      livePlayer.stop()
      livePlayer.exit()
      ```

6. Next step

   1. This is just a quick overview of how to use the SDK. For more information, check out the following articles.

