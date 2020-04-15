---
layout: post
title:  "Running Mopidy on a Raspberry Pi 1 Model B with a HifiBerry DAC using Raspian Jessie"
date:   2016-12-29 15:58:00 -0600
categories: raspberry-pi audio
tags: raspberry-pi audio
published: true
tldr: Raspberry Pi 1 Model B + HifiBerry DAC + Raspian + Mopidy = Fully Operational HiFi Music Player
---

I recently unearthed a couple of old Rasberry Pi 1 Model B units equipped with HifiBerry DAC HATs. It's been
a couple of years since I tinkered with them, so I decided to see if I could get them to play music. 

I was able to get everything up and running using [Pi MusicBox](http://www.pimusicbox.com/), which provides
just about everything one needs to run a music player on a Rasperry Pi. If you just want something that works 
out of the box, Pi MusicBox is fantastic.

However, I wanted to leverage the newer Raspian release, Jessie. And I wanted to configure everything myself. 

1. Download [Latest Jessie Lite Image](https://downloads.raspberrypi.org/raspbian_lite_latest.torrent)
2. [Install Image](https://www.raspberrypi.org/documentation/installation/installing-images/README.md)
3. Boot Raspberry Pi
4. Login to Raspberry Pi. SSH wasn't running for me on first boot, so I had to use a keybord and monitor.
5. Become root `sudo -i` (so you don't have to prefix all subsequent commands with sudo).
6. Configure Pi using `raspi-config`. I enabled SSH, changed the root password, set locale and set timezone.
7. Install vim (for editing text). `apt-get install vim`.
7. Upgrade firmware. Those familiar with Raspian will likely know about the rpi-update firmware update utility. I found that
   it wasn't installed by default in Raspian Jessie Lite. `apt-get install rpi-update` did the trick. Running `rpi-update` updated
   the firmware to the current version. This probably wasn't necessary, but I wanted to be current. I rebooted after this, then
   used SSH to continue the process. Avahi was installed by default, so I was able to reach the Pi on my network using 
   raspberrypi.local. `ssh pi@raspberrypi.local`. 
8. [Configure HifiBerry](https://support.hifiberry.com/hc/en-us/articles/205377651-Configuring-Linux-4-x-or-higher). Update /boot/config.txt
   to enable HifiBerry and disable default audio. Comment out the `dtparam=audio=on` setting. Add `dtoverlay=hifiberry-dac`. Save file and reboot (or
   you can reboot after installing mopidy if you can't afford extraneous reboots).
9. [Install Mopidy](https://docs.mopidy.com/en/latest/installation/debian/#debian-install). The Mopidy docs are great. Just follow the instructions
10. [Configure Mopidy](https://docs.mopidy.com/en/latest/config/). I wanted to run Mopidy as a service, so I edited the config file at /etc/mopidy/mopidy.conf.
    See my [mopidy.conf](https://gist.github.com/lannon/26f048d91f064faa366f3005a0ff209f). There's quire a bit going on here. See inline comments for more details.
11. Install [Mopify](https://github.com/dirkgroenen/mopidy-mopify#installation) HTTP frontend. 

### My config files

* [/boot/config.txt](https://gist.github.com/lannon/74ad21f3fa557a2b95ecf74e696ba493)
* [mopidy.conf](https://gist.github.com/lannon/26f048d91f064faa366f3005a0ff209f)
