export class Events {
  constructor(
    private keys: string[],
    private onChange: (key: string, pressed: boolean) => void,
    private lastKey?: (lastKey: string) => void,
  ) {
    window.addEventListener('keydown', this.onKeydownHandler, false);
    window.addEventListener('keyup', this.onKeyupHandler, false);
  }

  private onKeydownHandler = (event: KeyboardEvent) => {
    const eventKey = event.key;
    if (this.keys.includes(eventKey)) {
      this.onChange(eventKey, true);
      this.lastKey?.(eventKey);
    }
  };

  private onKeyupHandler = (event: KeyboardEvent) => {
    if (this.keys.includes(event.key)) {
      this.onChange(event.key, false);
    }
  };
}
