'use babel';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { CompositeDisposable } from 'atom';
import AtomScaleFactorView from './atom-scale-factor-view';

export default {

  atomScaleFactorView: null,
  subscriptions: null,

  activate() {
    this.atomScaleFactorView = new AtomScaleFactorView();

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-scale-factor:toggle': () => this.toggle(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.atomScaleFactorView.destroy();
  },

  toggle() {
    console.log('AtomScaleFactorView was opened');
    this.atomScaleFactorView.show('', val => {
      console.log('AtomScaleFactorView selected val', val);
    });
  },

};
