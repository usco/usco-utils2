'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // taken from https://github.com/briancavalier/most-behavior/blob/2888b2b69fe2c8e44617c611eb5fdaf512d52007/src/animationFrames.js


exports.animationFrames = animationFrames;
exports.rafStream = rafStream;

var _most = require('most');

var _create = require('@most/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function animationFrames() {
  return new _most.Stream(new AnimationFramesSource());
}

var recurse = function recurse(cancel, schedule) {
  return function (sink, scheduler) {
    var canceler = new Cancel(cancel);
    var onNext = function onNext(x) {
      sink.event(scheduler.now(), x);
      cancel.key = schedule(onNext);
    };
    cancel.key = schedule(onNext);

    return canceler;
  };
};

var _animationFrames = recurse(cancelAnimationFrame, requestAnimationFrame);

var AnimationFramesSource = function () {
  function AnimationFramesSource() {
    _classCallCheck(this, AnimationFramesSource);
  }

  _createClass(AnimationFramesSource, [{
    key: 'run',
    value: function run(sink, scheduler) {
      return _animationFrames(sink, scheduler);
    }
  }]);

  return AnimationFramesSource;
}();

var Cancel = function () {
  function Cancel(cancel) {
    _classCallCheck(this, Cancel);

    this.cancel = cancel;
    this.key = undefined;
  }

  _createClass(Cancel, [{
    key: 'dispose',
    value: function dispose() {
      this.cancel(this.key);
    }
  }]);

  return Cancel;
}();

/* alternative version */


function rafStream() {
  var stream = (0, _create2.default)(function (add, end, error) {
    function step(timestamp) {
      add(null);
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  });
  return stream;
}