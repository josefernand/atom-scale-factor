'use babel';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { CompositeDisposable } from 'atom';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import WebFrame from 'web-frame';
import CSON from 'season';
import AtomScaleFactorView from './atom-scale-factor-view';

export default {

  atomScaleFactorView: null,
  subscriptions: null,
  settings: {},
  config: {
    setLatest: {
      title: 'Set the latest scale on start',
      type: 'boolean',
      default: false,
    },
  },

  activate() {
    this.atomScaleFactorView = new AtomScaleFactorView();
    this.subscriptions = new CompositeDisposable();

    // Register commands
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-scale-factor:set-scale-factor': () => this.setScale(),
      'atom-scale-factor:reset': () => this.reset(),
    }));

    const setLatest = atom.config.get('atom-scale-factor.setLatest');
    if (CSON.resolve(this.getPath())) {
      try {
        this.settings = CSON.readFileSync(this.getPath());
      } catch (e) { // eslint-disable-line no-empty
      }
    }

    if (setLatest && this.settings.latest && this.settings.latest !== 1) {
      this.setZoomFactor(this.settings.latest);
    }
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
      }
      this.setZoomFactor(scale);
    });
  },

  reset() {
    this.setZoomFactor(1);
  },

  setZoomFactor(factor) {
    WebFrame.setZoomFactor(factor);
    this.success(`Scale changed to **${factor}**`);

    try {
      this.settings.latest = factor;
      CSON.writeFileSync(this.getPath(), this.settings);
    } catch (e) {
      this.error('Opps! Something went wrong saving the current scale');
    }
  },

  error(message) {
    atom.notifications.addError(`**Atom Scale Factor**<br>${message}`);
  },

  success(message) {
    atom.notifications.addSuccess(`**Atom Scale Factor**<br>${message}`);
  },

  info(message) {
    atom.notifications.addInfo(`**Atom Scale Factor**<br>${message}`);
  },

  getPath() {
    const filedir = atom.getConfigDirPath();
    const filename = 'atom-scale-factor.json';
    return `${filedir}/${filename}`;
  },

};
