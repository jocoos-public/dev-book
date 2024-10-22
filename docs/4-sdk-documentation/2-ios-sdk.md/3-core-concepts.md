---
sidebar_position: 3
---

# Core Concepts

## Connecting to Server

By default, FlipFlop Cloud provides two kinds of servers: one to use during pre-service development (the development server) and one to use when providing the actual service (the production server).

you specify the server to use when initializing the SDK like below.

```
// connect to flipflop dev server
let config = FFLConfig(serverConfig: .dev)
FlipFlopLite.initialize(config: config)
```

FlipFlop Cloud also provides a dedicated server upon request. The advantage of a dedicated server is that by building a separate server for your service, you can customize the server according to your requirements. In this case, you initialize the SDK by entering the server address directly as shown below.

```
// connect to a dedicated server
let config = FFLConfig(serverAddr: "SERVER_ADDRESS") // replace SERVER_ADDRESS to your server address
FlipFlopLite.initialize(config: config)
```

## Authentication

For a FlipFlop SDK to successfully connect to the server, it needs an access token.

Access token is not provided in the SDK, so you need to get it separately through the [Member Login API](https://jocoos-public.github.io/dev-book/jekyll/2023-10-16-App-Member-API.html#member-login)

> Getting an access token: It is recommended to get the access token from FlipFlop Cloud through the application server and then pass it to the client. We do not recommend using the Member Login API directly on the client to get the access token.

You need the following items to get an access token.

* AppKey, AppSecret: It is generated when you create an application in the user console.
* appUserId, appUserName, appUserProfileImgUrl
  * 'appUserId' is required. 'appUserName' and 'appUserProfileImgUrl' are optional.

> We recommend that you use the same user information as the service you're creating

Flow for getting an access token

1. Signing up in the user console
2. Creating an application
3. Saving the 'AppKey' and 'AppSecret' generated when creating the application
4. Using the Member Login API with the 'AppKey' and 'AppSecret' to get an access token
5. Passing the access token to the client
