(function () {
    function EventManager() {
        this.events = {};
    };

    EventManager.prototype.on = EventManager.prototype.addEventListener = function addEventlistener(event, fn) {
        if (typeof fn !== "function")
            throw new TypeError("The listener must be a function");

        if (!this.events[event]) {
            this.events[event] = [];
        }

        if (!this[event])
            this[event] = this.trigger.bind(this, event);

        this.events[event].push(fn);
    };

    EventManager.prototype.off = EventManager.prototype.removeAllEventListener = function removeAllEventListener(event) {
        this.events[event] = [];
    };

    EventManager.prototype.removeEventListener = function removeEventListener(event, fn) {
        if (!this.events[event])
            return;

        var index = this.events[event].indexOf(fn);

        if (index == -1)
            return;

        this.events[event].splice(index, 1);
    };

    EventManager.prototype.trigger = EventManager.prototype.emmit = function trigger(event) {
        var self = this,
            args = Array.prototype.slice.call(arguments, 1);

        if (!this.events[event])
            return;

        if (this.async) {
            setTimeout(function () {
                self.events[event].forEach(function (e) {
                    e.apply(self.target, args);
                });
            }, 0);
        } else {
            this.events[event].forEach(function (e) {
                e.apply(self.target, args);
            });
        }
    };

    EventManager.prototype.once = function once(event, fn) {
        var self = this,
            args = arguments,
            toReg = function toReg() {
                fn.apply(self.target, arguments);
                self.removeEventListener(event, toReg);
            };

        this.on(event, toReg);
    };

    EventManager.makeEmmitter = function makeEmmitter(object) {
        object.eventManager = new EventManager();

        for (var prop in object.eventManager) {
            if (typeof object.eventManager[prop] === "function") {
                object[prop] = object.eventManager[prop].bind(object.eventManager);
            }
        }
    }

    if (typeof define === 'function' && define.amd) {
        define('event-manager', [], function () {
            return EventManager;
        });
    } else if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = EventManager;
        }
        exports.eventManager = EventManager;
    } else {
        window.EventManager = EventManager;
    }
}());
