import { browser } from '$app/environment';

export class LocalStore<T> {
  value = $state<T>() as T;
  key = '';

  constructor(key: string, value: T) {
    this.key = key;
    this.value = value;

    if (browser) {
      const item = localStorage.getItem(key);
      if (item) this.value = this.deserialize(item);
    }

    $effect(() => {
      localStorage.setItem(this.key, this.serialize(this.value));
    });
  }

  check(key: string): boolean {
    if (browser) {
      const item = localStorage.getItem(key);
      return item !== null && JSON.parse(item).length > 0;
    }
    return false;
  }

  serialize(value: T): string {
    return JSON.stringify(value);
  }

  deserialize(item: string): T {
    return JSON.parse(item);
  }

  clear() {
    if (browser) {
      localStorage.clear();
    }
  }
}

export function localStore<T>(key: string, value: T) {
  return new LocalStore(key, value);
}
