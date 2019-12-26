# DFAF: dynamic flex ad framework

The goal of this project is to make html5 ad creation/implementation better in every way.

## Features

* Dynamic content driven
* One ad fits all: adapts layout/styles across multiple fixed iframe sizes
* Easily customizable
* Light & fast
  * Minimal code, native javascript only
  * No third party depenencies
* Major ad platforms supported
* Easy to understand, use and repurpose

## Demo

* [Single ad preview](https://cihusss.github.io/dfaf/index.html?leaf=4)
* [Multiple size ad preview](https://cihusss.github.io/dfaf/preview.html?leaf=4)

Change leaf id's in the url in order to preview different creative variations.

## Compatibility

Successfully tested on the following platforms:

* Google Ad Manager (DFP)
* AppNexus

## Usage

* Clone the repository to your local web server
* Edit json/matrix.json per your media plan: this is your static database
* Edit json/sizes.json in order to add/remove supported ad sizes
* Edit images in the img folder and make sure they are referenced in json/matrix.json
* Once done zip up the following files for ad platform implementation:
  * /index.html
  * /css
  * /img
  * /js
  * /json

## Click Tag

AppNexus clickTag is currently implemented. If you'd like to switch to Google Ad Manager, please follow documentation on [this link](https://support.google.com/admanager/answer/7046799?hl=en) and edit your index.html accordingly.
