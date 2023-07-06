---
title: Ξ [Platform] Streaming Token App API
author: Dan Lee
date: 2023-07-02
category: Jekyll
layout: post
cover: /devbook/assets/cover_yellow.jpg
---

-------------
# Introduction

Streaming Token is for authorizing access to video content. Endpoints to App API and video content URL are different and also authorzation is handled differently. While App API requests require HTTP Authorization header using basic auth scheme, access to video is handled with jwt tokens in a query parameter. Therefore you are required to reqeust for a token(namely the streaming token) for accessing videos of your app.

## API

## Request Streaming Token

---

- Request for a streaming token for the App.
- A valid streaming token will grant access to all VideoRoom and VideoPost of the app

```bash
curl -i -X POST \
   -u {appApiKey}:{appApiSecret} \
   -H "Content-Type:application/json" \
 'https://{baseURL}/v2/apps/me/streaming-tokens'

# 201 Created
{
    "streamingToken": "{streamingToken}"
}
```

### Response Parameters

| Parameter Name | Type & Description | Misc. |
| --- | --- | --- |
| streamingToken | [String] Issued streaming token |  |

-------------
Copyright 2023 @ Jocoos.