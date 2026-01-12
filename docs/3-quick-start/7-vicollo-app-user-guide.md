---
sidebar_position: 7
---

# Vicollo App User Guide (User Guideline of Vicollo Apps)

## Table of Contents

* 1 Preface
* 2 Introduction to Vicollo
  * 2.1 What it is
  * 2.2 Main Features
* 3 Usage Scenarios
  * 3.1 Use as **SaaS** from Vicollo
  * 3.2 Use as **PaaS** from Your Web Site
* 4 Key Concepts
  * 4.1 Understanding **Members** and **Groups**
  * 4.2 Understanding **VideoRoom**
  * 4.3 Understanding **Sessions**
  * 4.4 Understanding **Roles**
  * 4.5 Understanding **Storages**
* 5 Preparations
  * 5.1 Sign up to Vicollo Live
  * 5.2 Become a Business Partner
  * 5.3 Create Your Vicollo App
* 6 Overview of Using Vicollo App
  * 6.1 Adding and Managing Members
    * 6.1.1 Managing Member Groups
    * 6.1.2 Add Member
  * 6.2 Creating and Managing VideoRooms
  * 6.3 Joining VideoRoom
* 7 Vicollo App Integration Guide (Use as PaaS)

---

## 1 Preface

This document explains how to use Jocoos’ **Vicollo** service as part of your own service offering. Vicollo is continuously developed and improved to reflect diverse customer requirements, so features and the user interface (UI) may change frequently. In particular, because UI structure and detailed features may be updated often, this document omits some screenshots and overly detailed UI instructions.

As the service matures, this document will be gradually expanded with more detail. Until then, please use it primarily as guidance for understanding the **core concepts and operational flows** you need in order to use Vicollo. If any part of the document is unclear, or if the behavior described differs from what you observe in the product, please contact Jocoos at any time. Your feedback is very helpful for improving both this documentation and the service itself.

---

## 2 Introduction to Vicollo

### 2.1 What it is

Jocoos has been developing video-related software for more than 10 years. Over that time, demand for video streaming has continued to grow, and we have also seen many companies face significant technical and operational barriers when building and running the required capabilities on their own.

To address this, Jocoos aimed to provide video streaming as a **PaaS** so customers could adopt it easily via **SDK / API** without developing streaming technology themselves. In practice, however, many teams still find SDK/API-based integration difficult, and there has also been steady demand for a **complete platform including UI** for simple use cases or rapid adoption.

The form of video streaming has also evolved. In the early days, demand was centered on one-way live streaming (one broadcaster, many viewers). Today, demand is rapidly increasing for **two-way video conferencing (real-time communication)** that enables interaction among participants.

In response to these changes, Jocoos developed Vicollo so that video conferencing can be used both as PaaS and as SaaS.
**Vicollo Live** is Jocoos’ video conferencing service, and a **Vicollo App** refers to a **customer-dedicated (cloned) Vicollo service** provided by Vicollo so that customers can use Vicollo’s capabilities in the form of **SaaS or PaaS** depending on their purpose.

### 2.2 Main Features

The main features provided by Vicollo App are as follows.

1. **Member management**

   * Create / Read / Update / Delete
   * **Group-based permission management**

     * Configure VideoRoom access permissions
     * Configure Storage access permissions

2. **Video conference (VideoRoom) management**

   * Create / Read / Update / Delete
   * **Recording**

     * Auto recording / manual recording
     * Audio transcription (extraction) from recorded videos
   * **Security and admission policies**

     * Per-member access permission management
     * Password configuration
     * Require admission approval
     * Manage **Allow List**
   * **Participation and communication**

     * View participants
     * Chat
     * Emojis
   * **Widgets**

     * Whiteboard, Document Share, Screen Share, Video Player
     * Notes, Files, Web Links
     * Quiz, Poll

3. **Session management**

   * Watch recorded video and chat simultaneously
   * Review session participation history

4. **Storage**

   * Storage provided at the App / Member / VideoRoom level

---

## 3 Usage Scenarios

Depending on your goals and implementation scope, Vicollo App can be used as either a **SaaS model** or a **PaaS model**.

* **SaaS model**: Use the **web UI provided by Vicollo as-is** (no additional development)
* **PaaS model**: **Integrate Vicollo features into your web service** (development required to unify service experience/account system)

### 3.1 Use as SaaS from Vicollo

The **SaaS model** is a way to use Vicollo App directly in a web browser with no development work. You can start using it immediately by accessing the Vicollo App URL. Administrators and standard users can perform the following in the web UI **within the scope of their assigned permissions**.

* **Member / Group management**
* **Create/operate VideoRooms** and configure security policies
* View **Session / recording / chat** history
* **Storage and file management**

This approach is suitable when you need rapid adoption, or when you want to start operating first and then gradually expand the integration scope.

### 3.2 Use as PaaS from Your Web Site

The **PaaS model** integrates Vicollo’s video conferencing features into your existing web service. In other words, users access Vicollo features within your service flow (login/billing/permissions/content structure).

Depending on your goal, integration can be broadly divided into two approaches.

1. **Standalone operation (simple integration)**
   Operate by creating dedicated **Members** in Vicollo App, separate from your service’s user accounts.

   * Fast to adopt, with minimal development—primarily issuing a VideoRoom URL that includes authentication information for an arbitrary Member created for immediate video conferencing use
   * However, full integration with your service’s user activity tracking/permission policies may be **limited**

2. **User-linked operation (account/permission integration)**
   **Connect (map)** your service users to Vicollo App **Members** to track user activity and manage permissions/policies consistently based on your service.

   * Requires additional development to integrate member information between your service and Vicollo App for user tracking/statistics/history management

This approach is suitable when you want to naturally extend your existing user experience with video conferencing while keeping your service’s flow intact.

---

## 4 Key Concepts

To operate Vicollo App smoothly and apply it to your service in the way you want, it is important to understand several **core concepts** first. Vicollo is organized around **Member**, **Group/Role**, **VideoRoom**, **Session**, and **Storage**, and the overall app behavior and policies are determined by how these concepts connect to each other.

In particular, access control and operational flow are designed around: “**who (Member)** / **where or what (VideoRoom, Storages)** / **with what permissions (Group·Role)** / **what activity happened and when (Session)**.” Understanding the meaning and relationships of these terms will greatly reduce confusion not only when configuring settings in the UI, but also when integrating via API/SDK.

### 4.1 Understanding Members and Groups

In Vicollo App, a **Member** represents an individual user of the app. Most actions—joining a video meeting (entering a VideoRoom), creating and operating meetings, reviewing recordings/session history, and using Storage—are performed on a per-Member basis.

A **Group** is a unit for granting and managing permissions in bulk at the **app scope** by grouping multiple Members. Rather than managing permissions individually for each Member, you can define permissions on Groups and assign Members to those Groups to improve operational efficiency and consistency.

When you create a Vicollo App, the following four Groups are created automatically by default.

* **ADMINISTRATORS**: A group that manages overall app operation. Permissions are configured to allow most administrative functions **except for some restricted features such as app disposal**.
* **HOSTS**: A group for operating video meetings. Permissions are configured to allow key functions required to create/run VideoRooms.
* **MEMBERS**: The default group for standard users. Permissions are configured to allow general app usage including joining meetings.
* **GUESTS**: A group for one-time or limited users. It is **similar to MEMBERS**, but some functions may be further restricted depending on your operating policy.

Each Group’s permission set is provided with default values and can be **changed later** to match your operating policy.

Also, the Member who creates the Vicollo App is automatically assigned to the **ADMINISTRATORS** Group at creation time. Therefore, immediately after app creation, you can begin operational tasks such as Member/Group management and VideoRoom management **within the ADMINISTRATORS permission scope**.

### 4.2 Understanding VideoRoom

A **VideoRoom** is the core concept representing the “room” where a video meeting actually takes place in Vicollo App. Members join a VideoRoom to participate in a meeting, and most configurations related to meeting operation (admission policy, recording, participant management, etc.) are set at the VideoRoom level.

#### Common configuration items (examples)

* **Title**: VideoRoom name
* **Description**: Brief description of purpose/usage
* **Scheduled Time**: Planned meeting time (schedule)
* **Auto Recording**: Whether to start recording automatically when the meeting starts
* **Admission Approval**: Whether approval by the room creator (or an operator) is required upon entry
* **Access Scope**

  * **PRIVATE**: Only the creator can access
  * **RESTRICTED**: Only Members registered in the **Allow List** can access
  * **MEMBER**: Members in the **GUESTS Group** cannot access; other Members can access (technically defined by Group permission lists, but this is the default behavior described here)
  * **PUBLIC**: Anyone who knows the URL can access (technically defined by Group permission lists, but this is the default behavior described here)

#### VideoRoom types

Depending on purpose and UI/feature composition, Vicollo App provides the following two VideoRoom types.

* **VIDEO_CONFERENCE**
  Provides a traditional video conference UI. All participants can see each other’s video and basic features such as chat/emojis and document/file sharing are supported. However, because this type was developed earlier, integration with other Vicollo App features may be relatively limited.

* **INTERACTIVE_MEETING**
  Can be used for video conferencing, but is designed especially with **interactive classrooms for education** in mind. It supports richer interactions among participants and integrates more broadly with other Vicollo App features such as Widgets, Session, and Storage.

> Depending on the VideoRoom type, additional configurable items may be available. The UI composition, supported features, and detailed settings for each type will be provided in a separate document in the future.

### 4.3 Understanding Sessions

A **Session** represents one “run” of a meeting that actually takes place in a single VideoRoom.
A Session starts the moment the **first participant enters** when the room was previously **empty**, and it continues even as participants come and go, until the moment **all participants have left** and the room becomes empty again.

Because a single VideoRoom can host meetings multiple times, **multiple Sessions** can be created. Each time a Session is created, a **Session No.** is assigned starting from **1** and increasing sequentially.

If **Auto Recording** is enabled for the VideoRoom:

* Recording **starts automatically** at Session start (first participant joins)
* While recording is in progress, a participant with the HOST role can **stop recording**
* When the Session ends (everyone leaves), any ongoing recording is **stopped automatically**

If recording is started/stopped **manually**, recording can be split into multiple segments within the same Session, so **multiple recording files can be created for a single Session.**

### 4.4 Understanding Roles

If a **Group** represents permissions at the “app scope,” a **Role** represents permissions and responsibilities **within a specific VideoRoom**. Even for the same Member, what they can do may differ depending on which VideoRoom they enter and which Role they are assigned upon entry.

Roles are classified as follows, from highest to lowest permission level.

* **HOST**: Has overall meeting operation permissions, such as changing VideoRoom settings, controlling widgets, switching scenes, and changing layouts. Also manages in-room operating policies such as controlling feature access by Role.
* **CONTRIBUTOR**: Typically granted permissions at the level of **managing (operating) widgets**.
* **AUDIENCE**: Typically granted permissions at the level of **general widget usage**.
* **GUEST**: Similar to AUDIENCE, but with **additional restrictions** depending on the operating policy.

The Role concept was introduced for **INTERACTIVE_MEETING** type VideoRooms and is not currently applied to **VIDEO_CONFERENCE** type VideoRooms.

> [! Note]
>
> Roles will also be applied to VIDEO_CONFERENCE type VideoRooms in the future.

#### Default Role and pre-assignment

By default, participants enter a VideoRoom with the **AUDIENCE** Role.
To pre-assign an entry Role for a specific participant, you can add the participant to the **Allow List** and set the **Role to grant upon entry**.

#### Role change rules

In principle, only a participant with the **HOST** Role can change another participant’s Role.
As an exception, the **VideoRoom creator** can change **their own Role** regardless of their current Role.

### 4.5 Understanding Storages

In Vicollo App, **Storage** is a space to store and share various resources such as documents, files, and recorded data. Depending on usage purpose and sharing scope, it is divided into the following three types.

* **App Storage**
  Storage shared across the entire Vicollo App. In the default Group model, it is configured so that only Members in **HOSTS Group or above** can use it.
  (e.g., operators manage common materials, templates, and announcement files)

* **VideoRoom Storage**
  Storage assigned to each VideoRoom, used to store files **shared among meeting participants**.
  (e.g., meeting materials, reference documents, shared files)

* **Member Storage**
  A **personal storage** provided to each Member.

Storage **read (view) and write (upload/edit/delete) permissions** are primarily controlled by the **Group permission list**.
Additionally, access to **VideoRoom Storage** may sometimes be automatically allowed depending on meeting progress or a specific **Widget’s storage usage behavior**.

> Detailed behavior and permission settings for each Storage type are explained in the permissions/features section.

---

## 5 Preparations

This chapter describes the prerequisites for using Vicollo App. In general, the process follows this order: **Sign up to Vicollo Live → Business partner approval → Create Vicollo App**.

### 5.1 Sign up to Vicollo Live

To sign up for Vicollo Live, open `https://vicollo.live` in a web browser and complete the registration.
Currently, Vicollo Live only supports sign-up using a **Google account**.

> [!NOTE]
> Email-based or username/password-based sign-up will be provided in the future.

### 5.2 Become a Business Partner

Creating a Vicollo App is available only to **business partners**, not regular members. To become a business partner, an **approval process** is required, and it is currently handled **via email**.
After signing up for Vicollo, please contact Jocoos to proceed with the business partner approval process.

### 5.3 Create Your Vicollo App

Once business partner approval is complete, you can create a Vicollo App with the following steps.

1. Log in to Vicollo
2. Click the **App** button in the upper-right corner
3. Select **Create App**
4. Enter the required information and create

You can access the created Vicollo App by selecting it from the app list or via the URL format below.

* `https://vicollo.live/apps/{appId}`

Also, when you create an app, an account with username **admin** is automatically created, and the password you entered during app creation is set as the admin account password.

* username: **admin**
* password: **the password entered when creating the app**

---

## 6 Overview of Using Vicollo App

This chapter provides a high-level overview of the basic operational flow when running Vicollo App. Operations can be broadly grouped into the following three pillars.

1. **Configure Members / Groups (permission model)**
2. **Create VideoRooms and configure operating policies**
3. **Join VideoRooms and run meetings (Session creation)**

A typical operational sequence is as follows.

1. Review/adjust **Group permissions** to match your operating policy
2. **Create Members** who will use the app and assign them to appropriate Groups
3. **Create VideoRooms** of the desired type and configure security/access/recording policies
4. Run meetings → **Session created** → review recordings/chat/materials and repeat operations

Considering the UI may change frequently, this document focuses on **“what to configure and why”** rather than step-by-step click paths.

### 6.1 Adding and Managing Members

Member management is the most basic step to define **who can use the Vicollo App**.
Because Vicollo App uses **Group-based permission management**, it is much easier to operate if you organize the **Group structure and permission policy** before creating Members.

* **Operational perspective**: classify user types (organization/team/partner/external users) and manage permissions consistently via Groups
* **Security perspective**: control VideoRoom and Storage access scopes according to the principle of least privilege

#### 6.1.1 Managing Member Groups

Group management is the process of deciding “which functions are allowed for whom within the app.”

* You can use the default Groups (**ADMINISTRATORS / HOSTS / MEMBERS / GUESTS**) as-is, or
* You can add Groups or change existing Group permission sets according to your operating policy.

Currently, **creating new Groups** or **changing Group permissions** is not available in the UI (planned for a future release), so you must use the server API.
When modifying Groups, it is recommended to also check the following.

* Consistency between VideoRoom access scopes (**MEMBER / RESTRICTED**, etc.) and your Group configuration
* Whether Storage (App/Member/VideoRoom) permissions conflict with your actual sharing workflow

The list of permissions that can be set for Groups, and the default permission sets for each Group, are as follows.

##### Member Management Permissions

Permission Name Prefix: MEMBER

| Permission Name | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
| :-------------- | :------------: | :---: | :-----: | :----: |
| CREATE_ANY      |        O       |       |         |        |
| LIST_ANY        |        O       |   O   |         |        |
| LIST_ME         |        O       |   O   |    O    |    O   |
| GET_ANY         |        O       |   O   |         |        |
| GET_ME          |        O       |   O   |    O    |    O   |
| UPDATE_ANY      |        O       |       |         |        |
| UPDATE_ME       |        O       |   O   |    O    |    O   |
| DELETE_ANY      |        O       |       |         |        |

##### Group Management Permissions

Permission Name Prefix: GROUP

| Permission Name | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
| :-------------- | :------------: | :---: | :-----: | :----: |
| CREATE_ANY      |        O       |       |         |        |
| LIST_ANY        |        O       |   O   |    O    |    O   |
| GET_ANY         |        O       |   O   |    O    |    O   |
| UPDATE_ANY      |        O       |       |         |        |
| DELETE_ANY      |        O       |       |         |        |

##### VideoRoom Permissions

Permission Name Prefix: VIDEO_ROOM

| Permission Name                    | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
| :--------------------------------- | :------------: | :---: | :-----: | :----: |
| CREATE_ANY                         |        O       |   O   |         |        |
| LIST_ANY                           |        O       |       |         |        |
| LIST_MINE                          |        O       |   O   |    O    |    O   |
| LIST_ACCESS_LEVEL_PUBLIC           |        O       |   O   |    O    |    O   |
| LIST_ACCESS_LEVEL_MEMBER           |        O       |   O   |    O    |        |
| LIST_AS_PRESENT_PARTICIPANT        |        O       |   O   |    O    |    O   |
| LIST_AS_ALLOWED_PARTICIPANT        |        O       |   O   |    O    |    O   |
| GET_ANY                            |        O       |       |         |        |
| GET_MINE                           |        O       |   O   |    O    |    O   |
| GET_ACCESS_LEVEL_PUBLIC            |        O       |   O   |    O    |    O   |
| GET_ACCESS_LEVEL_MEMBER            |        O       |   O   |    O    |        |
| GET_AS_PRESENT_PARTICIPANT         |        O       |   O   |    O    |    O   |
| GET_AS_ALLOWED_PARTICIPANT         |        O       |   O   |    O    |    O   |
| UPDATE_ANY                         |        O       |       |         |        |
| UPDATE_MINE                        |        O       |   O   |    O    |    O   |
| UPDATE_AS_PRESENT_PARTICIPANT_HOST |        O       |   O   |    O    |    O   |
| UPDATE_AS_ALLOWED_PARTICIPANT_HOST |        O       |   O   |    O    |        |
| DELETE_ANY                         |        O       |       |         |        |
| DELETE_MINE                        |        O       |   O   |    O    |    O   |

##### App Storage Permissions

Permission Name Prefix: APP_STORAGE_OBJECT

| Permission Name | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
| :-------------- | :------------: | :---: | :-----: | :----: |
| CREATE_ANY      |        O       |   O   |         |        |
| LIST_ANY        |        O       |   O   |         |        |
| GET_ANY         |        O       |   O   |         |        |
| GET_MINE        |        O       |   O   |    O    |        |
| UPDATE_ANY      |        O       |       |         |        |
| UPDATE_MINE     |        O       |   O   |    O    |        |
| DELETE_ANY      |        O       |       |         |        |
| DELETE_MINE     |        O       |   O   |    O    |        |

##### VideoRoom Storage Permissions

Permission Name Prefix: VIDEO_ROOM_STORAGE_OBJECT

| Permission Name                           | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
| :---------------------------------------- | :------------: | :---: | :-----: | :----: |
| CREATE_ANY                                |        O       |       |         |        |
| CREATE_AS_VIDEO_ROOM_OWNER                |        O       |   O   |    O    |    O   |
| CREATE_AS_PRESENT_PARTICIPANT_HOST        |        O       |   O   |    O    |    O   |
| CREATE_AS_ALLOWED_PARTICIPANT_HOST        |        O       |   O   |    O    |    O   |
| CREATE_AS_PRESENT_PARTICIPANT_CONTRIBUTOR |        O       |   O   |    O    |    O   |
| CREATE_AS_ALLOWED_PARTICIPANT_CONTRIBUTOR |        O       |   O   |    O    |    O   |
| LIST_ANY                                  |        O       |       |         |        |
| LIST_AS_VIDEO_ROOM_OWNER                  |        O       |   O   |    O    |        |
| LIST_AS_PRESENT_PARTICIPANT_HOST          |        O       |   O   |    O    |    O   |
| LIST_AS_ALLOWED_PARTICIPANT_HOST          |        O       |   O   |    O    |    O   |
| LIST_AS_PRESENT_PARTICIPANT_CONTRIBUTOR   |        O       |   O   |    O    |    O   |
| LIST_AS_ALLOWED_PARTICIPANT_CONTRIBUTOR   |        O       |   O   |    O    |    O   |
| GET_ANY                                   |        O       |       |         |        |
| GET_AS_VIDEO_ROOM_OWNER                   |        O       |   O   |    O    |        |
| GET_AS_PRESENT_PARTICIPANT_HOST           |        O       |   O   |    O    |    O   |
| GET_AS_ALLOWED_PARTICIPANT_HOST           |        O       |   O   |    O    |    O   |
| GET_AS_PRESENT_PARTICIPANT_CONTRIBUTOR    |        O       |   O   |    O    |    O   |
| GET_AS_ALLOWED_PARTICIPANT_CONTRIBUTOR    |        O       |   O   |    O    |    O   |
| UPDATE_ANY                                |        O       |       |         |        |
| UPDATE_AS_VIDEO_ROOM_OWNER                |        O       |   O   |    O    |    ?   |
| UPDATE_AS_PRESENT_PARTICIPANT_HOST        |        O       |   O   |    O    |    O   |
| UPDATE_AS_ALLOWED_PARTICIPANT_HOST        |        O       |   O   |    O    |    O   |
| UPDATE_MINE                               |        O       |   O   |    O    |    ?   |
| DELETE_ANY                                |        O       |       |         |        |
| DELETE_AS_VIDEO_ROOM_OWNER                |        O       |   O   |    O    |    ?   |
| DELETE_AS_PRESENT_PARTICIPANT_HOST        |        O       |   O   |    O    |    O   |
| DELETE_AS_ALLOWED_PARTICIPANT_HOST        |        O       |   O   |    O    |    O   |
| DELETE_MINE                               |        O       |   O   |    O    |    ?   |

##### Member Storage Permissions

Permission Name Prefix: MEMBER_STORAGE_OBJECT

| Permission Name         | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
| :---------------------- | :------------: | :---: | :-----: | :----: |
| CREATE_ANY              |        O       |       |         |        |
| CREATE_AS_STORAGE_OWNER |        O       |   O   |         |        |
| LIST_ANY                |        O       |       |         |        |
| LIST_AS_STORAGE_OWNER   |        O       |   O   |         |        |
| GET_ANY                 |        O       |       |         |        |
| GET_AS_STORAGE_OWNER    |        O       |   O   |         |        |
| UPDATE_ANY              |        O       |       |         |        |
| UPDATE_AS_STORAGE_OWNER |        O       |   O   |         |        |
| DELETE_ANY              |        O       |       |         |        |
| DELETE_AS_STORAGE_OWNER |        O       |   O   |         |        |

#### 6.1.2 Add Member

There are two primary purposes for creating Members.

* **Operator/host accounts**: create meetings, operate meetings, manage permissions
* **General user/participant accounts**: join meetings and use limited features

After organizing Groups according to your operating policy, manage Members by selecting an appropriate Group during creation or changing the Group after creation.

There are two main ways to create Members.

1. **Create via Vicollo App UI**

* A creation flow intended for the SaaS model (using the web UI).
* Typically requires **email**, **username** (currently auto-generated), and **password**.
* Also specify the **Group ID** to assign the Member to.

2. **Create via Vicollo server API**

* A creation flow intended for the PaaS model (integrating with your existing service).
* Provides **appUserId** as a primary field to connect your service’s user identifier.
* Also specify the **Group ID** to assign the Member to.
* If you do not need user linkage and only plan to use URLs internally, you may provide an **arbitrary appUserId**.

### 6.2 Creating and Managing VideoRooms

When creating a VideoRoom, first select the **type (VideoRoom Type)**, then configure the **common settings** and **type-specific additional settings**.

#### Common configuration items (examples)

* Title, description, scheduled time
* Password
* Admission approval (Admission Approval)
* Access scope (Access Scope: PRIVATE/RESTRICTED/MEMBER/PUBLIC)
* Auto recording (Auto Recording)
* Participant anonymization during recording (optional), etc.

#### Type-specific configuration items (examples)

* **VIDEO_CONFERENCE**: options centered on traditional meeting UI (e.g., theme-related settings)
* **INTERACTIVE_MEETING**: options for interaction/education purposes (e.g., allow chat, allow 1:1 chat, etc.)

> The UI composition and detailed settings/operating methods for each type will be covered in a future “VideoRoom Type Guide” document.

### 6.3 Joining VideoRoom

To join a VideoRoom, first go to the **waiting page**, complete the **additional settings** required for entry, and then enter the VideoRoom.

You can reach the VideoRoom waiting page in the following ways.

* **When using the SaaS model**

  * After the user logs in to Vicollo App in a web browser, select the VideoRoom to join from the **VideoRoom list**
  * Receive a **VideoRoom URL** from another user and open it in a web browser

* **When using the PaaS model**

  * Provide a server API in your service that generates a **VideoRoom URL** containing user authentication information, and the user opens that URL in a web browser

---

#### 6.3.1 About VideoRoom Embed URL

In the PaaS model, because you may embed VideoRoom into your service using an `iframe`, or provide VideoRoom via a new window from your service, the VideoRoom URL used in this context is referred to as the **VideoRoom Embed URL**.

The Embed URL format is as follows.

```text
https://vicollo.live/vicollo-apps/${appID}/rooms/join/${roomUUID}?key=${userAuthKey}
```

With this URL, the user can enter the VideoRoom **without a separate login process**.
The value of the URL query parameter `key` (= `userAuthKey`) can be generated directly through your server API and used to construct a URL that matches the format above.

However, a **Helper API** is also provided to generate a URL that satisfies the format above, which makes creating an Embed URL more convenient.

---

## 7. Vicollo App Integration Guide (For PaaS Use)

Integrating your service with **Vicollo App** is a required step when using it in the **PaaS model**, and this integration is performed through the **Vicollo App Server API**.
The Vicollo App Server API is provided as an **HTTP-based REST API**, along with API documentation and a testing tool (Swagger UI) for easier use.

* API Docs: [https://portal.flipflop.cloud/open-api/en/docs/vicollo-app-server](https://portal.flipflop.cloud/open-api/en/docs/vicollo-app-server)
* Swagger UI: [https://portal.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server](https://portal.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server)

The Vicollo App Server API uses **API Key / API Secret** as authentication credentials. Using the **API Key/Secret** issued after creating your app, you must include **Basic authentication** in the HTTP header for API requests as shown below.

```http
Authorization: Basic <base64("apiKey:apiSecret")>
```

> [!IMPORTANT]
>
> **The Vicollo App Server API must only be used from your backend server.**
> If you call it from the frontend, your **API Key/Secret may be exposed to end users**, creating a serious security risk.

### 7.1. Integrating Members

You need **Member integration** if your service users require any of the following while using Vicollo App:

* You need to track **per-user activity history (sessions/recordings/participation logs, etc.)** based on your service’s user identity.
* You need to manage your service’s user permissions/policies **consistently** with Vicollo’s capabilities (e.g., access control).

On the other hand, if user integration is not strictly necessary, you can create an **arbitrary Member** and configure your service users to use Vicollo features through that Member (note that per-user tracking and permission separation may be limited).

When integrating user information, the following flow is recommended:

* When a user **signs up** for your service
  → **Create** a corresponding **Member** in Vicollo App for that user
* When a user **updates profile/basic information** in your service
  → **Update** the corresponding **Member** information in Vicollo App as well

This approach helps keep your service’s user state and Vicollo App’s Member state continuously aligned, improving consistency in operations, analytics, and permission management.

