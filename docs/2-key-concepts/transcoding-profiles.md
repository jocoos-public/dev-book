---
sidebar_position: 3
---

# Transcoding Profile

## Usage of Transcoding Profiles

A `Transcoding Profile` is used internally within FlipFlop Cloud in the following scenarios:

- When compressing the original video file in a `Video Post` and converting it to a format suitable for the viewing method based on the audience of the video post.
- When extracting a thumbnail while converting the original video file in a `Video Post` to a suitable format for viewing.
- When extracting a preview while converting the original video file in a `Video Post` to a suitable format for viewing.
- When converting a live video stream in a `Video Room` to a suitable format for real-time broadcasting and viewing.

## Types of Transcoding Profiles

There are different types of `Transcoding Profiles` depending on their usage:

- `VIDEO`: For transcoding the original video in a `Video Post`.
- `THUMBNAIL`: For extracting a thumbnail when transcoding the original video in a `Video Post`.
- `PREVIEW`: For extracting a preview when transcoding the original video in a `Video Post`.
- `BROADCAST_RTMP`: For converting a live video stream in a `Video Room` for broadcasting in a format suitable for viewing.

The configuration locations for each type are as follows:

- `Video Post`: `VIDEO`, `THUMBNAIL`, `PREVIEW`
- `Stream Key`: `BROADCAST_RTMP`

## Types and Creation of Transcoding Profiles

FlipFlop Cloud has predefined `Transcoding Profiles` available within the system, which can be used by any `App`.

If the desired `Transcoding Profile` is not available, you can contact [Jocoos Support](mailto:support@jocoos.com), and they can create a custom profile that will be available and usable exclusively for your specified `App`.
