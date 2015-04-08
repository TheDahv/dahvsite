---
title: Adventures in Serial Connections
date: 2015-04-30
categories: programming, hardware
summary: !
  I've been exploring and playing around with lower-level programming than I usually do. Along
  the way, I've been through various parts of the Internet to cobble barely-there documentation
  together to talk to a tiny computer. Here, I record what I've found.
---

# Overview

# The Hardware

Serial connection pins. USB and UART

* [pcDuino](http://linux-sunxi.org/LinkSprite_pcDuino_V3)
* [pdDuino Serial Debug Port](http://www.pcduino.com/chapter-2-serial-debug-port/)

# The Connections

* [UART Overview](http://linux-sunxi.org/UART)
* [TTL UART to USB Cable](http://store.linksprite.com/ttl-uart-to-usb-cable-serial-usb-debug-cable/)

# The Drivers

# The Software

* Terminal Emulator
  * Minicom
  * Screen - `screen -A /dev/cu.usbserial 115200`
* [pcDuino Book](http://www.pcduino.com/wiki/index.php?title=Book)
* [pcDuino Linaro - Linux ARM project](https://wiki.linaro.org/FrontPage)
