---
sidebar_position: 2
---

# Member

A member refers to a user belonging to an app in FlipFlop Cloud. All video-related features in FlipFlop Cloud are designed to be used through members. Therefore, if you want to provide video features to users of a concrete service via FlipFlop Cloud, you need to register the users of your service as members within the `App`. The minimum required information for registration is the user ID from the actual service. Once a member is registered to an `App`, their actual service ID is stored and managed as a string attribute called `appUserId`. Although an internal, separate ID is generated, all member activities are designed to be tracked based on `appUserId` for the convenience of developers using FlipFlop Cloud.

When registering an actual service user as a member of an `App`, you can also sync additional information such as `appUserName` and `appUserProfileImgUrl`. The purpose of this design is to provide more recognizable user information (e.g., username and profile image URL) from the actual service. By syncing this data, the FlipFlop Cloud App Client API can render user information directly when a request for member data is made to FlipFlop Cloud instead of the actual service. However, if there are concerns about storing user personal information in FlipFlop Cloud, or if legal restrictions apply, syncing this information is not required.

Additionally, there is an attribute called `customData` where arbitrary information can be stored as a string, as well as a key-value pair object attribute also named `customData` for storing custom information.

Depending on how you intend to use FlipFlop Cloud, if the goal is not to provide video features to all users of the actual service or if the features are to be used in a limited manner, you may partially sync members and users or even register virtual users without any synchronization at all.
