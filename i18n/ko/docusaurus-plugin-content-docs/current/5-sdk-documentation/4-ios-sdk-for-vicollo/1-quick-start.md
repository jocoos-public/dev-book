---
sidebar_position: 1
---

# 빠른 시작

## 1. 필수 조건

1. 요구 사항
   * iOS 14 이상
   * Xcode 13.4.1 이상
   * Swift 5.6.1 이상
2. 애플리케이션 생성
   * SDK를 사용하려면 먼저 웹의 사용자 콘솔에서 회원 가입을 하고 애플리케이션을 생성해야 합니다. 현재 직접 회원 가입은 제한되어 있습니다. 가입을 원하시면 Jocoos에 문의하세요.
3. FlipFlop Cloud 서버에서 액세스 토큰 가져오기
   * SDK를 통해 라이브 방송을 송출하고 시청하려면 서버에서 액세스 토큰을 받아야 합니다(보안상의 이유로 SDK는 직접 액세스 토큰을 가져오는 기능을 제공하지 않습니다). FlipFlop Cloud API를 사용하여 서버에서 액세스 토큰을 가져오고 이를 클라이언트 앱으로 전달하는 방식을 직접 구현해야 합니다. API 사용에 대한 자세한 내용은 [FlipFlop Cloud - 회원 로그인 API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login) 문서를 참고하세요.

## 2. SDK 설치

1. Swift Package로 설치 가능
   * 프로젝트 설정 -> Swift Packages로 이동합니다.
   * 새 패키지를 추가하고 다음 URL을 입력합니다: https://github.com/jocoos-public/ffc-sdk-client-ios-dist.git
2. SDK를 사용하려면 애플리케이션에서 권한이 필요합니다. **info.plist**에 다음 권한을 추가하세요.

   ```text
   Privacy - Camera Usage Description
   Privacy - Microphone Usage Description
   ```

## 3. 사용법

1. 비디오 룸 관리
   * 비디오 룸을 관리하기 위해 다음 메서드를 호출하여 API 인스턴스를 가져옵니다.

      ```swift
      // server_url: FlipFlop Cloud 서버 주소
      // access_token: 액세스 토큰
      val api = FFCloudSDK.api(url: serverUrl, accessToken: accessToken)
      ```

   * 다음 기능을 제공합니다.
     * 비디오 룸 생성

       ```swift
       // title: 제목
       // description: 설명
       // password: 비디오 룸 참가 비밀번호
       // customType: 사용자 정의 타입
       // customData: 사용자 정의 데이터 (Key-Value Pair)
       api.createVideoRoom(title: title, description: description, password: password, customType: customType, customData: customData)
       ```

     * 비디오 룸 정보 가져오기

       ```swift
       // videoRoomId: 비디오 룸 ID
       api.getVideoRoom(videoRoomId)
       ```

     * 비디오 룸 목록 가져오기

       ```swift
       // videoRoomState: 상태
       // type: 유형
       // sortBy: 정렬 기준
       // page: 페이지 번호
       // pageSize: 페이지 크기
       api.listVideoRooms(videoRoomState: videoRoomState, type: type, sortBy: sortBy, page: page, pageSize: pageSize)
       ```

     * 비디오 룸 참가를 위한 WebRTC 정보 가져오기

       ```swift
       // videoRoomId: 비디오 룸 ID
       // password: 비디오 룸 비밀번호
       // customData: 사용자 정의 데이터 (Key-Value Pair)
       api.issueWebRtcVideoRoomToken(videoRoomId: videoRoomId, password: password, customData: customData)
       ```

2. 비디오 룸 참가
   * **info.plist** 파일에 카메라 및 마이크 권한을 선언해야 합니다.

     ```swift
     Privacy - Camera Usage Description
     Privacy - Microphone Usage Description
     ```

   * 비디오 룸에 연결하려면 `webRtcServerUrl` 및 `webRtcToken` 두 개의 매개변수가 필요합니다.
     * **issueWebRtcVideoRoomToken** 메서드를 통해 API 인스턴스로부터 값을 가져올 수 있습니다.
   * 델리게이트가 호출되는 스레드는 **메인**이 아닐 수 있습니다.
     * UI 업데이트를 수행하려면 **메인 스레드**에서 실행해야 합니다.

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
                    // 연결 성공...

                    // 카메라 & 마이크 활성화...
                    try await room.localParticipant.setCamera(enabled: true)
                    try await room.localParticipant.setMicrophone(enabled: true)
                 } catch {
                    // 연결 실패
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

## 4. 참고 자료

* [SDK 샘플](https://github.com/jocoos-public/ffc-sdk-client-ios-sample)
