export type EventHandlers = {
  up: {
    [key: string]: () => void;
  };
  down: {
    [key: string]: () => void;
  };
};
class Events {
  private eventHandlers: EventHandlers = { up: {}, down: {} };

  constructor() {
    window.addEventListener('keydown', this.onKeydownHandler, false);
    window.addEventListener('keyup', this.onKeyupHandler, false);
  }

  public setListeners(eventHandlers: EventHandlers) {
    this.eventHandlers = {
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

  private onKeydownHandler = (event: KeyboardEvent) => {
    console.log('onKeydownHandler', event.key);
    this.eventHandlers.down[event.key]?.();
  };

  private onKeyupHandler = (event: KeyboardEvent) => {
    console.log('onKeyupHandler', event.key);
    this.eventHandlers.up[event.key]?.();
  };
}

export const events = new Events();
