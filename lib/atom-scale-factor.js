'use babel';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { CompositeDisposable } from 'atom';
import AtomScaleFactorView from './atom-scale-factor-view';
import WebFrame from 'web-frame';

export default {

  atomScaleFactorView: null,
  subscriptions: null,

  activate() {
    this.atomScaleFactorView = new AtomScaleFactorView();
    this.subscriptions = new CompositeDisposable();

    // Register commands
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-scale-factor:set-scale-factor': () => this.setScale(),
      'atom-scale-factor:reset': () => this.reset(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.atomScaleFactorView.destroy();
  },

  setScale() {
    this.atomScaleFactorView.show('', val => {
      const scale = parseFloat(val);
      console.log('New scale factor value', scale);
      WebFrame.setZoomFactor(scale);
    });
  },

  reset() {
    WebFrame.setZoomFactor(1);
  },

};
