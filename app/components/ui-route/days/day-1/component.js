import Component from '@ember/component';
import { schedule, cancel } from '@ember/runloop';
import sketch from './sketch';

export default Component.extend({
  classNameBindings: [ ':ui-route-days-day-1' ],

  didInsertElement() {
    this._super(...arguments);
    this._cancel = schedule('afterRender', () => {
      this._stop = sketch(this);
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    cancel(this._cancel);
    this._stop && this._stop();
  }

});
