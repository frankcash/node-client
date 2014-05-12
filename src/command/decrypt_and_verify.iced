{Base} = require './base'
log = require '../log'
{E} = require '../err'
{chain,make_esc} = require 'iced-error'
{env} = require '../env'
{dict_union} = require '../util'
colors = require '../colors'
{DecryptAndVerifyEngine} = require '../dve'
{TrackSubSubCommand} = require '../tracksubsub'

##=======================================================================

class MyEngine extends DecryptAndVerifyEngine

  constructor : ({argv, @cmd} ) ->
    super { argv }

  do_output : (out, cb) -> @cmd.do_output out, cb
  is_batch : (out, cb) -> @cmd.is_batch()
  do_keypull : (cb) -> @cmd.do_keypull cb
  patch_gpg_args : (args) -> @cmd.patch_gpg_args args
  get_files : (args) -> @cmd.get_files args

##=======================================================================

exports.Command = class Command extends Base

  #----------

  @OPTS : dict_union TrackSubSubCommand.OPTS, {
    s : 
      alias : 'signed'
      action : 'storeTrue'
      help : "assert signed"
    S :
      alias : 'signed-by'
      help : "assert signed by the given user"
    t :
      alias : "track"
      action : "storeTrue"
      help : "prompt for tracking if necessary"
    '6' :
      alias : "base64"
      action : "storeTrue"
      help : "output result as base64-encoded data"
    m:
      alias : "message"
      help : "provide the message on the command line"
  }

  #----------

  run : (cb) ->
    esc = make_esc cb, "Command::run"
    eng = new MyEngine { @argv, cmd : @ }
    await eng.init esc defer()
    await eng.run esc defer()
    cb null

##=======================================================================

