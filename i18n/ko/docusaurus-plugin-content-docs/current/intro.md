---
sidebar_position: 1
slug: /
---

# 소개

## 플립플랍 클라우드 서비스 개요 및 특징

현대 IT 업계에서 비디오 콘텐츠의 중요성은 계속해서 증가하고 있습니다. 동영상은 단순한 미디어를 넘어 고객과의 소통을 강화하고, 서비스를 더 매력적으로 만들며, 새로운 비즈니스 기회를 창출하는 강력한 도구입니다. 그러나 이러한 디지털 비디오 콘텐츠를 서비스에 효과적으로 통합하기 위해서는 압축, 포맷, 프로토콜, 영상 처리 등 다양한 전문 지식이 필요합니다. 이를 자체적으로 구현하는 것은 많은 시간과 자원을 요구하는 어려운 과제입니다.

**플립플랍 클라우드**는 이러한 문제를 해결하기 위해 설계된 SaaS 솔루션입니다. 이 솔루션은 동영상의 압축 변환, 라이브 스트리밍, 화상회의 등 디지털 비디오 관련 기능을 손쉽게 제공하여, 개발자와 기업이 비디오 기능을 손쉽게 개발 하거나 기존 시스템에 도입할 수 있도록 해 줍니다. **플립플랍 클라우드**를 사용하면 복잡한 기술적 구현 없이 기능을 쉽게 도입할 수 있어, 비디오를 다루는 기술적인 부분이 아닌 비디오를 효과적으로 활용하는 비즈니스 로직에 집중할 수 있습니다.

비슷한 목표를 가진 솔루션은 존재 하지만, 기타 솔루션은 기능을 가져다 사용하는 데에만 초점을 맞춰져 있어서 막상 사용자들이 기능을 사용하게 하기 위서는 추가적인 연동 작업이 요구됩니다. 반면, **플립플랍 클라우드**는 사용자를 연동하는 기능을 제공하고 사용자 기능들을 사용하는 방식으로 솔루션이 설계 되었습니다. 이를 통해 필요한 연동 작업을 최소화하고, 최소한의 노력으로 기존 서비스에 비디오 기능을 손쉽게 통합하거나 새롭게 개발할 수 있습니다. 이를 통해 최소한의 노력으로 비디오 기능을 기존 서비스에 통합하거나 새로 개발할 수 있으며, **플립플랍 클라우드**의 기능을 그대로 사용하여 자체 서비스로 활용할 수도 있습니다.

따라서 **플립플랍 클라우드**를 도입하여 서비스에 비디오를 매체로 활용하는 기능을 구현하면 서비스를 쉽고 빠르게 구축하고, 더 나아가 디지털 비디오의 가능성을 극대화할 수 있습니다.

## 플립플랍 클라우드 동작 개념

**플립플랍 클라우드**를 사용해서 비디오 관련 기능을 어떤 서비스에 도입 하려고 하는 경우 가장 먼저 서비스에 대응되는 추상적인 `앱`을 **플립플랍 클라우드**에 생성해야 합니다. 이 `앱`을 통해 해당 서비스에서 제공되는 비디오 관련된 기능들이 분리 되어 관리되며 제공 됩니다. 만약에 비디오와 관련된 기능을 자체적으로 개발하게 된다면 다음 그림의 왼쪽과 같이 백엔드 서버에 비디오 관련 기능을 추가하게 될 것입니다. 하지만 **플립플랍 클라우드**를 통해 비디오 관련 기능을 제공하게 되면 자체적으로 개발하려고 했던 비디오 관련 기능을 **플립플랍 클라우드**에 있는 기능으로 대체하여 사용하게 됩니다. **플립플랍 클라우드**는 SaaS형 솔루션으로 여러 서비스에서 사용하게 되기 때문에 서비스간 구분을 하기 위해서 서비스에 대응되는 추상적인 `앱`을 생성이 필요한 것입니다.

![비교](/img/flipflop-usage-diagram.png)

위 그림의 오른쪽 구성과 같이 **플립플랍 클라우드**를 사용해서 비디오 관련 기능을 구현하게 된다면 백엔드의 비즈니스 로직에 따라 서비스의 백엔드에서 **플립플랍 클라우드** 앱 서버 API를 호출하여 기능을 구현하고, 클라이언트에서는 서비스의 백엔드를 통해서 **플립플랍 클라우드**의 비디오 기능을 사용하거나 **플립플랍 클라우드** 앱 클라이언트 API를 직접 **플립플랍 클라우드**에 호출하여 기능을 사용할 수 있습니다.

`앱`은 여러 상황에 가장 큰 자유도를 가지고 비디오 관련 기능을 갖다 사용하는데 초점이 맞춰져 있는 플립플랍 앱 부터 서비스 서비스의 백엔드 기능까지 제공되어 자유도 보다는 기능 사용의 편리함에 초점에 맞추 형태의 앱까지 여러가지 형태로 제공 되고 있습니다.

## 플립플랍 클라우드의 기능

**플립플랍 클라우드**에서 제공되는 비디오 관련 기능들은 크게 `비디오 포스트`(게시물)와 `비디오 룸` 단위로 제공 됩니다.

- `비디오 포스트`: 비디오 파일 업로드에 따른 트랜스코딩을 게시물 형식의 단위로 관리하여 시청도 게시물 단위로 할 수 있게 함
- `비디오 룸`: 라이브 비디오 스트림 방송 또는 화상회의를 방송을 시청하거나 화상회의에 참여하는 사람들 단위로 관리하여 함께 방송 시청 또는 회의에 참여하면서 채팅을 할 수 있게 함

위의 설명과 같이 `비디오 포스트`와 `비디오 룸`을 통해서 비디오 트랜스코딩, 비디오 게시물 공유, 라이브 방송, 화상회의 등의 기능이 제공되기 때문에 서비스에서 사용자에게 제공하려고 하는 서비스에 따라 `비디오 포스트` 또는 `비디오 룸`을 생성하고 다른 사용자들이 각각 매체의 비디오 컨텐츠를 소비를 할 수 있도록 해주는 방식으로 **플립플랍 클라우드**를 서비스에 적용할 수 있습니다. 서비스의 모든 사용자에게 기능을 제공하기 위해서는 사용자에 대응되는 멤버를 **플립플랍 클라우드**에 `앱` 등록하여 지속적으로 동기화 해 주어야 합니다. 이 동기화 된 정보 정보를 통해서 사용자간의 관계를 정립하고 `비디오 포스트`와 `비디오 룸`에 대한 소유와 관리 권한 개념을 적용할 수 있게 되고 각 사용자의 활동에 대한 기능 활용 이력을 통계로 집계할 수 있습니다. 다른 솔류션을 사용했다면 부가로 구현해야 하는 비즈니스 로직들을 따로 구현하지 않아도 됩니다. 서비스의 형태에 따라서 꼭 이와 같이 할 필요는 없지만 **플립플랍 클라우드**는 이 기능을 통해서 비디오 관련 기능 적용및 활용을 최대한 손쉽게 하고 있습니다.

## 플립플랍 클라우드 개발자 센터 사이트 맵

- 소개 (이 페이지)
- 플립플랍 클라우드 중요 개념 소개
  - 앱
    - 플립플랍 앱
    - 플립플랍 포털 앱
    - 비콜로 매니지드 앱
    - 비콜로 언매니지드 앱
  - 멤버
  - 비디오 포스트
  - 비디오 룸
    - 라이브 스트리밍 방송
    - 화상회의
- API 문서
  - 플립플랍 앱 서버 API
  - 플립플랍 앱 클라이언트 API
- SDK
  - 안드로이드 SDK
  - iOS SDK