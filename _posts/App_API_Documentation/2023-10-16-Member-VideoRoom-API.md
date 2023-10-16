---
title: Ξ [Client Side] Member VideoRoom App API
author: Dan Lee, Taehyeong Lee
date: 2023-10-16
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

-------------
# Introduction

This series of Member API is related to VideoRoom. VideoRoom is virtual room where member can interact with one another in real time. VideoRoom supports many mode types for how members can interact.

- Currently supported mode
    - BROADCAST_RTMP - A member can broadcast live stream using RTMP and other members can view the stream in HLS(CMAF) or RTMP
- Planned in the near future
    - VIDEO_CONFERENCE - Relatively small group of members can do a video conference using WebRTC
    - WEBINAR - Relatively small group of members can do a video conference with WebRTC and a massive group of member can become the audience of the video conference
    - VIDEO_SURVEILLANCE - Massive group of members can be monitored by relatively small group of audience using WebRTC

# API

<a name="VideoRoom-Type"></a>
## VideoRoom Type

---

  * VideoRooms have the following types. These can be specified when creating a VideoRoom.

| type | description | remarks |
| --- | --- | --- |
| `BROADCAST_RTMP` | RTMP streaming | protocol = `RTMP` |
| `VIDEO_CONFERENCE` | Video conference | protocol = `WEB_RTC` |
| `WEBINAR` | Webinar | protocol = `WEB_RTC` |
| `VIDEO_SURVEILLANCE` | Video surveillance | protocol = `WEB_RTC` |

<a name="VideoRoom-State"></a>
## VideoRoom State

---

  * A VideoRoom with type = `BROADCAST_RTMP` has the following states as the stream is progressed by the host.

| videoRoomState | description | remarks | comments
| --- | --- | --- |
| `SCHEDULED` | When the VideoRoom was first created by the room manager | |
| `CANCELLED` | When the VideoRoom was canceled by the room owner | Requires a `SCHEDULED` state |
| `LIVE` | When a broadcast transmission is started by the room manager, or when a CMAF Publish that was interrupted during a broadcast transmission is resumed | Requires `SCHEDULED` or `LIVE_INACTIVE` status |
| `LIVE_INACTIVE` | When CMAF Publish is interrupted during broadcast transmission | |
| `ENDED` | When the broadcast was ended by the host | Requires `LIVE_INACTIVE` status |

<a name="VideoRoom-VOD-State"></a>
## VideoRoom VOD State

---

  * A VideoRoom with type = `BROADCAST_RTMP` has a vodState field, which can have the following states depending on the progress of the recording after the broadcast has been terminated by the room manager.

| vodState | Description | Remarks |
| --- | --- | --- |
| `NOT_ARCHIVED` | Not yet recorded | |
| `ARCHIVING` | Recording has started and is in progress, depending on the end of the venue's broadcast | |
| `ARCHIVED` | Recording completed | |
| `FAILED_ARCHIVING` | Recording failed due to system internal reasons | |

<a name="VideoRoom-RTMP-Broadcast-Basic-Flow"></a>
## VideoRoom RTMP Broadcast Basic Flow

---

  * Start RTMP Ingest with `{ingestUrl}/{streamKey}?mode=CMAF` using the streamKey owned by the host. (A host can only send one broadcast at a time.) In `OBS Studio`, configure as follows.

```javascript
OBS Studio → Settings → Stream
- Service: [Custom...]
- Server: {ingestUrl}
- Stream Key: {streamKey}?mode=CMAF
- Use authentication: [Unchecked]
```

  * You can add a `mode` parameter to the Stream Key as a QueryString to set the output mode. If you set it to `CMAF`, which is the default when omitted, you can stably broadcast to a large number of viewers with a delay of 5-6 seconds, and you can also watch it on a web browser. If set to `RTMP`, low-latency broadcasting with a delay of 2-3 seconds is possible, but it cannot be viewed on a web browser.
  * When the host executes [Start VideoRoom RTMP Broadcast](#Start-VideoRoom-RTMP-Broadcast) for a VideoRoom with videoRoomState = `SCHEDULED`, the broadcast address is revealed to the broadcast viewers via the `playUrl` field. (The media service must allow the stream to reach CMAF Publish status before it is allowed to start broadcasting.)
  * Viewers watch the broadcast by adding `?streamingToken={streamingToken}` as a QueryString to the publicly available `playUrl` address to convey the broadcast viewing rights granted to them. (The `streamingToken` is unique to each viewer and is issued upon member login).
  * When the host executes [End VideoRoom RTMP Broadcast](#End-VideoRoom-RTMP-Broadcast), the broadcast ends and the `playUrl` field is initialized.

<a name="Create-VideoRoom"></a>
## Create a VideoRoom

---

  * Creates a VideoRoom.

```javascript
curl -i -X POST \
   -H "Authorization:Bearer {member-access-token}" \
   -H "Content-Type:application/json" \
   -d \
'{
    "type": "VIDEO_CONFERENCE",
    "title": "foo-video-room",
    "customType": "GROUP_METTING",
    "customData": {
        "foo": "bar"
    },
    "password": "{password}"
}' \
 '{api-base-url}/v2/members/me/video-rooms'

# 201 Created
{
    "id": 1,
    "uuid": "{uuid}",
    "type": "VIDEO_CONFERENCE",
    "protocol": "WEB_RTC",
    "videoRoomState": "SCHEDULED",
    "vodState": "NOT_ARCHIVED",
    "vodUrl": null,
    "accessLevel": "PUBLIC",
    "creatorType": "USER",
    "creatorId": 1,
    "app": {
        "id": 1,
        "name": "foo-app"
    },
    "member": {
        "id": 1,
        "appUserId": "1",
        "appUserName": "foo-user",
        "appUserProfileImgUrl": "{url}",
        "customType": "MEMBER"
    },
    "channel": {
        "id": 1,
        "channelState": "OPENED",
        "name": "foo-video-room"
    },
    "title": "foo-video-room",
    "description": null,
    "customType": "GROUP_METTING",
    "customData": {
        "foo": "bar"
    },
    "policy": {
        "hasPassword": true
    },
    "scheduledAt": "2022-10-19T23:59:59.999Z",
    "cancelledAt": null,
    "lastSessionNo": 1,
    "liveStartedAt": null,
    "liveEndedAt": null,
    "vodArchivedAt": null,
    "streamKey": null,
    "playUrl": null,
    "cmafHlsPlayUrl": null,
    "cmafDashPlayUrl": null,
    "rtmpPlayUrl": null,
    "videoPost": null,
    "createdAt": "2022-10-19T06:41:09.865054Z",
    "lastModifiedAt": "2022-10-19T06:41:09.865054Z"
}
```

### Request Parameters

| Parameter name | Required/Optional status | Description | Remarks |
| --- | --- | --- | --- |
| `type` | Required | [Enum:VideoRoomType] Video room type | BROADCAST_RTMP, VIDEO_CONFERENCE, WEBINAR, VIDEO_SURVEILLANCE |
| `title` | Optional | [String] Title | |
| `description` | Optional | [String] Description | |
| `scheduledAt` | Conditionally required | [iso8601] Scheduled date and time | required only for type = `BROADCAST_RTMP` |
| `password` | Optional | [String] VideoRoom entry password | used only for type = `VIDEO_CONFERENCE`, `WEBINAR`, `VIDEO_SURVEILLANCE` |

### Response parameters
  * See [Get VideoRoom](#Get-VideoRoom)

### Error Code

| HTTP Status Code | errorCode | Remarks |
| --- | --- | --- |
| 400 | `MEMBER_SELF_CREATE_VIDEO_ROOM_NOT_AVAILABLE_DUE_TO_APP_POLICY` | Member was not allowed to self-create a VideoRoom, in which case it can only be created in the app |
| 400 | `EMPTY_VIDEO_ROOM_TYPE` | type Required request field is missing. |
| 400 | `empty_video_room_scheduled_at` | |
| 400 | `CUSTOM_TYPE_SIZE_UPPER_LIMIT_EXCEEDED` | customType field exceeds the maximum allowed length of 50 characters. |
| 400 | `CUSTOM_DATA_ITEM_COUNT_UPPER_LIMIT_EXCEEDED` | The maximum number of customData items exceeded 10. |
| 400 | `CUSTOM_DATA_ITEM_NAME_SIZE_UPPER_LIMIT_EXCEEDED` | customData item name exceeds the maximum length of 50 characters |
| 400 | `CUSTOM_DATA_ITEM_VALUE_SIZE_UPPER_LIMIT_EXCEEDED` | customData item value exceeds 50 characters. |

<a name="Get-VideoRooms"></a>
## Get VideoRooms

---

  * Gets the list of VideoRoom created by the logged-in member.

```javascript
curl -i -X GET \
   -H "Authorization:Bearer {member-access-token}" \
   -H "Content-Type:application/json" \
 '{api-base-url}/v2/members/me/video-rooms?sortBy=CREATED_AT_DESC'
 
# 200 OK
{
    "content": [
        {
            "id": 1,
            "state": "ACTIVE",
            "uuid": "{uuid}",
            "type": "VIDEO_CONFERENCE",
            "protocol": "WEB_RTC",
            "videoRoomState": "STARTED",
            "vodState": "NOT_ARCHIVED",
            "vodUrl": null,
            "accessLevel": "PUBLIC",
            "app": {
                "id": 1,
                "state": "ACTIVE",
                "name": "foo-app"
            },
            "member": {
                "id": 1,
                "state": "ACTIVE",
                "appUserId": "1",
                "appUserName": "foo-user",
                "appUserProfileImgUrl": "{url}",
                "customType": "MEMBER"
            },
            "channel": {
                "id": 1,
                "state": "ACTIVE",
                "channelState": "OPENED"
            },
            "creatorType": "USER",
            "creatorId": 1,
            "title": "foo-room",
            "description": null,
            "customType": "GROUP_METTING",
            "customData": {
                "foo": "bar"
            }
            "policy": {
                "hasPassword": true
            },
            "scheduledAt": "2022-10-19T23:59:59.999Z",
            "cancelledAt": null,
            "lastSessionNo": 1,
            "liveStartedAt": "2022-10-19T06:41:09.865056Z",
            "liveEndedAt": null,
            "vodArchivedAt": null,
            "streamKey": null, 
            "playUrl": null,
            "cmafHlsPlayUrl": null,
            "cmafDashPlayUrl": null,
            "rtmpPlayUrl": null,
            "videoPost": null,
            "createdAt": "2022-10-19T06:37:59.248305Z",
            "lastModifiedAt": "2022-10-19T06:37:59.248305Z"
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

### Request parameters

| Parameter Name | Required/Optional Status | Description | Remarks |
| --- | --- | --- | --- |
| `videoRoomState` | Optional | [Enum:VideoRoomState] state | See [VideoRoom State](#VideoRoom-State) |
| `type` | Optional | [Enum:VideoRoomType] type | See [VideoRoom Type](#VideoRoom-Type) |
| `sortBy` | Optional | [String] sort by | `CREATED_AT_ASC`, `CREATED_AT_DESC`, `LAST_MODIFIED_AT_ASC`, `LAST_MODIFIED_AT_DESC` |
| `page` | Optional | [Int] page number | |
| `pageSize` | Optional | [Int] page size | |

### Response Parameters

| Parameter Name | Description | Remarks |
| --- | --- | --- | --- |
| content`[]` | [arrayOfObject] VideoRoom list | See [Get VideoRoom](#Get-VideoRoom) |

<a name="Get-VideoRoom"></a>
## Get VideoRoom

---

  * Get a specific VideoRoom.

```javascript
curl -i -X GET \
   -H "Authorization:Bearer {member-access-token}" \
   -H "Content-Type:application/json" \
'{api-base-url}/v2/members/me/video-rooms/{video-room-id}'

# 200 OK
{
    "id": 1,
    "state": "ACTIVE",
    "uuid": "{uuid}",
    "type": "VIDEO_CONFERENCE",
    "protocol": "WEB_RTC",
    "videoRoomState": "STARTED",
    "vodState": "NOT_ARCHIVED",
    "vodUrl": null,
    "accessLevel": "PUBLIC",
    "app": {
        "id": 1,
        "state": "ACTIVE",
        "name": "foo-app"
    },
    "member": {
        "id": 1,
        "state": "ACTIVE",
        "appUserId": "1",
        "appUserName": "foo-user",
        "appUserProfileImgUrl": "{url}",
        "customType": "MEMBER"
    },
    "channel": {
        "id": 1,
        "state": "ACTIVE",
        "channelState": "OPENED"
    },
    "creatorType": "USER",
    "creatorId": 1,
    "title": "foo-room",
    "description": null,
    "customType": "GROUP_METTING",
    "customData": {
        "foo": "bar"
    }
    "policy": {
        "hasPassword": true
    },
    "scheduledAt": "2022-10-19T23:59:59.999Z",
    "cancelledAt": null,
    "lastSessionNo": 1,
    "liveStartedAt": "2022-10-19T06:41:09.865056Z",
    "liveEndedAt": null,
    "vodArchivedAt": null,
    "streamKey": null,
    "playUrl": null,
    "cmafHlsPlayUrl": null,
    "cmafDashPlayUrl": null,
    "rtmpPlayUrl": null,
    "videoPost": null,
    "createdAt": "2022-10-19T06:41:09.865054Z",
    "lastModifiedAt": "2022-10-19T06:41:09.865056Z"
}
```

### Response Parameters

| Parameter name | Description | Remarks |
| --- | --- | --- |
| `id` | [Long] VideoRoom ID | |
| `state` | [Enum:EntityState] Entity state | ACTIVE, DELETED |
| `uuid` | [String] VideoRoom UUID | VideoRoom identification string |
| `type` | [Enum:VideoRoomType] Type | BROADCAST_RTMP, VIDEO_CONFERENCE, WEBINAR, VIDEO_SURVEILLANCE |
| `protocol` | [String] Protocol used | RTMP, WEB_RTC |
| `videoRoomState` | [Enum:VideoRoomState] State | See [VideoRoom State](#VideoRoom-State) |
| `vodState` | [Enum:VideoRoomVodState] State | See [VideoRoom VOD State](#VideoRoom-VOD-State) |
| `vodUrl` | [String?] VideoRoom VOD URL | vodState = 'ARCHIVED' generated on transition |
| `accessLevel` | [Enum:AccessLevel] Access level | PUBLIC, APP, MEMBER, FRIEND, FOLLOWER, RESTRICTED, PRIVATE |
| `format` | [Enum:VideoFormat] Video format | CMAF, UNDEFINED |
| `app` | [Object] App information | |
| app.`id` | [Long] App ID | |
| app.`state` | [Enum:EntityState] App entity state | ACTIVE, DELETED |
| app.`name` | [String] App name | |
| `member` | [Object] Member information | |
| member.`id` | [Long] Member ID | |
| member.`state` | [Enum:EntityState] Member entity state | ACTIVE, DELETED |
| member.`appUserId` | [String] Member App User ID | |
| member.`appUserName?` | [String] Member App User Name | |
| member.`appUserProfileImgUrl?` | [String] Member App User profile image URL | |
| `channel` | [Object] Channel information | |
| channel.`id` | [Long] Channel ID | |
| channel.`state` | [Enum:EntityState] Channel entity state | ACTIVE, DELETED |
| channel.`channelState` | [Enum:EntityState] Channel state | OPENED |
| channel.`name` | [String] Channel name | |
| `creatorType` | [Enum:CreatorType] Creator type | USER, APP, MEMBER |
| `creatorId` | [Long] Creator ID | |
| `title` | [String] Video room title | |
| `description?` | [String] Video room description | |
| `customType?` | [String] Custom type | |
| `customData?` | [Map<String, String>] Custom data Key-Value Pair | |
| `policy` | [Object:ChannelPolicy] VideoRoom policy information | |
| policy.`hasPassword` | [Boolean] Whether to set an entry password | |
| `scheduledAt?` | [iso8601] Estimated time to start streaming broadcast | |
| `canceledAt?` | [iso8601] When the streaming broadcast was canceled | |
| `lastSessionNo` | [Long] Last session number | protocol = `WEB_RTC` only field |
| `liveStartedAt?` | [iso8601] Streaming broadcast start time | |
| `liveEndedAt?` | [iso8601] Streaming broadcast end date | |
| `vodArchivedAt?` | [iso8601] Streaming broadcast recording completion date | |
| `streamKey?` | [Object:StreamKey] StreamKey information when streaming broadcasting | |
| streamKey?.`id` | [Long] StreamKey ID | |
| streamKey?.`state` | [Enum:EntityState] Entity state | |
| streamKey?.`streamKeyState` | [Enum:StreamKeyState] StreamKey state | |
| `playUrl?` | [String] Play URL to watch when the broadcast starts or resumes | |
| `cmafHlsPlayUrl?` | [String] CMAF-HLS Play URL | activated if mode = `CMAF` or `RTMP_CMAF` |
| `cmafDashPlayUrl?` | [String] CMAF-DASH Play URL | activated if mode = `CMAF` or `RTMP_CMAF` |
| `rtmpPlayUrl?` | [String] RTMP Play URL | activated if mode = `RTMP` or `RTMP_CMAF` |
| `videoPost?` | [Object:VideoPostSimpleDTO] Information about a VideoPost that is being recorded or has been completed | |
| videoPost.`id` | [Long] VideoPost ID | |
| videoPost.`state` | [Enum:EntityState] VideoPost entity state | ACTIVE, DELETED |
| videoPost.`videoPostState` | [Enum:VideoPostState] VideoPost state | CREATED, UPLOADED, QUEUEED, PROCESSING, PROCESSED, FAILED_UPLOAD, FAILED_QUEUEING, FAILED_PROCESSING |
| videoPost.`type` | [Enum:VideoPostState] VideoPost type | LIVE_RECORDED, PRE_RECORDED |
| `stats` | [Object:VideoRoomStat] VideoRoom statistical information | |
| stats.`totalMemberWhitelistCount` | [Long] Total number of Member Whitelists | |
| `createdAt` | [iso8601] Creation date | |
| `lastModifiedAt` | [iso8601] Last modification date | |

### Error Code

| HTTP Status Code | errorCode |
| --- | --- |
| 404 | `VIDEO_ROOM_NOT_FOUND` |

<a name="Get-VideoRoom-by-UUID"></a>
## Get VideoRoom by UUID

---

  * Retrieves a specific VideoRoom by UUID.

```javascript
curl -i -X GET \
   -H "Authorization:Bearer {member-access-token}" \
   -H "Content-Type:application/json" \
'{api-base-url}/v2/members/me/video-rooms/uuid/{video-room-uuid}'

# 200 OK
{
    "id": 1,
    "state": "ACTIVE",
    "uuid": "{uuid}",
    "type": "VIDEO_CONFERENCE",
    "protocol": "WEB_RTC",
    "videoRoomState": "STARTED",
    "vodState": "NOT_ARCHIVED",
    "vodUrl": null,
    "accessLevel": "PUBLIC",
    "app": {
        "id": 1,
        "state": "ACTIVE",
        "name": "foo-app"
    },
    "member": {
        "id": 1,
        "state": "ACTIVE",
        "appUserId": "1",
        "appUserName": "foo-user",
        "appUserProfileImgUrl": "{url}",
        "customType": "MEMBER"
    },
    "channel": {
        "id": 1,
        "state": "ACTIVE",
        "channelState": "OPENED",
        "name": "foo-room"
    },
    "creatorType": "USER",
    "creatorId": 1,
    "title": "foo-room",
    "description": null,
    "customType": "GROUP_METTING",
    "customData": {
        "foo": "bar"
    }
    "policy": {
        "hasPassword": true
    },
    "scheduledAt": "2022-10-19T23:59:59.999Z",
    "cancelledAt": null,
    "lastSessionNo": 1,
    "liveStartedAt": "2022-10-19T06:41:09.865056Z",
    "liveEndedAt": null,
    "vodArchivedAt": null,
    "streamKey": null,
    "playUrl": null,
    "cmafHlsPlayUrl": null,
    "cmafDashPlayUrl": null,
    "rtmpPlayUrl": null,
    "videoPost": null,
    "createdAt": "2022-10-19T06:41:09.865054Z",
    "lastModifiedAt": "2022-10-19T06:41:09.865056Z"
}
```

### Response Parameters
  * See [Get VideoRoom](#Get-VideoRoom).

### Error Code

| HTTP status code | errorCode |
| --- | --- |
| 404 | `VIDEO_ROOM_NOT_FOUND` |

<a name="Start-VideoRoom-RTMP-Broadcast"></a>
## Start VideoRoom RTMP Broadcast

---

  * Executes VideoRoom's RTMP broadcast start (only available for VideoRoom with type = `BROADCAST_RTMP`).
  * Note that if you stop and resume RTMP Ingest after starting the broadcast, you do not need to explicitly run this API again. If you stop RTMP Ingest after starting the broadcast, videoRoomState = LIVE -> LIVE_INACTIVE, and it will automatically change to LIVE_INACTIVE -> LIVE when you resume RTMP Ingest.
  * Change VideoRoom's videoRoomState = `LIVE` and StreamKey's state = `ACTIVE_LIVE` and save VideoRoom information in StreamKey.

```javascript
curl -i -X POST \
   -u "{app.apiKey}:{app.apiSecret}" \
   -H "Content-Type:application/json" \
 '{api-base-url}/v2/members/me/video-rooms/{video-room.id}/start'
 
# 200 OK
{
    "id": 1,
    "state": "ACTIVE",
    "uuid": "{uuid}",
    "type": "BROADCAST_RTMP",
    "protocol": "RTMP",
    "videoRoomState": "LIVE",
    "vodState": "NOT_ARCHIVED",
    "vodUrl": null,
    "type": "BROADCAST_RTMP",
    "format": "CMAF",
    "accessLevel": "PUBLIC",
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
    "creatorType": "MEMBER",
    "creatorId": 1,
    "title": "Foo Video Room",
    "description": "Foo Video Room Description",
    "scheduledAt": "2022-10-19T23:59:59.999Z",
    "cancelledAt": null,
    "lastSessionNo": 1,
    "liveStartedAt": "2022-10-19T23:59:59.999Z",
    "liveEndedAt": null,
    "vodArchivedAt": null,
    "streamKey": {
        "id": 1,
        "state": "ACTIVE",
        "streamKeyState": "ACTIVE_LIVE"
    },
    "playUrl": {url},
    "cmafHlsPlayUrl": {url},
    "cmafDashPlayUrl": {url},
    "rtmpPlayUrl": null,
    "videoPost": null,
    "stats": {
        "totalMemberWhitelistCount": 0
    },
    "createdAt": "2022-10-19T06:41:09.865054Z",
    "lastModifiedAt": "2022-10-19T06:41:09.865056Z"
}
```

### Response Parameters
  * See [Get VideoRoom](#Get-VideoRoom).

### Error Code

| HTTP Status Code | errorCode | Remarks |
| --- | --- | --- |
| 404 | `VIDEO_ROOM_NOT_FOUND` | The VideoRoom resource does not exist. |
| 400 | `VIDEO_ROOM_TYPE_NOT_BROADCAST_RTMP` | VideoRoom does not have type = `BROADCAST_RTMP` |
| 400 | `VIDEO_ROOM_STATE_NOT_SCHEDULED` | If VideoRoom's videoRoomState = `SCHEDULED` |
| 404 | `STREAM_KEY_NOT_FOUND` | If the StreamKey resource does not exist |
| 400 | `STREAM_KEY_STATE_NOT_ACTIVE` | If StreamKey's streamKeyState = `ACTIVE` |
| 400 | `REQUEST_LOCKED` | If the same request is being processed and re-requested (e.g., the end user clicks the same button repeatedly), it is recommended to wait for the response from the previous requested processing. |
| 500 | `MEDIA_SERVICE_INTERNAL_SERVER_ERROR` | Internal media service not working, contact immediately |

<a name="End-VideoRoom-RTMP-Broadcast"></a>
## End VideoRoom RTMP Broadcast

---

  * Executes an RTMP broadcast termination for VideoRoom (only available for VideoRoom with type = `BROADCAST_RTMP`).
  * Note that ending the broadcast is not allowed if RTMP Ingest is currently in progress. RTMP Ingest of the StreamKey mapped to the VideoRoom must be stopped first.
  * Change the VideoRoom's videoRoomState = `ENDED` and the StreamKey's state = `INACTIVE`, and delete the VideoRoom information stored in the StreamKey.

```javascript
curl -i -X POST \
   -u "{app.apiKey}:{app.apiSecret}" \
   -H "Content-Type:application/json" \
 '{api-base-url}/v2/members/me/video-rooms/{video-room.id}/end'
 
# 200 OK
{
    "id": 1,
    "state": "ACTIVE",
    "uuid": "{uuid}",
    "type": "BROADCAST_RTMP",
    "protocol": "RTMP",
    "videoRoomState": "ENDED",
    "vodState": "NOT_ARCHIVED",
    "vodUrl": null,
    "type": "BROADCAST_RTMP",
    "format": "CMAF",
    "accessLevel": "PUBLIC",
    "app": {
        "id": 1,
        "state": "ACTIVE",
        "name": "foo-app"
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
    "title": "Foo Video Room",
    "description": "Foo Video Room Description",
    "scheduledAt": "2022-10-19T23:59:59.999Z",
    "cancelledAt": null,
    "lastSessionNo": 1,
    "liveStartedAt": "2022-10-19T23:59:59.999Z",
    "liveEndedAt": "2022-10-20T23:59:59.999Z",
    "vodArchivedAt": null,
    "streamKey": null,
    "playUrl": null,
    "cmafHlsPlayUrl": null,
    "cmafDashPlayUrl": null,
    "rtmpPlayUrl": null,
    "videoPost": null,
    "stats": {
        "totalMemberWhitelistCount": 0
    },
    "createdAt": "2022-10-19T06:41:09.865054Z",
    "lastModifiedAt": "2022-10-19T06:41:09.865056Z"
}
```

### Response Parameters
  * See [Get VideoRoom](#Get-VideoRoom).

### Error Code

| HTTP Status Code | errorCode | Remarks |
| --- | --- | --- |
| 404 | `VIDEO_ROOM_NOT_FOUND` | If the VideoRoom resource does not exist. |
| 400 | `VIDEO_ROOM_TYPE_NOT_BROADCAST_RTMP` | VideoRoom's type is not `BROADCAST_RTMP`. |
| 400 | `VIDEO_ROOM_STATE_NOT_LIVE_INACTIVE` | If VideoRoom's videoRoomState = `LIVE_INACTIVE` |
| 404 | `STREAM_KEY_NOT_FOUND` | If the StreamKey resource does not exist. |
| 400 | `STREAM_KEY_STATE_NOT_INACTIVE_LIVE` | StreamKey's streamKeyState is not `INACTIVE_LIVE`. |
| 400 | `REQUEST_LOCKED` | If the same request is being processed and re-requested (e.g., end user clicks the same button consecutively), it is recommended to wait for the response of the previously requested processing. |
| 500 | `MEDIA_SERVICE_INTERNAL_SERVER_ERROR` | Internal media service not working, contact immediately |

<a name="VideoRoom-State-Change-Member-EventSource-API-Notification"></a>
## VideoRoom State Change Member EventSource API Notification

---

  * If a member watching the broadcast creates and maintains a **Server-Sent Events** connection with the **Get Member EventSource API**, they will be notified in real-time via message **PUB-SUB** when the state of their **VideoRoom** changes over the course of the broadcast. (As a prerequisite, you must be joined to the channel mapped to that **VideoRoom**).
  * If the **App Callback API** passes this information to the backend server of the **App**, this method has the advantage that it can be delivered directly to the **n** broadcast viewing members running the client. (Instead of polling for **VideoRoom** views on the client side, they can be notified in real time and processed.) In particular, since the **playUrl** changes when the broadcast resumes after a pause, it is advantageous to pass the relevant information to the viewing members immediately.

```javascript
# Create and maintain an EventSource connection
curl -N --http2 \
    -H "Accept:text/event-stream" \
    -H "Authorization:Bearer {member-access-token}" \
  '{api-base-url}/v2/members/me/event-sources'

# 200 OK
# Send VideoRoom change information in real-time as long as the EventSource connection is maintained in the format below

# Start broadcast (playUrl first time)
{
  "messageId": "2023-07-12T07:31:24.010553216Z",
  "sentAt": "2023-07-12T07:31:24.010553216Z",
  "origin": "SYSTEM",
  "type": "SIGNAL",
  "deliveryType": "BROADCAST",
  "channelId": {channel.id},
  "customType": "CHANGE_DATA_CAPTURE",
  "customData": {
    "type": "VIDEO_ROOM",
    "videoRoomId": "{videoRoom.id}",
    "videoRoomState": "LIVE",
    "playUrl": "{url}"
  }
}

# Pause broadcast
{
  "messageId": "2023-07-12T07:31:32.238769907Z",
  "sentAt": "2023-07-12T07:31:32.238769907Z",
  "origin": "SYSTEM",
  "type": "SIGNAL",
  "deliveryType": "BROADCAST",
  "channelId": {channel.id},
  "customType": "CHANGE_DATA_CAPTURE",
  "customData": {
    "type": "VIDEO_ROOM",
    "videoRoomId": "{videoRoom.id}",
    "videoRoomState": "LIVE_INACTIVE",
    "playUrl": null
  }
}

# Resume broadcast (announce changed playUrl)
{
  "messageId": "2023-07-12T07:31:40.894338249Z",
  "sentAt": "2023-07-12T07:31:40.894338249Z",
  "origin": "SYSTEM",
  "type": "SIGNAL",
  "deliveryType": "BROADCAST",
  "channelId": {channel.id},
  "customType": "CHANGE_DATA_CAPTURE",
  "customData": {
    "type": "VIDEO_ROOM",
    "videoRoomId": "{videoRoom.id}",
    "videoRoomState": "LIVE",
    "playUrl": "{url}"
  }
}

# End broadcast
{
  "messageId": "2023-07-12T07:31:56.476755032Z",
  "sentAt": "2023-07-12T07:31:56.476755032Z",
  "origin": "SYSTEM",
  "type": "SIGNAL",
  "deliveryType": "BROADCAST",
  "channelId": {channel.id},
  "customType": "CHANGE_DATA_CAPTURE",
  "customData": {
    "type": "VIDEO_ROOM",
    "videoRoomId": "{videoRoom.id}",
    "videoRoomState": "ENDED",
    "playUrl": null
  }
}
```
