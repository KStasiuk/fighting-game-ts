export type EventHandlers = {
  keys: {
    [key: string]: boolean;
  };
  up?: {
    [key: string]: () => void;
  };
  down?: {
    [key: string]: () => void;
  };
};
class Events {
  private eventHandlers: EventHandlers = { up: {}, down: {}, keys: {} };

  constructor() {
    window.addEventListener('keydown', this.onKeydownHandler, false);
    window.addEventListener('keyup', this.onKeyupHandler, false);
  }

  public setListeners(eventHandlers: EventHandlers) {
    this.eventHandlers = {
      keys: eventHandlers.keys,
      up: {
        ...this.eventHandlers.up,
        ...eventHandlers.up,
      },
      down: {
        ...this.eventHandlers.down,
        ...eventHandlers.down,
      },
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
    this.setKeys(event.key);
    this.eventHandlers.down?.[event.key]?.();
  };

  private onKeyupHandler = (event: KeyboardEvent) => {
    this.setKeys();
    this.eventHandlers.up?.[event.key]?.();
  };
}

export const events = new Events();
