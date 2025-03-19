---
sidebar_position: 2
---

# 튜토리얼

## 1. 사전 준비

   1. 요구 사항

      * iOS 14 이상
      * Xcode 13.4.1 이상
      * Swift 5.6.1 이상

   2. 애플리케이션 생성

      1. SDK를 사용하려면 먼저 웹의 사용자 콘솔에서 회원가입을 하고 애플리케이션을 생성해야 합니다. 현재는 직접 회원가입이 제한되어 있습니다. 가입을 원하시면 Jocoos에 문의하세요.

   3. 서버에서 액세스 토큰 가져오기

      1. SDK를 사용하려면 액세스 토큰이 필요합니다. 애플리케이션 서버는 플립플랍 클라우드 API를 사용하여 액세스 토큰을 가져와 클라이언트에 전달합니다.
      2. API 사용에 대한 자세한 내용은 [플립플랍 클라우드 - 회원 로그인 API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login) 문서를 참조하세요.
      3. 액세스 토큰에 대한 자세한 내용은 핵심 개념의 인증 섹션을 참조하세요.

## 2. SDK 설치

   1. Podfile에 다음을 추가하세요.

      ```markdown
      target ‘YourProject’ do
          use_frameworks!
      
          # Pods for FlipFlopSDK
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

   2. SDK 사용을 위해 앱 권한이 필요합니다. info.plist에 다음 권한을 추가하세요.

      ```text
      Privacy - Bluetooth Always Usage Description      
      Privacy - Camera Usage Description
      Privacy - Microphone Usage Description
      ```

   3. AppDelegate.swift에서 앱 시작 시 AVAudioSession을 설정해야 합니다.

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

## 3. SDK 초기화

SDK에서 제공하는 기능을 사용하기 전에 초기화를 해야 합니다. 테스트를 위해 개발 서버(.dev)에 연결하고 개발이 완료되면 프로덕션 서버(.prod)에 연결하세요.

> 개발의 편의를 위해 FlipFlop Lite는 개발 및 테스트를 위한 서버(.dev)와 안정성을 최우선으로 하는 프로덕션 서버(.prod)를 제공합니다.

```swift
import FlipFlopLiteSDK

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // flipflop 개발 서버에 연결
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

   1. StreamingController를 생성하고, FFLStreamer 인스턴스를 생성하여 라이브 방송을 설정하세요. ACCESS_TOKEN에는 플립플랍 클라우드 API를 통해 받은 토큰을 넣으세요.

   ```swift
   class StreamerViewController: UIViewController {
       let streamer = FlipFlopLite.getStreamer(accessToken: ACCESS_TOKEN)
   }
   ```

   2. prepare 함수를 호출하여 FFLStreamer를 초기화합니다. prepare() 함수는 첫 번째 매개변수로 UIView, 두 번째 매개변수로 FFStreamerConfig를 사용하여 스트림의 내용을 제어합니다.

      > preview는 UIView로 카메라 화면을 표시합니다.

      * FFStreamerConfig에서 다음과 같은 값을 설정할 수 있습니다.

      | 키 | 설명 | 기본 값 |
      | --- | --- | --- |
      | preset | 비디오 너비와 높이 | hd1280x720 |
      | videoBitrate | 비디오 비트레이트 | 2000 \* 1024 |
      | keyFrameInterval | 키 프레임 간격 | 2 |
      | fps | 프레임 레이트 | 30 |
      | sampleRate | 오디오 샘플레이트 | 48000 |
      | audioBitrate | 오디오 비트레이트 | 64 \* 1024 |
      | cameraPos | 카메라 위치(전면 또는 후면) | .front |

   ```swift
   class StreamerViewController: UIViewController {
       @IBOutlet weak var preview: UIView!
       
       let streamer = FlipFlopLite.getStreamer(accessToken: ACCESS_TOKEN)
       
       override func viewDidLoad() {
           super.viewDidLoad()
   
           self.preview.bounds = self.view.bounds // 전체 화면 보기
           let config = FFStreamerConfig()
           config.videoBitrate = 2500 * 1000
           config.cameraPos = .back
           self.streamer.prepare(preview: self.preview, config: config)
       }
   
   }
   ```

   3. 라이브 제목 설정
      1. 라이브 목록을 가져올 때 표시될 라이브 제목을 설정할 수 있습니다.

   ```
   let title = "This is my first live!"
   self.streamer.setVideoInfo(title: title)
   ```

   4. SDK 상태 정보를 수신하기 위해 StreamingController에 FFLStreamerDelegate를 연결합니다.

      1. FFLStreamer를 사용할 때 이벤트를 통해 내부 상태에 대한 정보를 수신할 수 있습니다. 이를 통해 라이브 스트림이 정상적으로 작동하는지 확인할 수 있습니다.
      2. FFLStreamerDelegate의 내용은 아래와 같습니다. delegate가 호출되는 스레드는 메인 스레드가 아닐 수 있으므로 UI 관련 부분은 DispatchQueue.main을 사용해야 합니다.

      ````swift
      /// > 참고: delegate가 호출될 스레드는 `main` 스레드가 아닐 수 있습니다.
      /// UI 업데이트를 delegate에서 수행할 경우 반드시 `main` 스레드에서 실행하세요.
      ///
      /// ## 사용 예시
      /// ```swift
      /// func fflStreamer(_ streamer: FFLStreamer, didUpdateStreamerState streamerState: StreamerState) {
      ///   DispatchQueue.main.async {
      ///     // UI 업데이트
      ///   }
      /// }
      /// ```
      public protocol FFLStreamerDelegate: AnyObject {
          // StreamerState 업데이트
          func fflStreamer(_ streamer: FFLStreamer, didUpdate streamerState: StreamerState)
          // BroadcastState 업데이트
          func fflStreamer(_ streamer: FFLStreamer, didUpdate broadcastState: BroadcastState)
          // 라이브 스트리밍 방이 이미 존재하는 경우
          func fflStreamer(_ streamer: FFLStreamer, didExist videoRoom: FFLVideoRoom)
          // 알람이 발행된 경우
          func fflStreamer(_ streamer: FFLStreamer, didPublish alarmState: AlarmState)
          // 비디오 비트레이트가 변경된 경우
          func fflStreamer(_ streamer: FFLStreamer, didChangeVideoBitrate bitrate: Int)
          // 카메라 줌이 변경된 경우
          func fflStreamer(_ streamer: FFLStreamer, didChangeZoom zoomFactor: CGFloat)
          // 채널이 열리면 채팅 메시지 전송 가능
          func fflStreamer(_ streamer: FFLStreamer, didOpenChannel channelId: UInt64)
          // 채팅 메시지를 수신한 경우
          func fflStreamer(_ streamer: FFLStreamer, didReceive message: FFLMessage)
          // 오류가 발생한 경우
          func fflStreamer(_ streamer: FFLStreamer, didFail error: FFError)
      }
      ````

      * StreamerState: FFLStreamer 상태

        | 상태 | 설명 |
        | --- | --- |
        | prepared | 라이브 준비가 완료되었음을 알립니다. |
        | started | 라이브 스트림이 시작되었음을 알립니다. 시청자가 라이브를 볼 수 있다는 의미는 아닙니다. |
        | stopped | 라이브 스트림이 중단되었음을 알립니다. |
        | closed | 라이브가 종료되었음을 알립니다. |

      * BroadcastState: 라이브 상태

        | 상태 | 설명 |
        | --- | --- |
        | active | 라이브가 진행 중임을 알립니다 (시청자가 라이브를 볼 수 있습니다). |
        | inactive | 라이브가 중단되었음을 알립니다 (시청자가 라이브를 볼 수 없습니다). |

      > StreamerState와 BroadcastState의 차이: StreamerState는 FFLStreamer의 로컬 상태를 나타내며, BroadcastState는 미디어 서버가 정상적으로 스트리밍하고 있는지를 나타냅니다.

      * AlarmState: 라이브 스트리밍 상태 정보를 제공합니다.

        > 알람 이벤트로부터 받은 AlarmState는 현재 3단계로 나뉘며, 숫자가 클수록 상태가

 나빠집니다. AlarmState는 순서대로 호출되지 않으며, 전송 상태가 갑자기 나빠지면 alert_3이 먼저 호출될 수 있습니다.

        | 상태 | 설명 |
        | --- | --- |
        | normal | 라이브 스트리밍이 정상적입니다. |
        | alert_1 | 라이브 스트리밍 상태가 약간 불안정합니다. |
        | alert_2 | 라이브 상태가 alert_1보다 나쁩니다. |
        | alert_3 | 라이브 상태가 alert_2보다 나쁩니다. |

      3. StreamingController에 다음과 같이 연결합니다.

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
              // 이전 라이브 스트리밍 재시작
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

          func fflStreamer(_ streamer: FFLStreamer, didOpenChannel channelId: UInt64) {
              print("[STREAMER] didOpenChannel: \(channelId)")
          }
          
          func fflStreamer(_ streamer: FFLStreamer, didReceive message: FFLMessage) {
              print("[STREAMER] didReceiveMessage: ")
          }
          
          func fflStreamer(_ streamer: FFLStreamer, didFail error: FFError) {
              print("[STREAMER] didFail: \(error.code) / \(error.message)")
          }
      }
      ```

   5. 라이브 전송을 시작할 때 enter()와 start() 함수를 호출합니다. 먼저 enter() 함수를 호출하여 플립플랍 클라우드 서버에 라이브를 시작하고 싶다고 알린 후, start() 함수를 호출하여 미디어 서버에 스트리밍을 시작합니다.

      > 정상적으로 스트리밍이 되는지 확인하기: start() 함수를 호출하면 StreamerState.started 이벤트가 먼저 발생하고, 그 후에 BroadcastState.active 이벤트가 발생합니다.
      >
      > started와 active 사이에는 약간의 시간 차가 있을 수 있으므로, 그 사이에 UI를 통해 진행 중임을 사용자에게 표시하는 것이 좋습니다.

   ```swift
   self.streamer?.enter()
   self.streamer?.start()
   ```

   6. 채팅 메시지
      1. liveChat()?sendMessage() 함수를 사용하여 채팅 메시지를 보냅니다.

         ```swift
         let text = "Hello!"
         self.streamer?.liveChat()?.sendMessage(message: text)
         ```

      2. 채팅 메시지를 수신할 때는 위에서 설명한 FFLStreamerDelegate를 통해 수신할 수 있습니다.

         1. FFLMessage의 내용은 다음과 같습니다.

            | 필드 | 설명 | 비고 |
            | --- | --- | --- |
            | origin | 메시지 유형. MEMBER, APP, SYSTEM | MEMBER: 회원이 보낸 메시지, APP: 앱에서 보낸 메시지, SYSTEM: 시스템이 보낸 메시지 |
            | appUserId | 사용자 ID |  |
            | appUsername | 사용자 이름 |  |
            | customType | 메시지를 구분하기 위한 커스텀 타입 | SYSTEM 유형일 경우 "JOINED", "LEFTED", "CHANNEL_STAT_UPDATED"일 수 있습니다. |
            | message | 사용자가 보낸 메시지 |  |
            | participantCount | 참가자 수 |  |

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
   7. 라이브 방송을 종료하려면 stop()과 exit() 함수를 순서대로 호출합니다. stop()을 호출하면 라이브 스트림이 중지되고, exit()를 호출하기 전에는 start()를 통해 라이브를 다시 시작할 수 있습니다. exit()를 호출하면 라이브가 종료되어 다시 시작할 수 없습니다(다시 시작하려면 새 라이브를 열어야 합니다).

   > exit() 함수를 호출하면 플립플랍 클라우드 서버에 라이브가 종료되었음을 알립니다. 플립플랍 클라우드 서버가 라이브 관련 정보를 정상적으로 종료하면 StreamerState.closed 이벤트가 발생하므로, 종료 이벤트가 발생하기 전까지 화면을 이동하지 않아야 합니다.
   >
   > 종료 이벤트가 발생하기 전에 화면을 이동하면 라이브 종료를 서버에 제대로 알리지 못할 수 있습니다.

   ```swift
   self.streamer?.stop()
   self.streamer?.exit()
   ```

## 5. 라이브 시청

   1. 라이브 시청 전에 다음 네 가지 값을 준비해야 합니다. 액세스 토큰은 앞서 1.3절에서 설명한 대로 애플리케이션 서버를 통해 얻을 수 있습니다. 나머지 항목은 FlipFlop Lite의 [플립플랍 클라우드 - 비디오 룸 API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-Member-VideoRoom-API.html#get-videorooms)를 통해 얻을 수 있습니다. 이 값들은 SDK에서 직접 제공되지 않으므로, 액세스 토큰과 마찬가지로 애플리케이션 서버를 통해 직접 얻어 클라이언트에 전달해야 합니다.

      1. access token, video room id, channel id, live url

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
              livePlayer.prepare(view: self.view, uri: LIVE_URL))
          }
          
      }
      ```

   4. StreamingViewController에 FFLLivePlayerDelegate를 연결하여 SDK 상태 정보를 수신합니다.

      1. FFLLivePlayer를 사용할 때 이벤트를 통해 내부 상태에 대한 정보를 수신할 수 있습니다. 이를 통해 라이브 시청이 원활하게 이루어지고 있는지 확인할 수 있습니다.

      2. FFLLivePlayerDelegate의 내용은 아래와 같습니다. delegate가 호출되는 스레드는 메인 스레드가 아닐 수 있으므로 UI 관련 부분은 DispatchQueue.main을 사용해야 합니다.

         ```swift
         public protocol FFLLivePlayerDelegate: AnyObject {
             // 플레이어 상태가 업데이트된 경우
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate playerState: PlayerState)
             // 방송 상태가 업데이트된 경우
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate broadcastState: BroadcastState)
             // 라이브 URL이 변경된 경우
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate liveUrl: String)
             // 채널이 열리면 채팅 메시지 전송 가능
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didOpenChannel channelId: UInt64)
             // 채팅 메시지를 수신한 경우
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didReceive message: FFLMessage)
             // 오류가 발생한 경우
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didFail error: FFError)
         }
         ```

         1. PlayerState는 FFLLivePlayer의 상태를 알립니다.

            | 상태 | 설명 |
            | --- | --- |
            | prepared | 라이브 플레이어가 라이브 재생 준비 완료 |
            | started | 라이브 플레이어가 라이브를 재생 중 |
            | paused | 라이브 플레이어가 일시 중지됨 |
            | stopped | 라이브 플레이어가 중지됨 |
            | completed | 라이브가 종료됨 |
            | closed | 라이브 시청이 종료됨 |

         2. BroadcastState는 라이브 스트림의 상태를 알립니다.

            | 상태 | 설명 |
            | --- | --- |
            | active | 라이브가 진행 중임을 알립니다: 시청자가 라이브를 볼 수 있습니다. |
            | inactive | 라이브가 중단되었음을 알립니다: 시청자가 라이브를 볼 수 없습니다. |

      3. StreamingViewController에 다음과 같이 연결합니다.

         ```swift
         extension StreamingViewController: FFLLivePlayerDelegate {
             // 플레이어 상태가 업데이트된 경우
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate playerState: PlayerState) {
                 print("[LIVE PLAYER] didUpdatePlayerState: \(playerState)")
             }

             // 방송 상태가 업데이트된 경우
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate broadcastState: BroadcastState) {
                 print("[LIVE PLAYER] didUpdateBroadcastState: \(broadcastState)")
             }

             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didUpdate liveUrl: String) {
                 print("[LivePlayer] didUpdateLiveUrl: \(liveUrl)")
             }

             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didOpenChannel channelId: UInt64) {
                 print("[LivePlayer] didOpenChannel: \(channelId)")
             }

             // 채팅 메시지를 수신한 경우
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didReceive message: FFLMessage) {
                 print("[LIVE PLAYER] didReceiveMessage: \(message.message)")
             }

             // 오류가 발생한 경우
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didFail error: FFError) {
                 print("[LIVE PLAYER] didFail: \(error.code) / \(error.message)")
             }
         }
         ```

   5. 라이브 시청을 시작하려면 enter()와 start() 함수를 호출합니다.

      ```swift
      livePlayer.enter()
      livePlayer.start()
      ```

   6. 채팅 메시지 송수신

      1. 채팅 메시지를 보내려면 liveChat()?sendMessage() 함수를 사용하세요.

         ```swift
         let text = "Hello!"
         livePlayer.liveChat()?.sendMessage(message: text)
         ```

      2. 채팅 메시지는 위에서 설명한 FFLLivePlayerDelegate의 이벤트를 통해 수신할 수 있습니다.

         ```swift
         extension StreamingViewController: FFLLivePlayerDelegate {
             // 채팅 메시지를 수신한 경우
             func fflLivePlayer(_ livePlayer: FFLLivePlayer, didReceive message: FFLMessage) {
                 print("[LIVE PLAYER] didReceiveMessage: \(message.message)")
             }
         }
         ```

   7. 라이브 시청을 종료하려면 stop()과 exit() 함수를 호출합니다.

      ```swift
      livePlayer.stop()
      livePlayer.exit()
      ```
