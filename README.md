event-manager
=============

Simple js module to work with custom events. You can use as an event manager or make any object an event emmiter. Works with Node, requirejs or in añy browser. Here is how to use it:

```javascript
//var EventManager = require("event-manager"); // If you are in node

var emanager = new EventManager();

emanager.on("customEvent", function (param1, param1) {
    console.log("customEvent");
});

```

And then to trigger it:

```javascript
emanager.trigger("customEvent", param1, param2);

// or just

emanager.customEvent(param1, param2);
```

Here we extend an object to be an emmitter:

```javascript
var object = {}:

EventManager.makeEmmitter(object);

object.on("event", function () {
    console.log("event");
});

object.trigger("event");

//object.event(); // Does not work this way
```

##Methods

### #on("eventName", listener) and #addEventlistener("eventName", listener)

Register an event listener to the specified event.

```javascript
emanager.on("event", function () {
    doSomething();
});

emanager.addEventlistener("otherEvent", function () {
    doOtherSomething();
});
```

### #off("eventname") and #removeAllEventListener("eventName")

Removes all the event listeners for the especified event.

```javascript
emanager.off("event");

emanager.removeAllEventListener("otherEvent");
```

### #removeEventListener("event", listener)

Remove the specified listener from the specified event.

```javascript
var listener = function () {
    console.log("I'm a listener and i was called");
};

emanager.on("event", listener);

emanager.removeEventListener("event", listener);

emanager.trigger("event"); // Nothing will be logged

```

### #trigger("event", ...) and #emmit("event", ...)

Triggers the event specifies using the other arguments specified to call the other listeners.

```javascript
emanager.on("event", function (param) {
    console.log("\"event\" was called with parameter: " + param );
});

emanager.on("otherEvent", function (param1, param 2) {
    console.log("\"otherEvent\" was called with parameters: " + param1 + " and " + param2);
});

emanager.on("evenOtherEvent", function () {
    console.log("\"evenOtherEvent\" was called with parameters: " + arguments.join(", "));
});

emanager.trigger("event", 1);

emanager.emmit("event", 1, 2);

emanager.evenOtherEvent(1, 2, 3); //This is also possible
```

That would result in:

```
"event" was called with parammeter: 1
"otherEvent" was called with parammeters: 1 and 2
"evenOtherEvent" was called with parammeters: 1, 2, 3
```

### #once("event", listener)

Register an event listener, but it will only be called once.

```javascript
emanager.on("event", function () {
    console.log("I will be called many times");
});

emanager.once("event", function () {
    console.log("---------------I will be called only once-----------------");
});

emanager.trigger("event");
emanager.trigger("event");
emanager.trigger("event");
```

That would result in:

```
I will be called many times
---------------I will be called only once-----------------
I will be called many times
I will be called many times
```

##EventManager.makeEmmiter(object);

This Utility method extend your `object` so it can make anything an `EventManager`can do (in expeption of triggering an event calling `object.event()`).

```javascript
var object = {}:

EventManager.makeEmmitter(object);

object.on("event", function () {
    console.log("event");
});

object.trigger("event");

//object.event(); // Does not work this way
```