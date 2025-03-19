---
sidebar_position: 1
---

# 빠른 시작

## 1. 사전 준비

1. 요구 사항
   * iOS 14 이상
   * Xcode 13.4.1 이상
   * Swift 5.6.1 이상
2. 애플리케이션 생성
   1. SDK를 사용하려면 먼저 웹 사용자 콘솔에서 회원 가입 후 애플리케이션을 생성해야 합니다. 현재 직접 가입은 제한되어 있으므로, 가입을 원하시면 Jocoos에 문의하시기 바랍니다.
3. 플립플랍 클라우드 서버에서 액세스 토큰 가져오기
   1. SDK를 통해 라이브 방송을 전송하거나 시청하려면 서버에서 액세스 토큰을 받아야 합니다(보안상의 이유로 SDK에서 직접 액세스 토큰을 제공하지 않습니다). 플립플랍 클라우드 API를 사용하여 액세스 토큰을 받아 클라이언트 앱에 전달할 수 있도록 자체 서버를 구현해야 합니다. API 사용에 대한 자세한 내용은 [플립플랍 클라우드 - 회원 로그인 API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login) 문서를 참고하세요.

## 2. SDK 설치

   1. Podfile에 추가하세요.

      ```markdown
      target ‘YourProject’ do
          use_frameworks!
      
          # Pods for FlipFlopLiteSDK
          pod 'FlipFlopLiteSDK', '1.8.0'
      
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

   2. SDK를 사용하려면 앱 권한이 필요합니다. info.plist에 다음 권한을 추가하세요.

      ```text
      Privacy - Bluetooth Always Usage Description      
      Privacy - Camera Usage Description
      Privacy - Microphone Usage Description
      ```

   3. AppDelegate.swift에서 앱 시작 시 AVAudioSession을 설정해야 합니다.

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

## 3. SDK 초기화

SDK에서 제공하는 기능을 사용하려면 먼저 SDK를 초기화해야 합니다. 개발 시에는 .dev 서버에 연결하여 테스트하고, 실제 서비스를 운영할 때는 .prod 서버에 연결하세요.
> 개발의 편의를 위해 FlipFlop Lite는 개발 중에 액세스하고 테스트할 수 있는 별도의 서버(.dev)와 실제 서비스를 운영할 때 액세스할 수 있는 서버(.prod)를 제공합니다.

```swift
import FlipFlopLiteSDK

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  // flipflop dev 서버에 연결
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

## 4. 라이브 스트리밍

   1. StreamingController를 생성하고, 라이브 방송을 위한 FFLStreamer 인스턴스를 만듭니다. ACCESS_TOKEN에는 플립플랍 클라우드 API를 통해 받은 토큰을 넣습니다.

      ```swift
      class StreamingController: UIViewController {
          let streamer = FlipFlopLite.getStreamer(accessToken: ACCESS_TOKEN)
      }
      ```

   2. prepare() 함수를 호출하여 FFLStreamer를 초기화합니다. prepare() 함수는 방송 화면을 보기 위한 UIView를 매개변수로 필요로 합니다. (UIView는 스토리보드, SnapKit, 또는 편한 방법으로 생성할 수 있습니다).

      > preview는 카메라 화면을 표시하는 UIView입니다.

      ```swift
      class StreamingController: UIViewController {
          @IBOutlet weak var preview: UIView!
          
          let streamer = FlipFlopLite.getStreamer(accessToken: ACCESS_TOKEN)
          
          override func viewDidLoad() {
              super.viewDidLoad()
      
              self.preview.bounds = self.view.bounds // 전체 화면 보기
              self.streamer.prepare(preview: self.preview)
          }
      
      }
      ```

   3. 라이브 방송을 시작할 때 enter()와 start() 함수를 연속으로 호출합니다.

        > enter()와 start()를 분리한 이유는 이후 문서에서 설명합니다.

        ```swift
        self.streamer?.enter()
        self.streamer?.start()
       ```

   4. 라이브 방송을 종료할 때는 stop()과 exit() 함수를 연속으로 호출합니다.

        > stop()과 exit()를 분리한 이유는 이후 문서에서 설명합니다.

        ```swift
        self.streamer?.stop()
        self.streamer?.exit()
        ```

## 5. 라이브 시청

   1. 라이브 시청 전에는 다음 네 가지 값이 필요합니다. 액세스 토큰은 앞서 1.3절에서 설명한 대로 애플리케이션 서버를 통해 얻을 수 있습니다. 나머지 항목은 FlipFlop Lite의 [플립플랍 클라우드 - 비디오 룸 API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-Member-VideoRoom-API.html#get-videorooms)를 통해 얻을 수 있습니다. 이 값들은 SDK에서 직접 제공되지 않으므로, 액세스 토큰과 마찬가지로 애플리케이션 서버를 통해 직접 얻어 클라이언트에 전달해야 합니다.

      1. access token, video room Id, channel Id, live url

   2. StreamingViewController를 생성하고, 라이브 시청을 위해 FFLLivePlayer 인스턴스를 만듭니다. ACCESS_TOKEN은 플립플랍 클라우드 API를 통해 받은 토큰이며, VIDEO_ROOM_ID와 CHANNEL_ID는 라이브 목록에서 받은 값입니다.

      ```swift
      class StreamerViewController: UIViewController {
          let livePlayer = FlipFlopLite.getLivePlayer(accessToken: ACCESS_TOKEN, videoRoomId: VIDEO_ROOM_ID, channelId: CHANNEL_ID)
      }
      ```

   3. prepare() 함수를 호출하여 FFLLivePlayer를 초기화합니다. prepare() 함수는 첫 번째 매개변수로 방송 화면을 표시할 UIView, 두 번째 매개변수로 라이브 시청을 위한 URL을 받습니다.

      ```swift
      class StreamerViewController: UIViewController {
          @IBOutlet weak var view: UIView!
          let livePlayer = FlipFlopLite.getLivePlayer(accessToken: ACCESS_TOKEN, videoRoomId: VIDEO_ROOM_ID, channelId: CHANNEL_ID)
          
          override func viewWillAppear(_ animated: Bool) {
              super.viewWillAppear(animated)
              livePlayer.prepare(view: self.view, uri: LIVE_URL)
          } 
      }
      ```

   4. 라이브 시청을 시작하려면 enter()와 start() 함수를 호출합니다.

      ```swift
      livePlayer.enter()
      livePlayer.start()
      ```

   5. 라이브 시청을 종료하려면 stop()과 exit() 함수를 호출합니다.

      ```swift
      livePlayer.stop()
      livePlayer.exit()
      ```

## 6. 다음 단계

   1. 이것은 SDK 사용에 대한 간략한 개요입니다. 자세한 정보는 아래의 문서를 참고하세요.
