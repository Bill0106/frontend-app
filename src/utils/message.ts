interface Data {
  type: string;
  message: string;
}

class Message {
  el: HTMLElement | null;
  event: Event;
  data: Data;

  constructor() {
    this.el = null;
    this.event = new Event('message');
    this.data = {
      type: '',
      message: '',
    };
  }

  addListener(element: HTMLElement, fn: (e: Event) => void) {
    this.el = element;

    this.el.addEventListener('message', fn);
  }

  removeListener(fn: (e: Event) => void) {
    if (this.el) {
      this.el.removeEventListener('message', fn);
    }
  }

  error(message: string) {
    if (!this.el) {
      return false;
    }

    this.data = { type: 'error', message };
    this.el.dispatchEvent(this.event);
  }
}

export default new Message();
