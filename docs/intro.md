---
sidebar_position: 1
slug: /
---

# Introduction

## Overview and Features of FlipFlop Cloud Service

The importance of video content in the modern IT industry continues to grow. Videos are not just a medium; they are a powerful tool for enhancing communication with customers, making services more engaging, and creating new business opportunities. However, effectively integrating digital video content into services requires expertise in compression, formats, protocols, and video processing. Implementing these functions independently demands significant time and resources.

**FlipFlop Cloud** is a SaaS solution designed to address these challenges. This solution provides digital video features such as video compression, live streaming, and video conferencing, making it easy for developers and businesses to integrate these functions into their services. By using FlipFlop Cloud, users can easily implement video functionalities without complex technical implementations, allowing them to focus on the business logic of effectively utilizing videos rather than technical aspects.

While similar solutions exist, most of them focus on providing features only, which requires additional integration work for users to utilize these features effectively. In contrast, FlipFlop Cloud is designed to integrate features with users at the center, minimizing the integration work needed. This allows users to easily integrate video functionalities into existing services or develop new ones with minimal effort. Furthermore, FlipFlop Cloud's features can be utilized directly as a stand-alone service.

By adopting FlipFlop Cloud, you can quickly and efficiently build services that leverage video as a medium, maximizing the potential of digital video.

## Concept of Operation for FlipFlop Cloud

When using FlipFlop Cloud to integrate video-related features into a service, the first step is to create an abstract `app` in FlipFlop Cloud that corresponds to your service. This `app` manages and provides the video-related features available for that service. If you were to develop video features independently, as shown on the left side of the diagram, you would need to add video functions to your backend server. However, by leveraging FlipFlop Cloud, you replace these independently developed features with those available in FlipFlop Cloud. Since FlipFlop Cloud is a SaaS solution used across various services, an abstract `app` is necessary to distinguish between services.

![Comparison](/img/flipflop-usage-diagram.png)

As shown on the right side of the diagram, when you implement video features using FlipFlop Cloud, the service backend calls the FlipFlop Cloud app server API according to the business logic of the backend to implement features. On the client side, users can either access FlipFlop Cloud's video features through the service's backend or directly call the FlipFlop Cloud app client API.

The `app` is available in various forms, ranging from a highly flexible FlipFlop app designed to integrate video features in diverse scenarios to a backend-focused app for services, offering ease of use over flexibility. This ensures that users have the freedom and convenience needed to incorporate video features seamlessly.

## Features of FlipFlop Cloud

The video-related features offered by FlipFlop Cloud are mainly provided in two forms: `Video Post` and `Video Room`.

- **Video Post**: Manages video files as posts, with transcoding based on video file uploads, allowing users to view content on a per-post basis.
- **Video Room**: Manages live video streaming and video conferencing, enabling viewers or participants to watch live broadcasts or join meetings, and chat with the crowd.

As described above, FlipFlop Cloud offers video transcoding, video post sharing, live streaming, and video conferencing through `Video Post` and `Video Room`. Depending on the service you intend to provide to your users, you can create a `Video Post` or `Video Room` and allow other users to consume video content. To provide these features to all users in your service, you must register users as members within the FlipFlop Cloud `app` and keep their information synchronized. This synchronization allows the establishment of relationships between users, assigning ownership and management rights for `Video Post` and `Video Room`, and aggregating usage statistics based on user activity. Unlike other solutions where such business logic needs to be implemented separately, FlipFlop Cloud provides these features out of the box, making it easy to integrate and utilize video features.

## FlipFlop Cloud Developer Center Site Map

- Introduction (This page)
- Key Concepts of FlipFlop Cloud
  - App
    - FlipFlop App
    - FlipFlop Portal App
    - Vicollo Managed App
    - Vicollo Unmanaged App
  - Member
  - Video Post
  - Video Room
    - Live Streaming Broadcast
    - Video Conferencing
- API Documentation
  - FlipFlop App Server API
  - FlipFlop App Client API
- SDK
  - Android SDK
  - iOS SDK
