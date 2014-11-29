var EventManager = require("../event-manager");
var expect = require("chai").expect;

// Testing with mocha

describe("EventManager", function () {
    describe("#on", function () {
        it("Should resgister the event", function () {
            var passed = false,
                emanager = new EventManager();

            emanager.on("test", function () {
                passed = true;
                console.log("pass");
            });

            emanager.trigger("test");

            expect(passed).to.be.true;
        });
    });

    describe("#addEventListener", function () {
        it("Should resgister the event", function () {
            var passed = false,
                emanager = new EventManager();

            emanager.addEventListener("test", function () {
                passed = true;
            });

            emanager.trigger("test");

            expect(passed).to.be.true;
        });
    });

    describe("#off", function () {
        it("Should unregister all the registered listener for the event", function () {
            var called = false,
                emanager = new EventManager();

            emanager.on("test", function () {
                called = true;
            });

            emanager.addEventListener("test", function () {
                called = true;
            });

            emanager.on("test", function () {
                called = true;
            });

            emanager.off("test")

            emanager.trigger("test");

            expect(called).to.be.false;
        });

        it("Should unregister all the registered listener for only the event", function () {
            var called = false,
                calledOther = fale,
                emanager = new EventManager();

            emanager.on("test", function () {
                called = true;
            });
            emanager.on("test2", function () {
                calledOther = true;
            });

            emanager.off("test")

            emanager.trigger("test");

            expect(called).to.be.false;
            expect(calledOther).to.be.true;
        });
    });

    describe("#removeAllEventListener", function () {
        it("Should unregister all the registered listener for the event", function () {
            var called = false,
                emanager = new EventManager();

            emanager.on("test", function () {
                called = true;
            });

            emanager.addEventListener("test", function () {
                called = true;
            });

            emanager.addEventListener("test", function () {
                called = true;
            });

            emanager.removeAllEventListener("test")

            emanager.trigger("test");

            expect(called).to.be.false;
        });

        it("Should unregister all the registered listener for only the event", function () {
            var called = false,
                calledOther = fale,
                emanager = new EventManager();

            emanager.on("test", function () {
                called = true;
            });
            emanager.on("test2", function () {
                calledOther = true;
            });

            emanager.removeAllEventListener("test")

            emanager.trigger("test");

            expect(called).to.be.false;
            expect(calledOther).to.be.true;
        });
    });

    describe("#removeEventListener", function () {
        it("Should the specified listener from the event", function () {
            var emanager = new EventManager(),
                called = {};

            var listener1 = function () {
                called.listener1 = true;
            };

            var listener2 = function () {
                called.listener2 = true;
            };

            var listener3 = function () {
                called.listener3 = true;
            };

            emanager.on("test", listener1);
            emanager.on("test", listener2);
            emanager.on("test", listener3);

            emanager.removeEventListener("test", listener2);

            emanager.test();

            expect(called.listener1).to.be.true;
            expect(called.listener2).to.be.undefined;
            expect(called.listener3).to.be.true;
        });

        it("Should the specified listener only from the event", function () {
            var emanager = new EventManager(),
                called = {};

            var listener1 = function () {
                called.listener1 = true;
            };

            var listener2 = function () {
                called.listener2 = true;
            };

            var listener3 = function () {
                called.listener3 = true;
            };

            emanager.on("test", listener1);
            emanager.on("test", listener2);
            // other event
            emanager.on("test2", listener2);
            emanager.on("test", listener3);

            emanager.removeEventListener("test", listener2);

            emanager.test();

            expect(called.listener1).to.be.true;
            expect(called.listener2).to.be.undefined;
            expect(called.listener3).to.be.true;

            emanager.trigger("test2");

            expect(called.listener2).to.be.true;

        });
    });

    describe("#trigger", function () {
        it("Should trigger the specified event", function () {
            var passed = false,
                emanager = new EventManager();

            emanager.on("test", function () {
                passed = true;
            });

            emanager.trigger("test");

            expect(passed).to.be.true;
        });

        it("Should trigger only the specified event", function () {
            var passed = false,
                passedOther = false,
                emanager = new EventManager();

            emanager.on("test", function () {
                passed = true;
            });

            emanager.on("test2", function () {
                passedOther = true;
            });

            emanager.trigger("test");

            expect(passed).to.be.true;
            expect(passedOther).to.be.false;
        });

        it("Should pass all the paramether especified", function () {
            var allArguments = {},
                emanager = new EventManager();

            emanager.on("test1", function () {
                allArguments.test1 = arguments;
            });

            emanager.on("test2", function () {
                allArguments.test2 = arguments;

            });

            emanager.on("test3", function () {
                allArguments.test3 = arguments;

            });

            emanager.trigger("test1");
            emanager.trigger("test2", 1);
            emanager.trigger("test3", 1, 2, "potato");

            expect(allArguments.test1).to.be.empty;

            expect(allArguments.test2).to.have.length(1);
            expect(allArguments.test2[0]).to.be.equal(1);

            expect(allArguments.test3).to.have.length(3);
            expect(allArguments.test2[0]).to.be.equal(1);
            expect(allArguments.test2[1]).to.be.equal(2);
            expect(allArguments.test2[3]).to.be.equal("potato");

        });

    });

    describe("#emmit", function () {
        it("Should trigger the specified event", function () {
            var passed = false,
                emanager = new EventManager();

            emanager.on("test", function () {
                passed = true;
            });

            emanager.emmit("test");

            expect(passed).to.be.true;
        });

        it("Should trigger only the specified event", function () {
            var passed = false,
                passedOther = false,
                emanager = new EventManager();

            emanager.on("test", function () {
                passed = true;
            });

            emanager.on("test2", function () {
                passedOther = true;
            });

            emanager.emmit("test");

            expect(passed).to.be.true;
            expect(passedOther).to.be.false;
        });

        it("Should pass all the paramether especified", function () {
            var allArguments = {},
                emanager = new EventManager();

            emanager.on("test1", function () {
                allArguments.test1 = arguments;
            });

            emanager.on("test2", function () {
                allArguments.test2 = arguments;

            });

            emanager.on("test3", function () {
                allArguments.test3 = arguments;

            });

            emanager.emmit("test1");
            emanager.emmit("test2", 1);
            emanager.emmit("test3", 1, 2, "potato");

            expect(allArguments.test1).to.be.empty;

            expect(allArguments.test2).to.have.length(1);
            expect(allArguments.test2[0]).to.be.equal(1);

            expect(allArguments.test3).to.have.length(3);
            expect(allArguments.test2[0]).to.be.equal(1);
            expect(allArguments.test2[1]).to.be.equal(2);
            expect(allArguments.test2[3]).to.be.equal("potato");

        });

    });

    describe("#once", function () {
        it("Event listener showld be called once", function () {
            var timesCalled = 0,
                emanager = new EventManager();

            emanager.once("test", function () {
                passed += 1;
            });

            emanager.trigger("test");
            emanager.trigger("test");
            emanager.trigger("test");

            expect(timesCalled).to.be.equal(1);
        });
    });



});
