---
sidebar_position: 3
---

# 트랜스코딩 프로파일

## 트랜스코딩 프로파일의 사용

`트랜스코딩 프로파일`은 플립플랍 클라우드 내부적으로 다음과 같이 변화할 때 사용됩니다

- `비디오 포스트`의 원본 비디오 파일 압축하고 비디오 게시물 시청자를 고려한 시청 방식에 맞는 포맷으로 변경할 때
- `비디오 포스트`에서 원본 비디오 파일을 시청에 적합한 형태로 변환할 때 썸네일 추출할 때
- `비디오 포스트`에서 원본 비디오 파일을 시청에 적합한 형태로 변환할 때 프리뷰 추출할 때
- `비디오 룸`에서 라이브 비디오 스트림을 방송을 위해 실시간으로 시청에 적합한 형태로 변환할 때

## 트랜스코딩 프로파일의 유형

각 사용 목적에 따라 `트랜스코딩 프로파일`의 유형이 다음과 같이 존재 합니다.

- `VIDEO`: `비디오 포스트`에서 원본 비디오 트랜스코딩할 때
- `THUMBNAIL`: `비디오 포스트`에서 원본 비디오 트랜스코딩할 때 썸네일 추출할 때
- `PREVIEW`: `비디오 포스트`에서 원본 비디오 트랜스코딩할 때 프리뷰 추출할 때
- `BROADCAST_RTMP`: `비디오 룸`에서 방송할 때 라이브 비디오 스트림을 시청을 위한 방송용으로 변환할 때

그리고 각 유형에 따라 설정 위치가 다음과 같습니다.

- `비디오 포스트`: `VIDEO`, `THUMBNAIL`, `PREVIEW`
- `스트리림키`: `BROADCAST_RTMP`

## 트랜스코딩 프로파일 종류 및 생성

`트랜스코딩 프로파일`은 플립플랍 클라우스 시스템 내부적으로 이미 정의 되어 있는 것들이 존재하며 시스템에 정의된 것들은 어떤 `앱`에서든지 사용이 가능합니다.

만약 원하는 `트랜스코딩 프로파일`이 없다면 [요쿠스](mailto:support@jocoos.com)로 직접 문의해 주시면 원하시는 `앱`에서만 조회되고 사용이 가능하도록 추가해 드릴 수 있습니다.