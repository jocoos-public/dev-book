"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2936],{7408:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>o});var r=t(4848),i=t(8453);const s={sidebar_position:2},a="Tutorial",l={id:"sdk-documentation/ios-sdk.md/tutorial",title:"Tutorial",description:"1. Prerequisites",source:"@site/docs/4-sdk-documentation/2-ios-sdk.md/2-tutorial.md",sourceDirName:"4-sdk-documentation/2-ios-sdk.md",slug:"/sdk-documentation/ios-sdk.md/tutorial",permalink:"/dev-book/sdk-documentation/ios-sdk.md/tutorial",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Quick Start",permalink:"/dev-book/sdk-documentation/ios-sdk.md/quick-start"},next:{title:"Core Concepts",permalink:"/dev-book/sdk-documentation/ios-sdk.md/core-concepts"}},d={},o=[{value:"1. Prerequisites",id:"1-prerequisites",level:2},{value:"2. Installing SDK",id:"2-installing-sdk",level:2},{value:"3. Initializing SDK",id:"3-initializing-sdk",level:2},{value:"4. Streaming Live",id:"4-streaming-live",level:2},{value:"5. Watching Live",id:"5-watching-live",level:2}];function c(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"tutorial",children:"Tutorial"})}),"\n",(0,r.jsx)(n.h2,{id:"1-prerequisites",children:"1. Prerequisites"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Requirements"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"iOS 14 or higher"}),"\n",(0,r.jsx)(n.li,{children:"Xcode 13.4.1 or higher"}),"\n",(0,r.jsx)(n.li,{children:"Swift 5.6.1 or higher"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Creating Application"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"To use the SDK, you must first sign up for a membership in the user console on the web and then create an application. Direct membership is currently limited. If you would like to sign up, please contact Jocoos."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Getting access token from server"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"You need an access token to use the SDK. The application server uses the FlipFlop Cloud API to get an access token and passes it to the client"}),"\n",(0,r.jsxs)(n.li,{children:["For more information on using the API, refer the ",(0,r.jsx)(n.a,{href:"https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login",children:"FlipFlop Cloud - Member Login API"}),"  documentation."]}),"\n",(0,r.jsx)(n.li,{children:"For more information about access tokens, see the Authentication section of Core Concepts"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"2-installing-sdk",children:"2. Installing SDK"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Add the following to your Podfile"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-markdown",children:"target \u2018YourProject\u2019 do\n    use_frameworks!\n\n    # Pods for FlipFlopSDK\n    pod 'FlipFlopLiteSDK', '1.8.0'\n\nend\n\npost_install do |installer|\n  installer.pods_project.targets.each do |target|\n    target.build_configurations.each do |config|\n      config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'\n      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.0'\n    end\n  end\nend\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"The SDK requires app permissions to use it. Please add the following permissions to your info.plist."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-text",children:"Privacy - Bluetooth Always Usage Description      \nPrivacy - Camera Usage Description\nPrivacy - Microphone Usage Description\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"In AppDelegate.swift, you'll need to set an AVAudioSession on app startup."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:"import AVFoundation\nlet session = AVAudioSession.sharedInstance()\ndo {\n    try session.setCategory(.playAndRecord, mode: .default, options: [.defaultToSpeaker, .allowBluetooth])\n    try session.setActive(true)\n} catch {\n    print(error)\n}\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"3-initializing-sdk",children:"3. Initializing SDK"}),"\n",(0,r.jsx)(n.p,{children:"Before you can use the features provided by the SDK, you'll need to initialize it. Use .dev to connect to a development server for testing, and .prod to connect to a production server when you're done with development."}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"For the convenience of your development, FlipFlop Cloud provides two servers: one for development (.dev) and testing, and one for production (.prod). The production server is the server that runs with the highest priority for stability, while the development server is where new features can be added and tested."}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:"import FlipFlopLiteSDK\n\nfunc application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {\n    // connect to flipflop dev server\n    let config = FFLConfig(serverConfig: .dev)\n    FlipFlopLite.initialize(config: config)\n    \n    let session = AVAudioSession.sharedInstance()\n    do {\n        try session.setCategory(.playAndRecord, mode: .default, options: [.defaultToSpeaker, .allowBluetooth])\n        try session.setActive(true)\n    } catch {\n        print(error)\n    }\n}\n"})}),"\n",(0,r.jsx)(n.h2,{id:"4-streaming-live",children:"4. Streaming Live"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Create a StreamingController and create an FFLStreamer instance for live broadcasting. In ACCESS_TOKEN, put the token you received through the FlipFlop Cloud API."}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:"class StreamerViewController: UIViewController {\n    let streamer = FlipFlopLite.getStreamer(accessToken: ACCESS_TOKEN)\n}\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Call prepare to initialize the FFLStreamer. The prepare() function takes a UIView as its first parameter and an FFStreamerConfig to control the contents of the stream as its second parameter."}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"The preview, which is a UIView, displays the camera screen."}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"You can set the following in FFStreamerConfig"}),"\n"]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Key"}),(0,r.jsx)(n.th,{children:"Description"}),(0,r.jsx)(n.th,{children:"default value"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"preset"}),(0,r.jsx)(n.td,{children:"video width\uc640 height"}),(0,r.jsx)(n.td,{children:"hd1280x720"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"videoBitrate"}),(0,r.jsx)(n.td,{children:"video bitrate"}),(0,r.jsx)(n.td,{children:"2000 * 1024"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"keyFrameInterval"}),(0,r.jsx)(n.td,{children:"key frame interval"}),(0,r.jsx)(n.td,{children:"2"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"fps"}),(0,r.jsx)(n.td,{children:"framerate"}),(0,r.jsx)(n.td,{children:"30"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"sampleRate"}),(0,r.jsx)(n.td,{children:"audio samplerate"}),(0,r.jsx)(n.td,{children:"48000"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"audioBitrate"}),(0,r.jsx)(n.td,{children:"audio bitrate"}),(0,r.jsx)(n.td,{children:"64 * 1024"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"cameraPos"}),(0,r.jsx)(n.td,{children:"camera position(front or back)"}),(0,r.jsx)(n.td,{children:".front"})]})]})]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:"class StreamerViewController: UIViewController {\n    @IBOutlet weak var preview: UIView!\n    \n    let streamer = FlipFlopLite.getStreamer(accessToken: ACCESS_TOKEN)\n    \n    override func viewDidLoad() {\n        super.viewDidLoad()\n\n        self.preview.bounds = self.view.bounds // full screen view\n        let config = FFStreamerConfig()\n        config.videoBitrate = 2500 * 1000\n        config.cameraPos = .back\n        self.streamer.prepare(preview: self.preview, config: config)\n    }\n\n}\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"3",children:["\n",(0,r.jsxs)(n.li,{children:["Setting Live Title","\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"You can set the title of the live to be shown when the live list is imported."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-kotlin",children:'let title = "This is my first live!"\nself.streamer.setVideoInfo(title: title)\n'})}),"\n",(0,r.jsxs)(n.ol,{start:"4",children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Connecting an FFLStreamerDelegate to a StreamingController to receive SDK status information"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"When using FFLStreamer, you can receive information about its internal state via events. You can use this information to check if your live stream is working properly, for example."}),"\n",(0,r.jsx)(n.li,{children:"The contents of FFLStreamerDelegate are shown below. The thread where the delegate is called may not be the main thread, so you should use DispatchQueue.main to call UI-related parts of the delegate."}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:"/// > Notice: The thread which the delegate will be called on, is not guranteed to be the `main` thread.\n/// If you will perform any UI update from the delegate, ensure the execution is from the `main` thread.\n///\n/// ## Example usage\n/// ```swift\n/// func fflStreamer(_ streamer: FFLStreamer, didUpdateStreamerState streamerState: StreamerState) {\n///   DispatchQueue.main.async {\n///     // update UI here\n///   }\n/// }\n/// ```\npublic protocol FFLStreamerDelegate: AnyObject {\n    // StreamerState is updated    \n    func fflStreamer(_ streamer: FFLStreamer, didUpdate streamerState: StreamerState)\n    // BroadcastState is updated\n    func fflStreamer(_ streamer: FFLStreamer, didUpdate broadcastState: BroadcastState)\n    // room for live streaming already exists \n    func fflStreamer(_ streamer: FFLStreamer, didExist videoRoom: FFLVideoRoom)\n    // alarm is published\n    func fflStreamer(_ streamer: FFLStreamer, didPublish alarmState: AlarmState)\n    // video bitrate is changed\n    func fflStreamer(_ streamer: FFLStreamer, didChangeVideoBitrate bitrate: Int)\n    // camera zoom is changed\n    func fflStreamer(_ streamer: FFLStreamer, didChangeZoom zoomFactor: CGFloat)\n    // channel is opened: can send chat messages after this event\n    func fflStreamer(_ streamer: FFLStreamer, didOpenChannel channelId: UInt64)\n    // chat message is received\n    func fflStreamer(_ streamer: FFLStreamer, didReceive message: FFLMessage)\n    // Some error happened\n    func fflStreamer(_ streamer: FFLStreamer, didFail error: FFError)\n}\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"StreamerState: FFLStreamer State"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"state"}),(0,r.jsx)(n.th,{children:"description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"prepared"}),(0,r.jsx)(n.td,{children:"notify you that you're ready to go live."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"started"}),(0,r.jsx)(n.td,{children:"notify you that your live stream has started. This status does not mean that viewers can see you live."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"stopped"}),(0,r.jsx)(n.td,{children:"notify you that the live stream has been interrupted."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"closed"}),(0,r.jsx)(n.td,{children:"notify you that the live has ended."})]})]})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"BroadcastState: Live State"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"state"}),(0,r.jsx)(n.th,{children:"description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"active"}),(0,r.jsx)(n.td,{children:"notify you that the live is in progress (viewers can see the live)."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"inactive"}),(0,r.jsx)(n.td,{children:"notify you that your live has been interrupted (viewers are unable to watch your live)."})]})]})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"Difference between StreamerState and BroadcastState: StreamerState refers to the state of the FFLStreamer locally, while BroadcastState refers to whether the media server is streaming normally."}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"AlarmState: Provides status information about the live streaming"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"The AlarmState received from alarm events currently has three levels, with higher numbers indicating worse conditions. The values of the AlarmState are not called in order: if the transmission suddenly goes bad, alert_3 might be called first."}),"\n"]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"state"}),(0,r.jsx)(n.th,{children:"description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"normal"}),(0,r.jsx)(n.td,{children:"live streaming is ok"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"alert_1"}),(0,r.jsx)(n.td,{children:"the state of live streaming is slightly poor"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"alert_2"}),(0,r.jsx)(n.td,{children:"live state is worse than alert_1"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"alert_3"}),(0,r.jsx)(n.td,{children:"live state is worse than alert_2"})]})]})]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.ol,{start:"3",children:["\n",(0,r.jsx)(n.li,{children:"Connect to the StreamingController like this"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:'extension StreamingController: FFLStreamerDelegate {\n    func fflStreamer(_ streamer: FFLStreamer, didUpdate streamerState: StreamerState) {\n        print("[STREAMER] didUpdateStreamerState: \\(streamerState)")\n        switch streamerState {\n        case .prepared:\n            print("streamer is prepared")\n        case .started:\n            print("streamer is started")\n            retryCount = 0\n            retryTimer?.invalidate()\n            retryTimer = nil\n        case .stopped:\n            print("streamer is stopped")\n        case .closed:\n            print("streamer is closed")\n        default:\n            print("unknown streamState")\n        }\n    }\n    \n    func fflStreamer(_ streamer: FFLStreamer, didUpdate broadcastState: BroadcastState) {\n        print("[STREAMER] didUpdateBroadcastState: \\(broadcastState)")\n        switch broadcastState {\n        case .active:\n            print("broadcasting is active")\n        case .inactive:\n            print("broadcasting is inactive")\n        default:\n            print("unknown BroadcastState: \\(broadcastState)")\n        }\n    }\n    \n    func fflStreamer(_ streamer: FFLStreamer, didExist videoRoom: FFLVideoRoom) {\n        print("[STREAMER] didExistStartedVideoRoom: \\(videoRoom.id)")\n        // restart previous live streaming\n        self.fflStreamer?.restart(videoRoomId: videoRoom.id)\n    }\n    \n    func fflStreamer(_ streamer: FFLStreamer, didPublish alarmState: AlarmState) {\n        print("[STREAMER] didPublishAlarm: \\(alarmState)")\n    }\n    \n    func fflStreamer(_ streamer: FFLStreamer, didChangeVideoBitrate bitrate: Int) {\n        print("[STREAMER] didChangeVideoBitrate: \\(bitrate)")\n    }\n    \n    func fflStreamer(_ streamer: FFLStreamer, didChangeZoom zoomFactor: CGFloat) {\n        print("[STREAMER] didChangeZoom: \\(zoomFactor)")\n    }\n\n    func fflStreamer(_ streamer: FFLStreamer, didOpenChannel channelId: UInt64) {\n        print("[STREAMER] didOpenChannel: \\(channelId)")\n    }\n    \n    func fflStreamer(_ streamer: FFLStreamer, didReceive message: FFLMessage) {\n        print("[STREAMER] didReceiveMessage: ")\n    }\n    \n    func fflStreamer(_ streamer: FFLStreamer, didFail error: FFError) {\n        print("[STREAMER] didFail: \\(error.code) / \\(error.message)")\n    }\n}\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"When you start a live transmission, you call the enter() and start() functions. The enter() function is called first to tell the FlipFlop Cloud server that you want to go live. Then, you call the start() function to start streaming to the media server."}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"Checking if you're streaming normally: When you call the start() function, the StreamerState.started event is fired first, followed by the BroadcastState.active event after a while."}),"\n",(0,r.jsx)(n.p,{children:"There may be a small time lapse between started and active, so it's a good idea to show the user that it's in progress with a UI in between."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:"self.streamer?.enter()\nself.streamer?.start()\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"6",children:["\n",(0,r.jsxs)(n.li,{children:["Chat Message","\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"To send a chat message, use liveChat()?sendMessage() function."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:'let text = "Hello!"\nself.streamer?.liveChat()?.sendMessage(message: text)\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"When receiving chat messages, you can do so through the FFLStreamerDelegate described above."}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"The content of an FFLMessage is as follows"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"field"}),(0,r.jsx)(n.th,{children:"description"}),(0,r.jsx)(n.th,{children:"note"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"origin"}),(0,r.jsx)(n.td,{children:"message type. MEMBER, APP, SYSTEM"}),(0,r.jsx)(n.td,{children:"MEMBER: sending by member, APP: sending by app, SYSTEM: sending by system"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"appUserId"}),(0,r.jsx)(n.td,{children:"user ID"}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"appUsername"}),(0,r.jsx)(n.td,{children:"username"}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"customType"}),(0,r.jsx)(n.td,{children:"Custom types to distinguish messages"}),(0,r.jsx)(n.td,{children:'If origin is of type SYSTEM, it can be "JOINED", "LEFTED", or "CHANNEL_STAT_UPDATED".'})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"message"}),(0,r.jsx)(n.td,{children:"User-sent messages"}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"participantCount"}),(0,r.jsx)(n.td,{children:"the number of participants"}),(0,r.jsx)(n.td,{})]})]})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'func handleMessage(message: FFLMessage) {\n    switch message.origin {\n        case .app:\n            print("message sent by app")\n        case .members:\n            print("message sent by member")\n        case .system:\n            switch message.customType {\n            case "JOINED":\n                print("a user joined")\n            case "LEAVED":\n                print("a user left")\n            case "CHANNEL_STAT_UPDATED":\n                print("participant count is updated")\n            default:\n                break\n        }\n    }\n}\n'})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"When you want to end a live broadcast, you call the stop() and exit() functions. Calling stop() stops the live stream. Before you call exit(), you can restart the live via start(). When you call exit(), the live ends and cannot be restarted (if you want to restart it, you'll need to open a new live)."}),"\n"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"Calling the exit() function notifies the FlipFlop Cloud server that the live has ended. Once the FlipFlop Cloud server has properly closed all live-related information, the StreamerState.closed event will be fired. Therefore, you should wait for the closed event to occur without moving the screen."}),"\n",(0,r.jsx)(n.p,{children:"This is because if you leave the screen before the closed event occurs, you may not be able to properly notify the server of the live shutdown."}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:"self.streamer?.stop()\nself.streamer?.exit()\n"})}),"\n",(0,r.jsx)(n.h2,{id:"5-watching-live",children:"5. Watching Live"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["As a prelude to live viewing, you will need the following four values The access token can be obtained through the application server as described in section 1.3 above. The remaining items can be obtained through FlipFlop Lite's ",(0,r.jsx)(n.a,{href:"https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-Member-VideoRoom-API.html#get-videorooms",children:"FlipFlop Cloud - Member Get VideoRooms API"}),". These values are also not provided directly by the SDK, so like the access token, they must be obtained directly through the application server and passed to the client for use."]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"access token, video room id, channel id, live url"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Create a StreamingViewController and create an FFLLivePlayer instance for live viewing. The ACCESS_TOKEN is the token received through the FlipFlop Cloud API, and the VIDEO_ROOM_ID and CHANNEL_ID are the values received from the live list."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:"class StreamerViewController: UIViewController {\n    let livePlayer = FlipFlopLite.getLivePlayer(accessToken: ACCESS_TOKEN, videoRoomId: VIDEO_ROOM_ID, channelId: CHANNEL_ID)\n}\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Call the prepare() function to initialize the FFLLivePlayer. The prepare() function takes a UIView to view the broadcast screen as the first parameter and a URL to watch live as the second parameter."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:"class StreamerViewController: UIViewController {\n    @IBOutlet weak var view: UIView!\n    let livePlayer = FlipFlopLite.getLivePlayer(accessToken: ACCESS_TOKEN, videoRoomId: VIDEO_ROOM_ID, channelId: CHANNEL_ID)\n    \n    override func viewWillAppear(_ animated: Bool) {\n        super.viewWillAppear(animated)\n        livePlayer.prepare(view: self.view, uri: LIVE_URL))\n    }\n    \n}\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Connecting an FFLLivePlayerDelegate to the StreamingViewController to receive SDK status information"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"When using FFLLivePlayer, you can receive information about its internal state via events. You can use this information to check if the live viewing is going well, etc."}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"The contents of the FFLLivePlayerDelegate are shown below. The thread where the delegate is called may not be the main thread, so you should use DispatchQueue.main to call UI-related parts of the delegate."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:"public protocol FFLLivePlayerDelegate: AnyObject {\n    // player state is updated\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate playerState: PlayerState)\n    // broadcast state is updated\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate broadcastState: BroadcastState)\n    // live url is changed\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate liveUrl: String)\n    // channel is opened: can send chat messages after this event\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didOpenChannel channelId: UInt64)\n    // chat message is received\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didReceive message: FFLMessage)\n    // some errror happened\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didFail error: FFError)\n}\n"})}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"PlayerState notifies you the state of the FFLLivePlayer."}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"state"}),(0,r.jsx)(n.th,{children:"description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"prepared"}),(0,r.jsx)(n.td,{children:"live player is ready to play live"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"started"}),(0,r.jsx)(n.td,{children:"live player is playing live"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"paused"}),(0,r.jsx)(n.td,{children:"live player has been paused"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"stopped"}),(0,r.jsx)(n.td,{children:"live player has been stopped"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"completed"}),(0,r.jsx)(n.td,{children:"live has been finished"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"closed"}),(0,r.jsx)(n.td,{children:"\ub77c\uc774\ube0c \uc2dc\uccad\uc744 \uc911\uc9c0\ud588\ub2e4."})]})]})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"BroadcastState notifies you the state of your live stream."}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"state"}),(0,r.jsx)(n.th,{children:"description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"active"}),(0,r.jsx)(n.td,{children:"notify you that the live is in progress: viewers can see the live"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"inactive"}),(0,r.jsx)(n.td,{children:"notify you that your live has been interrupted: viewers are unable to watch your live"})]})]})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Connect to the StreamingViewController as shown below."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:'extension StreamingViewController: FFLLivePlayerDelegate {\n    // player state is updated\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate playerState: PlayerState) {\n        print("[LIVE PLAYER] didUpdatePlayerState: \\(playerState)")\n    }\n\n    // broadcast state is updated\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate broadcastState: BroadcastState) {\n        print("[LIVE PLAYER] didUpdateBroadcastState: \\(broadcastState)")\n    }\n\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate liveUrl: String) {\n        print("[LivePlayer] didUpdateLiveUrl: \\(liveUrl)")\n    }\n\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didOpenChannel channelId: UInt64) {\n        print("[LivePlayer] didOpenChannel: \\(channelId)")\n    }\n\n    // chat message is received\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didReceive message: FFLMessage) {\n        print("[LIVE PLAYER] didReceiveMessage: \\(message.message)")\n    }\n\n    // some errror happened\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didFail error: FFError) {\n        print("[LIVE PLAYER] didFail: \\(error.code) / \\(error.message)")\n    }\n}\n'})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"When you want to start watching live, you call the enter() and start() functions."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:"livePlayer.enter()\nlivePlayer.start()\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Sending and Receiving chat messages"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"To send a chat message, use the liveChat()?.sendMessage() function."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:'let text = "Hello!"\nlivePlayer.liveChat()?.sendMessage(message: text)\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"You can receive chat messages through the events of the FFLLivePlayerDelegate described above."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:'extension StreamingViewController: FFLLivePlayerDelegate {\n    // chat message is received\n    func fflLivePlayer(_ livePlayer: FFLLivePlayer, didReceive message: FFLMessage) {\n        print("[LIVE PLAYER] didReceiveMessage: \\(message.message)")\n    }\n}\n'})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Call the stop() and exit() functions when you want to end the live watch."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-swift",children:"livePlayer.stop()\nlivePlayer.exit()\n"})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>l});var r=t(6540);const i={},s=r.createContext(i);function a(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);