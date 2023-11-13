---
title: Θ Flipflop Transcoder Documentation
author: Tekhun, Jeong
date: 2023-11-08
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

-------------
# Introduction
This document defines how to use the flip-flop transcoder. Transcoding can be done in two ways. You can upload and transcode from the dashboard, or you can transcode via the API. First, sign up for the dashboard and create an application. Use this application's App Key and App Secret to use the platform API.

The following information is required to use the transcoder
- email: The email of the account that signed up for the dashboard
- password: The password of the account that signed up for the dashboard
- app key: The application's key
- app secret: The application's secret key

# How to create a Application
1. Sign up for a dashboard. You'll need an email and password.
2. Log in to your dashboard.
3. Create an application in the dashboard.
4. Find your app key and app secret on your application's settings page.
5. Use the API with your app key and app secret key.


# Transcoding using the dashboard
You can try transcoding and see the results in the dashboard. You'll need to sign up or have an email/password forwarded to you to use the dashboard.


## How to Transcoding
- Access your dashboard at https://dashboard.flipflop.tv/.
- Sign in with your email and password.
- Select Demo from the Applications list. 
- On the Videos -> Videos page, click Upload in the top right corner. 
- In the new window that opens, use the + button to upload your file. You do not need to enter a title and description.
- Upload your video information and file.
- When the transcoding is finished, your video will appear in the list and you can click on it.
- Check the result in the new window.


# Transcoding using the API
To use the API, you need an AccessToken. There are two types of Access Tokens. There are two types of access tokens: Admin Token and User Token.

| Type | Required | Permissions |
| --- | --- | --- |
| Admin Token | email, password | Permissions for all videos in the application |
| User Token | App Key, App Secret, User ID | Permissions for your own videos |


## API Host

| Name | URL |
| --- | --- |
| API Host | https://www.flipflop.tv |

## API Concept
- Authentication uses the Authorization in the header.
- All responses are responded to as Json.


## Authentication Tokens
### Admin Token
Get an admin token. Email, password are required.

### Http Request
```
POST {{host}}/oauth/token
```

### Request Header

| Key | Requried | Description |
| --- | --- | --- |
| Authorization | true | Basic Z3Vlc3Q6Z3Vlc3RzZWNyZXQ= |
| Content-Type | true | application/x-www-form-urlencoded |

### Request body 

| Key | Requried | Type | Description |
| --- | --- | --- | --- |
| grant_type | true | String | client_credentails |
| email | true | String | Email for the account you use in the dashboard |
| secret | true | String | The password for the account you use in the dashboard |

### Repsone body 

| Key | Requried | Description |
| --- | --- | --- |
| access_token | string | Access Token |
| token_type | string | Token type ex) bearer |
| expires_in | number | Token validity, returned in seconds |
| scope | number | Token scope |
| member_id | string | Admin ID |
| jti | string | JWT ID |

### Reqeust Example
```
curl guest:guestsecrest@${{host}}/oauth/token -d grant_type=client_credentials -d  email=sample@email.com -d secret=smaple_password
```

### Response Example
```
{
  "access_token" : "eyJhbGc...",
  "token_type" : "bearer",
  "expires_in" : 2591999,
  "scope" : "guest",
  "member_id" : "1",
  "jti" : "19043fa1-c1e2-4e3d-a292-2378e801619c"
}
```

## User Token
Get a user token. You'll need an app_key, app_secret, and user_id.
You can find the app_key and app_secret when you create an application in the dashboard and on the Settings page.
Alternatively, you can use the app_key and app_secret that are passed to you. The user token is a Basic token, which uses the base64-encoded value of app_key, app_secret.

```
sample_app_key:sample_app_secret -> c2FtcGxlX2FwcF9rZXk6c2FtcGxlX2FwcF9zZWNyZXQ=
```
### Http Request
```
POST {{host}}/oauth/token
```

### Request Header

| Key | Requried | Description |
| --- | --- | --- |
| Authorization | true | Basic {sample_app_key:sample_app_secret} |
| Content-Type | true | application/x-www-form-urlencoded |

### Request body 

| Key | Requried | Type | Description |
| --- | --- | --- | --- |
| grant_type | true | String | client_credentails |
| user_id | true | String | User Unique ID |

### Repsone body 

| Key | Requried | Description |
| --- | --- | --- |
| access_token | string | Access Token |
| token_type | string | Token type ex) bearer |
| expires_in | number | Token validity, returned in seconds |
| scope | number | Token scope |
| member_id | string | Admin ID |
| jti | string | JWT ID |

### Reqeust Example
```
curl sample_app_key:sample_app_secret@${{host}}/oauth/token/oauth/token -d grant_type=client_credentials -d user_id=testuser
```

### Response Example
```
{
  "access_token" : "eyJhbGc...",
  "token_type" : "bearer",
  "expires_in" : 2591999,
  "scope" : "read write",
  "user_id" : "testuser",
  "jti" : "19043fa1-c1e2-4e3d-a292-2378e801619c"
}
```

## Video Upoad And Transcoding
After the upload is complete, the transcoding request will be processed internally. Once the video has been transcoded, it will pass the address of the video as the callback URL.

### Http Request
```
POST  {{host}}/v2/admin/applications/{appKey}/uploads
```
### Path Variables

| Key | Description |
| --- | --- |
| appKey | App Key |

### Request Header

| Key | Requried | Description |
| --- | --- | --- |
| Authorization | true | Bearer {access_token} |
| Content-Type | true | multipart/form-data |

### Request body 

| Key | Requried | Type | Description |
| --- | --- | --- | --- |
| file | true | MultipartFile | The video file to be transcoded |
| thumbnail | true | MultipartFile | Thumbnail file |
| video_key | false | string(4~100) | Video unique key |
| title | false | string(1~100) | Video title |
| content | false | string(1~100) | Video description |
| visibility | false | string | Public scope, allowing only **PUBLIC** or **PRIVATE**.
Defaults to **PUBLIC** |
| muted | false | boolean | Mute or not for video |
| device_os | false | string(10) | Device OS |
| device_os_version | false | string(10) | Device OS Version |
| device_name | false | string(255) | Device SDK Version |
| callback_url | false | string(255) | API address to receive callbacks |
| preview_start | false | string(8) | When creating a thumbnail video, the start point of the video. Must be used in conjunction with preview_duration. Used in `hh:mm:ss` format |
| preview_duration| false | string(8) | The length of the video from the start. Must be used with preview_start. Used in `hh:mm:ss` format |


### Repsone body 

| Key | Requried | Description |
| --- | --- | --- |
| video_key | string | Video unique key |
| path | string | Video file location |
| thumbanil_path | string | Thumbnail file location |
| callback_url | string | Callback API address |

### Request Example
```
{
    "file": (binary)
    "title": "title",
    "content": "content",
    "visibility": "PUBLIC",
    "muted": true,
    "device_os": "ios",
    "device_os_version": "12.0",
    "device_name": "gray's iPhoneX",
    "sdk_version": "0.1.1",
    "callback_url": "https://flipflop.tv/callback/1234"
}

```

### Response Example
```
{
    "video_key": "a10000",
    "path": "A10000/videos/10000",
    "thumbnail_path": "A10000/videos/10000/thumbnail.jpg"
}
```

## Get a list of videos
View the list of videos. Not all videos are visible in the video list. Videos that have been deleted or have failed to transcode will not be visible. To get a list of videos that are being transcoded, use state in the request parameter with a value of `VOD_TRANS`. To get a list of deleted videos, use `DELETED`.
In video search, the start date (from) and end date (to) are based on the video registration date. The time of the start and end date is used internally as 0:00 hours, 0 minutes, 0 seconds. The start date, end date, and title can be used together, but only one of each can be requested alone.

### Http Request
```
GET  {{host}}/v2/admin/applications/{appKey}/videos
```

### Path Variables

| Key | Description |
| --- | --- |
| appKey | App Key |

### Request Header

| Key | Requried | Description |
| --- | --- | --- |
| Authorization | true | Bearer {access_token} |

### Request Parameters

| Key | Requried | Type | Description |
| --- | --- | --- | --- |
| type | false | string | Type of Video. `BROADCASTED`, `UPLOADED` available |
| state | false | string | state of video. `VOD`: Transcoding complete, `VOD_TRANS`: Transcoding, `DELETED`: deleted |
| page | false | number | page number. Defaults to 0 |
| size | false | number | page size. Defaults to 20|
| title | false | string | Title of the video to search |
| from | false | string | Search start date. `yyyyMMdd` format only. |
| to | false | string | Search end date. `yyyyMMdd` format only. |

### Repsone body 

| Key | Requried | Description |
| --- | --- | --- |
| content | Object[] | Array of video objects |
| number | number | Current page number |
| size | number | page size |
| total_elements | number | Total number of items |
| total_pages | number | Total page number of items |
| first | boolean | Front page or not |
| last | boolean | Last page or not |


#### Video Object

| Key | Requried | Type | Description |
| --- | --- | --- | --- |
| video_key | true | string(4~100) | Video unique key |
| type | true | string | Type of Video. `BROADCASTED`, `UPLOADED` available |
| state | true | string | state of video. `VOD`: Transcoding complete, `VOD_TRANS`: Transcoding, `DELETED`: deleted |
| user_id | true | string | User ID |
| user_name | false | string | User name |
| title | false | string(1~100) | Video title |
| content | false | string(1~100) | Video description |
| url | true | string | Video URL |
| thumbnail_url | true | string | Thumbnail URL |
| thumbnail_path | true | string | Thumbnail Path |
| duration | true | string | Video length, in `milliseconds` |
| visibility | true | string | Public scope |
| muted | true | boolean | Mute or not for video |
| locked | true | boolean | Locked or not for video |
| data | false | string | User custom data |
| heart_count | false | number | Number of hearts |
| like_count | false | number | Number of likes |
| created_at | true | number | Broadcast creation time, returned as a Unix timestamp value in milliseconds |


### Response Example
```
{"content":[{
"id":10000,
"app_key":"A10000",
"video_key":"a10000",
"user_id":"5",
"path":"A10000/videos/10000",           "url":"https://static.flipflop.tv/A10000/videos/10000/vod.mp4",  
"thumbnail_path":"A10000/videos/10000/thumbnail.jpg",
"thumbnail_url":"https://static.flipflop.tv/A10000/videos/10000/thumbnail.jpg?time=1598428755712",
"title":"디젤Q_세로형_저용량",
"content":"Upload Demo Content",
"type":"UPLOADED",
"state":"VOD",
"visibility":"PUBLIC",
"muted":false,
"locked":false,
"duration":1200,
"data":"",
"data2":"{\n  \"transcoding_time\" : 1222,\n  \"input_file_size\" : 376073,\n  \"output_file_size\" : 260120\n}",
"heart_count":0,
"watch_count":0,
"view_count":0,
"like_count":0,
"created_at":1598428755712,
"updated_at":1598428757614,
"deleted_at":null}, 
...],
"pageable":{"sort":{"sorted":true,"unsorted":false,"empty":false},"page_number":0,
"page_size":10,
"offset":0,
"paged":true,
"unpaged":false},
"last":true,
"total_pages":1,
"total_elements":6,
"sort":{"sorted":true,"unsorted":false,"empty":false},
"number_of_elements":6,
"first":true,
"size":10,
"number":0
}

```


## Delete a video

Delete the video. It doesn't actually delete it, but sets a deletion date. It can be recovered again if needed.

### Http Request
```
DELETE  {{host}}/v2/admin/applications/{appKey}/videos/{videoKey}
```

### Path Variables

| Key | Description |
| --- | --- |
| appKey | App Key |
| videoKey | Video Key |

### Request Header

| Key | Requried | Description |
| --- | --- | --- |
| Authorization | true | Bearer {access_token} |

### Repsone body 
None


## View video detail
View detailed information about one video. Deleted videos cannot be viewed.

### Http Request

```
GET  {{host}}/v2/admin/applications/{appKey}/videos/{videoKey}
```

### Path Variables

| Key | Description |
| --- | --- |
| appKey | App Key |
| videoKey | Video Key |

### Request Header

| Key | Requried | Description |
| --- | --- | --- |
| Authorization | true | Bearer {access_token} |


### Repsone body 

| Key | Requried | Type | Description |
| --- | --- | --- | --- |
| video_key | true | string(4~100) | Video unique key |
| type | true | string | Type of Video. `BROADCASTED`, `UPLOADED` available |
| state | true | string | state of video. `VOD`: Transcoding complete, `VOD_TRANS`: Transcoding, `DELETED`: deleted |
| user_id | true | string | User ID |
| user_name | false | string | User name |
| title | false | string(1~100) | Video title |
| content | false | string(1~100) | Video description |
| url | true | string | Video URL |
| thumbnail_url | true | string | Thumbnail URL |
| thumbnail_path | true | string | Thumbnail Path |
| duration | true | string | Video length, in `milliseconds` |
| visibility | true | string | Public scope |
| muted | true | boolean | Mute or not for video |
| locked | true | boolean | Locked or not for video |
| data | false | string | User custom data |
| heart_count | false | number | Number of hearts |
| like_count | false | number | Number of likes |
| created_at | true | number | Broadcast creation time, returned as a Unix timestamp value in milliseconds |


### Response Example
```
{
"id":10000,
"app_key":"A10000",
"video_key":"a10000",
"user_id":"5",
"path":"A10000/videos/10000",           "url":"https://static.flipflop.tv/A10000/videos/10000/vod.mp4",  
"thumbnail_path":"A10000/videos/10000/thumbnail.jpg",
"thumbnail_url":"https://static.flipflop.tv/A10000/videos/10000/thumbnail.jpg?time=1598428755712",
"title":"디젤Q_세로형_저용량",
"content":"Upload Demo Content",
"type":"UPLOADED",
"state":"VOD",
"visibility":"PUBLIC",
"muted":false,
"locked":false,
"duration":1200,
"data":"",
"data2":"{\n  \"transcoding_time\" : 1222,\n  \"input_file_size\" : 376073,\n  \"output_file_size\" : 260120\n}",
"heart_count":0,
"watch_count":0,
"view_count":0,
"like_count":0,
"created_at":1598428755712,
"updated_at":1598428757614,
"deleted_at":null}
```


## Common Error Codes

The following are common error code in response to All API request.

| HTTP Status Code | errorCode | Description |
| --- | --- | --- |
| 400 | 40001 | Invalid video_key - valid value of 'video_key' is range 4 to 100. |
| 400 | 40400 | Not found - specified video key is not exist. |
| 400 | 40401 | Invalid state - the state of specified video key is not valid. |
| 400 | 40402 | Invalid type - valid value of 'type' is either 'BROADCASTED' or 'UPLOADED'. |
| 400 | 40005 | Invalid title - valid value of 'title' is range 1 to 100. |
| 400 | 40006 | Invalid content - valid value of 'content' is range 1 to 4000. |
| 400 | 40007 | Invalid visibility - valid value of 'visibility' is either 'PUBLIC' or 'PRIVATE'. |
| 400 | 40008 | Invalid chat_room_id - valid value of 'chat_room_id' is range 1 to 200. |
| 400 | 40009 | Invalid data - valid value of 'data' is range 1 to 2000. |
| 400 | 40018 | Invalid video_key - Already exist. |
| 400 | 40019 | Invalid video_key format - ‘video_key’ should contain only alphanumeric without space. |

-------------
Copyright 2023 @ Jocoos.
