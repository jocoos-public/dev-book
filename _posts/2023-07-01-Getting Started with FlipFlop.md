---
title: Θ Getting Started with FlipFlop Cloud
author: Dan Lee
date: 2023-07-01
category: Jekyll
layout: post
tags: [Mermaid]
mermaid: true
cover: /dev-book/assets/cover_yellow.jpg
---

-------------
# Introduction

## What is FlipFlop Cloud

Video has emerged as a significant component of the IT industry and a crucial element for businesses. As a result, companies are striving to adopt video technology, not just to keep up with the current trend, but to establish a competitive edge in the market. However, effectively handling video presents numerous challenges. From delivering video content to users in its simplest form to incorporating advanced functionalities like live streaming, expertise in diverse domains such as digital video/audio compression, format specifications, streaming protocols, and computer graphics is required. Moreover, the computational resources necessary for video processing and management come at a substantial cost.

FlipFlop is a Software-as-a-Service (SaaS) solution designed to address the challenges associated with video handling and management. It offers a range of solutions for individuals, organizations, and companies, allowing them to stay focused on leveraging video within their products. By integrating FlipFlop, users can concentrate on utilizing video technology effectively while FlipFlop handles the complexities and concerns related to video management, ensuring affordability.

Integration of FlipFlop into your app provides several benefits and access to its features, allowing your users to leverage the functionalities provided by FlipFlop. Here's a breakdown of the features and their use cases:

1. Video Content Management and Transcoding:
    - Use Case: With FlipFlop, you can easily manage your video content, including uploading, organizing, and categorizing videos. FlipFlop takes care of the transcoding process, ensuring compatibility with various devices and platforms. This feature saves you time and effort in handling video files and their conversions.
2. Stream Video - Broadcasting (Live) and Viewing (Live/On-Demand):
    - Use Case: FlipFlop enables you to stream video content, both live broadcasts and on-demand viewing. You can integrate FlipFlop's streaming capabilities into your application, allowing your users to stream live events, webinars, conferences, or pre-recorded videos. This feature enhances user engagement and provides real-time interaction opportunities.
3. Real-time Video Communication and Interaction:
    - Use Case: FlipFlop offers real-time video communication and interaction capabilities. By integrating this feature into your app, you can enable video calls, video conferences, or video chat functionalities. Users can communicate and collaborate face-to-face, fostering seamless and engaging interactions within your application.

While there are a lot of products that does the above, FlipFlop does more by having you to integrate it into your app. Integration of FlipFlop into your app will give your users access to features in FlipFlop.

FlipFlop aims to provide these solutions at an affordable cost, saving you the expense of managing the complex infrastructure required for video processing and management. By integrating FlipFlop into your app, you can focus on utilizing video technology to enhance your product without worrying about the underlying complexities.

## What FlipFlop isn’t

FlipFlop is not a standalone application but rather a service platform. It can be utilized by integrating its features into an existing application. The responsibility lies with the app to define how FlipFlop's features are employed by its users and grant them access to the functionalities provided by FlipFlop.

## Terminology

Here are the defined terms and their meanings for better understanding within this documentation:

- User: Refers to the individual, organization, or company (you) interested in utilizing FlipFlop.
- Service or Application (App): Refers to the service or application where you intend to integrate FlipFlop.
- Application Server: Represents the entity responsible for handling the business logic of your application.
- Client Application: Refers to the client software of your service or application, typically an Android/iOS/Web app.
- Member: Denotes the users of your application (note that "User" specifically refers to FlipFlop users in this context).
- User Console: Refers to a web page accessible to you, serving as a management interface where you can handle app integration with FlipFlop, monitor usage, and control how your users interact with FlipFlop.
- FlipFlop App: Denotes an app created within the FlipFlop platform's User Console, serving as the counterpart to the app you are integrating FlipFlop into.

By understanding these terms, you can navigate the documentation more effectively and comprehend the context in which they are used.

## General Steps to get FlipFlop Working and using it

These steps provide an overview of the process to integrate FlipFlop into your app. Let's break down each step in more detail:

1. Go to FlipFlop User Console page:
    - Visit the FlipFlop website or platform where you can access the User Console. This is the interface where you can manage your FlipFlop account and settings.
2. Sign up as User and login:
    - Sign up for a FlipFlop account by following the registration process. Provide the required information and create a secure login credentials. Once registered, log in to your FlipFlop account.
3. Create a FlipFlop App and acquire FlipFlop App API credentials:
    - Within the FlipFlop User Console, create a new FlipFlop App. This app will be associated with your own application and will allow you to integrate FlipFlop's features into your app.
    - As part of creating the FlipFlop App, you will acquire FlipFlop App API credentials. These credentials are necessary to communicate with the FlipFlop App API on your application server. Keep these credentials secure and avoid exposing them.
4. Integrate FlipFlop into your app:
    - Determine a mechanism to synchronize user information between your app and FlipFlop using the FlipFlop App API. This typically involves sending requests to the FlipFlop App API from your application server.
    - Decide which FlipFlop features you want to provide to your app's users. Review the relevant FlipFlop App API documentation to understand how to bridge your users' requests to FlipFlop's functionality.
    - Your client application can interact with FlipFlop features in two ways:
        - Through your application server: You can handle user requests in your application server and communicate with FlipFlop on behalf of your users.
        - Directly with FlipFlop using credentials obtained from FlipFlop through your application server: In some cases, limited features may allow direct communication between your client application and FlipFlop using credentials obtained from your application server.
5. Monitor your app's users' activity on FlipFlop from the user console:
    - Utilize the FlipFlop User Console to track and monitor the activity of your app's users on FlipFlop. This allows you to gain insights and analyze user behavior within the FlipFlop environment.

Note: The provided steps offer a general guideline for integrating FlipFlop into your app. For more detailed explanations and specific instructions, it's recommended to refer to the documentation or resources provided by FlipFlop.

-------------
# FlipFlop Security

## Tokens

In FlipFlop, three types of tokens are used to protect features and resources:

1. Access Token:
    - The access token is used to access the FlipFlop API.
    - When making API requests to FlipFlop, you need to include the access token in the authorization header or as a parameter in the API request.
    - The access token grants temporary permission to access FlipFlop's features and resources.
2. Refresh Token:
    - The refresh token is used to refresh tokens in FlipFlop.
    - Tokens have an expiration time, and when they expire, you can use the refresh token to obtain a new access token without requiring the user to re-authenticate.
    - The refresh token is typically exchanged for a new access token through an API call to FlipFlop's token endpoint.
3. Streaming Token:
    - The streaming token is used specifically for requesting video resources in FlipFlop.
    - When requesting video content or streaming videos from FlipFlop, you need to include the streaming token as a parameter or in the authentication process.
    - The streaming token provides authorization to access and stream video resources within FlipFlop.

It's important to keep these tokens secure and not expose them publicly or to unauthorized users. Tokens play a crucial role in authenticating and authorizing access to FlipFlop's features and resources, ensuring that only authorized users can utilize the platform.

For more specific details on how to obtain and use these tokens in your integration with FlipFlop, refer to the FlipFlop documentation or developer resources, which should provide comprehensive instructions and guidelines.

## Access Level and Allowlist(used to be Whitelist)

FlipFlop video resources such as Video Post and Video Room can be configured with access level and allowlist to limit access.

The following are 7 access levels and the range of accessible audience

- Public - Anyone has access
- App - Only app users have access (from app)  (* Temporarily not available)
- Member - Only logged in app users have access (* Temporarily not available)
- Follower - Only followers of the member have access (* Temporarily not available)
- Friend - Only friends of the member have access (* Temporarily not available)
- Restricted - Only whitelisted members have access (* Temporarily not available)
- Private - Only the owning member has access (* Temporarily not available)

-------------
# Member Management

This section outlines the details of why synchronizing your app’s user information to FlipFlop might be important and how it should be done.

## Why would you want to do it?

FlipFlop concentrates on ways for its users to provide video related features to their users. For example, providing the feature to upload video to users and making them available to other users require handling user uploads, managing where it is stored, and how it is exposed. FlipFlop tries to do all this for you. Therefore, FlipFlop is required to know which user from your app uploaded the video and to whom the video is exposed based on the relationship with other users of your app. (From the terminology section, we have defined the term member as users of your app to distinguish from a FlipFlop user. Hence, the term member will be used to refer users of you app.)

Synchronizing member information is not a hard requirement depending on how you want to use FlipFlop. But in order to make a decision whether to do it or not requires understanding how the member system works and which features of FlipFlop is affected.

## How to do it (Recommendation)

- When a member starts using you app(not logged in), issue guest member tokens to the member using the log in as guest member App API. This is useful if you want to limit access to FlipFlop features and resources created by your app only from your app.
- When a member logs into your app, issue member tokens to the member using the login member App API. Issuing member tokens is also synonym to logging the member into FlipFlop. There is no registration process per se. If the member is logged into FlipFlop for the first time the member is automatically registered. Logging a member into FlipFlop only requires the id of the member. Optionally you can provide optional information such as username of the member on your app and profile picture URL. The optional information will be used in the responses to the FlipFlop queries. For example, when a member query for a list of videos to your app server, the app server will query for a list of videos to FlipFlop. The response will contain information of the member who uploaded the video. If the username and profile picture URL information was provided in the FlipFlop login process, the information will be present and you won’t have to query member information and construct the response from your app server.
    - If your app provides social features and members are able to have a relationship(following, friends and such) with one another, add information of the members having a relationship with the member logging in using the register member App API and their relationship using the member follow/friend App API. The difference between login member App API and register member App API is that the former issues tokens while the latter does not.
- When members update their information such as username, profile picture URL update the information in FlipFlop using the update member App API
- When members update their relationship with other members, update the information in FlipFlop using the member follow/friend App API.

-------------
# Video Post

…Will be added later

-------------
# Video Room

Video Room is a feature where members can use video and interact with other members in real time. Video Room has the following types.

- Broadcast RTMP - Broadcast live video by ingesting a RTMP stream and making them available as CMAF (1:N)
- Broadcast WebRTC - Broadcast live video by ingesting a WebRTC stream and making them available as CMAF (1:N)
- Webinar - Broadcast live video of a small group of people in a discussion to a large audience using WebRTC (n:N)
- Video Conference - What we all know as zoom meetings (n:n)
- Surveillance - Broadcast live video from various source and selected few will monitor them (N:n)

## Broadcast RTMP

- First a member must create a BROADCAST_RTMP type Video Room
- Member can start ingesting RTMP stream to FlipFlop using their stream key string
    - RTMP ingest can be done with any tool such as OBS, FFmpeg.
    - Depending on whether the member is ingesting a RTMP stream or not the stream key can have the following state and transitions
    
    <div class="mermaid" markdown="0" >
    stateDiagram-v2
    INACTIVE --> ACTIVE_PREP: Start RTMP Stream Ingest
    ACTIVE_PREP --> INACTIVE: Stop RTMP Stream Ingest
    ACTIVE_PREP --> ACTIVE: Start CMAF Publish
    ACTIVE --> INACTIVE: Stop CMAF publish
    ACTIVE --> ACTIVE_LIVE: Go Live
    ACTIVE_LIVE --> INACTIVE_LIVE: Stop CMAF publish
    INACTIVE_LIVE --> ACTIVE_LIVE_PREP: Start RTMP Stream Ingest
    ACTIVE_LIVE_PREP --> INACTIVE_LIVE: Stop RTMP Stream Ingest
    ACTIVE_LIVE_PREP --> ACTIVE_LIVE: Stop CMAF publish
    INACTIVE_LIVE --> INACTIVE: End Broadcast
    </div>
    
- When the member’s stream key is in ACTIVE state - Member is ingesting a RTMP stream and  published(CMAF conversion has started)
    - Only the member can preview the live stream converted as CMAF.
    - The member can go live - Making live stream converted as CMAF available to other members
- RTMP stream ingest can be stopped can continued any time but when it is stopped and continued while the broadcast is live the ingest stream becomes instantly live as soon as it continues and published.
- When member decides to end the broadcast ingest stream must be stopped first. And once the broadcast is ended it cannot restart.
- The BROADCAST_RTMP type Video Room can have the following states and transitions


<div class="mermaid">
stateDiagram-v2
[*] --> SCHEDULED: Create Video Room
SCHEDULED --> LIVE: Go Live
LIVE --> LIVE_INACTIVE: Stream Key state becomes INACTIVE_LIVE
LIVE_INACTIVE --> LIVE: Stream Key state becomes ACTIVE_LIVE
LIVE_INACTIVE --> ENDED: End Broadcast
ENDED --> ARCHIVED: Save broadcast
ARCHIVED --> [*]
</div>

-------------
# Playing Video Resources from App Client

Video resources with URL such as Video Posts and Video Room(Broadcast RTMP type) can be played from any video player that supports the format. For resources with Public access level can be played by simply loading the URL into the player. With other access level the URL must be provided with streamingToken query string(?streamingToken=[STREAMING_TOKEN]).


-------------
Copyright 2024 @ Jocoos.