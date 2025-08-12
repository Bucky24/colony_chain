export default class Data {
  constructor() {
    this.__data = {};
    this.__events = {};
  }

  set(key, value) {
    this.__data[key] = value;
    this.emit('change', { key, value });
  }

  get(key) {
    return this.__data[key];
  }

  getAll() {
    return Object.values(this.__data);
  }

  clear() {
    this.__data = {};
  }

  on(event, cb, fireImmediately = false) {
    if (!this.__events[event]) this.__events[event] = [];

    this.__events[event].push(cb);

    if (fireImmediately) {
      cb({});
    }
  }

  emit(event, data) {
    if (!this.__events[event]) return;

    this.__events[event].forEach(cb => cb(data));
  }
}