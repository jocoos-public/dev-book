---
sidebar_position: 1
---

# Quick Start

## 1. Prerequisites

1. Requirement
   * iOS 14 or higher
   * Xcode 13.4.1 or higher
   * Swift 5.6.1 or higher
2. Creating Application
   * To use the SDK, you must first sign up for a membership in the user console on the web and then create an application. Direct membership is currently limited. If you would like to sign up, please contact Jocoos.
3. Getting Access Token from FlipFlop Cloud Server
   * To send and view live via the SDK, you need to get an access token from the server(due to security issues, the SDK does not provide a way to get an access token directly). You will need to implement your own server to get an access token using the FlipFlop Cloud API and then drop it to the client app. For more information on using the API, see the [FlipFlop Cloud - Member Login API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login) documentation.

## 2. Installing SDK

1. Available as a Swift Package 
   * Go to Project Settings -> Swift Packages.
   * Add a new package and enter: https://github.com/jocoos-public/ffc-sdk-client-ios-dist.git
2. The SDK requires app permissions to use it. Please add the following permissions to your info.plist.

   ```text
   Privacy - Camera Usage Description
   Privacy - Microphone Usage Description
   ```

## 3. Usage

1. Managing video room
   * Call following method to get api instance for managing video room

      ```swift
      // server_url: FlipFlop Cloud server address
      // access_token: access token
      val api = FFCloudSDK.api(url: serverUrl, accessToken: accessToken)
      ```

   * Providing following functions
     * Creating video room

       ```swift
       // title: title
       // description: description
       // password: VideoRoom password for joining
       // customType: custom type
       // customData: custom data Key-Value Pair
       api.createVideoRoom(title: title, description: description, password: password, customType: customType, customData: customData)
       ```

     * Getting video room info

       ```swift
       // videoRoomId: video room's id
       api.getVideoRoom(videoRoomId)
       ```

     * Getting video room list

       ```swift
       // videoRomState: state
       // type: type
       // sortBy: sort
       // page: page number
       // pageSize: page size
       api.listVideoRooms(videoRoomState: videoRoomState, type: type, sortBy: sortBy, page: page, pageSize: pageSize)
       ```

     * Getting webrtc information for joining in video room

       ```swift
       // videoRoomId: video room id
       // password: video room password
       // customData: custom data Key-Value Pair
       api.issueWebRtcVideoRoomToken(videoRoomId: videoRoomId, password: password, customData: customData)
       ```

2. Joining in a video room
   * You must declare camera and microphone permissions, if needed in your **Info.plist** file

     ```swift
     Privacy - Camera Usage Description
     Privacy - Microphone Usage Description
     ```

   * Connecting to a room always requires two parameters: webRtcServerUrl and webRtcToken
     * You can get it from **issueWebRtcVideoRoomToken** method by api instance
   * The thread which the delegate will be called on is not guaranteed to be the **main**
     * If you will perform any UI update from the delegate, ensure the execution is from the **main**

     ```swift
     import AVFoundation
     import FFCloudSDK
     import LiveKit
     import UIKit

     class VideoRoomViewController: UIViewController {
        var webRtcServerUrl: String = ""
        var webRtcToken: String = ""

        @IBOutlet weak var localVideoView: UIView!
        @IBOutlet weak var remoteVideoView: UIView!

        lazy var room = Room(delegate: self)

        override func viewDidLoad() {
           super.viewDidLoad()

           self.view.backgroundColor = .white

           Task {
                 do {
                    let roomOptions = RoomOptions(
                       defaultCameraCaptureOptions: CameraCaptureOptions(dimensions: Dimensions(width: 1280, height: 720)),
                       defaultVideoPublishOptions: VideoPublishOptions(encoding: VideoEncoding(maxBitrate: 1_700_000, maxFps: 30))
                    )
                    try await room.connect(url: webRtcServerUrl, token: webRtcToken, roomOptions: roomOptions)
                    // Connection successful...

                    // Publishing camera & mic...
                    try await room.localParticipant.setCamera(enabled: true)
                    try await room.localParticipant.setMicrophone(enabled: true)
                 } catch {
                    // Failed to connect
                 }
           }
        }

        override func viewDidDisappear(_ animated: Bool) {
           super.viewDidDisappear(animated)
           Task {
                 await room.disconnect()
           }
        }
     }

     extension VideoRoomViewController: RoomDelegate {
        func roomDidConnect(_ room: Room) {
           DispatchQueue.main.async {
           }
        }

        func room(_ room: Room, didFailToConnectWithError error: LiveKitError?) {
           DispatchQueue.main.async {
           }
        }

        func room(_ room: Room, didDisconnectWithError error: LiveKitError?) {
           DispatchQueue.main.async {
           }
        }

        func room(_ room: Room, participant _: LocalParticipant, didPublishTrack publication: LocalTrackPublication) {
           guard let track = publication.track as? VideoTrack else { return }
           DispatchQueue.main.async {
                 let videoView = VideoView(frame: self.localVideoView.bounds)
                 self.localVideoView.addSubview(videoView)
                 videoView.track = track
           }
        }

        func room(_ room: Room, participant _: RemoteParticipant, didSubscribeTrack publication: RemoteTrackPublication) {
           guard let track = publication.track as? VideoTrack else { return }
           DispatchQueue.main.async {
                 let videoView = VideoView(frame: self.remoteVideoView.bounds)
                 self.remoteVideoView.addSubview(videoView)
                 videoView.track = track
           }
        }

        func room(_ room: Room, participant _: RemoteParticipant, didUnsubscribeTrack publication: RemoteTrackPublication) {
           DispatchQueue.main.async {
                 self.remoteVideoView.subviews.forEach { $0.removeFromSuperview() }
           }
        }
     }
     ```

## 4. Reference

* [SDK Sample](https://github.com/jocoos-public/ffc-sdk-client-ios-sample)
