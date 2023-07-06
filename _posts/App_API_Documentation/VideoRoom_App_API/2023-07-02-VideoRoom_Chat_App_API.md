---
title: Ξ [Chat] VideoRoom Chat App API
author: Dan Lee
date: 2023-07-02
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

-------------
# Introduction

Documentation of App VideoRoom Chat API. In order to support chatting in your VideoRoom, you have to create a ChatRoom. The chat room supports setting forbidden words, direct messages, along with the basic chatting feature.

If a ChatRoom is created for a VideoRoom, you will get chat room channel information when querying for VideoRooms. In order to chat you must connect to FlipFlop’s Gossip server using STOMP over WebSocket. Details on ChatRoom WebSocket API could be found [here](VideoRoom%20Chat%20WebSocket%20API%2092ca62d8bfa14720ac54c526952e944f.md).

# API

## Create VideoRoom ChatRoom

---

Create VideoRoom ChatRoom.

```bash
curl -i -X POST \
 -u {appApiKey}:{appApiSecret} \
 -H "Content-Type:application/json" \
 -d \
'' \
 'https://{baseURL}/v2/apps/me/video-rooms/{videoRoomId}/chat-room'

# 200 OK
{
  "videoKey": "{videoKey}",
  "channelKey": "{channelKey}",
  "totalChatMessageCount": 0,
  "totalChatMemberCount": 0,
  "closed": false,
  "createdAt": "2023-03-03T08:21:42.139Z"
}

```

### Response Parameters

| Parameter | Description | Misc. |
| --- | --- | --- |
| videoKey | [String] VideoRoom ID | Required when using Chat WebSocket API |
| channelKey | [String] ChatRoom ID | Required when using Chat WebSocket API |
| totalChatMessageCount | [Long] Total number of messages in ChatRoom |  |
| totalChatMemberCount | [Long] Total number of participating Members in ChatRoom |  |
| closed | [Boolean] Whether the ChatRoom is closed |  |
| createdAt | [iso8601] ChatRoom created date and time |  |

### Error Codes

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND | VideoRoom does not exist |
| 400 | CHAT_ROOM_ALREADY_EXISTS | ChatRoom for VideoRoom already exists |

## Get VideoRoom ChatRoom

---

Get VideoRoom ChatRoom

```bash
curl -i -X GET \
 -u {appApiKey}:{appApiSecret} \
 'https://{bseURL}/v2/apps/me/video-rooms/{videoRoomId}/chat-room'

# 200 OK
{
  "videoKey": "{videoKey}",
  "channelKey": "{channelKey}",
  "totalChatMessageCount": 0,
  "totalChatMemberCount": 0,
  "closed": false,
  "createdAt": "2023-03-03T08:21:42.139Z"
}
```

### Response Parameters

| Parameter | Description | Misc. |
| --- | --- | --- |
| videoKey | [String] VideoRoom ID | Required when using Chat WebSocket API |
| channelKey | [String] ChatRoom ID | Required when using Chat WebSocket API |
| totalChatMessageCount | [Long] Total number of messages in ChatRoom |  |
| totalChatMemberCount | [Long] Total number of participating Members in ChatRoom |  |
| closed | [Boolean] Whether the ChatRoom is closed |  |
| createdAt | [iso8601] ChatRoom created date and time |  |

### Error Codes

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND | VideoRoom does not exist |
| 404 | CHAT_ROOM_NOT_FOUND | ChatRoom not created for VideoRoom |

## Close VideoRoom ChatRoom

---

Close VideoRoom ChatRoom

```bash
curl -i -X POST \
 -u {appApiKey}:{appApiSecret} \
 -H "Content-Type:application/json" \
 -d \
'' \
 'https://{baseURL}/v2/apps/me/video-rooms/{videoRoomId}/chat-room/close'

# 200 OK
{
  "videoKey": "{videoKey}",
  "channelKey": "{channelKey}",
  "totalChatMessageCount": 0,
  "totalChatMemberCount": 0,
  "closed": true,
  "createdAt": "2023-03-03T08:21:42.139Z"
}
```

### Response Parameters

| Parameter | Description | Misc. |
| --- | --- | --- |
| videoKey | [String] VideoRoom ID | Required when using Chat WebSocket API |
| channelKey | [String] ChatRoom ID | Required when using Chat WebSocket API |
| totalChatMessageCount | [Long] Total number of messages in ChatRoom |  |
| totalChatMemberCount | [Long] Total number of participating Members in ChatRoom |  |
| closed | [Boolean] Whether the ChatRoom is closed |  |
| createdAt | [iso8601] ChatRoom created date and time |  |

### Error Codes

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND | VideoRoom does not exist |
| 404 | CHAT_ROOM_NOT_FOUND | ChatRoom not created for VideoRoom |

## Get VideoRoom ChatRoom Participating Members

---

Get list of VideoRoom ChatRoom participating Members. Only available until ChatRoom is closed.

```bash
curl -i -X GET \
 -u {appApiKey}:{appApiSecret} \
 'https://{baseURL}/v2/apps/me/video-rooms/{videoRoomId}/chat-room/members?cursor=0&count=20'

# 200 OK
{
  "nextCursor": 1,
  "count": 1,
  "content": [
    {
      "appUserId": "1",
      "appUserName": "foobar1",
      "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg",
      "joinedAt": "2023-03-03T08:22:11.302Z"
    }
  ]
}

```

### Request Parameters

| Parameter | Required | Description | Misc. |
| --- | --- | --- | --- |
| cursor | false | [Long] Cursor position | Default value 0 if not specified |
| count | false | [Long] Max number of members in response | Default value 20 if not specified |

### Response Parameters

| Parameter | Description | Misc. |
| --- | --- | --- |
| nextCursor | [Long] Next cursor position |  |
| count | [Long] Number of participating members from current cursor |  |
| content[] | [Array:MemberSimpleDTO] Array of participating members in ChatRoom |  |
| content[].appUserId | [String] Member’s AppUserID |  |
| content[].appUserName | [String?] Member’s AppUserName |  |
| content[].appUserProfileImgUrl | [String?] Member’s App User profile image URL |  |
| content[].joinedAt | [iso8601] Date and time when member joined ChatRoom |  |

### Error Codes

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND | VideoRoom does not exist |

## Broadcast VideoRoom ChatRoom Admin Message

---

Broadcast admin message to VideoRoom ChatRoom. Used for sending system level messages(such as announcement or notice).

```bash
curl -i -X POST \
 -u {appApiKey}:{appApiSecret} \
 -H "Content-Type:application/json" \
 -d \
'{
  "messageType": "MESSAGE",
  "customType": "MSG",
  "message": "Foo Message",
  "data": {
    "foo":"bar",
    "bar":"foo"
  },
  "appUserIds": ["1", "2"]
}' \
 'https://{baseURL}/v2/apps/me/video-rooms/{videoRoomId}/chat-room/admin/messages/broadcast'

# 201 Created
{
  "videoKey": "{videoRoomId}",
  "channelKey": "{channelKey}",
  "messageId": {messageId}
}
```

### Request Parameters

| Parameter | Required | Description | Misc. |
| --- | --- | --- | --- |
| messageType | true | [Enum:ChatRoomBroadcastMessageType] Message type | MESSAGE: General message, COMMAND: Custom message |
| customType | false | [String] Custom message type name | Custom message type string that can be set for client side operations |
| message | false | [String?] The message |  |
| data | false | [Map<String, Any?>?] Key-Value Pair custom data |  |
| appUserIds | false | [Array:String] List of Member AppUserID of message receivers |  |

### Response Parameters

| Parameter | Description | Misc. |
| --- | --- | --- |
| videoKey | [String] VideoRoom ID | Required when using Chat WebSocket API |
| channelKey | [String] ChatRoom ID | Required when using Chat WebSocket API |
| messageId | [Long] ChatRoom message ID |  |

### Error Codes

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND | VideoRoom does not exist |
| 400 | EMPTY_CHAT_ROOM_MESSAGE_TYPE | messageType not specified |

## Send Admin VideoRoom ChatRoom Direct Message

---

Send direct VideoRoom ChatRoom admin message. Used for sending system level messages(such as announcement or notice).

```bash
curl -i -X POST \
 -u {appApiKey}:{appApiSecret} \
 -H "Content-Type:application/json" \
 -d \
'{
  "messageType": "DM",
  "customType": "DM",
  "message": "Foo Message",
  "data": {
    "foo":"bar",
    "bar":"foo"
  },
  "appUserIds": ["1", "2"]
}' \
 'https://{baseURL}/v2/apps/me/video-rooms/{videoRoomId}/chat-room/admin/messages/direct'

# 201 Created
{
  "videoKey": "{videoRoomId}",
  "channelKey": "{channelKey}",
  "messageId": {messageId}
}

```

### Request Parameters

| Parameter | Required | Description | Misc. |
| --- | --- | --- | --- |
| messageType | true | [Enum:ChatRoomDirectMessageType] Message type | DM: Direct message, COMMAND: Custom message |
| customType | false | [String] Custom message type name | Custom message type string that can be set for client side operations |
| message | false | [String?] The message |  |
| data | false | [Map<String, Any?>?] Key-Value Pair custom data |  |
| appUserIds | true | [Array:String] List of Member AppUserID of message receivers |  |

### Response Parameters

| Parameter | Description | Misc. |
| --- | --- | --- |
| videoKey | [String] VideoRoom ID | Required when using Chat WebSocket API |
| channelKey | [String] ChatRoom ID | Required when using Chat WebSocket API |
| messageId | [Long] ChatRoom message ID |  |

### Error Codes

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND | VideoRoom does not exist |
| 400 | EMPTY_CHAT_ROOM_MESSAGE_TYPE | messageType not specified |
| 400 | EMPTY_CHAT_ROOM_APP_USER_IDS | appUserIds not specified |

## Get VideoRoom ChatRoom Message

---

Get a certain VideoRoom ChatRoom Message.

```bash
curl -i -X GET \\
 -u {appApiKey}:{appApiSecret} \
 'https://{baseURL}/v2/apps/me/video-rooms/{videoRoomId}/chat-room/messages/{messageId}'

# 200 OK
{
  "videoKey": "{videoRoomId}",
  "channelKey": "{channelKey}",
  "messageId": {messageId},
  "messageType": "COMMAND",
  "customType": "WARNING",
  "message": "foobar",
  "data": {
    "foo": "bar",
    "bar": "foo"
  },
  "receiverAppUserIds": [
    "1",
    "2"
  ],
  "createdAt": "2023-03-14T02:50:23.202Z"
}
```

### Response Paramters

| Parameter | Description | Misc. |
| --- | --- | --- |
| videoKey | [String] VideoRoom ID | Required when using Chat WebSocket API |
| channelKey | [String] ChatRoom ID | Required when using Chat WebSocket API |
| messageId | [Long] ChatRoom message ID |  |
| messageType | [Enum:ChatRoomDirectMessageType] Message Type | MESSAGE: General message, DM:Direct message, COMMAND: Custom message |
| customType | [String?] Message custom type | Custom type name |
| message | [String?] The message |  |
| data | [Map<String, Any?>?]  Key-Value Pair custom data |  |
| receiverAppUserIds | [Array:String] List of Member AppUserID of message receivers |  |
| createdAt | [iso8601] Message transcation date and time |  |

### Error Codes

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND | VideoRoom does not exist |
| 404 | CHAT_ROOM_MESSAGE_NOT_FOUND | Message does not exist |

## Hide VideoRoom ChatRoom Message

---

Make a certain message in a VideoRoom ChatRoom hidden.

```bash
curl -i -X POST \
 -u {appApiKey}:{appApiSecret} \
 'https://{baseURL}/v2/apps/me/video-rooms/{videoRoomId}/chat-room/messages/{messageId}/hide'

# 204 No Content
```

### Error Codes

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND | VideoRoom does not exist |
| 404 | CHAT_ROOM_MESSAGE_NOT_FOUND | Message does not exist |

## Make Hidden VideoRoom ChatRoom Message Visible

---

Make a certain hidden message in a VideoRoom ChatRoom visible again.

```bash
curl -i -X POST \
 -u {appApiKey}:{appApiSecret} \
 'https://{baseURL}/v2/apps/me/video-rooms/{videoRoomId}/chat-room/messages/{messageId}/unhide'

# 204 No Content
```

### Error Codes

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND | VideoRoom does not exist |
| 404 | CHAT_ROOM_MESSAGE_NOT_FOUND | Message does not exist |

## Delete VideoRoom ChatRoom Message

---

Delete a specific VideoRoom ChatRoom Message.

```bash
curl -i -X DELETE \
 -u {appApiKey}:{appApiSecret} \
 'https://{baseURL}/v2/apps/me/video-rooms/{videoRoomId}/chat-room/messages/{messageId}'

# 204 No Content
```

### Error Codes

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 404 | VIDEO_ROOM_NOT_FOUND | VideoRoom does not exist |
| 404 | CHAT_ROOM_MESSAGE_NOT_FOUND | Message does not exist |

-------------
Copyright 2023 @ Jocoos.