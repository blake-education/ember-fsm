import Ember from 'ember';
import Stateful from 'ember-fsm/stateful';

const { Controller } = Ember;

export default Controller.extend(Stateful, {
  fsmStates: {
    initialState: 'initialized',
    knownStates: [
      'first',
      'second',
      'third',
      'failed'
    ],

    first: {
      willEnter() { console.log('will', 'enter', 'first'); },
      didEnter() { console.log('did', 'enter', 'first'); },
      willExit() { console.log('will', 'exit', 'first'); },
      didExit() { console.log('did', 'exit', 'first'); }
    },

    second: {
      willEnter() { console.log('will', 'enter', 'second'); },
      didEnter() { console.log('did', 'enter', 'second'); },
      willExit() { console.log('will', 'exit', 'second'); },
      didExit() { console.log('did', 'exit', 'second'); }
    },

    third: {
      willEnter() { console.log('will', 'enter', 'third'); },
      didEnter() { console.log('did', 'enter', 'third'); },
      willExit() { console.log('will', 'exit', 'third'); },
      didExit() { console.log('did', 'exit', 'third'); }
    },
  },

  fsmEvents: {
    next: {
      before() { console.log('before', 'next'); },
      after() { console.log('after', 'next'); },

      transitions: [
        { initialized: 'first' },
        { first: 'second' },
        { second: 'third' },
        { third: 'first' },
      ]
    },

    prev: {
      before() { console.log('before', 'prev'); },
      after() { console.log('after', 'prev'); },

      transitions: [
        { initialized: 'third' },
        { first: 'third' },
        { third: 'second' },
        { second: 'first' },
      ]
    }
  },

  actions: {
    next() {
      return this.sendStateEvent('next')
        .then(() => console.log('-----'));
    }
  }
});
