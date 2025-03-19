"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9635],{6690:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>t,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"sdk-documentation/ios-sdk-for-vicollo/quick-start","title":"Quick Start","description":"1. Prerequisites","source":"@site/docs/5-sdk-documentation/4-ios-sdk-for-vicollo/1-quick-start.md","sourceDirName":"5-sdk-documentation/4-ios-sdk-for-vicollo","slug":"/sdk-documentation/ios-sdk-for-vicollo/quick-start","permalink":"/dev-book/sdk-documentation/ios-sdk-for-vicollo/quick-start","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"iOS SDK for Vicollo","permalink":"/dev-book/category/ios-sdk-for-vicollo"}}');var s=i(4848),r=i(8453);const t={sidebar_position:1},a="Quick Start",c={},l=[{value:"1. Prerequisites",id:"1-prerequisites",level:2},{value:"2. Installing SDK",id:"2-installing-sdk",level:2},{value:"3. Usage",id:"3-usage",level:2},{value:"4. Reference",id:"4-reference",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"quick-start",children:"Quick Start"})}),"\n",(0,s.jsx)(n.h2,{id:"1-prerequisites",children:"1. Prerequisites"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Requirement","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"iOS 14 or higher"}),"\n",(0,s.jsx)(n.li,{children:"Xcode 13.4.1 or higher"}),"\n",(0,s.jsx)(n.li,{children:"Swift 5.6.1 or higher"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Creating Application","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"To use the SDK, you must first sign up for a membership in the user console on the web and then create an application. Direct membership is currently limited. If you would like to sign up, please contact Jocoos."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Getting Access Token from FlipFlop Cloud Server","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["To send and view live via the SDK, you need to get an access token from the server(due to security issues, the SDK does not provide a way to get an access token directly). You will need to implement your own server to get an access token using the FlipFlop Cloud API and then drop it to the client app. For more information on using the API, see the ",(0,s.jsx)(n.a,{href:"https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login",children:"FlipFlop Cloud - Member Login API"})," documentation."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"2-installing-sdk",children:"2. Installing SDK"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Available as a Swift Package"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Go to Project Settings -> Swift Packages."}),"\n",(0,s.jsxs)(n.li,{children:["Add a new package and enter: ",(0,s.jsx)(n.a,{href:"https://github.com/jocoos-public/ffc-sdk-client-ios-dist.git",children:"https://github.com/jocoos-public/ffc-sdk-client-ios-dist.git"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"The SDK requires app permissions to use it. Please add the following permissions to your info.plist."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-text",children:"Privacy - Camera Usage Description\nPrivacy - Microphone Usage Description\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"3-usage",children:"3. Usage"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Managing video room"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Call following method to get api instance for managing video room"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-swift",children:"// server_url: FlipFlop Cloud server address\n// access_token: access token\nval api = FFCloudSDK.api(url: serverUrl, accessToken: accessToken)\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Providing following functions"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Creating video room"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-swift",children:"// title: title\n// description: description\n// password: VideoRoom password for joining\n// customType: custom type\n// customData: custom data Key-Value Pair\napi.createVideoRoom(title: title, description: description, password: password, customType: customType, customData: customData)\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Getting video room info"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-swift",children:"// videoRoomId: video room's id\napi.getVideoRoom(videoRoomId)\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Getting video room list"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-swift",children:"// videoRomState: state\n// type: type\n// sortBy: sort\n// page: page number\n// pageSize: page size\napi.listVideoRooms(videoRoomState: videoRoomState, type: type, sortBy: sortBy, page: page, pageSize: pageSize)\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Getting webrtc information for joining in video room"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-swift",children:"// videoRoomId: video room id\n// password: video room password\n// customData: custom data Key-Value Pair\napi.issueWebRtcVideoRoomToken(videoRoomId: videoRoomId, password: password, customData: customData)\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Joining in a video room"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["You must declare camera and microphone permissions, if needed in your ",(0,s.jsx)(n.strong,{children:"Info.plist"})," file"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-swift",children:"Privacy - Camera Usage Description\nPrivacy - Microphone Usage Description\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Connecting to a room always requires two parameters: webRtcServerUrl and webRtcToken"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["You can get it from ",(0,s.jsx)(n.strong,{children:"issueWebRtcVideoRoomToken"})," method by api instance"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["The thread which the delegate will be called on is not guaranteed to be the ",(0,s.jsx)(n.strong,{children:"main"})]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["If you will perform any UI update from the delegate, ensure the execution is from the ",(0,s.jsx)(n.strong,{children:"main"})]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-swift",children:'import AVFoundation\nimport FFCloudSDK\nimport LiveKit\nimport UIKit\n\nclass VideoRoomViewController: UIViewController {\n   var webRtcServerUrl: String = ""\n   var webRtcToken: String = ""\n\n   @IBOutlet weak var localVideoView: UIView!\n   @IBOutlet weak var remoteVideoView: UIView!\n\n   lazy var room = Room(delegate: self)\n\n   override func viewDidLoad() {\n      super.viewDidLoad()\n\n      self.view.backgroundColor = .white\n\n      Task {\n            do {\n               let roomOptions = RoomOptions(\n                  defaultCameraCaptureOptions: CameraCaptureOptions(dimensions: Dimensions(width: 1280, height: 720)),\n                  defaultVideoPublishOptions: VideoPublishOptions(encoding: VideoEncoding(maxBitrate: 1_700_000, maxFps: 30))\n               )\n               try await room.connect(url: webRtcServerUrl, token: webRtcToken, roomOptions: roomOptions)\n               // Connection successful...\n\n               // Publishing camera & mic...\n               try await room.localParticipant.setCamera(enabled: true)\n               try await room.localParticipant.setMicrophone(enabled: true)\n            } catch {\n               // Failed to connect\n            }\n      }\n   }\n\n   override func viewDidDisappear(_ animated: Bool) {\n      super.viewDidDisappear(animated)\n      Task {\n            await room.disconnect()\n      }\n   }\n}\n\nextension VideoRoomViewController: RoomDelegate {\n   func roomDidConnect(_ room: Room) {\n      DispatchQueue.main.async {\n      }\n   }\n\n   func room(_ room: Room, didFailToConnectWithError error: LiveKitError?) {\n      DispatchQueue.main.async {\n      }\n   }\n\n   func room(_ room: Room, didDisconnectWithError error: LiveKitError?) {\n      DispatchQueue.main.async {\n      }\n   }\n\n   func room(_ room: Room, participant _: LocalParticipant, didPublishTrack publication: LocalTrackPublication) {\n      guard let track = publication.track as? VideoTrack else { return }\n      DispatchQueue.main.async {\n            let videoView = VideoView(frame: self.localVideoView.bounds)\n            self.localVideoView.addSubview(videoView)\n            videoView.track = track\n      }\n   }\n\n   func room(_ room: Room, participant _: RemoteParticipant, didSubscribeTrack publication: RemoteTrackPublication) {\n      guard let track = publication.track as? VideoTrack else { return }\n      DispatchQueue.main.async {\n            let videoView = VideoView(frame: self.remoteVideoView.bounds)\n            self.remoteVideoView.addSubview(videoView)\n            videoView.track = track\n      }\n   }\n\n   func room(_ room: Room, participant _: RemoteParticipant, didUnsubscribeTrack publication: RemoteTrackPublication) {\n      DispatchQueue.main.async {\n            self.remoteVideoView.subviews.forEach { $0.removeFromSuperview() }\n      }\n   }\n}\n'})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"4-reference",children:"4. Reference"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/jocoos-public/ffc-sdk-client-ios-sample",children:"SDK Sample"})}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>a});var o=i(6540);const s={},r=o.createContext(s);function t(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);