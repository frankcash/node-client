// Generated by IcedCoffeeScript 1.7.0-a
(function() {
  var ArgumentParser, Base, Command, KeyManager, User, add_option_dict, env, iced, log, make_esc, prompt_passphrase, req, session, __iced_k, __iced_k_noop,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  iced = require('iced-coffee-script').iced;
  __iced_k = __iced_k_noop = function() {};

  Base = require('./base').Base;

  log = require('../log');

  ArgumentParser = require('argparse').ArgumentParser;

  add_option_dict = require('./argparse').add_option_dict;

  session = require('../session').session;

  make_esc = require('iced-error').make_esc;

  env = require('../env').env;

  log = require('../log');

  User = require('../user').User;

  req = require('../req');

  prompt_passphrase = require('../prompter').prompt_passphrase;

  KeyManager = require('../keymanager').KeyManager;

  exports.Command = Command = (function(_super) {
    __extends(Command, _super);

    function Command() {
      return Command.__super__.constructor.apply(this, arguments);
    }

    Command.prototype.use_session = function() {
      return true;
    };

    Command.prototype.add_subcommand_parser = function(scp) {
      var name, opts, sub;
      opts = {
        help: "pull your private key from the server"
      };
      name = "pull";
      sub = scp.addParser(name, opts);
      add_option_dict(sub, this.OPTS);
      return [name];
    };

    Command.prototype.get_private_key = function(cb) {
      var body, err, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      log.debug("+ Fetching me.json from server");
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase-node-client/src/command/pull.iced",
            funcname: "Command.get_private_key"
          });
          req.get({
            endpoint: "me"
          }, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                err = arguments[0];
                return body = arguments[1];
              };
            })(),
            lineno: 35
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          var _ref, _ref1;
          if ((typeof err === "undefined" || err === null) && ((_this.p3skb = (_ref = body.me.private_keys) != null ? (_ref1 = _ref.primary) != null ? _ref1.bundle : void 0 : void 0) == null)) {
            err = new E.NoRemoteKeyError("no private key found on server");
          }
          log.debug("- fetched me");
          return cb(err);
        };
      })(this));
    };

    Command.prototype.prompt_passphrase = function(cb) {
      var args, err, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      args = {
        prompt: "Your keybase passphrase"
      };
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase-node-client/src/command/pull.iced",
            funcname: "Command.prompt_passphrase"
          });
          prompt_passphrase(args, __iced_deferrals.defer({
            assign_fn: (function(__slot_1) {
              return function() {
                err = arguments[0];
                return __slot_1.passphrase = arguments[1];
              };
            })(_this),
            lineno: 46
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          return cb(err, _this.passphrase);
        };
      })(this));
    };

    Command.prototype.unlock_key = function(cb) {
      var err, prompter, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      prompter = this.prompt_passphrase.bind(this);
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase-node-client/src/command/pull.iced",
            funcname: "Command.unlock_key"
          });
          KeyManager.import_from_p3skb({
            raw: _this.p3skb,
            prompter: prompter
          }, __iced_deferrals.defer({
            assign_fn: (function(__slot_1) {
              return function() {
                err = arguments[0];
                return __slot_1.km = arguments[1];
              };
            })(_this),
            lineno: 53
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          console.log(_this.km);
          return cb(err);
        };
      })(this));
    };

    Command.prototype.run = function(cb) {
      var esc, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      esc = make_esc(cb, "Command::run");
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase-node-client/src/command/pull.iced",
            funcname: "Command.run"
          });
          session.login(esc(__iced_deferrals.defer({
            lineno: 61
          })));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "/Users/max/src/keybase-node-client/src/command/pull.iced",
              funcname: "Command.run"
            });
            _this.get_private_key(esc(__iced_deferrals.defer({
              lineno: 62
            })));
            __iced_deferrals._fulfill();
          })(function() {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "/Users/max/src/keybase-node-client/src/command/pull.iced",
                funcname: "Command.run"
              });
              _this.unlock_key(esc(__iced_deferrals.defer({
                lineno: 63
              })));
              __iced_deferrals._fulfill();
            })(function() {
              return cb(null);
            });
          });
        };
      })(this));
    };

    return Command;

  })(Base);

}).call(this);