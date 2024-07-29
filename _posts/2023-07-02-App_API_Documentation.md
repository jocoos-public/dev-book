---
title: Θ App REST API Documentation (FFLv2)
author: Dan Lee, TaeHyeong Lee
date: 2023-10-16
category: Jekyll
layout: post
tags: [Mermaid]
mermaid: true
cover: /dev-book/assets/cover_yellow.jpg
---

-------------
## Introduction

This document contains specifications of the FlipFlop Cloud v2 App API. Calling App API requires API key and secret which is issued when you create an app from the user console.

## URLs

### SANDBOX

| Type | Region | URL |
| --- | --- | --- |
| User Console | Seoul | https://console-sandbox.flipflop.cloud/login |
| API Base URL | Seoul | https://api-sandbox.flipflop.cloud |

### PRODUCTION

| Type | Region | URL |
| --- | --- | --- |
| User Console | Seoul | https://console.flipflop.cloud/login |
| API Base URL | Seoul | https://api.flipflop.cloud |

  * If you require other regions not listed in this table at production level, please contact support@jocoos.com.

## API Conventions

### Error Response Format

All error response is provided with the following JSON body format along with the HTTP Status Code.

```
{
    "errorCode": "EMPTY_CLIENT_CREDENTIALS",
    "errorMessage": "'Authorization: Basic' header is empty."
}
```

### Common Error Codes

The following are common error code in response to All API request.

| HTTP Status Code | errorCode | Description |
| --- | --- | --- |
| 400 | UNSUPPORTED_HTTP_METHOD | When request was made with an unsupported HTTP Method |
| 400 | INVALID_HTTP_MESSAGE_BODY | JSON in the request Body is not correctly formated |
| 401 | EMPTY_APP_CREDENTIALS | Authorization header with basic auth scheme is missing |
| 401 | INVALID_APP_CREDENTIALS | Authorization header with basic auth scheme is invalid |
| 500 | INTERNAL_SERVER_ERROR | When an error occurred. Please report |

### Common Response Format for APIs querying for object list

Response for APIs querying for object list have the following pagination structure format.

```
{
    "content": [arrayOfObject],
    "pageable": {
        "offset": 0,
        "pageNumber": 0,
        "pageSize": 10,
        "paged": true,
        "unpaged": false,
        "sort": {
            "empty": false,
            "sorted": true,
            "unsorted": false
        }
    },
    "totalPages": 1,
    "totalElements": 1,
    "numberOfElements": 1,
    "number": 0,
    "size": 10,
    "first": true,
    "last": true,
    "empty": false,
    "sort": {
        "empty": false,
        "sorted": true,
        "unsorted": false
    }
}
```

| Parameter | Type & Description | Misc. |
| --- | --- | --- |
| content[] | [arrayOfObject] List of objects |  |
| totalPages | [Integer] Total number of pages |  |
| totalElements | [Integer] Total number of elements |  |
| number | [Integer] Current page number | Starts from 0 |
| size | [Integer] Page size (number of elements per page) |  |
| first | [Boolean] Whether the current page is the first page |  |
| last | [Boolean] Whether the current page is the last page |  |
| empty | [Boolean] Whether the current page is empty |  |

## APIs
  * [Server Side - App Member API](2023-10-16-App-Member-API.html)
  * [Client Side - Member StreamKey API](2023-10-16-Member-StreamKey-API.html)
  * [Client Side - Member VideoRoom API](2023-10-16-Member-VideoRoom-API.html)

-------------
Copyright 2023 @ Jocoos.