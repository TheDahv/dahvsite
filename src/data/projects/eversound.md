---
title: Eversound
github: https://github.com/TheDahv/eversound
screenshotUrl: ../../images/projects/eversound.png
id: eversound
---

Eversound is an exploration in distributed personal amplification using
WebRTC.

The inspiration for this project came from a failure to plan well. At an
event where I was supposed to speak, the organizing team realized we would
not have a PA system available. I ended up having to yell for most of the
evening.

I looked at the room and noticed everybody in the room had a laptop or
an Internet-connected device with speakers in them. The month before,
I learned about [WebRTC](http://www.webrtc.org/):

> WebRTC is a free, open project that provides browsers and mobile applications with Real-Time Communications (RTC) capabilities via simple APIs.

This project allows a broadcaster to open a named channel that peers can
connect to given the appropriate URL. The platform streams the audio input
from the broadcaster's microphone to the speakers of all connected devices.

### Technologies Used

* WebRTC
* JavaScript and HTML5
* Require.js
* Socket.io
* Node.js

### Known Issues and Future Plans

This is still very early technology. I'm tracking known bugs and incomplete
implementations among desktop and mobile browsers.

There are also potential latency issues I need to explore given network
quality and computation required for visual processing.

Once those are ironed out, I will work on making the publish and subscribe
workflow easier.
