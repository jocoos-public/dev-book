---
title: Ξ [Client Side] Member StreamKey API
author: Dan Lee, Taehyeong Lee
date: 2023-10-16
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

-------------
# Introduction

This series of App API is related to member’s stream key. The member who would like to do a RTMP to CMAF live broadcast is required to ingest the video stream to broadcast to FlipFlop’s RTMP ingest service using a unique identifier. The identifier, so called stream key string and other properties that is used for handling the ingest stream is managed by StreamKey.

# API

<a name="StreamKey-State"></a>
## StreamKey State

---

  * The streamKeyState of a StreamKey can have the following states depending on the progress of streaming by the host.
  * The StreamKey is initially created when a Member is created or first logged in, and has an initial state of `INACTIVE`.

| streamKeyState | Description | Remarks |
| --- | --- | --- |
| `ACTIVE` | First CMAF Publish before going live | |
| `ACTIVE_PREP` | First RTMP Ingest received before going live | |
| `ACTIVE_LIVE` | CMAF Publish resumed after being interrupted during broadcast, or when a specific VideoRoom broadcast is started by the room manager | |
| `INACTIVE_LIVE` | When RTMP Ingest or CMAF Publish was interrupted during broadcast transmission | |
| `ACTIVE_LIVE_PREP` | Resuming RTMP Ingest that was interrupted during broadcast transmission | |
| `INACTIVE` | RTMP Ingest or CMAF Publish interrupted before broadcast, or when a specific VideoRoom broadcast is terminated by the room manager | |

<a name="Get-StreamKey"></a>
## Get StreamKey

---

  * Gets the StreamKey of a specific Member.
  
```json
curl -i -X GET \
   -H "Authorization:Bearer {member-access-token}" \
   -H "Content-Type:application/json" \
 '{api-base-url}/v2/members/me/stream-key'

# 200 OK
{
    "id": 1,
    "streamKeyState": "ACTIVE_LIVE",
    "app": {
        "id": 1,
        "name": "foo-app",
        "defaultRtmpOutputMode": "CMAF"
    },
    "member": {
        "id": 1,
        "appUserId": "1",
        "appUserName": "foo-user",
        "appUserProfileImgUrl": "{url}"
    },
    "videoRoom": {
        "id": 1,
        "videoRoomState": "LIVE",
        "type": "BROADCAST_RTMP",
        "title": "foo-video-room"
    },
    "ingestUrl": "{url}",
    "streamKey": "{stream-key}",
    "mode": "CMAF",
    "playUrl": "{url}",
    "cmafHlsPlayUrl": "{url}",
    "cmafDashPlayUrl": "{url}",
    "rtmpPlayUrl": null,
    "profile": {
        "id": 4,
        "state": "ACTIVE",
        "type": "BROADCAST_RTMP",
        "name": "Predefined CMAF Profile (16:9 portrait)-2.0 sec segments",
        "profile": {
            "segmentDuration": 2,
            "videoStreams": [
                {
                    "name": "360p",
                    "type": "video",
                    "width": 360,
                    "height": 640,
                    "bitrate": 800000
                },
                {
                    "name": "720p",
                    "type": "video",
                    "width": 720,
                    "height": 1280,
                    "bitrate": 3000000
                }
            ],
            "audioStream": {
                "name": "audio",
                "type": "audio",
                "bitrate": 128000
            },
            "drm": false
        },
        "revision": 1
    },
    "error": null,
    "createdAt": "2022-10-20T06:53:47.498514Z",
    "lastModifiedAt": "2022-10-21T07:28:01.900867Z"
}
```

### Response Parameters

| Parameter Name | Description | Remarks |
| --- | --- | --- |
| `id` | [Long] StreamKey ID | |
| `streamKeyState` | [Enum:StreamKeyState] State | INACTIVE, ACTIVE_PREP, ACTIVE, ACTIVE_LIVE_PREP, ACTIVE_LIVE, INACTIVE_LIVE |
| `app` | [Object] App information | |
| app.`id` | [Long] App ID | |
| app.`state` | [Enum:EntityState] App entity state | ACTIVE, DELETED |
| app.`name` | [String] App name | |
| app.`defaultRtmpOutputMode` | [String] Default RTMP output mode set for the app | `CMAF`, `RTMP`, `RTMP_CMAF` |
| `member` | [Object] Member information | |
| member.`id` | [Long] Member ID | |
| member.`appUserId` | [String] Member App User ID | |
| member.`appUserName?` | [String] Member App User Name | |
| member.`appUserProfileImgUrl?` | [String] Member App User profile image URL | |
| `videoRoom?` | [Object] Video room information | Created when the room starts broadcasting, deleted when the broadcast ends |
| videoRoom.`id` | [Long] Video room ID | |
| videoRoom.`type` | [Enum:VideoRoomType] Video room type | `BROADCAST_RTMP` |
| videoRoom.`title` | [String] Video room title | |
| `ingestUrl` | [String] RTMP Ingest URL | |
| `streamKey` | [String] StreamKey string | |
| `mode?` | [String] Output mode during RTMP Ingest, changed to null when ingest is finished | `CMAF`, `RTMP`, `RTMP_CMAF` |
| `playUrl?` | [String] Play URL | |
| `cmafHlsPlayUrl?` | [String] CMAF-HLS Play URL | Activated if mode = `CMAF` or `RTMP_CMAF` |
| `cmafDashPlayUrl?` | [String] CMAF-DASH Play URL |  Activated if mode = `CMAF` or `RTMP_CMAF` |
| `rtmpPlayUrl?` | [String] RTMP Play URL | Activated if mode = `RTMP`, `RTMP_CMAF` |
| `profile` | [Object] Broadcast specification information | |
| profile.`id` | [Long] Profile ID | |
| profile.`type` | [Enum:VideoTranscodingProfileType] Profile type | `BROADCAST_RTMP` |
| profile.`name` | [String] Profile name | |
| profile.`profile` | [Object] Profile data | |
| profile.`revision` | [Long] Profile revision number | |
| `error?` | [Object] Media service error information | |
| error.`code?` | [String] Error code | |
| error.`message` | [String] Error message | |
| error.`occurredAt?` | [iso8601] When the error occurred | |
| `createdAt` | [iso8601] Creation time | |
| `lastModifiedAt` | [iso8601] Last modification date | |

### Error Code

| HTTP Status Code | errorCode | Remarks |
| --- | --- | --- |
| 404 | `STREAM_KEY_NOT_FOUND` | StreamKey resource does not exist |
