---
sidebar_position: 1
---

# FlipFlop App Server API

The FlipFlop App Server API is used when the backend server needs to handle user requests on behalf of the user or when it is necessary to operate services according to business logic using FlipFlop Cloud features.

When creating an `app` in FlipFlop Cloud, you must use the issued API key and secret as credentials. For API requests, the `Authorization` information must be included in the HTTP header using the Basic type. The credential should be a base64 encoded string of the API key and secret combined with a colon (`:`) in between.

Please check the API documentation and Swagger UI for API calls through the links below:

- [API Documentation](https://portal.flipflop.cloud/open-api/en/docs/ffc-app-server)
- [Swagger UI](https://portal.flipflop.cloud/open-api/en/swagger-ui/ffc-app-server)