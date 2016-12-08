import Ember from 'ember';
import layout from './template';
import Machine from 'ember-fsm/machine';

const {
  Component,
  computed,
  get,
  set,
} = Ember;

const TrafficSignalFSM = Machine.extend({
  states: {
    initialState: 'off',
    knownStates: [
      'off',
      'red',
      'amber',
      'green',
      'failed'
    ]
  },

  events: {
    powerUp: {
      transitions: [
        { off: 'red' },
        {
          from: ['red', 'green', 'amber'],
          to: '$same'
        }
      ]
    },

    powerDown: {
      transitions: { $all: 'off' }
    },

    cycle: {
      transitions: [
        { red: 'green' },
        { green: 'amber' },
        { amber: 'red' }
      ]
    }
  }
});

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);

    set(this, 'signal', TrafficSignalFSM.create());
  },

  state: computed('signal.currentState', {
    get() {
      return get(this, 'signal.currentState');
    }
  }),

  actions: {
    powerDown() {
      get(this, 'signal').send('powerDown');
    },

    powerUp() {
      get(this, 'signal').send('powerUp');
    },

    cycle() {
      try {
        get(this, 'signal').send('cycle');
      } catch (e) {
        console.error('You can\'t cycle from "off" state. Please power on first.');
      }
    }
  }
})
