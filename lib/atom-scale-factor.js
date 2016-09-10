'use babel';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { CompositeDisposable } from 'atom';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import WebFrame from 'web-frame';
import AtomScaleFactorView from './atom-scale-factor-view';

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
      if (isNaN(scale) || scale <= 0) {
        this.error('Scale value is not valid');
        return;
      } else {
        this.setZoomFactor(scale);
      }
    });
  },

  reset() {
    this.setZoomFactor(1);
  },

  setZoomFactor(factor) {
    WebFrame.setZoomFactor(factor);
    this.success(`Scale changed to **${factor}**`);
  },

  error(message) {
    atom.notifications.addError(`**Atom Scale Factor**<br>${message}`)
  },

  success(message) {
    atom.notifications.addSuccess(`**Atom Scale Factor**<br>${message}`)
  },

};
