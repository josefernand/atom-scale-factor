'use babel';

import { TextEditorView } from 'atom-space-pen-views';

export default class AtomScaleFactorView {

  constructor() {
    // Create root element
    this.element = document.createElement('div');

    // Create message element
    const label = document.createElement('div');
    label.textContent = 'Enter the new scale factor value';
    label.classList.add('text-editor-label');
    this.element.appendChild(label);

    this.editor = new TextEditorView({ mini: true });
    this.editor.blur(() => this.hide());
    this.editor.appendTo(this.element);

    atom.commands.add(this.element, {
      'core:confirm': (event) => {
        event.stopPropagation();
        this.confirm();
      },

      'core:cancel': (event) => {
        event.stopPropagation();
        this.hide();
      },
    });
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  show(text = '', delegate = null) {
    if (!this.panel) {
      this.panel = atom.workspace.addModalPanel({ item: this.getElement() });
    }

    this.delegate = delegate;
    this.editor.setText(text);
    this.panel.show();
    this.editor.focus();
  }

  hide() {
    this.delegate = null;
    this.editor.setText('');
    this.panel.hide();
  }

  confirm() {
    if (this.delegate) {
      this.delegate(this.editor.getText());
    }
    this.hide();
  }

}
