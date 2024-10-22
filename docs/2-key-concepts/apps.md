---
sidebar_position: 1
---

# App

A FlipFlop Cloud `App` is an abstract concept corresponding to a service that either intends to implement video-related features or wishes to utilize these features even without having a concrete service entity. Through an `App`, FlipFlop Cloud separates video-related functionalities for each service, allowing the platform to manage information and provide features independently. FlipFlop Cloud offers various types of apps, allowing users to select the most suitable one based on how and in what environment they intend to use video features.

## Types of FlipFlop Cloud Apps

FlipFlop Cloud supports the creation of the following types of apps:

- **FlipFlop App**: For services that have a concrete entity and a backend server where video-related features will be implemented.
- **FlipFlop Portal App**: For cases where there is no concrete service entity, and users want to access video features through the client app provided by FlipFlop.
- **Bicolo Managed App**: For specific organizations that wish to use comprehensive video conferencing features (including UI) without having a concrete service entity.
- **Bicolo Unmanaged App**: For services with a concrete entity that want to offer comprehensive video conferencing features (including UI) to their users.
