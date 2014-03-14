function log(msg) {
  //dump(new Date().toISOString() + ": [dssworker] " + msg + "\n");
  try {
    console.log(new Date().toISOString() + ": [dssworker] " + msg);
  } catch (e) {}
}

ononline = function() {
  dump("!!!!!!! ononline called "+navigator.onLine+"\n");
}
onoffline = function() {
  dump("!!!!!!! onoffline called "+navigator.onLine+"\n");
}
onunload = function() {
  dump("!!!!!!! onunload called\n");
}
// Called when any port connects to the worker
onconnect = function(e) {
  try {
    var port = e.ports[0];

    // this is our basic message handler
    port.onmessage = function(e) {
      //log("worker onmessage: " + JSON.stringify(e.data));

      var msg = e.data;
      if (!msg) {
        log("onmessage called with no data")
        return;
      }
      // handle the special message that tells us a port is closing.
      if (msg.topic && msg.topic == "social.port-closing") {
        if (port == apiPort) {
          dump("!!!!!!!!!!!!! apiPort has closed!\n");
        }
        return;
      }

      if (msg.topic && handlers[msg.topic])
        handlers[msg.topic](port, msg);
      else {
        // this is just a simple way for content panels to reflect a message
        // into firefox.
        try {
          apiPort.postMessage(msg);
        } catch(e) {
          log(e+"\n");
        }
      }
    }

    // worker.connected is our own message, it is not part of any api.  We
    // use it as a way to signal content that we are connected to them.  This
    // is useful if we reload the worker (see social.reload-worker)
    port.postMessage({topic: "worker.connected"});
  } catch (e) {
    log(e);
  }
}

var c = 0;

// Messages from the sidebar and chat windows:
var handlers = {

  // This is the first call we should receive from Firefox.  We track that
  // port as teh apiPort, and start our polling of the cookies for login/logout
  // tracking
  'social.initialize': function(port, data) {
    log("social.initialize called, capturing apiPort");
    apiPort = port;
    
    // we're not really using a profile here, but send one regardless to bypass
    // a couple restrictions
    port.postMessage({topic: "social.user-profile", data: { userName: "demo" }});
  }
}
