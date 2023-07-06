---
title: Ξ [Platform] StreamKey App API
author: Dan Lee
date: 2023-07-02
category: Jekyll
layout: post
cover: /devbook/assets/cover_yellow.jpg
---

-------------
# Introduction

This series of App API is related to member’s StreamKey. The member who would like to do a RTMP to CMAF live broadcast is required to ingest the video stream to broadcast to FlipFlop’s RTMP ingest service using a unique identifier. The identifier, so called stream key string and other properties that is used for handling the ingest stream is managed by StreamKey.

# API

## Get StreamKeys

---

Get list of StreamKeys.

```bash
curl -i -X GET \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
 'https://{baseURL}/v2/apps/me/stream-keys?keyword=Foo&sortBy=CREATED_AT_DESC'
 
# 200 OK
{
  "content": [
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
      "createdAt": "2022-10-21T08:02:10.130604Z",
      "lastModifiedAt": "2022-10-21T08:02:10.130605Z"
    },
  ],
  "pageable": {
    "sort": {
      "empty": false,
      "sorted": true,
      "unsorted": false
    },
    "offset": 0,
    "pageNumber": 0,
    "pageSize": 10,
    "paged": true,
    "unpaged": false
  },
  "last": true,
  "totalPages": 1,
  "totalElements": 1,
  "size": 10,
  "number": 0,
  "sort": {
    "empty": false,
    "sorted": true,
    "unsorted": false
  },
  "first": true,
  "numberOfElements": 1,
  "empty": false
}
```

### Request Parameters

| Parameter Name | Required/Optional | Type & Description | Misc. |
| --- | --- | --- | --- |
| memberId | optional | [Long] Member ID |  |
| appUserId | optional | [String] Member AppUser ID |  |
| appUserName | optional | [String] Member AppUser Name |  |
| videoRoomId | optional | [Long] VideoRoomId ID |  |
| sortBy | optional | [String] Sort field and order | CREATED_AT_ASC, CREATED_AT_DESC, LAST_MODIFIED_AT_ASC, LAST_MODIFIED_AT_DESC |
| page | optional | [Int] Page number |  |
| pageSize | optional | [Int] Page size |  |

### Response Parameters

| Parameter Name | Type & Description | Misc. |
| --- | --- | --- |
| content[] | [arrayOfObject] StreamKey list | Refer to StreamKey%20App%20API%20d19327afeb724caf8beb4e79266389f4.md |

## Get StreamKey

---

Get information about a specific StreamKey.

```bash
curl -i -X GET \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
 'https://{baseURL}/v2/apps/me/stream-keys/{streamKeyId}'

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
| videoRoom.type | [Enum:VideoRoomType] VideoRoom type | BROADCAST_RTMP, BROADCAST_WEBRTC, WEBINAR, VIDEO_CONFERENCE, SURVEILLANCE |
| videoRoom.title | [String] VideoRoom title |  |
| streamKey | [String] The stream key string |  |
| liveUrl? | [String] CMAF(HLS) converted video URL |  |
| profile | [Object] CMAF(HLS) transcoding specification |  |
| profile.id | [Long] Broadcast RTMP transcoding profile ID |  |
| profile.state | [Enum:EntityState] Broadcast RTMP transcoding profile entity state | ACTIVE, DELETED |
| profile.type | [Enum:VideoTranscodingProfileType] Broadcast RTMP transcoding profile type | BROADCAST_RTMP |
| profile.name | [String] Broadcast RTMP transcoding profile name |  |
| profile.profile | [Object] Broadcast RTMP transcoding profile specification |  |
| error? | [Object] Broadcast RTMP transcoding error |  |
| error.code? | [String] Broadcast RTMP transcoding error code |  |
| error.message | [String] Broadcast RTMP transcoding error message |  |
| error.occurredAt? | [iso8601] Date and time when error occurred |  |
| createdAt | [iso8601] Created date and time |  |
| lastModifiedAt | [iso8601] Last modified date and time |  |

### Error Codes

| HTTP Status Code | errorCode | Description |
| --- | --- | --- |
| 404 | STREAM_KEY_NOT_FOUND | StreamKey does not exist |

## Reissue StreamKey

---

Reissue stream key string for a StreamKey. In other words, destroy current stream key string and update it to a new one for a specific StreamKey. This may seem a bit misleading but StreamKey is the model that contains information of the stream key and what gets updated is the stream key string which is actually used for RTMP stream ingestion. This can only be done when stream key state is INACTIVE.

```jsx
curl -i -X POST \
   -u {appApiKey}:{appApiSecret}" \
   -H "Content-Type:application/json" \
 'https://{baseURL}/v2/apps/me/stream-keys/{streamKeyId}/reissue'
 
# 200 OK
{
  "id": 1,
  "state": "ACTIVE",
  "streamKeyState": "INACTIVE",
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
  "videoRoom": null,
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

### Response Parameter

Refer to [Get Stream Key App API response parameters](StreamKey%20App%20API%20d19327afeb724caf8beb4e79266389f4.md)

### Error Codes

| HTTP Status Code | errorCode | Description |
| --- | --- | --- |
| 404 | STREAM_KEY_NOT_FOUND | StreamKey does not exist |
| 400 | STREAM_KEY_STATE_NOT_INACTIVE | StreamKey.streamKeyState is not INACTIVE |

-------------
Copyright 2023 @ Jocoos.