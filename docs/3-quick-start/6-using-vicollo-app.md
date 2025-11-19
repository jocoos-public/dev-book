---
sidebar_position: 6
---

# Using Vicollo App

:::note

Vicollo is currently under development. The following content may change.

:::

## Introduction

You can have your own Vicollo app instance. Each Vicollo app has an isolated member pool and its own independent settings, allowing you to manage policies and configurations exactly as needed.

### What is Vicollo

Vicollo is a service designed to provide video streaming and conferencing out of the box. Jocoos operates a public service called `Vicollo.Live`, where members can create video rooms and invite others to join for meetings, virtual classrooms, or live broadcasting.

### What is a Vicollo App

Members of `Vicollo.Live` can create their own dedicated and isolated Vicollo service instance, called a **Vicollo app**. This gives you a separate member base and customizable policies, independent of `Vicollo.Live`.

### Limitations and Differences from Vicollo.Live

* Guest access is not currently supported (only registered app members may use the app).
* Each app has dedicated storage.
* Each member may have dedicated storage.
* Member permissions can be managed through groups.

### Usage Patterns

There are two common ways to use a Vicollo App. They are not mutually exclusive, but typically one pattern becomes primary.

#### 1. Members use the Vicollo App directly

You register members into your Vicollo App and allow them to log in through the app's interface. This is simple and requires minimal development but provides less fine-grained control over member actions.

#### 2. Your server controls the access and usage

This is ideal when integrating Vicollo functionality into an existing service. Your system registers members to the Vicollo app and manages their usage programmatically via your server.

## Creating a Vicollo App

If you have already coordinated with us, your account and app setup may be complete and the relevant information shared.

Otherwise, first ensure you are a member of `Vicollo.Live`. Then contact us to become a business partner to enable app creation.

Once approved:

1. Log in to `Vicollo.Live`.
2. Click the **App** button in the upper-right corner.
3. Select **Create App**.
4. Fill in the required fields.

After creation, you can access your app from the app list or directly at:
`https://vicollo.live/apps/{appId}`

An `admin` member will be automatically created. The password you entered during app setup will be the admin's password. Log in using:

```plaintext
Username: admin
Password: (password you entered)
```

## Vicollo App Overview

After logging in as admin, you will see the following main menus:

* Workspace

  * Home: Dashboard
  * Schedule: Calendar view for room scheduling
  * Rooms: List of video rooms
  * Sessions: Video room session history
  * Files: Stored files
* Management

  * Usage Stats: App usage statistics
  * Members: Member list and group assignment
  * Settings: App configuration

The steps below walk through common operations.

### Creating a Video Room

Open **Rooms** under **Workspace**, then click **Create**.
Set the title and description and configure options such as:

* Room type
* Password protection
* Join approval requirements

### Adding Members

Go to **Members** under **Management**. You will see yourself listed as part of the `ADMINISTRATORS` group.

Click **Create** to add a new member. Enter the information and submit.
You can test login using another browser or incognito mode.

#### Groups

The group feature allows you to efficiently manage permissions by organizing the actions that members can perform into predefined groups. When you create a Bicolo app, the following default groups are automatically generated:

* ADMINISTRATORS: This group holds most of the permissions required for app management, allowing all actions except those reserved for the app owner (such as ownership transfer). The user who creates the app automatically becomes the first member of this group.
* HOSTS: Although not app owners, members of this group are granted the permissions necessary to take on operational responsibilities within the app.
* MEMBERS: This group includes the basic permissions intended for regular users of the app.
* GUESTS: Users in this group are not official app members and cannot log in, but they are granted limited permissions to temporarily use certain app features.

The permissions assigned to each group can be modified(currently only possible via Vicollo App Server API) but initial settings are as follows.

#### Member Related Permissions

| PERMISSION | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
|------------|:--------------:|:-----:|:-------:|:------:|
| MEMBER_CREATE_ANY | O | | | |
| MEMBER_LIST_ANY | O | O | | |
| MEMBER_LIST_ME | O | O | O | O |
| MEMBER_GET_ANY | O | O | | |
| MEMBER_GET_ME | O | O | O | O |
| MEMBER_UPDATE_ANY | O | | | |
| MEMBER_UPDATE_ME | O | O | O | O |
| MEMBER_DELETE_ANY | O | | | |

#### Group Related Permissions

| PERMISSION | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
|------------|:--------------:|:-----:|:-------:|:------:|
| GROUP_CREATE_ANY | O | | | |
| GROUP_LIST_ANY | O | O | O | O |
| GROUP_GET_ANY | O | O | O | O |
| GROUP_UPDATE_ANY | O | | | |
| GROUP_DELETE_ANY | O | | | |

#### VideoRoom Related Permissions

| PERMISSION | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
|------------|:--------------:|:-----:|:-------:|:------:|
| VIDEO_ROOM_CREATE_ANY | O | O | | |
| VIDEO_ROOM_LIST_ANY | O | | | |
| VIDEO_ROOM_LIST_MINE | O | O | O | O |
| VIDEO_ROOM_LIST_ACCESS_LEVEL_PUBLIC | O | O | O | O |
| VIDEO_ROOM_LIST_ACCESS_LEVEL_MEMBER | O | O | O | |
| VIDEO_ROOM_LIST_AS_PRESENT_PARTICIPANT | O | O | O | O |
| VIDEO_ROOM_LIST_AS_ALLOWED_PARTICIPANT | O | O | O | O |
| VIDEO_ROOM_GET_ANY | O | | | |
| VIDEO_ROOM_GET_MINE | O | O | O | O |
| VIDEO_ROOM_GET_ACCESS_LEVEL_PUBLIC | O | O | O | O |
| VIDEO_ROOM_GET_ACCESS_LEVEL_MEMBER | O | O | O | |
| VIDEO_ROOM_GET_AS_PRESENT_PARTICIPANT | O | O | O | O |
| VIDEO_ROOM_GET_AS_ALLOWED_PARTICIPANT | O | O | O | O |
| VIDEO_ROOM_UPDATE_ANY | O | | | |
| VIDEO_ROOM_UPDATE_MINE | O | O | O | O |
| VIDEO_ROOM_UPDATE_AS_PRESENT_PARTICIPANT_HOST | O | O | O | O |
| VIDEO_ROOM_UPDATE_AS_ALLOWED_PARTICIPANT_HOST | O | O | O | |
| VIDEO_ROOM_DELETE_ANY | O | | | |
| VIDEO_ROOM_DELETE_MINE | O | O | O | O |

#### App Storage Related Permissions

| PERMISSION | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
|------------|:--------------:|:-----:|:-------:|:------:|
| APP_STORAGE_OBJECT_CREATE_ANY | O | O | | |
| APP_STORAGE_OBJECT_LIST_ANY | O | O | | |
| APP_STORAGE_OBJECT_GET_ANY | O | O | | |
| APP_STORAGE_OBJECT_GET_MINE | O | O | O | |
| APP_STORAGE_OBJECT_UPDATE_ANY | O | | | |
| APP_STORAGE_OBJECT_UPDATE_MINE | O | O | O | |
| APP_STORAGE_OBJECT_DELETE_ANY | O | | | |
| APP_STORAGE_OBJECT_DELETE_MINE | O | O | O | |

#### VideoRoom Storage Related Permissions

| PERMISSION | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
|------------|:--------------:|:-----:|:-------:|:------:|
| VIDEO_ROOM_STORAGE_OBJECT_CREATE_ANY | O | | | |
| VIDEO_ROOM_STORAGE_OBJECT_CREATE_AS_VIDEO_ROOM_OWNER | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_CREATE_AS_PRESENT_PARTICIPANT_HOST | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_CREATE_AS_ALLOWED_PARTICIPANT_HOST | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_CREATE_AS_PRESENT_PARTICIPANT_CONTRIBUTOR | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_CREATE_AS_ALLOWED_PARTICIPANT_CONTRIBUTOR | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_LIST_ANY | O | | | |
| VIDEO_ROOM_STORAGE_OBJECT_LIST_AS_VIDEO_ROOM_OWNER | O | O | O | |
| VIDEO_ROOM_STORAGE_OBJECT_LIST_AS_PRESENT_PARTICIPANT_HOST | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_LIST_AS_ALLOWED_PARTICIPANT_HOST | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_LIST_AS_PRESENT_PARTICIPANT_CONTRIBUTOR | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_LIST_AS_ALLOWED_PARTICIPANT_CONTRIBUTOR | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_GET_ANY | O | | | |
| VIDEO_ROOM_STORAGE_OBJECT_GET_AS_VIDEO_ROOM_OWNER | O | O | O | |
| VIDEO_ROOM_STORAGE_OBJECT_GET_AS_PRESENT_PARTICIPANT_HOST | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_GET_AS_ALLOWED_PARTICIPANT_HOST | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_GET_AS_PRESENT_PARTICIPANT_CONTRIBUTOR | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_GET_AS_ALLOWED_PARTICIPANT_CONTRIBUTOR | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_UPDATE_ANY | O | | | |
| VIDEO_ROOM_STORAGE_OBJECT_UPDATE_AS_VIDEO_ROOM_OWNER | O | O | O | ? |
| VIDEO_ROOM_STORAGE_OBJECT_UPDATE_AS_PRESENT_PARTICIPANT_HOST | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_UPDATE_AS_ALLOWED_PARTICIPANT_HOST | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_UPDATE_MINE | O | O | O | ? |
| VIDEO_ROOM_STORAGE_OBJECT_DELETE_ANY | O | | | |
| VIDEO_ROOM_STORAGE_OBJECT_DELETE_AS_VIDEO_ROOM_OWNER | O | O | O | ? |
| VIDEO_ROOM_STORAGE_OBJECT_DELETE_AS_PRESENT_PARTICIPANT_HOST | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_DELETE_AS_ALLOWED_PARTICIPANT_HOST | O | O | O | O |
| VIDEO_ROOM_STORAGE_OBJECT_DELETE_MINE | O | O | O | ? |

#### Member Storage Related Permissions

| PERMISSION | ADMINISTRATORS | HOSTS | MEMBERS | GUESTS |
|------------|:--------------:|:-----:|:-------:|:------:|
| MEMBER_STORAGE_OBJECT_CREATE_ANY | O | | | |
| MEMBER_STORAGE_OBJECT_CREATE_AS_STORAGE_OWNER | O | O | | |
| MEMBER_STORAGE_OBJECT_LIST_ANY | O | | | |
| MEMBER_STORAGE_OBJECT_LIST_AS_STORAGE_OWNER | O | O | | |
| MEMBER_STORAGE_OBJECT_GET_ANY | O | | | |
| MEMBER_STORAGE_OBJECT_GET_AS_STORAGE_OWNER | O | O | | |
| MEMBER_STORAGE_OBJECT_UPDATE_ANY | O | | | |
| MEMBER_STORAGE_OBJECT_UPDATE_AS_STORAGE_OWNER | O | O | | |
| MEMBER_STORAGE_OBJECT_DELETE_ANY | O | | | |
| MEMBER_STORAGE_OBJECT_DELETE_AS_STORAGE_OWNER | O | O | | |

### Joining a Video Room

Return to the **Rooms** list, open the menu for a room, and click **Join Meeting**.
Configure your camera/microphone and click **Join**.

Have the newly created member join from another browser.
A session begins when someone enters the room and ends when all members leave.

### Viewing Video Room History

Session history can be viewed by:

* Opening the room details menu from the **Rooms** list, or
* Navigating to **Sessions** under **Workspace**.

## Using Vicollo App with Server API

You can create and manage members, rooms, and more using the Vicollo App Server REST API.

API Reference:

* Documentation: [https://portal.flipflop.cloud/open-api/en/docs/vicollo-app-server](https://portal.flipflop.cloud/open-api/en/docs/vicollo-app-server)
* Swagger UI: [https://portal.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server](https://portal.flipflop.cloud/open-api/en/swagger-ui/vicollo-app-server)

You will need the API key and secret that were provided when your app was created. If you no longer have them, contact us.

**Important:**
The Server API must be used only from your backend.
Add the following header in the REST API request

```palintext
Authorization: Basic {base64 encoded string of 'apiKey:apiSecret'}
```

Do not expose your API key or secret in frontend code.

The API acts on behalf of the entire app, so ensure proper security checks when forwarding requests from your own users.
