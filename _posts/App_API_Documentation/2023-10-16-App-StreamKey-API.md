---
title: Ξ [Server Side] App StreamKey API
author: Dan Lee, Taehyeong Lee
date: 2023-11-02
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

-------------
# Introduction

This document introduces the StreamKey-related App API that can be call on the server-side.

# API

<a name="Force-Terminate-StreamKey"></a>
## Force Terminate StreamKey

---

  * Forcefully terminates the ongoing RTMP ingestion of a specific StreamKey. (ex: when streaming harmful content)
  * Upon successful response, streamKeyState is updated to `INACTIVE` and the streamKey value is reissued. If there is a VideoRoom being broadcast, videoRoomState is updated to `ENDED` and the VOD result is not saved.
  * If StreamKey is not in the process of RTMP ingestion, it responds with a success response without a separate error response and does not take any action.

```
curl -i -X POST \
   -H "Authorization:Basic {base64of({appApiKey}:{appApiSecret})}" \
 '{api-base-url}/v2/apps/stream-keys/{streamKey.id}/force-terminate'

# 204 No Content
```

### Error Code

| HTTP Status Code | errorCode | Remarks |
| --- | --- | --- |
| 404 | `STREAM_KEY_NOT_FOUND` | StreamKey resource does not exist. |
| 400 | `REQUEST_LOCKED` | This occurs when a request is already in progress, but a duplicate request is made immediately. |
| 500 | `MEDIA_SERVICE_INTERNAL_SERVER_ERROR` | This occurs when there is a problem with the internal media service, please contact us immediately. |
