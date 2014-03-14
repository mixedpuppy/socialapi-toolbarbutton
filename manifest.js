var loc = location.href;
var baseurl = loc.substring(0,loc.lastIndexOf('/'));

function getManifest() {
  return {
    // currently required
    "name": "Social Toolbar Button and Panel Example",
    "origin": baseurl,
    // icons from http://findicons.com/icon/158311/firefox?id=356182 by ipapun
    "iconURL": baseurl+"/firefox16.png",
    "icon32URL": baseurl+"/firefox32.png",
    "icon64URL": baseurl+"/firefox64.png",
  
    // at least one of these must be defined
    "statusURL": baseurl+"/status.htm",
    // a persistent worker accessible to the social panels (e.g. statusURL)
    "workerURL": baseurl+"/worker.js",
  
    // should be available for display purposes
    "description": "A simple example of a social toolbarbutton with a panel",
    "author": "Shane Caraveo, Mozilla",
    "homepageURL": "https://github.com/mixedpuppy/socialapi-toolbarbutton/",
  
    // optional
    "version": 1
  }
}
