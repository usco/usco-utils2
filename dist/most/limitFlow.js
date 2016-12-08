"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = limitFlow;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// LimtiFlow by Nathan Ridley(axefrog) from https://gist.github.com/axefrog/84ec77c5f620dab5cdb7dd61e6f1df0b
function limitFlow(period) {
  return function limitFlow(stream) {
    var source = new RateLimitSource(stream.source, period);
    return new stream.constructor(source);
  };
}

var RateLimitSource = function () {
  function RateLimitSource(source, period) {
    _classCallCheck(this, RateLimitSource);

    this.source = source;
    this.period = period;
  }

  _createClass(RateLimitSource, [{
    key: "run",
    value: function run(sink, scheduler) {
      return this.source.run(new RateLimitSink(this, sink, scheduler), scheduler);
    }
  }]);

  return RateLimitSource;
}();

var RateLimitSink = function () {
  function RateLimitSink(source, sink, scheduler) {
    _classCallCheck(this, RateLimitSink);

    this.source = source;
    this.sink = sink;
    this.scheduler = scheduler;
    this.nextTime = 0;
    this.buffered = void 0;
  }

  _createClass(RateLimitSink, [{
    key: "_run",
    value: function _run(t) {
      if (this.buffered === void 0) {
        return;
      }
      var x = this.buffered;
      var now = this.scheduler.now();
      var period = this.source.period;
      var nextTime = this.nextTime;
      this.buffered = void 0;
      this.nextTime = (nextTime + period > now ? nextTime : now) + period;
      this.sink.event(t, x);
    }
  }, {
    key: "event",
    value: function event(t, x) {
      var nothingScheduled = this.buffered === void 0;
      this.buffered = x;
      var task = new RateLimitTask(this);
      var nextTime = this.nextTime;
      if (t >= nextTime) {
        this.scheduler.asap(task);
      } else if (nothingScheduled) {
        var interval = this.nextTime - this.scheduler.now();
        this.scheduler.delay(interval, new RateLimitTask(this));
      }
    }
  }, {
    key: "end",
    value: function end(t, x) {
      this._run(t);
      this.sink.end(t, x);
    }
  }, {
    key: "error",
    value: function error(t, e) {
      this.sink.error(t, e);
    }
  }]);

  return RateLimitSink;
}();

var RateLimitTask = function () {
  function RateLimitTask(sink) {
    _classCallCheck(this, RateLimitTask);

    this.sink = sink;
  }

  _createClass(RateLimitTask, [{
    key: "run",
    value: function run(t) {
      if (this.disposed) {
        return;
      }
      this.sink._run(t);
    }
  }, {
    key: "error",
    value: function error(t, e) {
      if (this.disposed) {
        return;
      }
      this.sink.error(t, e);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.disposed = true;
    }
  }]);

  return RateLimitTask;
}();