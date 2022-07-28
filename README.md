## About Home VJ 

This is an app I started to build after investing in a projector over the pandemic lockdown. I wanted a bespoke tool that I could use to aggregate images and video together and trigger them on the fly whilst playing music.

Due to the specificity of what I wanted to display I decided to try and use my knowledge of Node and React to build my own implementation, loading either local videos (using the standard HTML video tag), slideshows (using simple-react-lightbox), or a mixture of both (referred to as 'stories').

The final app is intended to be used across three different devices: projector for the viewer, mobile for the launcher and desktop for the configuration. I'm aware that with the proliferation of video editing tools out there that this app might be the equivalent of me extolling the virtues of two tin cans and a bit of string to a mobile phone user but in practice it actually ended up working surprisingly well and my audience was impressed.

## How to use

**1.** Import the mysql database

**2.** Edit the config file so it has your db configuration information

**3.** Ensure you have node installed (I recommend setting up a nodeenv env)

**4.** Dump assets in a folder named "assets" in the app root, images should go in assets/img/ and video in assets/video/ (I'm hoping to add an uploader in the near future...)

**5.** npm install

**6.** npm run startDev

**7.** Cross fingers

NOTE: Code contains prod/dev options but in reality this is a single user app to run locally on a laptop hooked up to a projector. The server functionality is mainly to allow the mobile device to connect so it can display the launcher.

**8.** Browse to /admin on a desktop/laptop browser

**9.** "Register" your assets with the app by using the Add image and Add video forms so the app knows they exist.

**10.** Create a project and start adding images to slideshows, then slideshows/videos to projects

**11.** Create a "story" - stories allow multiple videos and slideshows to be sequenced together. There are a number of settings, hopefully they are fairly explanatory

**12.** Open a browser window full screen on the projector and browse to /viewer

**13.** Browse to /launcher on a mobile device, select a project and you should see your slideshows videos and stories listed

**14.** Put on some music

**15.** Use the launcher to trigger your assets as befits the music!
