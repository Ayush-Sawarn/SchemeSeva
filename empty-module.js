// Provide minimal implementations for Node.js modules
class EventEmitter {
  constructor() {
    this._events = {};
  }
  on(event, listener) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(listener);
    return this;
  }
  emit(event, ...args) {
    if (this._events[event]) {
      this._events[event].forEach(listener => listener(...args));
    }
    return this;
  }
  removeListener(event, listener) {
    if (this._events[event]) {
      this._events[event] = this._events[event].filter(l => l !== listener);
    }
    return this;
  }
  removeAllListeners(event) {
    if (event) {
      delete this._events[event];
    } else {
      this._events = {};
    }
    return this;
  }
}

class Agent extends EventEmitter {
  constructor() {
    super();
    this.requests = {};
  }
}

class ZlibStream extends EventEmitter {
  constructor() {
    super();
    this._buffer = Buffer.alloc(0);
  }
  write(chunk) {
    this._buffer = Buffer.concat([this._buffer, chunk]);
    return true;
  }
  end() {
    this.emit('end');
    return this;
  }
  flush() {
    this.emit('data', this._buffer);
    return this;
  }
}

module.exports = {
  createServer: () => ({}),
  connect: () => ({}),
  createConnection: () => ({}),
  createWriteStream: () => ({}),
  createReadStream: () => ({}),
  Readable: class Readable extends EventEmitter {},
  Writable: class Writable extends EventEmitter {},
  Duplex: class Duplex extends EventEmitter {},
  Transform: class Transform extends EventEmitter {},
  PassThrough: class PassThrough extends EventEmitter {},
  pipeline: () => {},
  finished: () => {},
  Socket: class Socket extends EventEmitter {},
  Server: class Server extends EventEmitter {},
  createServer: () => ({}),
  connect: () => ({}),
  createConnection: () => ({}),
  EventEmitter,
  events: {
    EventEmitter,
    once: (emitter, event) => new Promise(resolve => {
      const listener = (...args) => {
        emitter.removeListener(event, listener);
        resolve(args);
      };
      emitter.on(event, listener);
    })
  },
  https: {
    Agent,
    globalAgent: new Agent(),
    request: () => ({
      on: () => {},
      write: () => {},
      end: () => {},
      abort: () => {}
    }),
    get: () => ({
      on: () => {},
      write: () => {},
      end: () => {},
      abort: () => {}
    })
  },
  zlib: {
    createDeflate: () => new ZlibStream(),
    createInflate: () => new ZlibStream(),
    createDeflateRaw: () => new ZlibStream(),
    createInflateRaw: () => new ZlibStream(),
    createGzip: () => new ZlibStream(),
    createGunzip: () => new ZlibStream(),
    deflate: (data, callback) => callback(null, data),
    inflate: (data, callback) => callback(null, data),
    deflateRaw: (data, callback) => callback(null, data),
    inflateRaw: (data, callback) => callback(null, data),
    gzip: (data, callback) => callback(null, data),
    gunzip: (data, callback) => callback(null, data)
  }
}; 