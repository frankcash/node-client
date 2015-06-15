// Generated by IcedCoffeeScript 1.7.1-c
(function() {
  var SocksHttpAgent, SocksHttpsAgent, agent, enabled, env, hidden_address, leaky, log, proxy, strict;

  SocksHttpAgent = require('socks5-http-client/lib/Agent');

  SocksHttpsAgent = require('socks5-https-client/lib/Agent');

  env = require('./env').env;

  log = require('./log');

  hidden_address = function(null_ok) {
    return env().get_tor_hidden_address(null_ok);
  };

  proxy = function(null_ok) {
    return env().get_tor_proxy(null_ok);
  };

  enabled = function() {
    return (env().get_tor() != null) || (proxy(true) != null) || (hidden_address(true) != null) || strict() || leaky();
  };

  leaky = function() {
    return env().get_tor_leaky();
  };

  strict = function() {
    return env().get_tor_strict() && !leaky();
  };

  agent = function(opts) {
    var chk, klass, px, tls, uri;
    if (enabled()) {
      px = proxy(false);
      uri = opts.uri || opts.url;
      chk = function(s) {
        return s.indexOf('https') === 0;
      };
      tls = typeof uri === 'string' && chk(uri) ? true : typeof uri === 'object' && chk(uri.protocol) ? true : false;
      log.debug("| Setting tor proxy to " + (JSON.stringify(px)) + "; tls=" + tls);
      klass = tls ? SocksHttpsAgent : SocksHttpAgent;
      return opts.agent = new klass({
        socksPort: px.port,
        socksHost: px.hostname
      });
    }
  };

  module.exports = {
    hidden_address: hidden_address,
    proxy: proxy,
    enabled: enabled,
    agent: agent,
    strict: strict,
    leaky: leaky
  };

}).call(this);