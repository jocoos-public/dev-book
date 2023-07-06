---
title: Ξ [Platform] Member App API
author: Dan Lee
date: 2023-07-02
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

-------------
# Introduction

This series of App API is related to synchronizing your member information with FlipFlop or managing their association with FlipFlop. Note that in the context of FlipFlop, the term ‘user’ is you(our valued customer using FlipFlop) and ‘member’ is a user of your app.

# API

## Guest Member Login

---

Get tokens for your app’s guest user to make requests to FlipFlop. A guest user is a user that is not logged into your app.

```bash
curl -i -X POST \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
   -d \
'' \
 'https://{baseURL}/v2/apps/me/members/login-as-guest'

# 200 OK
{
    "accessToken": "{guestMemberAccessToken}",
    "refreshToken": "{guestMemberRefreshToken}",
    "streamingToken": "{guestMemberStreamingToken}"
}
```

### Response Parameters

| Parameter Name | Type & Description | Misc. |
| --- | --- | --- |
| accessToken | [String] Access token |  |
| refreshToken | [String] Refresh token |  |
| streamingToken | [String] Streaming token |  |

## Member Login

---

Get tokens for your app’s (logged in) user to make requests to FlipFlop. At the same time, the user is registered as a member of your FlipFlop app. It is recommended to call this API when your app user logs into your app.

```bash
curl -i -X POST \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
   -d \
'{
    "appUserId": "1",
    "appUserName": "foobar",
    "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg"
}
' \
 'https://{baseURL}/v2/apps/me/members/login'

# 200 OK
{
    "accessToken": "{memberAccessToken}",
    "refreshToken": "{memberRefreshToken}",
    "streamingToken": "{memberStreamingToken}"
}
```

### Request Parameters

| Parameter Name | Required/Optional | Type & Description | Misc. |
| --- | --- | --- | --- |
| appUserId | Required | [String] Member App User ID | Must be a unique id of a user from your App |
| appUserName | Optional | [String] Member App User Name |  |
| appUserProfileImgUrl | Optional | [String] Member App User Profile Image URL | Profile Image URL of a user from your App (Validity not verified) |

### Response Parameters

| Parameter Name | Type & Description | Misc. |
| --- | --- | --- |
| accessToken | [String] Access token |  |
| refreshToken | [String] Refresh token |  |
| streamingToken | [String] Streaming token |  |

### Error Codes

| HTTP Status Code | errorCode |
| --- | --- |
| 400 | EMPTY_APP_USER_ID |

## Member Registration

---

Register your app user as your FlipFlop app member. Same as [Member Login App API](Member%20App%20API%20afd3ac7e950245d39d81e141bf348fd5.md) except tokens are not issued.

```bash
curl -i -X POST \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
   -d \
'{
    "appUserId": "1",
    "appUserName": "foobar",
    "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg"
}
' \
 'https://{baseURL}/v2/apps/me/members'

# 201 Created
{
    "id": 1,
    "state": "ACTIVE",
    "app": {
        "id": 1,
        "state": "ACTIVE",
        "name": "Foo App"
    },
    "appUserId": "1",
    "appUserName": "foobar",
    "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg",
    "createdAt": "2022-10-24T23:03:05.794132Z",
    "lastModifiedAt": "2022-10-24T23:03:05.794133Z"
}
```

### Request Parameters

| Parameter Name | Required/Optional | Type & Description | Misc. |
| --- | --- | --- | --- |
| appUserId | Required | [String] Member App User ID | Must be a unique id of a user from your App |
| appUserName | Optional | [String] Member App User Name |  |
| appUserProfileImgUrl | Optional | [String] Member App User Profile Image URL | Profile Image URL of a user from your App (Validity not verified) |

### Response Parameters

- Refer to [Get Member Response Parameters](about:blank#get-member-response-parameters)

### Error Codes

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 400 | EMPTY_APP_USER_ID | Required parameter appUserId is missing in request body |

## Member Update

---

Update your FlipFlop app member information. It is recommended to call this API when your app user’s information(user name or profile image URL) is updated.

```bash
curl -i -X PATCH \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
   -d \
'{
    "appUserName": "foobar",
    "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg"
}
' \
 'https://{baseURL}/v2/apps/me/members/{appUserId}'

# 200 OK
{
    "id": 1,
    "state": "ACTIVE",
    "app": {
        "id": 1,
        "state": "ACTIVE",
        "name": "Foo App"
    },
    "appUserId": "1",
    "appUserName": "foobar",
    "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg",
    "createdAt": "2022-10-24T23:03:05.794132Z",
    "lastModifiedAt": "2022-10-24T23:03:05.794133Z"
}
```

### Request Parameters

| Parameter Name | Required/Optional | Type & Description | Misc. |
| --- | --- | --- | --- |
| appUserName? | Optional | [String] Member App User Name | value removed when null |
| appUserProfileImgUrl? | Optional | [String] Member App User Profile Image URL | value removed when null |

### Response Parameters

- Refer to [Get Member Response Parameters](about:blank#get-member-response-parameters)

### Error Codes

| HTTP Status Code | errorCode |
| --- | --- |
| 404 | MEMBER_NOT_FOUND |

## Get Members

---

Get a list of your FlipFlop app members.

```bash
curl -i -X GET \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
 'https://{baseURL}/v2/apps/me/members?appUserName=foobar&sortBy=CREATED_AT_DESC'

# 200 OK
{
    "content": [
        {
            "id": 1,
            "state": "ACTIVE",
            "app": {
                "id": 1,
                "state": "ACTIVE",
                "name": "Foo App"
            },
            "appUserId": "foo.id",
            "appUserName": "foo.name",
            "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg",
            "createdAt": "2022-10-24T23:03:02.040169Z",
            "lastModifiedAt": "2022-10-24T23:03:02.040169Z"
        }
    ],
    "pageable": {
        "sort": {
            "empty": true,
            "sorted": false,
            "unsorted": true
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
        "empty": true,
        "sorted": false,
        "unsorted": true
    },
    "first": true,
    "numberOfElements": 1,
    "empty": false
}
```

### Request Parameters

| Parameter Name | Required/Optional | Type & Description | Misc. |
| --- | --- | --- | --- |
| appUserId | Optional | [String] Member App User ID |  |
| appUserName | Optional | [String] Member App User Name |  |
| sortBy | Optional | [String] Sort order | CREATED_AT_ASC, CREATED_AT_DESC, LAST_MODIFIED_AT_ASC, LAST_MODIFIED_AT_DESC, APP_USER_ID_ASC, APP_USER_ID_DESC |
| page | Optional | [Int] Page number |  |
| pageSize | Optional | [Int] Page size |  |

### Response Parameters

| Parameter Name | Type & Description | Misc. |
| --- | --- | --- |
| content[] | [arrayOfObject] List of members | Refer to about:blank#get-member-response-parameters |

## Get Member

---

Get information about one of your FlipFlop app member.

```bash
curl -i -X GET \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
 'https://{baseURL}/v2/apps/me/members/{appUserId}'

# 200 OK
{
    "id": 1,
    "state": "ACTIVE",
    "app": {
        "id": 1,
        "state": "ACTIVE",
        "name": "Foo App"
    },
    "appUserId": "foo.id",
    "appUserName": "foo.name",
    "appUserProfileImgUrl": "https://img.foobar.com/users/1/profile.jpg",
    "createdAt": "2022-10-24T23:03:05.794132Z",
    "lastModifiedAt": "2022-10-24T23:03:05.794133Z"
}
```

### Response Parameters

| Parameter Name | Type & Description | Misc. |
| --- | --- | --- |
| id | [Long] Member ID |  |
| state | [Enum:EntityState] Entity state | ACTIVE, DELETED |
| app | [Object] FlipFlop app information |  |
| app.id | [Long] FlipFlop app ID |  |
| app.state | [Enum:EntityState] FlipFlop app entity state | ACTIVE, DELETED |
| app.name | [String] FlipFlop app name |  |
| appUserId | [String] ID of the user in your app |  |
| appUserName? | [String] Username of the user in your app |  |
| appUserProfileImgUrl? | [String] Profile image URL of the user in your app |  |
| createdAt | [iso8601] Date and time created |  |
| lastModifiedAt | [iso8601] Last date and time mofied |  |

### Error Codes

| HTTP Status Code | errorCode |
| --- | --- |
| 404 | MEMBER_NOT_FOUND |

### Remove Member

---

Remove your app user from your FlipFlop app as a member. Use comma separated values to remove more than on user. For example `1,2,3`. This is not recommended for actual use.

```bash
curl -i -X DELETE \
   -u {appApiKey}:{appApiSecret} \
 'https://{baseURL}/v2/apps/me/members/{appUserIds}'

# 204 No Content
```

-------------
Copyright 2023 @ Jocoos.