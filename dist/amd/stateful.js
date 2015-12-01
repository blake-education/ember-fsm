define(
  ["ember","./machine","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Mixin = __dependency1__.Mixin;
    var computed = __dependency1__.computed;
    var Machine = __dependency2__["default"] || __dependency2__;

    __exports__["default"] = Mixin.create({
      fsmEvents:       null,
      fsmStates:       null,
      fsmInitialState: null,
      fsmIsLoading:    computed.oneWay('__fsm__.isTransitioning'),
      fsmCurrentState: computed.oneWay('__fsm__.currentState'),

      init: function() {
        var params = {};
        var mixin  = {};
        var fsm;

        params.target = this;
        params.events = this.get('fsmEvents');
        params.states = this.get('fsmStates');
        params.initialState = this.get('fsmInitialState');

        fsm = Machine.create(params);

        this.set('__fsm__', fsm);

        fsm.isInStateAccessorProperties.forEach(function(prop) {
          mixin[prop] = computed.oneWay('__fsm__.' + prop);
        });

        this._super.apply(this, arguments)
        this.reopen(mixin);
      },

      sendStateEvent: function() {
        var fsm = this.get('__fsm__');
        return fsm.send.apply(fsm, arguments);
      }
    });
  });