---
sidebar_position: 6
---

# Vicollo 앱 사용하기

:::note

Vicollo는 현재 개발 중이며, 아래 내용은 변경될 수 있습니다.

:::

## 소개

여러분은 자신의 Vicollo 앱 인스턴스를 가질 수 있습니다. 각 Vicollo 앱은 독립된 멤버 풀과 설정을 가지며, 원하는 방식으로 정책과 구성을 관리할 수 있습니다.

### Vicollo란 무엇인가

Vicollo는 비디오 스트리밍과 화상 회의를 바로 사용할 수 있도록 제공하는 서비스입니다. Jocoos는 `Vicollo.Live` 라는 이름으로 공용 서비스를 운영하고 있습니다.
`Vicollo.Live`의 회원들은 **비디오룸**을 만들고, 다른 사람을 초대하여 회의, 온라인 강의, 라이브 방송 등의 용도로 사용할 수 있습니다.

### Vicollo App이란 무엇인가

`Vicollo.Live`의 회원은 자신만의 독립된 Vicollo 서비스 인스턴스인 **Vicollo 앱**을 생성할 수 있습니다.
Vicollo 앱은 별도의 멤버 풀과 정책을 가지며 `Vicollo.Live`와 완전히 분리되어 운영됩니다.

### Vicollo.Live와의 차이점 및 제한 사항

* 현재 게스트 접속은 지원하지 않습니다 (앱에 등록된 멤버만 이용 가능).
* 앱마다 독립된 스토리지가 제공됩니다.
* 멤버별로 별도의 스토리지 할당이 가능합니다.
* 그룹을 통한 멤버 권한 제어를 지원합니다.

### 사용 패턴

Vicollo 앱 사용 방식은 크게 두 가지가 있으며, 두 방식은 함께 사용할 수도 있습니다.
그러나 일반적으로 한 가지 방식이 주요하게 사용됩니다.

#### 1. 멤버가 직접 Vicollo 앱에 로그인하여 사용

Vicollo 앱에 멤버를 등록하고, 해당 멤버가 앱 웹페이지를 통해 직접 이용하도록 합니다.
구성이 간단하지만, 멤버 활동을 세밀하게 통제하기는 어렵습니다.

#### 2. 서버에서 멤버 사용을 제어

기존 서비스와 Vicollo 기능을 통합하려는 경우에 적합합니다.
기존 서비스의 멤버를 Vicollo 앱에 등록하고, 서비스 서버에서 Vicollo App Server REST API를 사용해 멤버 활동을 관리합니다.

## Vicollo App 생성

이미 저희와 직접 연락하여 설정 과정을 진행하신 경우, 앱과 계정 정보가 제공되었을 수 있습니다.

그렇지 않다면, 먼저 `Vicollo.Live` 회원가입을 진행한 후 비즈니스 파트너 등록을 위해 저희에게 연락해주세요.

승인이 완료되면 다음 과정을 진행합니다:

1. `Vicollo.Live` 로그인
2. 우측 상단의 **App** 버튼 클릭
3. **Create App** 선택
4. 필요한 정보를 입력하여 앱 생성

생성 후에는 앱 목록에서 선택하거나 다음 URL로 바로 접근할 수 있습니다:
`https://vicollo.live/apps/{appId}`

앱 생성 시 자동으로 `admin` 계정이 만들어집니다.
앱 생성 시 입력한 비밀번호가 admin 계정의 비밀번호입니다.

```plaintext
아이디: admin
비밀번호: (입력한 비밀번호)
```

## Vicollo App 둘러보기

관리자(admin) 계정으로 로그인하면 다음 메뉴를 볼 수 있습니다.

* Workspace

  * Home: 대시보드
  * Schedule: 비디오룸 일정 캘린더
  * Rooms: 비디오룸 목록
  * Sessions: 비디오룸 세션 기록
  * Files: 저장소 파일 목록
* Management

  * Usage Stats: 앱 사용량 통계
  * Members: 멤버 목록 및 그룹 관리
  * Settings: 앱 설정

아래는 기본적인 사용 흐름 예시입니다.

### 비디오룸 생성하기

**Workspace > Rooms** 로 이동하여 **Create** 버튼을 누릅니다.
비디오룸 제목과 설명을 입력하고 다음과 같은 설정을 구성합니다:

* 비디오룸 유형
* 비밀번호 보호 여부
* 입장 승인 필요 여부 등

### 멤버 추가하기

**Management > Members** 로 이동합니다.
관리자 계정은 `ADMINISTRATORS` 그룹에 속해 있습니다.

새 멤버를 추가하려면 **Create** 버튼을 누르고 정보를 입력합니다.
추가된 멤버는 다른 브라우저(또는 시크릿 모드)에서 로그인하여 테스트할 수 있습니다.

### 비디오룸 참여하기

다시 **Rooms** 목록으로 이동하여 비디오룸 오른쪽 메뉴에서 **Join Meeting** 을 선택합니다.
카메라와 마이크를 설정한 뒤 **Join** 버튼을 누르세요.

다른 브라우저에서 새로 생성한 멤버도 동일하게 접속합니다.
누군가 비디오룸에 입장하면 세션이 생성되고, 모든 사용자가 퇴장하면 세션이 종료됩니다.

### 비디오룸 기록 확인하기

비디오룸 세션 기록은 다음에서 확인할 수 있습니다:

* **Rooms** 목록에서 각 비디오룸의 상세 메뉴
* **Workspace > Sessions**

## 서버 API로 Vicollo App 사용하기

멤버 및 비디오룸 관리는 Vicollo App Server REST API를 통해서도 가능합니다.

API 문서:

* [https://portal.flipflop.cloud/open-api/en/docs/vicollo-app-server](https://portal.flipflop.cloud/open-api/en/docs/vicollo-app-server)
* [https://portal.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server](https://portal.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server)

앱 생성 시 제공된 API Key/Secret이 필요합니다.
기록하지 못한 경우 저희에게 문의해주세요.

**중요:**
Server API는 반드시 백엔드에서만 호출해야 합니다.
API Key/Secret을 프론트엔드에 노출하면 보안 위험이 발생합니다.

Server API는 앱 전체 권한으로 실행되므로, 멤버 요청을 서버에서 중계할 때 적절한 보안 검증이 필요합니다.
