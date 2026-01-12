---
sidebar_position: 7
---

# Vicollo App 사용자 가이드 (User Guideline of Vicollo Apps)

## Table of Contents

* 1 서문
* 2 Vicollo 개요
 * 2.1 무엇인가?
  * 2.2 주요 기능
* 3 Vicollo App 사용 형태
  * 3.1 Vicollo에서 **SaaS** 형태로 사용하기
  * 3.2 여러분의 웹 서비스에서 **PaaS** 형태로 사용하기
* 4 주요 개념
  * 4.1 **Member**와 **Group** 이해하기
  * 4.2 **VideoRoom** 이해하기
  * 4.3 **Session** 이해하기
  * 4.4 **Role** 이해하기
  * 4.5 **Storages** 이해하기
* 5 사전 준비
  * 5.1 Vicollo Live 가입
  * 5.2 비즈니스 파트너 되기
  * 5.3 Vicollo App 생성하기
* 6 Vicollo App 사용 개괄
  * 6.1 Member 생성 및 관리
    * 6.1.1 Group 관리
    * 6.1.2 Member 생성
  * 6.2 VideoRoom 생성 및 관리
  * 6.3 VideoRoom 입장하기
* 7 Vicollo App 연동 가이드

---

## 1 서문

이 문서는 Jocoos의 **Vicollo** 서비스를 여러분의 자체 서비스 형태로 활용하기 위한 방법을 안내합니다. Vicollo는 다양한 고객 요구사항을 반영하며 지속적으로 개발·개선되고 있어, 기능과 화면(UI)이 수시로 변경될 수 있습니다. 특히 UI 구성과 세부 기능은 업데이트가 잦을 수 있으므로, 본 문서에는 스크린샷이나 지나치게 구체적인 화면 설명을 일부 생략했습니다.

본 문서는 서비스의 완성도가 높아짐에 따라 점차 더 상세하고 구체적으로 보완될 예정입니다. 그 전까지는 Vicollo를 사용하기 위해 이해하고 알아야 할 **핵심 개념과 운영 흐름**을 중심으로 활용해 주시기 바랍니다. 또한 문서에서 이해가 어려운 부분이 있거나, 안내 내용과 실제 동작이 다른 경우에는 언제든지 Jocoos로 문의해 주세요. 여러분의 피드백은 문서를 보완하고 더 나은 서비스를 만드는 데 큰 도움이 됩니다.

---

## 2 Vicollo 개요

### 2.1 무엇인가?

Jocoos는 10년 이상 동영상 관련 소프트웨어를 개발해 왔습니다. 그동안 비디오 스트리밍에 대한 시장의 수요는 꾸준히 커졌지만, 많은 기업들이 필요한 기능을 직접 개발하여 서비스로 운영하는 과정에서 높은 기술적·운영적 장벽을 겪는 것을 확인했습니다.

이에 Jocoos는 비디오 스트리밍 기능을 **PaaS 형태**로 제공하여, 고객이 스트리밍 기술을 직접 개발하지 않더라도 **SDK / API**를 통해 손쉽게 도입할 수 있도록 하는 것을 목표로 삼았습니다. 그러나 실제 현장에서는 SDK/API 기반 연동(integration) 자체를 어렵게 느끼는 경우도 많았고, 간단한 사용 목적이나 빠른 도입을 위해 **UI를 포함한 완성형 플랫폼** 형태를 원하는 요구도 꾸준히 존재했습니다.

또한 비디오 스트리밍의 형태 역시 변화해 왔습니다. 초기에는 한 명이 송출하고 다수가 시청하는 단방향 라이브 스트리밍 중심의 수요가 컸다면, 현재는 참여자 간 상호작용이 가능한 **양방향 화상회의(실시간 커뮤니케이션)** 형태의 요구가 빠르게 증가하고 있습니다.

이러한 변화에 맞춰 Jocoos는 화상회의 기능을 PaaS 형태는 물론이고  SaaS 형태로도 사용할 수 있는 Vicollo를 개발했습니다.
**Vicollo Live**는 Jocoos의 화상회의 서비스이며, **Vicollo App**은 고객이 Vicollo의 기능을 사용 목적에 맞게 **SaaS 또는 PaaS 형태**로 활용할 수 있도록 Vicollo에서 제공하는 **고객 전용(복제된) Vicollo 서비스**를 의미합니다.

### 2.2 주요 기능

Vicollo App에서 제공되는 주요 기능은 다음과 같습니다.

1. **Member 관리**

   * 생성 / 조회 / 수정 / 삭제
   * **Group 기반 권한 관리**

     * VideoRoom 접근 권한 설정
     * Storage 접근 권한 설정

2. **화상회의(VideoRoom) 관리**

   * 생성 / 조회 / 수정 / 삭제
   * **녹화 기능**

     * 자동 녹화 / 수동 녹화
     * 녹화 영상 음성 녹취(추출)
   * **보안 및 입장 정책**

     * Member별 접근 권한 관리
     * 비밀번호 설정
     * 입장 승인 필요 여부 설정
     * 입장 허용 목록(**Allow List**) 관리
   * **참여 및 커뮤니케이션**

     * 참여자 조회
     * 채팅
     * 이모지
   * **위젯(Widgets)**

     * Whiteboard, Document Share, Screen Share, Video Player
     * Notes, Files, Web Links
     * Quiz, Poll

3. **Session(세션) 관리**

   * 녹화 영상과 채팅 동시 보기
   * 세션 참여 이력 확인

4. **Storage(저장소)**

   * App / Member / VideoRoom 단위 저장소 제공

---

## 3 Vicollo App 사용 형태

Vicollo App은 고객의 목적과 구현 범위에 따라 **SaaS 모델** 또는 **PaaS 모델**로 활용할 수 있습니다.

* **SaaS 모델**: Vicollo에서 제공하는 **웹 UI를 그대로 사용** (추가 개발 없음)
* **PaaS 모델**: 고객의 **웹 서비스에 Vicollo 기능을 연동** (서비스 경험/계정 체계 통합하는 개발 필요)

### 3.1 Vicollo에서 SaaS 형태로 사용하기

**SaaS 모델**은 별도의 개발 없이 웹 브라우저에서 Vicollo App을 직접 사용하는 방식입니다. Vicollo App의 URL로 접속하면 바로 사용 가능하며, 관리자와 일반 사용자는 **부여된 권한 범위 내에서** 다음 기능을 웹 UI에서 수행할 수 있습니다.

* **Member / Group 관리**
* **VideoRoom 생성/운영** 및 보안 정책 설정
* **Session / 녹화 / 채팅** 이력 조회
* **Storage 및 파일 관리**

이 방식은 빠른 도입이 필요하거나, 초기 운영을 먼저 시작한 뒤 단계적으로 연동 범위를 확장하고자 할 때 적합합니다.

### 3.2 여러분의 웹 서비스에서 PaaS 형태로 사용하기

**PaaS 모델**은 Vicollo의 화상회의 기능을 여러분의 기존 웹 서비스에 **통합**하여 제공하는 방식입니다. 즉, 사용자는 여러분 서비스의 흐름(로그인/결제/권한/콘텐츠 구조) 안에서 Vicollo 기능을 이용하게 됩니다.

연동 방식은 목적에 따라 크게 두 가지로 나뉩니다.

1. **독립 운영형(간단 연동)**
   여러분 서비스의 사용자 계정과 별개로, Vicollo App에서 사용할 **전용 Member**를 생성하여 운영하는 방식입니다.

   * 도입이 빠르고 개발 범위가 화상회의를 즉각적으로 사용하려고 하는 사람을 위한 임의의 멤버를 만들어서 그 멤버의 인증 정보가 포함된 화상회의 URL을 발급하는 정도만의 개발만 필요함
   * 다만 여러분 서비스의 사용자 활동 추적/권한 정책과 **완전한 통합은 제한적**일 수 있음

2. **사용자 연동형(계정/권한 통합)**
   여러분 서비스의 사용자와 Vicollo App의 **Member를 연결(매핑)**하여, 사용자 활동을 추적하고 권한/정책을 서비스 기준으로 일관되게 관리하는 방식입니다.

   * 사용자 추적/통계/이력 관리를 위해 여러분의 서비스와 Vicollo App의 Member 정보 연동이 필요하여 추가 개발이 필요함

이 방식은 기존 서비스의 사용자 경험을 유지하면서 화상회의 기능을 자연스럽게 확장하려는 경우에 적합합니다.

---

## 4 주요 개념

Vicollo App을 원활하게 운영하고 원하는 방식으로 서비스에 적용하기 위해서는 몇 가지 **핵심 개념**을 먼저 이해하는 것이 중요합니다. Vicollo는 **Member**, **Group/Role**, **VideoRoom**, **Session**, **Storage**를 중심으로 기능이 구성되며, 이 개념들이 서로 연결되면서 앱 전체의 동작과 정책이 결정됩니다.

특히 “**누가(Member)** / **어디에 또는 무엇에(VideoRoom, Storages)** / **어떤 권한으로(Group·Role)** / **언제 어떤 활동을 했는지(Session)**”를 기준으로 접근 제어와 운영 흐름이 설계됩니다. 각 용어의 의미와 관계를 정확히 이해하면 UI에서의 설정뿐 아니라 API/SDK 연동 시에도 혼란을 크게 줄일 수 있습니다.

### 4.1 Member와 Group 이해하기 (Understanding Members and Groups)

Vicollo App에서 **Member**는 앱을 사용하는 개별 사용자를 의미합니다. 화상회의에 참여하거나(VideoRoom 입장), 회의를 생성·운영하고, 녹화/세션 이력을 확인하거나 Storage를 이용하는 등 대부분의 활동은 Member를 기준으로 수행됩니다.

**Group**은 여러 Member를 묶어 **앱 범위(App 범위)**에서 권한을 일괄적으로 부여·관리하기 위한 단위입니다. 즉, Member별로 권한을 개별 관리하기보다 Group에 권한을 정의하고 Member를 할당함으로써 운영 효율과 일관성을 높일 수 있습니다.

Vicollo App을 처음 생성하면 기본적으로 다음 네 가지 Group이 자동으로 생성됩니다.

* **ADMINISTRATORS**: 앱 운영 전반을 관리하는 그룹입니다. **앱 폐기 등 일부 제한된 기능을 제외하면** 대부분의 관리 기능을 수행할 수 있도록 권한이 구성되어 있습니다.
* **HOSTS**: 화상회의를 실제로 운영하기 위한 그룹입니다. VideoRoom 생성/운영 및 진행에 필요한 주요 기능을 수행할 수 있도록 권한이 구성되어 있습니다.
* **MEMBERS**: 일반 사용자를 위한 기본 그룹입니다. 화상회의 참여 및 앱 사용에 필요한 일반적인 기능을 수행할 수 있도록 권한이 구성되어 있습니다.
* **GUESTS**: 일회성 또는 제한된 사용자를 위한 그룹입니다. **MEMBERS와 유사**하지만 운영 정책에 따라 일부 기능이 추가로 제한됩니다.

각 Group의 권한 구성은 기본값으로 제공되며, 여러분의 운영 정책에 맞춰 **추후 변경**할 수 있습니다.

또한 Vicollo App을 생성한 사용자에 해당하는 Member는 생성과 동시에 **ADMINISTRATORS** Group에 자동으로 할당됩니다. 따라서 앱 생성 직후부터 **ADMINISTRATORS 권한 범위 내에서** Member/Group 관리, VideoRoom 관리 등 운영에 필요한 작업을 바로 시작할 수 있습니다.

### 4.2 VideoRoom 이해하기

**VideoRoom**은 Vicollo App에서 화상회의가 실제로 진행되는 “방(Room)”에 해당하는 핵심 개념입니다. Member는 VideoRoom에 입장하여 회의에 참여하며, 회의 운영(입장 정책, 녹화, 참여자 관리 등)과 관련된 대부분의 설정은 VideoRoom 단위로 구성됩니다.

#### 공통 설정 항목(예)

* **제목(Title)**: VideoRoom 이름
* **설명(Description)**: 목적/용도에 대한 간략한 설명
* **회의 시간(Scheduled Time)**: 약속된 회의 시간(일정)
* **자동 녹화(Auto Recording)**: 회의 시작 시 자동 녹화 여부
* **입장 승인(Admission Approval)**: 입장 시 방 생성자(또는 운영 권한자) 승인 필요 여부
* **접근 범위(Access Scope)**

  * **PRIVATE**: 생성자만 접근 가능
  * **RESTRICTED**: **Allow List**에 등록된 Member만 접근 가능
  * **MEMBER**: **GUESTS Group**에 속한 Member는 접근 불가, 그 외 Member 접근 가능 (사실은 Group 권한 목록으로 정의되지만 기재된 사항은 기본 설정임)
  * **PUBLIC**: URL을 알고 있는 누구나 접근 가능 (사실은 Group 권한 목록으로 정의되지만 기재된 사항은 기본 설정임)

#### VideoRoom 유형

Vicollo App의 VideoRoom은 목적과 UI/기능 구성에 따라 다음 두 가지 유형을 제공합니다.

* **VIDEO_CONFERENCE**
  전통적인 화상회의 UI가 제공됩니다. 모든 참여자가 서로의 영상을 볼 수 있으며, 채팅/이모지 및 문서/파일 공유 등 기본 기능을 지원합니다. 다만 초기 단계에 개발된 유형으로, Vicollo App의 다른 기능과의 연동 범위는 상대적으로 제한적일 수 있습니다.

* **INTERACTIVE_MEETING**
  화상회의 목적에도 사용할 수 있지만, 특히 **교육 목적의 가상 교실(Interactive Classroom)**을 염두에 두고 설계된 유형입니다. 참여자 간 다양한 상호작용을 지원하며, 위젯/Session/Storage 등 Vicollo App의 다른 기능과도 보다 폭넓게 연동됩니다.

> VideoRoom은 유형에 따라 추가로 설정할 수 있는 항목이 존재합니다. 각 유형별 UI 구성, 지원 기능, 상세 설정 항목은 추후 별도의 문서에서 안내할 예정입니다.

### 4.3 Session 이해하기

**Session**은 하나의 VideoRoom에서 화상회의가 실제로 진행된 “한 번의 구간”을 의미합니다.
Session은 **참여자가 아무도 없는 상태**에서 **최초의 참여자가 입장하는 순간** 시작되며, 이후 참여자가 오가더라도 유지되다가 **모든 참여자가 퇴장하여 방에 아무도 남지 않는 순간** 종료됩니다.

하나의 VideoRoom에서는 회의가 여러 차례 진행될 수 있으므로 **여러 개의 Session**이 생성될 수 있습니다. Session이 생성될 때마다 **Session No.**가 **1부터 순차적으로** 증가하며 부여됩니다.

VideoRoom에 **자동 녹화(Auto Recording)**가 설정되어 있는 경우:

* Session 시작 시(첫 참여자 입장) **녹화가 자동 시작**되며
* 녹화가 진행 중인 경우에 HOST role을 가진 참여자에 의해 **녹화가 종료**될 수 있습니다.
* Session 종료 시(모든 참여자 퇴장) 진행 중인 녹화가 있다면 **자동 종료**됩니다.

반면, 녹화를 **수동으로 시작/중지**할 경우에는 동일 Session 안에서도 녹화를 여러 번 나눠 진행할 수 있으므로, **하나의 Session에 여러 개의 녹화 영상이 생성될 수 있습니다.**

### 4.4 Role 이해하기

Vicollo App에서 **Group**이 “앱 전체(App 범위)”의 권한이라면, **Role**은 “특정 VideoRoom 내부”에서의 권한과 역할을 의미합니다. 같은 Member라도 어떤 VideoRoom에 입장했는지, 그리고 입장 시 어떤 Role을 부여받았는지에 따라 할 수 있는 행동 범위가 달라질 수 있습니다.

Role은 권한이 많은 순서대로 다음과 같이 구분됩니다.

* **HOST**: VideoRoom 설정 변경, 위젯 제어, 씬 전환, 레이아웃 변경 등 **회의 운영 전반 권한**을 가집니다. 또한 Role별 기능 접근을 제어하는 등 **방 내부 운영 정책**을 관리할 수 있습니다.
* **CONTRIBUTOR**: 기본적으로 **위젯 관리(운영)** 수준의 권한이 부여됩니다.
* **AUDIENCE**: 기본적으로 **일반적인 위젯 사용** 수준의 권한이 부여됩니다.
* **GUEST**: AUDIENCE와 유사하지만 운영 정책에 따라 **일부 기능에 추가 제한**이 적용됩니다.

Role 개념은 **INTERACTIVE_MEETING** 유형의 VideoRoom에서 도입된 기능이며, 현재 **VIDEO_CONFERENCE** 유형의 VideoRoom에는 적용되지 않습니다.

> [! Note]
>
> VIDEO_CONFERENCE 유형의 VideoRoom도 추후에 role들이 적용될 예정입니다.

#### 기본 Role과 사전 지정

참여자는 기본적으로 VideoRoom에 입장할 때 **AUDIENCE Role**로 입장합니다.
특정 참여자의 입장 Role을 미리 지정하려면 **Allow List**에 참여자를 추가하면서 **입장 시 부여할 Role**을 함께 설정할 수 있습니다.

#### Role 변경 규칙

참여자의 Role 변경은 원칙적으로 **HOST Role**을 가진 참여자만 수행할 수 있습니다.
다만 예외적으로 **VideoRoom 생성자(방 생성자)**는 현재 본인의 Role과 관계없이 **자신의 Role을 변경**할 수 있습니다.

### 4.5 Storages 이해하기

Vicollo App의 **Storage**는 문서, 파일, 기록 데이터 등 다양한 리소스를 보관하고 공유하기 위한 저장 공간입니다. 사용 목적과 공유 범위에 따라 다음 세 가지로 구분됩니다.

* **App Storage**
  Vicollo App 전체에 공통으로 제공되는 저장소입니다. 기본 Group 체계에서는 **HOSTS Group 이상**만 사용할 수 있도록 설정되어 있습니다.
  (예: 운영자가 공통 자료, 템플릿, 공지용 파일 관리)

* **VideoRoom Storage**
  각 VideoRoom에 할당되는 저장소로, **회의 참여자 간 공유 목적**의 파일을 저장합니다.
  (예: 회의 자료, 참고 문서, 공유 파일)

* **Member Storage**
  각 Member에게 제공되는 **개인 저장소**입니다.

Storage에 대한 **접근(조회) 및 쓰기(업로드/수정/삭제) 권한**은 기본적으로 **Group 권한 목록**으로 제어됩니다.
추가로 **VideoRoom Storage**는 회의 진행 상황이나 특정 **Widget의 저장소 사용 방식**에 따라 접근이 자동으로 허용되는 경우도 발생할 수 있습니다.

> Storage별 권한 설정 및 상세 동작은 권한/기능 설명 섹션에서 자세히 안내합니다.

---

## 5 사전 준비

이 장에서는 Vicollo App을 사용하기 위한 사전 준비 절차를 안내합니다. 일반적으로는 **Vicollo Live 가입 → 비즈니스 파트너 승인 → Vicollo App 생성** 순서로 진행됩니다.

### 5.1 Vicollo Live 가입

Vicollo Live에 가입하려면 웹 브라우저에서 `https://vicollo.live`에 접속해 가입을 진행합니다.
현재 Vicollo Live는 **Google 계정**으로만 가입할 수 있습니다.

> [!NOTE]
> email 또는 username/password 기반 가입 방식은 추후 제공될 예정입니다.

### 5.2 비즈니스 파트너 되기

Vicollo App 생성은 일반 회원이 아닌 **비즈니스 파트너**에게 제공되는 기능입니다. 비즈니스 파트너가 되기 위해서는 **승인 절차**가 필요하며, 현재는 **이메일을 통한 절차**로 진행됩니다.
따라서 Vicollo 가입 후 Jocoos에 연락하여 비즈니스 파트너 승인 절차를 진행해 주세요.

### 5.3 Vicollo App 생성하기

비즈니스 파트너 승인이 완료되면 다음 절차로 Vicollo App을 생성할 수 있습니다.

1. Vicollo 로그인
2. 우측 상단의 **App** 버튼 클릭
3. **Create App** 선택
4. 필요한 정보 입력 후 생성

생성한 Vicollo App은 앱 목록에서 선택하거나 아래 URL 형식으로 접근할 수 있습니다.

* `https://vicollo.live/apps/{appId}`

또한 앱 생성 시 username이 **admin**인 계정이 자동으로 생성되며, 앱 생성 과정에서 입력한 password가 admin 계정의 비밀번호로 설정됩니다.

* username: **admin**
* password: **앱 생성 시 입력한 비밀번호**

---

## 6 Vicollo App 사용 개괄

이 장에서는 Vicollo App을 실제로 운영할 때의 기본 흐름을 개괄적으로 설명합니다. 운영은 크게 다음 세 축으로 이루어집니다.

1. **Member / Group(권한 체계) 구성**
2. **VideoRoom 생성 및 운영 정책 설정**
3. **VideoRoom 입장 및 회의 진행(Session 생성)**

일반적인 운영 순서는 다음과 같습니다.

1. 운영 정책에 맞춰 **Group 권한을 점검/조정**
2. 앱을 사용할 **Member 생성** 및 적절한 Group 할당
3. 목적에 맞는 유형의 **VideoRoom 생성**, 보안/접근/녹화 정책 설정
4. 회의 진행 → **Session 생성** → 녹화/채팅/자료 등 기록 확인 및 반복 운영

본 문서는 UI의 잦은 변경 가능성을 고려하여, 단계별 클릭 경로보다는 **“무엇을/왜 설정하는지”**에 초점을 맞춰 설명합니다.

### 6.1 Member 생성 및 관리

Member 관리는 “**누가 Vicollo App을 사용할 수 있는지**”를 정의하는 가장 기본 단계입니다.
Vicollo App은 **Group 기반 권한 관리**를 사용하므로, Member를 생성하기 전에 **Group 구조와 권한 정책**을 먼저 정리해 두면 운영이 훨씬 수월해집니다.

* **관리 관점**: 사용자 유형(조직/팀/파트너/외부 사용자)을 구분하고 Group으로 권한을 일관되게 관리
* **보안 관점**: VideoRoom 접근 및 Storage 접근 범위를 최소 권한 원칙에 맞춰 통제

#### 6.1.1 Group 관리

Group 관리는 “앱 내에서 어떤 기능을 누구에게 허용할지”를 결정하는 과정입니다.

* 기본 제공 Group(**ADMINISTRATORS / HOSTS / MEMBERS / GUESTS**)을 그대로 사용할 수도 있고
* 운영 정책에 따라 Group을 추가하거나 기존 Group의 권한 구성을 변경할 수도 있습니다.

현재 **새로운 Group 생성** 또는 **Group 권한 변경**은 UI로 제공되지 않아(추후 제공 예정), 서버 API를 사용해야 합니다.
Group 변경 시에는 아래 사항을 함께 점검하는 것을 권장합니다.

* VideoRoom의 접근 범위(**MEMBER / RESTRICTED** 등)와 Group 구성의 정합성
* Storage(App/Member/VideoRoom) 권한과 실제 공유 흐름 충돌 여부

그룹에 설정 가능한 권한 목록과 기본적으로 설정된 각 그룹의 권한 목록은 다음과 같습니다.

##### 멤버 관리 관련 권한

Permission Name Prefix: MEMBER

| Permission Name | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
| :-------------- | :------------: | :---: | :-----: | :----: |
| CREATE_ANY | O | | | |
| LIST_ANY | O | O | | |
| LIST_ME | O | O | O | O |
| GET_ANY | O | O | | |
| GET_ME | O | O | O | O |
| UPDATE_ANY | O | | | |
| UPDATE_ME | O | O | O | O |
| DELETE_ANY | O | | | |

##### 그룹 관리 관련 권한

Permission Name Prefix: GROUP

| Permission Name | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
| :-------------- | :------------: | :---: | :-----: | :----: |
| CREATE_ANY | O | | | |
| LIST_ANY | O | O | O | O |
| GET_ANY | O | O | O | O |
| UPDATE_ANY | O | | | |
| DELETE_ANY | O | | | |

##### 비디오룸 관련 권한

Permission Name Prefix: VIDEO_ROOM

| Permission Name | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
| :-------------- | :------------: | :---: | :-----: | :----: |
| CREATE_ANY | O | O | | |
| LIST_ANY | O | | | |
| LIST_MINE | O | O | O | O |
| LIST_ACCESS_LEVEL_PUBLIC | O | O | O | O |
| LIST_ACCESS_LEVEL_MEMBER | O | O | O | |
| LIST_AS_PRESENT_PARTICIPANT | O | O | O | O |
| LIST_AS_ALLOWED_PARTICIPANT | O | O | O | O |
| GET_ANY | O | | | |
| GET_MINE | O | O | O | O |
| GET_ACCESS_LEVEL_PUBLIC | O | O | O | O |
| GET_ACCESS_LEVEL_MEMBER | O | O | O | |
| GET_AS_PRESENT_PARTICIPANT | O | O | O | O |
| GET_AS_ALLOWED_PARTICIPANT | O | O | O | O |
| UPDATE_ANY | O | | | |
| UPDATE_MINE | O | O | O | O |
| UPDATE_AS_PRESENT_PARTICIPANT_HOST | O | O | O | O |
| UPDATE_AS_ALLOWED_PARTICIPANT_HOST | O | O | O | |
| DELETE_ANY | O | | | |
| DELETE_MINE | O | O | O | O |

##### 앱 저장소 관련 권한

Permission Name Prefix: APP_STORAGE_OBJECT

| Permission Name | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
| :-------------- | :------------: | :---: | :-----: | :----: |
| CREATE_ANY | O | O | | |
| LIST_ANY | O | O | | |
| GET_ANY | O | O | | |
| GET_MINE | O | O | O | |
| UPDATE_ANY | O | | | |
| UPDATE_MINE | O | O | O | |
| DELETE_ANY | O | | | |
| DELETE_MINE | O | O | O | |

##### 비디오룸 저장소 관련 권한

Permission Name Prefix: VIDEO_ROOM_STORAGE_OBJECT

| Permission Name | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
| :-------------- | :------------: | :---: | :-----: | :----: |
| CREATE_ANY | O | | | |
| CREATE_AS_VIDEO_ROOM_OWNER | O | O | O | O |
| CREATE_AS_PRESENT_PARTICIPANT_HOST | O | O | O | O |
| CREATE_AS_ALLOWED_PARTICIPANT_HOST | O | O | O | O |
| CREATE_AS_PRESENT_PARTICIPANT_CONTRIBUTOR | O | O | O | O |
| CREATE_AS_ALLOWED_PARTICIPANT_CONTRIBUTOR | O | O | O | O |
| LIST_ANY | O | | | |
| LIST_AS_VIDEO_ROOM_OWNER | O | O | O | |
| LIST_AS_PRESENT_PARTICIPANT_HOST | O | O | O | O |
| LIST_AS_ALLOWED_PARTICIPANT_HOST | O | O | O | O |
| LIST_AS_PRESENT_PARTICIPANT_CONTRIBUTOR | O | O | O | O |
| LIST_AS_ALLOWED_PARTICIPANT_CONTRIBUTOR | O | O | O | O |
| GET_ANY | O | | | |
| GET_AS_VIDEO_ROOM_OWNER | O | O | O | |
| GET_AS_PRESENT_PARTICIPANT_HOST | O | O | O | O |
| GET_AS_ALLOWED_PARTICIPANT_HOST | O | O | O | O |
| GET_AS_PRESENT_PARTICIPANT_CONTRIBUTOR | O | O | O | O |
| GET_AS_ALLOWED_PARTICIPANT_CONTRIBUTOR | O | O | O | O |
| UPDATE_ANY | O | | | |
| UPDATE_AS_VIDEO_ROOM_OWNER | O | O | O | ? |
| UPDATE_AS_PRESENT_PARTICIPANT_HOST | O | O | O | O |
| UPDATE_AS_ALLOWED_PARTICIPANT_HOST | O | O | O | O |
| UPDATE_MINE | O | O | O | ? |
| DELETE_ANY | O | | | |
| DELETE_AS_VIDEO_ROOM_OWNER | O | O | O | ? |
| DELETE_AS_PRESENT_PARTICIPANT_HOST | O | O | O | O |
| DELETE_AS_ALLOWED_PARTICIPANT_HOST | O | O | O | O |
| DELETE_MINE | O | O | O | ? |

##### 멤버 저장소 관련 권한

Permission Name Prefix: MEMBER_STORAGE_OBJECT

| Permission Name | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
| :-------------- | :------------: | :---: | :-----: | :----: |
| CREATE_ANY | O | | | |
| CREATE_AS_STORAGE_OWNER | O | O | | |
| LIST_ANY | O | | | |
| LIST_AS_STORAGE_OWNER | O | O | | |
| GET_ANY | O | | | |
| GET_AS_STORAGE_OWNER | O | O | | |
| UPDATE_ANY | O | | | |
| UPDATE_AS_STORAGE_OWNER | O | O | | |
| DELETE_ANY | O | | | |
| DELETE_AS_STORAGE_OWNER | O | O | | |

#### 6.1.2 Member 생성

Member 생성 목적은 크게 두 가지입니다.

* **운영자/호스트 계정 구성**: 회의 개설, 운영, 권한 관리 수행
* **일반 사용자/참여자 계정 구성**: 회의 참여 및 제한된 기능 사용

운영 목적에 맞게 Group을 구성한 뒤, Member 생성 시 적절한 Group을 설정하거나 생성 후 Group을 변경하는 방식으로 관리합니다.

Member 생성 방법은 크게 두 가지입니다.

1. **Vicollo App UI로 생성**

* SaaS 형태(웹 UI 사용)를 전제로 하는 생성 흐름입니다.
* 일반적으로 **email**, **username**(현재는 자동 생성), **password**가 필요하며
* Member를 할당할 **Group ID**를 함께 지정합니다.

2. **Vicollo 서버 API로 생성**

* PaaS 형태(기존 서비스와 사용자 연동)를 전제로 하는 생성 흐름입니다.
* 여러분 서비스의 사용자 식별자를 연동하기 위해 **appUserId**를 기본으로 제공하며
* Member를 할당할 **Group ID**를 함께 지정합니다.
* 사용자 연동이 꼭 필요하지 않고 내부적으로 URL만 사용하려는 경우에는 **appUserId를 임의로 생성**해 제공할 수도 있습니다.

### 6.2 VideoRoom 생성 및 관리

VideoRoom 생성 시에는 먼저 **유형(VideoRoom Type)**을 선택하고, 이후 **공통 설정 항목**과 **유형별 추가 설정 항목**을 구성합니다.

#### 공통 설정 항목(예)

* 제목, 설명, 회의 시간
* 비밀번호 설정
* 입장 승인(Admission Approval)
* 접근 범위(Access Scope: PRIVATE/RESTRICTED/MEMBER/PUBLIC)
* 자동 녹화(Auto Recording)
* 녹화 시 참여자 정보 익명화(옵션) 등

#### 유형별 설정 항목(예)

* **VIDEO_CONFERENCE**: 전통적 회의 UI 중심의 옵션(예: 테마 관련 설정 등)
* **INTERACTIVE_MEETING**: 상호작용/교육 목적 옵션(예: 채팅 허용, 1:1 채팅 허용 등)

> 유형별 UI 구성과 세부 설정/운영 방법은 추후 “VideoRoom 유형별 가이드” 문서에서 자세히 안내합니다.

### 6.3 VideoRoom 입장하기

VideoRoom에 입장하려면 먼저 **입장 대기 페이지**로 이동한 뒤, 입장에 필요한 **추가 설정** 을 완료하고 VideoRoom에 입장합니다.

VideoRoom 대기 페이지로 이동하는 방법은 다음과 같습니다.

* **SaaS 모델로 활용하는 경우**

  * 사용자가 웹 브라우저에서 Vicollo App에 로그인한 뒤, **VideoRoom 목록**에서 입장할 VideoRoom을 선택
  * 다른 사용자로부터 **VideoRoom URL**을 전달받아 웹 브라우저에서 접속

* **PaaS 모델로 활용하는 경우**

  * 여러분의 서비스에서 사용자 인증 정보가 포함된 **VideoRoom URL**을 생성하는 서버 API를 제공하고,
    사용자가 해당 URL로 웹 브라우저에서 접속

---

#### 6.3.1 VideoRoom Embed URL에 대하여

PaaS 모델에서는 여러분의 서비스 안에 `iframe`으로 VideoRoom을 임베드하거나, 서비스에서 새 창을 통해 VideoRoom을 사용하는 형태로 제공하게 될 것이기 때문에 이런 맥락에 따라 PaaS 형태로 사용할 때 사용되는 VideoRoom URL을 **VideoRoom Embed URL**이라고 부릅니다.

Embed URL 형식은 다음과 같습니다.

```text
https://vicollo.live/vicollo-apps/${appID}/rooms/join/${roomUUID}?key=${userAuthKey}
```

이 URL을 사용하면 사용자는 **별도의 로그인 절차 없이** 바로 VideoRoom에 입장할 수 있습니다.
URL 쿼리 파라미터 `key` 값(= `userAuthKey`)은 서버 API를 통해 직접 생성하여 위 형식에 맞게 URL을 구성할 수도 있습니다.

하지만 위 URL 형식을 충족하는 URL을 생성해주는 **Helper API**도 제공되므로, 이를 사용하면 보다 편리하게 Embed URL을 생성할 수 있습니다.

---

## 7. Vicollo App 연동 가이드 (PaaS 형태로 활용 시)

여러분의 서비스와 **Vicollo App**을 연동하는 작업은 **PaaS 형태**로 활용할 때 필요한 절차이며, 이 연동은 **Vicollo App Server API**를 통해 수행합니다.
Vicollo App Server API는 **HTTP 기반 REST API** 형태로 제공되며, API 사용을 위한 API 문서와 테스트 도구(Swagger UI)가 함께 제공됩니다.

* API 문서: [https://portal.flipflop.cloud/open-api/ko/docs/vicollo-app-server](https://portal.flipflop.cloud/open-api/ko/docs/vicollo-app-server)
* Swagger UI: [https://portal.flipflop.cloud/open-api/ko/swagger-ui/vicollo-app-server](https://portal.flipflop.cloud/open-api/ko/swagger-ui/vicollo-app-server)

Vicollo App Server API는 **API Key / API Secret**을 인증 정보로 사용합니다. 앱 생성 후 발급받은 **API Key/Secret**을 이용해, API 요청 시 HTTP 헤더에 아래와 같이 **Basic 인증**을 포함해야 합니다.

```http
Authorization: Basic <base64("apiKey:apiSecret")>
```

> [!IMPORTANT]
>
> **Vicollo App Server API는 반드시 백엔드 서버에서만 사용해야 합니다.**
> 프론트엔드에서 호출하면 **API Key/Secret이 사용자에게 노출**되어 심각한 보안 위험이 발생합니다.

### 7.1. Member 연동하기

여러분 서비스의 사용자가 Vicollo App을 사용하는 과정에서 다음과 같은 요구가 있다면 **Member 연동**이 필요합니다.

* 사용자별 **활동 이력(Session/녹화/참여 기록 등)**을 서비스 기준으로 추적해야 하는 경우
* 서비스의 사용자 권한/정책과 Vicollo의 기능(접근 제어 등)을 **일관되게 관리**해야 하는 경우

반대로, 사용자 연동이 반드시 필요하지 않다면 **임의의 Member를 생성**해 두고, 여러분 서비스의 사용자가 해당 Member로 Vicollo 기능을 사용하도록 구성할 수도 있습니다(단, 사용자별 추적/권한 분리는 제한될 수 있습니다).

사용자 정보를 연동할 때에는 다음 흐름을 권장합니다.

* 사용자가 여러분 서비스에 **가입(Sign-up)**할 때
  → Vicollo App에 해당 사용자에 대응하는 **Member를 생성**
* 사용자가 여러분 서비스에서 **프로필/기본 정보 업데이트**를 할 때
  → Vicollo App의 해당 **Member 정보도 함께 업데이트**

이 방식은 여러분 서비스의 사용자 상태와 Vicollo App의 Member 상태를 지속적으로 일치시켜, 운영/분석/권한 관리의 일관성을 확보하는 데 도움이 됩니다.
