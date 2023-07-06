---
title: Ξ [Chat] VideoRoom Chat WebSocket API
author: Dan Lee
date: 2023-07-02
category: Jekyll
layout: post
cover: /devbook/assets/cover_yellow.jpg
---

-------------
# Introduction

- Gossip uses 'Stomp over WebSocket' to connect to the server instead of directly using WebSocket.
    - Stomp protocol: [https://stomp.github.io/](https://stomp.github.io/)
    - Stomp libraries that will be used in individual SDKs
        - Android: [https://github.com/NaikSoftware/StompProtocolAndroid](https://github.com/NaikSoftware/StompProtocolAndroid)
        - iOS: [https://github.com/WrathChaos/StompClientLib](https://github.com/WrathChaos/StompClientLib)
        - Javascript: [https://github.com/stomp-js/stompjs](https://github.com/stomp-js/stompjs)
        
        <aside>
        💡 Libraries are generally old and unsupported, so they are required to be modified as needed.
        
        </aside>
        

# Usage

## Preparation

1. Acquiring chat token for connection
    - Acquire chat token - use [Member Chat API](Member%20Chat%20App%20API%202a9f772c278f4fdfb1152e007cb1bd79.md)
2. Acquiring additional required information
    - Gossip server WebSocket connection host url (information in chat token acquire api response)
    - Your FlipFlop app id
    - The app user id of the app user you are making connection for
    - The app user’s username
    - VideoRoom chat room channel key (information in [Get VideoRoom](../VideoRoom%20App%20API%205992b5ec1403447db41ed4ab31bd9726.md) response)

## Establishing a Connection

1. Connecting to the Gossip server
    1. When connecting via Stomp, add the following information to the header.
        1. "token": Chat token used to connect to the server
        2. "appid": Your FlipFlop app id
        3. "userid": App user id
        4. "username": App user’s username (nickname)

## Receiving and Sending Messages

1. Subscribe to the VideoRoom ChatRoom channel to receive messages
    1. Receive chat room messages: "/topic/chat/{channelKey}"
        1. channelKey: Chat room unique key
    2. Receive private messages only for the user: "/topic/dm/{channelKey}/user/{userId}"
        1. channelKey: Chat room unique key
        2. userId: App user id
2. Sending a message
    1. Send a message
        1. Add the following information to the header.
            1. "destination": "/app/chat"
            2. "content-type": "application/json"
        2. In the body, put a json-encoded string of the message you want to send.
            1. See Message Model section below for details on message format.
    2. Send a direct message (private message sent to only a specific user in the chat room)
        1. Add the following information to the header.
            1. "destination": "/app/dm"
            2. "content-type": "application/json"
            3. "receiver": App user id of the receiver
        2. In the body, put a json-encoded string of the message you want to send.
            1. See Message Model section below for details on message format.

# Message Model

## Overview

1. channel_key: Chat room unique key
2. user: User information
    1. id: User ID (unique value)
    2. username: User name (nickname)
    3. avatar: User profile URL
3. message_type: Type of message
    - System message type (You cannot send message of this type)
        - JOIN: Notify that the user has entered the chat room
        - LEAVE: Notify that the user has left the chat room
    - MESSAGE: Normal message
    - DM: Message only for me (direct message)
    - COMMAND: Used when you want to send a message that is different from a normal message.
4. message_id: Unique ID of the message (created by the server)
5. message: User message
6. custom_type: Type used for message grouping
7. data: Used when you want to add additional content to the message.
8. created_at: Message creation time (created by the server)
9. total_user_count: Total number of participants in the chat room
    1. Only available for JOIN and LEAVE.
10. participant_count: Current number of participants in the chat room
    1. Only available for JOIN and LEAVE.

## Required values when sending messages

- channel_key
- user's id
- message_type
- message

```json
{
  "channel_key" : "xxx",
  "user" : {
    "id" : "123",
    "username" : "beauty", // optional
    "avatar" : "<https://www.example.com/avatar/myimage.jpg>" // optional
  }
  "message_type" : "MESSAGE",
  "message" : "this is test message",
  "custom_type" : "MSG", // optional
  "data" : "", // optional
}
```

```json
{
  "channel_key" : "xxx",
  "user" : {
    "id" : "123",
    "username" : "beauty", // optional
    "avatar" : "<https://www.example.com/avatar/myimage.jpg>" // optional
  }
  "message_type" : "MESSAGE", // or "JOIN", "LEAVE"
  "message_id" : "1679786302000000000"
  "message" : "this is test message",
  "custom_type" : "MSG", // optional
  "data" : "", // optional
  "created_at" : "1679786302",
  "total_user_count" : 1004, // Only available for JOIN and LEAVE.
  "participant_count" : 12, // Only available for JOIN and LEAVE.
}
```

# Miscellaneous

- To maintain the connection, the client periodically sends a Stomp heartbeat to the Gossip server every 25 seconds.

# Reference

- STOMP Over WebSocket
    - [http://jmesnil.net/stomp-websocket/doc/](http://jmesnil.net/stomp-websocket/doc/)

-------------
Copyright 2023 @ Jocoos.