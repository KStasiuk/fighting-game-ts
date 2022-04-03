export type EventHandlers = {
  keys: {
    [key: string]: boolean;
  };

  lastKey?: (lastKey: string) => void;
};
export class Events {
  private lastKeyDown = '';
  private eventHandlers: EventHandlers = {
    keys: {},
  };

  constructor() {
    window.addEventListener('keydown', this.onKeydownHandler, false);
    window.addEventListener('keyup', this.onKeyupHandler, false);
  }

  public setListeners(eventHandlers: EventHandlers) {
    this.eventHandlers = {
      lastKey: eventHandlers.lastKey,
      keys: eventHandlers.keys,
    };
  }

  setKeys(key?: string) {
    if (key && key in this.eventHandlers.keys) {
      this.eventHandlers.keys[key] = true;
    } else {
      this.resetKeys();
    }
  }
  resetKeys() {
    Object.keys(this.eventHandlers.keys).forEach((key) => {
      this.eventHandlers.keys[key] = false;
    });
  }

  private onKeydownHandler = (event: KeyboardEvent) => {
    if (event.key in this.eventHandlers.keys) {
      this.lastKeyDown = event.key;
      this.eventHandlers.lastKey?.(event.key);
      this.setKeys(event.key);
    }
  };

  private onKeyupHandler = (event: KeyboardEvent) => {
    if (
      this.lastKeyDown === event.key &&
      event.key in this.eventHandlers.keys
    ) {
      this.setKeys();
    }
  };
}
