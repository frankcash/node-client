// Generated by IcedCoffeeScript 1.7.1-b
(function() {
  var Base, BufferInStream, Command, E, TrackSubSubCommand, User, add_option_dict, codesign, fs, gpg, iced, keypull, log, make_esc, path, __iced_k, __iced_k_noop,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  iced = require('iced-coffee-script').iced;
  __iced_k = __iced_k_noop = function() {};

  codesign = require('codesign');

  path = require('path');

  fs = require('fs');

  Base = require('./base').Base;

  log = require('../log');

  add_option_dict = require('./argparse').add_option_dict;

  E = require('../err').E;

  TrackSubSubCommand = require('../tracksubsub').TrackSubSubCommand;

  gpg = require('../gpg').gpg;

  make_esc = require('iced-error').make_esc;

  User = require('../user').User;

  keypull = require('../keypull').keypull;

  BufferInStream = require('iced-spawn').BufferInStream;

  exports.Command = Command = (function(_super) {
    __extends(Command, _super);

    function Command() {
      return Command.__super__.constructor.apply(this, arguments);
    }

    Command.prototype.DIR_OPT = {
      nargs: '?',
      action: 'store',
      type: 'string',
      help: 'the directory to sign/verify',
      defaultValue: '.'
    };

    Command.prototype.SIGN_OPTS = {
      o: {
        alias: 'output',
        type: 'string',
        help: 'the output file'
      },
      p: {
        alias: 'presets',
        action: 'store',
        type: 'string',
        help: 'specify ignore presets, comma-separated',
        defaultValue: 'git,dropbox,kb'
      },
      q: {
        alias: 'quiet',
        action: 'storeTrue',
        help: 'withhold output unless an error'
      }
    };

    Command.prototype.VERIFY_OPTS = {
      i: {
        alias: 'input',
        type: 'string',
        help: 'the input file'
      },
      q: {
        alias: 'quiet',
        action: 'storeTrue',
        help: 'withhold output unless an error'
      },
      s: {
        alias: 'strict',
        action: 'storeTrue',
        help: 'fail on warnings (typically cross-platform problems)'
      }
    };

    Command.prototype.TOJSON_OPTS = {
      i: {
        alias: 'input',
        type: 'string',
        help: 'the input file to convert to JSON',
        defaultValue: codesign.constants.defaults.FILENAME
      }
    };

    Command.prototype.is_batch = function() {
      return false;
    };

    Command.prototype.set_argv = function(a) {
      return Command.__super__.set_argv.call(this, a);
    };

    Command.prototype.copy = function(d) {
      var k, v, x;
      x = {};
      for (k in d) {
        v = d[k];
        x[k] = v;
      }
      return x;
    };

    Command.prototype.add_subcommand_parser = function(scp) {
      var name, opts, ss1, ss2, ss3, sub, sub2;
      opts = {
        aliases: ["code-sign"],
        help: "sign or verify a directory's contents"
      };
      name = "dir";
      sub = scp.addParser(name, opts);
      sub2 = sub.addSubparsers({
        title: "dir subcommand",
        dest: "dir_subcommand"
      });
      ss1 = sub2.addParser("sign", {
        help: "sign a directory's contents"
      });
      add_option_dict(ss1, this.SIGN_OPTS);
      ss1.addArgument(['dir'], this.copy(this.DIR_OPT));
      ss2 = sub2.addParser("verify", {
        help: "verify a directory's contents"
      });
      add_option_dict(ss2, this.VERIFY_OPTS);
      ss2.addArgument(['dir'], this.copy(this.DIR_OPT));
      ss3 = sub2.addParser("tojson", {
        help: "convert a signed manifest to JSON"
      });
      add_option_dict(ss3, this.TOJSON_OPTS);
      return opts.aliases.concat([name]);
    };

    Command.prototype.do_sign = function(payload, cb) {
      var esc, gargs, out, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      esc = make_esc(cb, "Command::do_sign");
      gargs = {
        args: ["--sign", "--detach-sign", "-a", "-u", this.me.fingerprint(true)],
        stdin: new BufferInStream(new Buffer(payload, 'utf8'))
      };
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
            funcname: "Command.do_sign"
          });
          gpg(gargs, esc(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return out = arguments[0];
              };
            })(),
            lineno: 123
          })));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          return cb(null, out.toString('utf8'));
        };
      })(this));
    };

    Command.prototype.load_me = function(cb) {
      var err, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
            funcname: "Command.load_me"
          });
          User.load_me({
            secret: true
          }, __iced_deferrals.defer({
            assign_fn: (function(__slot_1) {
              return function() {
                err = arguments[0];
                return __slot_1.me = arguments[1];
              };
            })(_this),
            lineno: 129
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          return cb(err);
        };
      })(this));
    };

    Command.prototype.get_preset_list = function(cb) {
      var err, k, presets, valid_presets, _i, _len;
      err = null;
      presets = this.argv.presets.split(',');
      valid_presets = (function() {
        var _results;
        _results = [];
        for (k in codesign.constants.presets) {
          _results.push(k);
        }
        return _results;
      })();
      for (_i = 0, _len = presets.length; _i < _len; _i++) {
        k = presets[_i];
        if (!codesign.CodeSign.is_valid_preset(k)) {
          err = new E.ArgsError("Unknown preset " + k + " (valid values = " + (valid_presets.join(',')) + ")");
          presets = null;
          break;
        }
      }
      return cb(err, presets);
    };

    Command.prototype.get_ignore_list = function() {
      var ignore, rel_ignore;
      rel_ignore = path.relative(this.argv.dir, this.signed_file()).split(path.sep).join('/');
      ignore = rel_ignore.slice(0, 2) !== '..' ? ["/" + rel_ignore] : [];
      return ignore;
    };

    Command.prototype.signed_file = function() {
      return this.argv.input || this.argv.output || path.join(this.argv.dir, codesign.constants.defaults.FILENAME);
    };

    Command.prototype.target_file_to_json = function(fname, cb) {
      var body, err, f_err, obj, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);

      /*
      returns     null, null  # if there is no target file,
      otherwise:  err, obj
       */
      log.debug("+ Command::target_file_to_json");
      obj = null;
      err = null;
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
            funcname: "Command.target_file_to_json"
          });
          fs.readFile(fname, 'utf8', __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                f_err = arguments[0];
                return body = arguments[1];
              };
            })(),
            lineno: 168
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          if (typeof body !== "undefined" && body !== null) {
            obj = codesign.markdown_to_obj(body);
            if (obj == null) {
              err = new E.CorruptionError("Could not parse file " + fname);
            }
          }
          log.debug("- Command::target_file_to_json");
          return cb(err, obj);
        };
      })(this));
    };

    Command.prototype.process_probs = function(probs, cb) {

      /*
      outputs warning and errors based on strict/quiet settings,
      and calls back with error if appropriate
       */
      var err, err_table, p, warn_table, _i, _j, _len, _len1, _ref, _ref1;
      err_table = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = probs.length; _i < _len; _i++) {
          p = probs[_i];
          if ((p[0] >= 100) || this.argv.strict) {
            _results.push(p);
          }
        }
        return _results;
      }).call(this);
      warn_table = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = probs.length; _i < _len; _i++) {
          p = probs[_i];
          if ((p[0] < 100) && (!this.argv.strict) && (!this.argv.quiet)) {
            _results.push(p);
          }
        }
        return _results;
      }).call(this);
      err = null;
      if (warn_table.length) {
        for (_i = 0, _len = warn_table.length; _i < _len; _i++) {
          p = warn_table[_i];
          log.warn("" + p[0] + "\t" + (((_ref = p[1].expected) != null ? _ref.path : void 0) || p[1].got.path) + ":  " + p[1].msg);
        }
      }
      if (err_table.length) {
        for (_j = 0, _len1 = err_table.length; _j < _len1; _j++) {
          p = err_table[_j];
          log.error("" + p[0] + "\t" + (((_ref1 = p[1].expected) != null ? _ref1.path : void 0) || p[1].got.path) + ":  " + p[1].msg);
        }
        err = new Error("Exited after " + err_table.length + " error(s)");
      }
      return cb(err, {
        warnings: warn_table.length,
        errors: err_table.length
      });
    };

    Command.prototype.keybase_username_from_signer = function(s, cb) {
      var m, rxx;
      rxx = /^https:\/\/keybase.io\/([^\s\n]+)$/g;
      if ((m = rxx.exec(s)) != null) {
        return cb(null, m[1]);
      } else {
        return cb(new Error('Could not extract a keybase username from signer'));
      }
    };

    Command.prototype.verify = function(cb) {
      var esc, json_obj, payload, probs, signature, signer, summ, username, warnings, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      log.debug("+ Command::verify");
      esc = make_esc(cb, "Command::verify");
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
            funcname: "Command.verify"
          });
          _this.target_file_to_json(_this.signed_file(), esc(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return json_obj = arguments[0];
              };
            })(),
            lineno: 209
          })));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          payload = codesign.CodeSign.json_obj_to_signable_payload(json_obj);
          (function(__iced_k) {
            var _i, _len, _ref, _results, _while;
            _ref = json_obj.signatures;
            _len = _ref.length;
            _i = 0;
            _results = [];
            _while = function(__iced_k) {
              var _break, _continue, _next, _ref1;
              _break = function() {
                return __iced_k(_results);
              };
              _continue = function() {
                return iced.trampoline(function() {
                  ++_i;
                  return _while(__iced_k);
                });
              };
              _next = function(__iced_next_arg) {
                _results.push(__iced_next_arg);
                return _continue();
              };
              if (!(_i < _len)) {
                return _break();
              } else {
                _ref1 = _ref[_i], signature = _ref1.signature, signer = _ref1.signer;
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                    funcname: "Command.verify"
                  });
                  _this.keybase_username_from_signer(signer, esc(__iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        return username = arguments[0];
                      };
                    })(),
                    lineno: 214
                  })));
                  __iced_deferrals._fulfill();
                })(_next);
              }
            };
            _while(__iced_k);
          })(function() {
            summ = new codesign.CodeSign(_this.argv.dir, {
              ignore: json_obj.ignore,
              presets: json_obj.presets
            });
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                funcname: "Command.verify"
              });
              summ.walk(esc(__iced_deferrals.defer({
                lineno: 230
              })));
              __iced_deferrals._fulfill();
            })(function() {
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                  funcname: "Command.verify"
                });
                summ.compare_to_json_obj(json_obj, __iced_deferrals.defer({
                  assign_fn: (function() {
                    return function() {
                      return probs = arguments[0];
                    };
                  })(),
                  lineno: 231
                }));
                __iced_deferrals._fulfill();
              })(function() {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                    funcname: "Command.verify"
                  });
                  _this.process_probs(probs, esc(__iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        return warnings = arguments[0].warnings;
                      };
                    })(),
                    lineno: 232
                  })));
                  __iced_deferrals._fulfill();
                })(function() {
                  if (!_this.argv.quiet) {
                    log.info("Success! " + json_obj.signatures.length + " signature(s) verified;" + (" " + json_obj.found.length + " items checked") + (warnings ? " with " + warnings + " warning(s); pass --strict to prevent success on warnings; --quiet to hide warnings" : ''));
                  }
                  log.debug("- Command::verify");
                  return cb();
                });
              });
            });
          });
        };
      })(this));
    };

    Command.prototype.sign = function(cb) {
      var cs, esc, md, my_username, old_err, old_obj, preset_list, probs, sig, signature, signer, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      log.debug("+ Command::sign");
      esc = make_esc(cb, "Command::sign");
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
            funcname: "Command.sign"
          });
          keypull({
            stdin_blocked: _this.is_batch(),
            need_secret: true
          }, esc(__iced_deferrals.defer({
            lineno: 251
          })));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
              funcname: "Command.sign"
            });
            _this.load_me(esc(__iced_deferrals.defer({
              lineno: 252
            })));
            __iced_deferrals._fulfill();
          })(function() {
            my_username = "https://keybase.io/" + (_this.me.username());
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                funcname: "Command.sign"
              });
              _this.get_preset_list(esc(__iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    return preset_list = arguments[0];
                  };
                })(),
                lineno: 259
              })));
              __iced_deferrals._fulfill();
            })(function() {
              cs = new codesign.CodeSign(_this.argv.dir, {
                ignore: _this.get_ignore_list(),
                presets: preset_list
              });
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                  funcname: "Command.sign"
                });
                cs.walk(esc(__iced_deferrals.defer({
                  lineno: 261
                })));
                __iced_deferrals._fulfill();
              })(function() {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                    funcname: "Command.sign"
                  });
                  _this.target_file_to_json(_this.signed_file(), __iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        old_err = arguments[0];
                        return old_obj = arguments[1];
                      };
                    })(),
                    lineno: 267
                  }));
                  __iced_deferrals._fulfill();
                })(function() {
                  (function(__iced_k) {
                    if (typeof old_obj !== "undefined" && old_obj !== null) {
                      (function(__iced_k) {
                        __iced_deferrals = new iced.Deferrals(__iced_k, {
                          parent: ___iced_passed_deferral,
                          filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                          funcname: "Command.sign"
                        });
                        cs.compare_to_json_obj(old_obj, __iced_deferrals.defer({
                          assign_fn: (function() {
                            return function() {
                              return probs = arguments[0];
                            };
                          })(),
                          lineno: 269
                        }));
                        __iced_deferrals._fulfill();
                      })(function() {
                        var _i, _len, _ref, _ref1;
                        if (!probs.length) {
                          if (!_this.argv.quiet) {
                            log.info("Found existing " + (_this.signed_file()));
                          }
                          _ref = old_obj.signatures;
                          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            _ref1 = _ref[_i], signer = _ref1.signer, signature = _ref1.signature;
                            if (!(signer !== my_username)) {
                              continue;
                            }
                            cs.attach_sig(signer, signature);
                            log.info("Re-attaching still-valid signature from " + signer);
                          }
                        } else {
                          if (!_this.argv.quiet) {
                            log.info("Will replace existing/obsolete " + (_this.signed_file()));
                          }
                        }
                        return __iced_k();
                      });
                    } else {
                      return __iced_k();
                    }
                  })(function() {
                    (function(__iced_k) {
                      __iced_deferrals = new iced.Deferrals(__iced_k, {
                        parent: ___iced_passed_deferral,
                        filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                        funcname: "Command.sign"
                      });
                      _this.do_sign(cs.signable_payload(), esc(__iced_deferrals.defer({
                        assign_fn: (function() {
                          return function() {
                            return sig = arguments[0];
                          };
                        })(),
                        lineno: 281
                      })));
                      __iced_deferrals._fulfill();
                    })(function() {
                      cs.attach_sig(my_username, sig);
                      md = codesign.obj_to_markdown(cs.to_json_obj());
                      (function(__iced_k) {
                        __iced_deferrals = new iced.Deferrals(__iced_k, {
                          parent: ___iced_passed_deferral,
                          filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                          funcname: "Command.sign"
                        });
                        fs.writeFile(_this.signed_file(), md, {
                          encoding: 'utf8'
                        }, esc(__iced_deferrals.defer({
                          lineno: 288
                        })));
                        __iced_deferrals._fulfill();
                      })(function() {
                        if (!_this.argv.quiet) {
                          log.info("Success! Wrote " + (_this.signed_file()));
                        }
                        log.debug("- Command::sign");
                        return cb();
                      });
                    });
                  });
                });
              });
            });
          });
        };
      })(this));
    };

    Command.prototype.run = function(cb) {
      var esc, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      esc = make_esc(cb, "Command::run");
      log.debug("+ Command::run");
      (function(_this) {
        return (function(__iced_k) {
          switch (_this.argv.dir_subcommand) {
            case 'sign':
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                  funcname: "Command.run"
                });
                _this.sign(esc(__iced_deferrals.defer({
                  lineno: 301
                })));
                __iced_deferrals._fulfill();
              })(__iced_k);
              break;
            case 'verify':
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                  funcname: "Command.run"
                });
                _this.verify(esc(__iced_deferrals.defer({
                  lineno: 302
                })));
                __iced_deferrals._fulfill();
              })(__iced_k);
              break;
            case 'tojson':
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/Users/chris/git/keybase/node-client/src/command/dir.iced",
                  funcname: "Command.run"
                });
                _this.tojson(esc(__iced_deferrals.defer({
                  lineno: 303
                })));
                __iced_deferrals._fulfill();
              })(__iced_k);
              break;
            default:
              return __iced_k();
          }
        });
      })(this)((function(_this) {
        return function() {
          log.debug("- Command::run");
          return cb(null);
        };
      })(this));
    };

    return Command;

  })(Base);

}).call(this);