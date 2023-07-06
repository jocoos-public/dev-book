---
title: Ξ [Platform] Member StreamKey App API
author: Dan Lee
date: 2023-07-02
category: Jekyll
layout: post
cover: /devbook/assets/cover_yellow.jpg
---

-------------
# Introduction

This series of App API is related to member’s stream key. The member who would like to do a RTMP to CMAF live broadcast is required to ingest the video stream to broadcast to FlipFlop’s RTMP ingest service using a unique identifier. The identifier, so called stream key string and other properties that is used for handling the ingest stream is managed by StreamKey.

# API

## Get StreamKey

---

Get stream key information of a specific member.

```bash
curl -i -X GET \
 -u {appApiKey}:{appApiSecret} \
 -H "Content-Type:application/json" \
 'https://{baseURL}/v2/apps/me/members/{appUserId}/stream-key'

# 200 OK
{
  "id": 1,
  "state": "ACTIVE",
  "streamKeyState": "ACTIVE_LIVE",
  "app": {
    "id": 1,
    "state": "ACTIVE",
    "name": "Foo App"
  },
  "member": {
    "id": 1,
    "state": "ACTIVE",
    "appUserId": "fooAppUser",
    "appUserName": "fooAppUserName",
    "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg"
  },
  "videoRoom": {
    "id": 1,
    "state": "ACTIVE",
    "videoRoomState": "LIVE",
    "type": "BROADCAST_RTMP",
    "title": "Foo Video Room"
  },
  "streamKey": "{stream-key}",
  "liveUrl": "{live-url}",
  "profile": {
    "id": 4,
    "state": "ACTIVE",
    "type": "BROADCAST_RTMP",
    "name": "Predefined BROADCAST_RTMP CMAF Profile",
    "profile": {
      "segmentDuration": 2,
      "videoStreams": [
        {
          "type": "video",
          "name": "360p",
          "width": 640,
          "height": 360,
          "bitrate": 800000
        },
        {
          "type": "video",
          "name": "720p",
          "width": 1280,
          "height": 720,
          "bitrate": 3000000
        }
      ],
      "audioStream": {
        "type": "audio",
        "name": "audio",
        "bitrate": 128000
      },
      "drm": false
    }
  },
  "error": null,
  "createdAt": "2022-10-20T06:53:47.498514Z",
  "lastModifiedAt": "2022-10-21T07:28:01.900867Z"
}
```

### Response Parameters

| Parameter Name | Type & Description | Misc. |
| --- | --- | --- |
| id | [Long] StreamKey ID |  |
| state | [Enum:EntityState] State of entity | ACTIVE, DELETED |
| streamKeyState | [Enum:StreamKeyState] Stream Key’s state | INACTIVE, ACTIVE_PREP, ACTIVE, ACTIVE_LIVE_PREP, ACTIVE_LIVE, INACTIVE_LIVE |
| app | [Object] FlipFlop app information |  |
| app.id | [Long] FlipFlop app ID |  |
| app.state | [Enum:EntityState] FlipFlop app entity state | ACTIVE, DELETED |
| app.name | [String] FlipFlop app name |  |
| member | [Object] FlipFlop app member information |  |
| member.id | [Long] FlipFlop app member ID |  |
| member.state | [Enum:EntityState] FlipFlop app member entity state | ACTIVE, DELETED |
| member.appUserId | [String] FlipFlop app member’s User ID from User’s app |  |
| member.appUserName? | [String] FlipFlop app member’s Username from User’s app |  |
| member.appUserProfileImgUrl? | [String] FlipFlop app member’s profile image URL |  |
| videoRoom? | [Object] Associated VideoRoom | Association only established when broadcasting |
| videoRoom.id | [Long] VideoRoom ID |  |
| videoRoom.state | [Enum:EntityState] VideoRoom entity state | ACTIVE, DELETED |
| videoRoom.type | [Enum:VideoRoomType] VideoRoom type | BROADCAST_RTMP |
| videoRoom.title | [String] VideoRoom title |  |
| streamKey | [String] The stream key string |  |
| liveUrl? | [String] CMAF(HLS) converted video URL |  |
| profile | [Object] CMAF(HLS) transcoding specification |  |
| profile.id | [Long] Broadcast RTMP transcoding profile ID |  |
| profile.state | [Enum:EntityState] Broadcast RTMP transcoding profile entity state | ACTIVE, DELETED |
| profile.type | [Enum:VideoTranscodingProfileType] Broadcast RTMP transcoding profile type | BROADCAST_RTMP |
| profile.name | [String] Broadcast RTMP transcoding profile name |  |
| profile.profile | [Object] Broadcast RTMP transcoding profile specification |  |
| error? | [Object] Broadcast RTMP transcoding error | Only when error occurred |
| error.code? | [String] Broadcast RTMP transcoding error code | Only when error occurred |
| error.message | [String] Broadcast RTMP transcoding error message |  |
| error.occurredAt? | [iso8601] Date and time when error occurred |  |
| createdAt | [iso8601] Created date and time |  |
| lastModifiedAt | [iso8601] Last modified date and time |  |

### Error Codes

| HTTP Status Code | errorCode | Description |
| --- | --- | --- |
| 404 | MEMBER_NOT_FOUND | Member does not exist |
| 404 | STREAM_KEY_NOT_FOUND | StreamKey does not exist |

-------------
Copyright 2023 @ Jocoos.