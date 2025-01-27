---
sidebar_position: 3
---

# Embedding Vicollo Video Room In Your Web App

:::info

To use FlipFlop Cloud, you must first sign up as a user. However, currently, registration is only available through inquiry due to policy restrictions. For more information on how to register and subsequent usage procedures, please refer to [User Registration and Usage Procedures](./1-sign-up.md).

:::

## Introduction

FlipFlop Cloud provides video conferencing features that you can seamlessly integrate into your service, enabling you to offer video conferencing functionality to your users effortlessly.

This document explains how to integrate Vicollo's video conferencing features into your web app using iFrame and provides guidance on various settings that can be applied during the integration process.

## Preliminary Information

FlipFlop Cloud operates separate environments for testing and commercial use, depending on the purpose. Information about each environment is as follows:

| Endpoint Type | Sandbox Environment | Production Environment |
|:---:|:---:|:---:|
| User Console | https://console-sandbox.flipflop.cloud | https://console.flipflop.cloud |
| API | https://portal-sandbox.flipflop.cloud | https://portal.flipflop.cloud |
| Swagger UI | https://portal-sandbox.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server | https://portal.flipflop.cloud/open-api/ko/swagger-ui/ffc-app-server |
| API Documentation | https://portal-sandbox.flipflop.cloud/open-api/ko/docs/ffc-app-server | https://portal.flipflop.cloud/open-api/ko/docs/ffc-app-server |

:::warning

This document is focused on providing explanations for testing purposes, and all information is based on the sandbox environment.

:::

## Prerequisite

### Creating an Vicollo Unmanaged App

All features of FlipFlop Cloud operate within the framework of an app. Integrating Vicollo's video conferencing features into your service is only possible through the **"Vicollo Unmanaged App"**, which functions in an unmanaged form. This document focuses solely on the **Vicollo Unmanaged App**, so it will be referred to simply as the **"Vicollo App"** throughout.

:::note

For more information about the types of apps and their differences, please refer to the [Key Concepts > Apps documentation on FlipFlop Cloud App Types](../2-key-concepts/apps.md#types-of-flipflop-cloud-apps).

:::

If you inquired about using Vicollo with your service during the account issuance process, the account details you receive will include information about the **Vicollo App** created for that account. Currently, users cannot create **Vicollo Apps** independently. If you received an account for a different purpose and no **Vicollo App** was created, you will need to request its creation separately via inquiry. We are working to make Vicollo accessible without additional procedures in the near future.

### Using Vicollo App Server API

Currently, the GUI-based admin page for managing and operating the **Vicollo app** is under development. Therefore, operations must currently be performed via the API. We are working to make the GUI admin page available as soon as possible.

The Base URL for making API requests is:
**https://api-sandbox.flipflop.cloud**

When making requests, set the `Authorization` header as follows:

```plaintext
Basic {Base64-encoded string of "API key:secret"}
```

:::danger  
The Server API must **only** be used from your server.  
Using it in web or mobile apps could expose the API key/secret, leading to potential misuse, instability in FlipFlop Cloud operations, and financial damage to users.  
:::  

## Overview

The overall process for using Vicollo's video conferencing features consists of the following steps:

1. **Create/Register Members**
2. **Create a Video Room**
3. **Generate Video Room URL for Members**
4. **Loading URL Using iFrame**

## Embedding Vicollo Video Room to Your Web App

### 1. Create/Register Members

Your service’s users must be registered in the Vicollo app. While pre-registering all users is not necessary, it is crucial to register users as needed. The most important information for registration is the appUserId, which should correspond to the unique user ID in your service. It is recommended to use a string type converted primary key from your database rather than a human-readable identifier such as a username for easier backend integration between Vicollo and your service. Additionally, you can register a screen name to be displayed within Vicollo. The user registration API also supports continuous synchronization of user information. For example, if a user changes their screen name in your service, updating the screen name using the appUserId will synchronize the information between your service and the Vicollo app.

Refer to the following APIs for create/read/update operations for members

- Create/Update Member ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server#/Vicollo%20App%20Members/VicolloAppsServerApiMembersController_upsertMember) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/en/docs/vicollo-app-server#tag/Vicollo-App-Members/operation/VicolloAppsServerApiMembersController_upsertMember))
- List Members ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server#/Vicollo%20App%20Members/VicolloAppsServerApiMembersController_getMembers) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/en/docs/vicollo-app-server#tag/Vicollo-App-Members/operation/VicolloAppsServerApiMembersController_getMembers))
- Get Member ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server#/Vicollo%20App%20Members/VicolloAppsServerApiMembersController_getMember) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/en/docs/vicollo-app-server#tag/Vicollo-App-Members/operation/VicolloAppsServerApiMembersController_getMember))

### 2. Create Video Room

Video-rooms have an owner or creator which is a Vicollo app member. The owner or creator is specified with the Vicollo app member id(appUserId) in the request response. If not specified the owner defaults to the member corresponding to the owner of the Vicollo app. Other fields that can be optionally specified are title, description, and scheduled time. The optional fields do not serve any purpose other than for querying and providing information.

Refer to the following APIs for create/read/update operations for video-rooms

- Create Video-Room ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server#/Vicollo%20App%20Video-Rooms%20/VicolloAppsServerApiVideoRoomsController_createVideoRoom) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/en/docs/vicollo-app-server#tag/Vicollo-App-Video-Rooms/operation/VicolloAppsServerApiVideoRoomsController_createVideoRoom))
- List Video-Rooms ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server#/Vicollo%20App%20Video-Rooms%20/VicolloAppsServerApiVideoRoomsController_listVideoRooms) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/en/docs/vicollo-app-server#tag/Vicollo-App-Video-Rooms/operation/VicolloAppsServerApiVideoRoomsController_listVideoRooms))
- Get Video-Room ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server#/Vicollo%20App%20Video-Rooms%20/VicolloAppsServerApiVideoRoomsController_getVideoRoom) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/en/docs/vicollo-app-server#tag/Vicollo-App-Video-Rooms/operation/VicolloAppsServerApiVideoRoomsController_getVideoRoom))
- Update Video-Room ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server#/Vicollo%20App%20Video-Rooms%20/VicolloAppsServerApiVideoRoomsController_updateVideoRoom) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/en/docs/vicollo-app-server#tag/Vicollo-App-Video-Rooms/operation/VicolloAppsServerApiVideoRoomsController_updateVideoRoom))

### 3. Generate Video Room URL for Members

The URL for the created video-room follows this format:

```plaintext
http://{vicollo_base_url}/room/join/{roomCode}
```

And is accessible only to logged-in users. To bypass the manual login process for your users, generate a key that will be passed as a query parameter in the video-room URL. This key is obtained by encoding the response from the "Login Member" API call of the Vicollo app server into Base64.

Refer to the following APIs for issuing credentials for member or creating the embed URL with the key query param that can be used right away

- Login Member ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server#/Vicollo%20App%20Members/VicolloAppsServerApiMembersController_loginMember) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/en/docs/vicollo-app-server#tag/Vicollo-App-Members/operation/VicolloAppsServerApiMembersController_loginMember))
- Create an Embed URL for member ([Swagger UI](https://portal-sandbox.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server#/Vicollo%20App%20Video-Rooms%20/VicolloAppsServerApiVideoRoomsController_getVideoRoomEmbedUrl) / [API Documentation](https://portal-sandbox.flipflop.cloud/open-api/en/docs/vicollo-app-server#tag/Vicollo-App-Video-Rooms/operation/VicolloAppsServerApiVideoRoomsController_getVideoRoomEmbedUrl))

The **Create an Embed URL for Member** API generates a URL using the following values:

- **appId**: The ID of your app.
- **roomUUID**: The unique code (UUID) for the video-room.
- **userAuthKey**: A Base64-encoded string of the response from the member login API.

The resulting URL format is as follows:

```plaintext
https://sandbox.vicollo.live/vicollo-apps/${appID}/rooms/join/${roomUUID}?key=${userAuthKey}
```

#### Additional Query Parameters

You can include the following optional query parameters in the URL to customize behavior:

| **Parameter**     | **Possible Values**                   | **Description**                                                                                      |
|--------------------|---------------------------------------|------------------------------------------------------------------------------------------------------|
| **isObserver**     | `true` \| `false`                    | Enables observer mode.                                                                               |
| **drawLayoutType** | `fixed-grid` \| `scroll`             | Specifies the layout for secondary screens (e.g., user cameras) relative to the main screen.         |
| **drawLayoutPosition** | `top` \| `bottom` \| `left` \| `right` | Specifies the position of secondary screens relative to the main screen.                             |
| **displayName**    | URL-friendly string                  | Sets the display name of the user visible in the video room.                                         |

Each parameter is added to the URL as a query string, delimited by `&`, and values are assigned using `=`.

Example URL with additional parameters:

```plaintext
https://sandbox.vicollo.live/vicollo-apps/app123/rooms/join/roomUUID123?key=authKey123&isObserver=true&drawLayoutType=scroll&drawLayoutPosition=bottom&displayName=JohnDoe
```

#### Observer Mode

Enabling **observer mode** (`isObserver=true`) restricts the participant's interaction in the following ways:

- No toast notifications or chat messages about user join/leave events.
- The user is not listed in the member tab or participant count.
- Camera view is disabled.
- Audio is turned off by default (but can be manually reactivated).
- All other features remain available with the same permissions as regular users.

#### Layout Configuration

The **layout parameters** define how the secondary screens (e.g., user cameras) are displayed relative to the main screen (such as when a whiteboard is active):

- **`drawLayoutType`**: Specifies the arrangement of secondary screens:
  - `fixed-grid`: Displays secondary screens in a grid layout (currently limited to 2x2 grid).
  - `scroll`: Displays secondary screens in a scrollable list.
- **`drawLayoutPosition`**: Specifies the position of secondary screens relative to the main screen:
  - `top`, `bottom`, `left`, or `right`.

When no main screen is active (e.g., the whiteboard is deactivated), the default layout reverts to the grid layout.

:::warning

The layout system is still evolving and may undergo changes to support more use cases in an intuitive manner. However, the above configurations reflect the current system's capabilities.

:::

#### Terminology and Concepts

- Screen: For simplicity `screen` will be referred to as a published video stream of users and their shared screens and the video-room whiteboard.
- Layouts
  - Grid Layout: Screens appear in a grid but rows that are not full will be center aligned
  - Fixed-Grid Layout: Screens appear in a grid and left most position is filled as a row starts to fill
  - Scroll Layout: Screens appear in a row or column and is scrollable when there are screens take up more space than the visible area
  - Focused Layout: Layout is a layout where there is a main screen which appears larger than other screens. When not using a layout other than focused layout all screens are equally sized. Focused layout is defined by the following two properties.
    - layoutType: The layout type to use for screens other than the main screen. can be fixed-grid(fixed to 2x2 at the moment) or scroll.
    - layoutPosition: The position where the screens other than the main screen is positioned relative to the main screen. can be top, bottom, left, or right.
- Modes
  - Manual: The user has full authority on adjusting the layout of the video-room.
  - Automatic: The users' view is affected by other users' actions. For instance, if someone starts using the whiteboard or shares a video screen, all other users who are in `automatic` mode will change to focused layout.

#### Example of layout change behavior

- Initial state: Automatic mode Grid Layout
- When the user activates whiteboard or screen sharing or another participant does so: Automatic mode Focused Layout(layout type and position of focused layout is specified in embed URL)
  - When the user changes the layout with Grid/Focused Layout toggle button: Manual mode and selected layout
  - Decision behind this is that when the user takes such action we take it as the users will to take control of the layout
- Currently there is no way to turn back to automatic mode at user's will
- When all users have deactivated to whiteboard or screen sharing: All users return back to Automatic mode in their current layout

### 4. Loading URL Using iFrame

To display the video-room within an iframe on your webpage, set the src attribute of the iframe to the video-room URL obtained from [step 3](#3-generate-video-room-url-for-members).

## Webhook Events

### Vicollo App Event Webhooks

Vicollo app events can be received by registering a **callback API (webhook)** to the app. These events provide useful information for managing and operating the app.

To register a callback API, refer to the following API documentation:  
[**Register Callback API to Vicollo App**](https://portal-sandbox.flipflop.cloud/vicollo-apps-server-api-docs#tag/Vicollo-App-Information-and-Settings/operation/VicolloAppsServerApiController_setCallbackApi)

### Event Data Structure

The event information is sent as a JSON payload in a **POST request** to the registered callback API endpoint.  
The JSON payload has the following format:

```json
{
  "id": "string",                  // Event ID
  "type": "string",                // Event type
  "app": {                         // Information about the app where the event originated
    "id": "number",                // App ID
    "state": "string",             // App entity state
    "name": "string",              // Name of the app
    "defaultRtmpOutputMode": "string"  // Not relevant to Vicollo
  },
  "data": "object",                // Additional information about the event
  "createdAt": "string"            // Date and time of the event in ISO string format
}
```

### Event Types

Below are examples of event types and the `data` field content formats that might be useful for managing and operating the Vicollo app.

#### 1. **`VIDEO_ROOM_PARTICIPANT_JOINED`**

Triggered when a participant joins a video room.
**Payload:**

```json
{
  "videoRoom": {
    "id": "number",
    "state": "string",
    "videoRoomState": "string",
    "type": "VIDEO_CONFERENCE",
    "title": "string | null",
    "channelId": "number",
    "sessionNo": "number"
  },
  "appUser": {
    "appUserId": "string",
    "appUserName": "string | null",
    "channelMemberType": "string",
    "customData": "object | null"
  },
  "joinedAt": "string"  // Date and time in ISO string format
}
```

#### 2. **`VIDEO_ROOM_PARTICIPANT_LEFT`**

Triggered when a participant leaves a video room.
**Payload:**

```json
{
  "videoRoom": {
    "id": "number",
    "state": "string",
    "videoRoomState": "string",
    "type": "VIDEO_CONFERENCE",
    "title": "string | null",
    "channelId": "number",
    "sessionNo": "number"
  },
  "appUser": {
    "appUserId": "string",
    "appUserName": "string | null",
    "channelMemberType": "string",
    "customData": "object | null"
  },
  "leftAt": "string"  // Date and time in ISO string format
}
```

#### 3. **`VIDEO_ROOM_EGRESS_ENDED`**

Triggered when the output stream (egress) of a video room ends.
**Payload:**

```json
{
  "videoRoom": {
    "id": "number",
    "state": "string",
    "videoRoomState": "string",
    "type": "VIDEO_CONFERENCE",
    "title": "string | null",
    "channelId": "number",
    "sessionNo": "number"
  }
}
```

#### 4. **`MEMBER_CREATED`**

Triggered when a new member is created.
**Payload format:** To Be Determined (TBD).

#### 5. **`MEMBER_UPDATED`**

Triggered when a member's details are updated.
**Payload format:** To Be Determined (TBD).

#### 6. **`VIDEO_ROOM_SCHEDULED`**

Triggered when a video room is scheduled.
**Payload format:** To Be Determined (TBD).

:::note

- All timestamps in the payload are in **ISO string format**.
- Use these events to synchronize your app's state, monitor user activity, and handle video room lifecycle events effectively.

:::

## Testing

An iFrame embedding testing page is provided for your convenience. The URL of the test page is https://static.jocoos.com/vicollo/samples/sandbox.html.

The test page requires the following six values to be provided.

- App Id: Your app’s id
- Room code: UUID of a video room
- isObserver: Whether the user should enter the room as observer
- drawLayoutType: Either fixed-grid or scroll
- drawLayoutPosition: One of top, bottom, left, right
- key: Your app user’s access token(result from login)

Fill the appropriate values in the text boxes and press the load iframe by key button to see the Vicollo video room for your user loading inside an iFrame.

The values for the input text boxes can be provided via query params. For example, the following url will use 123, abc, 123abc as app id, room code, and key.

```plaintext
https://static.jocoos.com/vicollo/samples/sandbox.html?appId={appId}&roomCode={videoRoomUUID}&key={userAccessToken}
```
