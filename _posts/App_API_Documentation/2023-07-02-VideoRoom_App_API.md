---
title: Ξ [Platform] VideoRoom App API
author: Dan Lee
date: 2023-07-02
category: Jekyll
layout: post
cover: /devbook/assets/cover_yellow.jpg
---

-------------
# Introduction

This series of App API is related to VideoRoom. VideoRoom is virtual room where member can interact with one another in real time. VideoRoom supports many mode types for how members can interact.

- Currently supported mode
    - BROADCAST_RTMP - A member can broadcast live stream using RTMP and other members can view the stream in HLS(CMAF)
- Planned in the near future
    - VIDEO_CONFERENCE - Relatively small group of members can do a video conference using WebRTC
    - WEBINAR - Relatively small group of members can do a video conference with WebRTC and a massive group of member can become the audience of the video conference
    - SURVEILLANCE - Massive group of members can be monitored by relatively small group of audience using WebRTC

# API

## Create VideoRoom

---

Create a video room.

```bash
curl -i -X POST \
 -u {appApiKey}:{appApiSecret} \
 -H "Content-Type:application/json" \
 -d \
'{
  "appUserId": "1",
  "type": "BROADCAST_RTMP",
  "title": "Foo Video Room",
  "description": "Foo Video Room Description",
  "accessLevel": "PUBLIC",
  "scheduledAt": "2022-10-19T23:59:59.999Z"
}' \
 'https://{baseURL}/v2/apps/me/video-rooms'
 
# 201 Created
{
  "id": 1,
  "state": "ACTIVE",
  "videoRoomState": "SCHEDULED",
  "type": "BROADCAST_RTMP",
  "format": "CMAF",
  "app": {
    "id": 1,
    "state": "ACTIVE",
    "name": "Foo App"
  },
  "member": {
    "id": 1,
    "state": "ACTIVE",
    "appUserId": "1",
    "appUserName": "foobar",
    "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg"
  },
  "creatorType": "USER",
  "creatorId": 1,
  "accessLevel": "PUBLIC",
  "title": "Foo Video Room",
  "description": "Foo Video Room Description",
  "scheduledAt": "2022-10-19T23:59:59.999Z",
  "streamKey": null,
  "liveUrl": null,
  "chat": {
    "videoKey": "1",
    "channelKey": "{channelKey}"
  },
  "stats": {
    "totalMemberWhitelistCount": 0
  },
  "createdAt": "2022-10-19T06:41:09.865054Z",
  "lastModifiedAt": "2022-10-19T06:41:09.865056Z",
  "createdBy": {
    "id": 1,
    "state": "ACTIVE",
    "username": "foobar",
    "email": "foobar@gmail.com"
  },
  "lastModifiedBy": {
    "id": 1,
    "state": "ACTIVE",
    "username": "foobar",
    "email": "foobar@gmail.com"
  }
}
```

### Request Parameters

| Parameter Name | Required/Optional | Type & Description | Misc. |
| --- | --- | --- | --- |
| appUserId | required | [String] Member’s App User ID |  |
| type | required | [Enum:VideoRoomType] VideoRoom type | BROADCAST_RTMP, BROADCAST_WEBRTC, WEBINAR, VIDEO_CONFERENCE, SURVEILLANCE |
| title | optional | [String] title |  |
| description | optional | [String] description |  |
| accessLevel | optional | [Enum:AccessLevel] Audience access scope | Not functional |
| scheduledAt | required conditionally | [iso8601] | Required if type isBROADCAST_RTMP |

### Response Parameters

- Refer to [Get VideoRoom Response Parameters](VideoRoom%20App%20API%205992b5ec1403447db41ed4ab31bd9726.md)

### Error Codes

| HTTP Status Code | errorCode |
| --- | --- |
| 400 | EMPTY_VIDEO_ROOM_APP_USER_ID |
| 400 | EMPTY_VIDEO_ROOM_TYPE |
| 400 | EMPTY_VIDEO_ROOM_SCHEDULED_AT |
| 404 | MEMBER_NOT_FOUND |

## Get VideoRooms

---

Get list of VideoRooms

```bash
curl -i -X GET \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
 'https://{baseURL}/v2/apps/me/video-rooms?keyword=Foo&sortBy=CREATED_AT_DESC'
 
# 200 OK
{
  "content": [
    {
      "id": 1,
      "state": "ACTIVE",
      "videoRoomState": "LIVE",
      "type": "BROADCAST_RTMP",
      "format": "CMAF",
      "app": {
        "id": 1,
        "state": "ACTIVE",
        "name": "Foo App"
      },
      "member": {
        "id": 1,
        "state": "ACTIVE",
        "appUserId": "1",
        "appUserName": "foobar",
        "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg"
      },
      "creatorType": "USER",
      "creatorId": 1,
      "accessLevel": "PUBLIC",
      "title": "Foo Video Room",
      "description": "Foo Video Room Description",
      "scheduledAt": "2022-10-19T23:59:59.999Z",
      "streamKey": {
        "id": 1,
        "state": "ACTIVE",
        "streamKeyState": "ACTIVE_LIVE"
      },
      "liveUrl": "{liveUrl}",
      "chat": {
        "videoKey": "1",
        "channelKey": "{channelKey}"
      },
      "stats": {
        "totalMemberWhitelistCount": 0
      },
      "createdAt": "2022-10-19T06:37:59.248305Z",
      "lastModifiedAt": "2022-10-19T06:37:59.248305Z",
      "createdBy": {
        "id": 1,
        "state": "ACTIVE",
        "username": "foobar",
        "email": "foobar@gmail.com"
      },
      "lastModifiedBy": {
        "id": 1,
        "state": "ACTIVE",
        "username": "foobar",
        "email": "foobar@gmail.com"
      }
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
| keyword | optional | [String] Search string | Search limited to title |
| videoRoomState | optional | [Enum:VideoRoomState] VideoRoom state | SCHEDULED, LIVE, LIVE_INACTIVE, ACTIVE, ENDED, ARCHIVED |
| type | optional | [Enum:VideoRoomType] VideoRoom mode type | BROADCAST_RTMP only for now |
| accessLevel | optional | [Enum:AccessLevel] Access level | This will have no affect for now |
| sortBy | optional | [String] Sort field and order | CREATED_AT_ASC, CREATED_AT_DESC, LAST_MODIFIED_AT_ASC, LAST_MODIFIED_AT_DESC |
| page | optional | [Int] Page number |  |
| pageSize | optional | [Int] Page size |  |

### Response Parameters

| Parameter Name | Type & Description | Misc. |
| --- | --- | --- |
| content[] | [arrayOfObject] VideoRoom list | Refer to VideoRoom%20App%20API%205992b5ec1403447db41ed4ab31bd9726.md |

## Get VideoRoom

---

Get information about a specific VideoRoom

```bash
curl -i -X GET \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
 'https://{baseURL}/v2/apps/me/video-rooms/{videoRoomId}'

# 200 OK
{
  "id": 1,
  "state": "ACTIVE",
  "videoRoomState": "SCHEDULED",
  "type": "BROADCAST_RTMP",
  "format": "CMAF",
  "app": {
    "id": 1,
    "state": "ACTIVE",
    "name": "Foo App"
  },
  "member": {
    "id": 1,
    "state": "ACTIVE",
    "appUserId": "1",
    "appUserName": "foobar",
    "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg"
  },
  "creatorType": "USER",
  "creatorId": 1,
  "accessLevel": "PUBLIC",
  "title": "Foo Video Room",
  "description": "Foo Video Room Description",
  "scheduledAt": "2022-10-19T23:59:59.999Z",
  "streamKey": {
    "id": 1,
    "state": "ACTIVE",
    "streamKeyState": "ACTIVE_LIVE"
  },
  "liveUrl": "{liveUrl}",
  "chat": {
    "videoKey": "1",
    "channelKey": "{channelKey}"
  },
  "stats": {
    "totalMemberWhitelistCount": 0
  },
  "createdAt": "2022-10-19T06:41:09.865054Z",
  "lastModifiedAt": "2022-10-19T06:41:09.865056Z",
  "createdBy": {
    "id": 1,
    "state": "ACTIVE",
    "username": "foobar",
    "email": "foobar@gmail.com"
  },
  "lastModifiedBy": {
    "id": 1,
    "state": "ACTIVE",
    "username": "foobar",
    "email": "foobar@gmail.com"
  }
}
```

### Response Parameters

| Parameter Name | Type & Description | Misc. |
| --- | --- | --- |
| id | [Long] VideoRoom ID |  |
| state | [Enum:EntityState] VideoRoom entity state | ACTIVE, DELETED |
| videoRoomState | [Enum:VideoRoomState] VideoRoom state | SCHEDULED, LIVE, LIVE_INACTIVE, ACTIVE, ENDED, ARCHIVED |
| type | [Enum:VideoRoomType] VideoRoom type | BROADCAST_RTMP |
| format | [Enum:VideoFormat] Video format | N/A |
| app | [Object] FlipFlop app information |  |
| app.id | [Long] FlipFlop app ID |  |
| app.state | [Enum:EntityState] FlipFlop app entity state | ACTIVE, DELETED |
| app.name | [String] FlipFlop app name |  |
| member | [Object] FlipFlop member information |  |
| member.id | [Long] FlipFlop member ID |  |
| member.state | [Enum:EntityState] Member entity state | ACTIVE, DELETED |
| member.appUserId | [String] ID of the user in your app |  |
| member.appUserName? | [String] Username of the user in your app |  |
| member.appUserProfileImgUrl? | [String] Profile image URL of the user in your app |  |
| creatorType | [Enum:CreatorType] Creator type of the VideoRoom | USER - Created by user from the FlipFlop user console
APP - Created via APP API
MEMBER - N/A |
| creatorId | [Long] ID of the creator |  |
| accessLevel | [Enum:AccessLevel] Access level scope | PUBLIC, APP, MEMBER, FRIEND, FOLLOWER, RESTRICTED, PRIVATE |
| title | [String] Title of the VideoRoom |  |
| description? | [String] Description of the VideoRoom |  |
| scheduledAt? | [iso8601] Scheduled time for the VideoRoom for live events |  |
| streamKey? | [Object:StreamKey] StreamKey information of the live streamer | Only applicable for VideoRoom type BROADCAST_RTMP |
| streamKey?.id | [Long] StreamKey ID | Only applicable for VideoRoom type BROADCAST_RTMP |
| streamKey?.state | [Enum:EntityState] State of entity | Only applicable for VideoRoom type BROADCAST_RTMP |
| streamKey?.streamKeyState | [Enum:StreamKeyState] Stream Key’s state | Only applicable for VideoRoom type BROADCAST_RTMP |
| liveUrl? | [String] CMAF publish URL | Only applicable for VideoRoom type BROADCAST_RTMP |
| chat | [Object:VideoRoomChat] VideoRoom chat channel information | Only applicable for VideoRoom type BROADCAST_RTMP |
| chat.videoKey | [String] VideoRoom ID | Required using Chat SDK to connect to chat room |
| chat.channelKey | [String] Chat channel ID | Required using Chat SDK to connect to chat room |
| stats | [Object:VideoRoomStat] VideoRoom stats |  |
| stats.totalMemberWhitelistCount | [Long] Number of members in whitelist |  |
| createdAt | [iso8601] Created time |  |
| lastModifiedAt | [iso8601] Last modified time |  |
| createdBy | [arrayOfObject] Creator information if created by user |  |
| createdBy.id | [Long] User ID |  |
| createdBy.username | [String] User username |  |
| createdBy.email | [String] User email |  |
| lastModifiedBy | [arrayOfObject] Last modified information if modified by user |  |
| lastModifiedBy.id | [Long] User ID |  |
| lastModifiedBy.username | [String] User username |  |
| lastModifiedBy.email | [String] User email |  |

### Error Codes

| HTTP Status Code | errorCode |
| --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND |

## Remove VideoRoom

---

Delete VideoRoom.

```bash
curl -i -X DELETE \
   -u {appApiKey}:{appApiSecret} \
 'https://{baseURL}/v2/apps/me/video-rooms/{videoRoomId}'

# 204 No Content
```

### Error Codes

| HTTP Status Code | errorCode |
| --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND |

## Start VideoRoom RTMP Broadcast

---

Start VideoRoom live stream if type is RTMP Broadcast. VideoRoom state will become `LIVE`, state of corresponding StreamKey will become `ACTIVE_LIVE`.

```bash
curl -i -X POST \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
 'https://${baseURL}/v2/apps/me/video-rooms/{videoRoomId}/rtmp-broadcast/state/live'
 
# 200 OK
{
  "id": 1,
  "state": "ACTIVE",
  "videoRoomState": "LIVE",
  "type": "BROADCAST_RTMP",
  "format": "CMAF",
  "app": {
    "id": 1,
    "state": "ACTIVE",
    "name": "Foo App"
  },
  "member": {
    "id": 1,
    "state": "ACTIVE",
    "appUserId": "1",
    "appUserName": "foobar",
    "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg"
  },
  "creatorType": "USER",
  "creatorId": 1,
  "accessLevel": "PUBLIC",
  "title": "Foo Video Room",
  "description": "Foo Video Room Description",
  "scheduledAt": "2022-10-19T23:59:59.999Z",
  "streamKey": {
    "id": 1,
    "state": "ACTIVE",
    "streamKeyState": "ACTIVE_LIVE"
  },
  "liveUrl": "{liveUrl}",
  "chat": {
    "videoKey": "1",
    "channelKey": "{channelKey}"
  },
  "stats": {
    "totalMemberWhitelistCount": 0
  },
  "createdAt": "2022-10-19T06:41:09.865054Z",
  "lastModifiedAt": "2022-10-19T06:41:09.865056Z",
  "createdBy": {
    "id": 1,
    "state": "ACTIVE",
    "username": "foobar",
    "email": "foobar@gmail.com"
  },
  "lastModifiedBy": {
    "id": 1,
    "state": "ACTIVE",
    "username": "foobar",
    "email": "foobar@gmail.com"
  }
}
```

### Response Parameters

- Refer to [Get VideoRoom Response Parameters](VideoRoom%20App%20API%205992b5ec1403447db41ed4ab31bd9726.md)

### Error Codes

| HTTP Status Code | errorCode | Description |
| --- | --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND | VideoRoom does not exist |
| 400 | VIDEO_ROOM_TYPE_NOT_BROADCAST_RTMP | VideoRoom type is not BROADCAST_RTMP |
| 400 | VIDEO_ROOM_STATE_NOT_SCHEDULED | VideoRoom state is not SCHEDULED |
| 404 | STREAM_KEY_NOT_FOUND | StreamKey does not exist |
| 400 | STREAM_KEY_STATE_NOT_ACTIVE | StreamKey state is not ACTIVE |

## End VideoRoom RTMP Broadcast

---

End VideoRoom live stream if type is RTMP Broadcast. VideoRoom state will become `ENDED`, and the state of the corresponding StreamKey will become `INACTIVE`.

```bash
curl -i -X POST \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
 'https://{baseURL}/v2/apps/me/video-rooms/{videoRoomId}/rtmp-broadcast/state/ended'
 
# 200 OK
{
  "id": 1,
  "state": "ACTIVE",
  "videoRoomState": "ENDED",
  "type": "BROADCAST_RTMP",
  "format": "CMAF",
  "app": {
    "id": 1,
    "state": "ACTIVE",
    "name": "Foo App"
  },
  "member": {
    "id": 1,
    "state": "ACTIVE",
    "appUserId": "1",
    "appUserName": "foobar",
    "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg"
  },
  "creatorType": "USER",
  "creatorId": 1,
  "accessLevel": "PUBLIC",
  "title": "Foo Video Room",
  "description": "Foo Video Room Description",
  "scheduledAt": "2022-10-19T23:59:59.999Z",
  "streamKey": null,
  "liveUrl": null,
  "chat": {
    "videoKey": "1",
    "channelKey": "{channelKey}"
  },
  "stats": {
    "totalMemberWhitelistCount": 0
  },
  "createdAt": "2022-10-19T06:41:09.865054Z",
  "lastModifiedAt": "2022-10-19T06:41:09.865056Z",
  "createdBy": {
    "id": 1,
    "state": "ACTIVE",
    "username": "foobar",
    "email": "foobar@gmail.com"
  },
  "lastModifiedBy": {
    "id": 1,
    "state": "ACTIVE",
    "username": "foobar",
    "email": "foobar@gmail.com"
  }
}
```

### Response Parameter

- Refer to [Get VideoRoom Response Parameters](VideoRoom%20App%20API%205992b5ec1403447db41ed4ab31bd9726.md)

### Error Codes

| HTTP Status Code | errorCode | Description |
| --- | --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND | VideoRoom does not exist |
| 400 | VIDEO_ROOM_TYPE_NOT_BROADCAST_RTMP | VideoRoom type is not BROADCAST_RTMP |
| 400 | VIDEO_ROOM_STATE_NOT_LIVE_INACTIVE | VideoRoom state is not LIVE_INACTIVE |
| 404 | STREAM_KEY_NOT_FOUND | StreamKey does not exist |
| 400 | STREAM_KEY_STATE_NOT_INACTIVE_LIVE | StreamKey state is not INACTIVE_LIVE |

# Chat APIs

[VideoRoom Chat App API](2023-07-02-VideoRoom_Chat_App_API.html)

[Member Chat App API](2023-07-02-Member_Chat_App_API.html)

[App Chat API](2023-07-02-App_Chat_API.html)

[VideoRoom Chat WebSocket API](2023-07-02-VideoRoom_Chat_WebSocket_API.html)

-------------
Copyright 2023 @ Jocoos.