---
title: Ξ [Chat] Member Chat App API
author: Dan Lee
date: 2023-07-02
category: Jekyll
layout: post
cover: /devbook/assets/cover_yellow.jpg
---

-------------
# Introduction

Documentation of App Member Chat API. The set of API here is for obtaining credentials and information for connecting to FlipFlop’s Gossip server.

# API

## Issue Guest Chat Token

---

Issue Chat Token for Guest. The Chat Token and information in the response is needed for using Chat Websocket API

```bash
curl -i -X POST \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
   -d \
'{
  "appUserId": "{uuid}",
  "appUserName": "GUEST_{uuid}",
  "appUserProfileImgUrl": "https://img.foobar.com/users/guest/profile.jpg"
}
' \
 'https://{baseURL}/v2/apps/me/members/guest-chat-tokens'

# 200 OK
{
  "chatToken": "{chatToken}",
  "appId": "ffl-dev-1",
  "userId": "2MwN1UVGBpDL090lFjsXobNQLdq",
  "userName": "GUEST_2MwN1UVGBpDL090lFjsXobNQLdq",
  "avatarProfileUrl": "https://img.foobar.com/users/guest/profile.jpg"
}

```

### Request Parameters

| Parameter | Required | Description | Misc. |
| --- | --- | --- | --- |
| accessToken | false | [String?] Guest accessToken  |  |
| appUserId | false | [String?] Random unique ID to distinguish Guests individually | Automatically generated UUID is used if not specified |
| appUserName | false | [String?] Random unique ID to distinguish Guests individually | Set to GUEST_{uuid} if not specified |
| appUserProfileImgUrl | false | [String?] Member AppUser Profile Image URL | null if not specified |

### Response Parameters

| Parameter | Description | Misc. |
| --- | --- | --- |
| chatServerWebSocketUrl | [String] Chat server WebSocket URL | Required when using Chat WebSocket API |
| chatToken | [String] Chat Token | Required when using Chat WebSocket API |
| appId | [String] App ID | Required when using Chat WebSocket API |
| userId | [String] Guest AppUserID | Required when using Chat WebSocket API |
| userName | [String?] Guest AppUserName | Required when using Chat WebSocket API if value is present |
| avatarProfileUrl | [String?] Guest AppUserProfileImgUrl | Required when using Chat WebSocket API if value is present |

### Error Code

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 400 | INVALID_APP_USER_ID_FORMAT | appUserId contains characters which are not alpha numerical |

## Issue Member Chat Token

---

Issue Chat Token for Member. The Chat Token and information in the response is needed for using Chat WebSocket API.

```bash
curl -i -X POST \
  -u {appApiKey}:{appApiSecret} \
  -H "Content-Type:application/json" \
  -d \
'' \
  'https://{baseURL}/v2/apps/me/members/{appUserId}/chat-tokens'

# 200 OK
{
  "chatToken": "{chatToken}",
  "appId": "ffl-dev-1",
  "userId": "1",
  "userName": "foobar1",
  "avatarProfileUrl": "https://img.foobar.com/users/1/profile.jpg"
}

```

### Response Parameters

| Parameter | Description | Misc. |
| --- | --- | --- |
| chatServerWebSocketUrl | [String] Chat server WebSocket URL | Required when using Chat WebSocket API |
| chatToken | [String] Chat Token | Required when using Chat WebSocket API |
| appId | [String] App ID | Required when using Chat WebSocket API |
| userId | [String] Member AppUserID | Required when using Chat WebSocket API |
| userName | [String?] Member AppUserName | Required when using Chat WebSocket API if value is present |
| avatarProfileUrl | [String?] Member AppUserProfileImgUrl | Required when using Chat WebSocket API if value is present |

### Error Code

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 404 | MEMBER_NOT_FOUND | Member does not exist |

-------------
Copyright 2023 @ Jocoos.