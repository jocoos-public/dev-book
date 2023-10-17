---
title: Ξ [Server Side] App Member API
author: Dan Lee, Taehyeong Lee
date: 2023-10-16
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

-------------
# Introduction

This series of App API is related to synchronizing your member information with FlipFlop or managing their association with FlipFlop. Note that in the context of FlipFlop, the term ‘user’ is you(our valued customer using FlipFlop) and ‘member’ is a user of your app.

# API

<a name="Member-Login"></a>
## Member Login

---

  * Execute a member login.
  * Answer an `accessToken` with a 24 hour expiration as the result of the request.

```
curl -i -X POST \
   -u "{app.apiKey}:{app.apiSecret}" \
   -H "Content-Type:application/json" \
   -d \
'{
    "appUserId": "1",
    "appUserName": "foobar",
    "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg",
    "email": "foo@bar.com",
    "customType": "MEMBER",
    "customData": {
        "foo": "bar"
    }
}
' \
 '{api-base-url}/v2/apps/me/members/login'

# 200 OK
{
    "accessToken": "{memberAccessToken}",
    "streamingToken": "{memberStreamingToken}"
}
```

### Request parameters

| Parameter Name | Required/Optional Status | Description | Remarks |
| --- | --- | --- | --- |
| `appUserId` | Required | [String] Member App User ID | Requires an ID value that uniquely identifies the Member in the app. Case sensitive, non-numeric characters are not allowed |
| `appUserName` | Optional | [String] Member App User Name | |
| `appUserProfileImgUrl` | Optional | [String] member App User profile image URL | Trust the URL passed by the app without validation, store as is |
| `email` | Optional | [String] Member email address | Enable email sending on save |
| `customType` | Optional | [String] Custom type | ex) MEMBER, GUEST |
| `customData` | Optional | [Map<String, String>] custom data Key-Value Pair | Register member's unique data |

### Response parameters

| Parameter Name | Description | Remarks |
| --- | --- | --- |
| `accessToken` | [String] Member Access Token | |
| `streamingToken` | [String] Member Streaming Token | |

### Error Code

| HTTP Status Code | errorCode | Remarks |
| --- | --- | --- |
| 400 | `EMPTY_APP_USER_ID` | Required appUserId request field is missing. |
| 400 | `INVALID_APP_USER_ID_FORMAT` | If the format of the appUserId request field includes characters other than upper and lower case letters and numbers. |
| 400 | `CUSTOM_TYPE_SIZE_UPPER_LIMIT_EXCEEDED` | customType field exceeds the maximum allowed length of 50 characters. |
| 400 | `CUSTOM_DATA_ITEM_COUNT_UPPER_LIMIT_EXCEEDED` | The maximum number of customData items exceeded 10. |
| 400 | `CUSTOM_DATA_ITEM_NAME_SIZE_UPPER_LIMIT_EXCEEDED` | customData item name exceeds the maximum length of 50 characters |
| 400 | `CUSTOM_DATA_ITEM_VALUE_SIZE_UPPER_LIMIT_EXCEEDED` | customData item value exceeds 50 characters. |

<a name="Delete-Member"></a>
## Delete Member

---

  * Deletes a member.
  * The target appUserId can be requested multiple times and can be separated by commas, such as `1,2,3`.

```
curl -i -X DELETE \
   -H "Authorization:Basic {base64of({appApiKey}:{appApiSecret})}" \
 '{api-base-url}/v2/apps/me/members/{appUserIds}'

# 204 No Content
```
