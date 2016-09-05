'use babel';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { CompositeDisposable } from 'atom';
import AtomScaleFactorView from './atom-scale-factor-view';

export default {

  atomScaleFactorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomScaleFactorView = new AtomScaleFactorView(state.atomScaleFactorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomScaleFactorView.getElement(),
      visible: false,
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-scale-factor:toggle': () => this.toggle(),
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomScaleFactorView.destroy();
  },

  serialize() {
    return {
      atomScaleFactorViewState: this.atomScaleFactorView.serialize(),
    };
  },

  toggle() {
    console.log('AtomScaleFactor was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

};
