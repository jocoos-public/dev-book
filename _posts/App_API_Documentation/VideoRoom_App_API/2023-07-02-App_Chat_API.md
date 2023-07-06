---
title: Ξ [Chat] App Chat API
author: Dan Lee
date: 2023-07-02
category: Jekyll
layout: post
cover: /dev-book/assets/cover_yellow.jpg
---

-------------
# Introduction

Documentation of App Chat API.

# API

## Set Forbidden Words in VideoRoom ChatRoom

---

Set words that are forbidden in the VideoRoom ChatRoom.

```bash
curl -i -X POST \
  -u {appApiKey}:{appApiSecret} \
  -H "Content-Type:application/json" \
  -d \
'{
  "words": ["foo", "bar"]
}' \
  'https://{baseURL}/v2/apps/me/banned-chat-words'

# 204 No Content
```

### Request Parameters

| Parameter | Required | Description | Misc. |
| --- | --- | --- | --- |
| words | true | [Array:String] Array of words |  |

### Error Codes

| HTTP Status Code | errorCode | Misc. |
| --- | --- | --- |
| 400 | EMPTY_CHAT_ROOM_WORDS | Forbidden words are not specified |

## Unset Forbidden Words in VideoRoom ChatRoom

---

Unset words that are forbidden in the VideoRoom ChatRoom.

```bash
curl -i -X POST \
  -u {appApiKey}:{appApiSecret} \
  'https://{baseURL}/v2/apps/me/banned-chat-words/{words}'

# 204 No Content
```

### Request Parameters

| Parameter | Required | Description | Misc. |
| --- | --- | --- | --- |
| words | true | [String] Comma separated list of words | ex: foo,bar |

-------------
Copyright 2023 @ Jocoos.