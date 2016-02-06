import Ember from 'ember';

const { run } = Ember;

export function bind(target, key, desc) {
  const { value } = desc;

  return {
    ...desc,

    initializer() {
      const { init } = this;

      this.init = function(...initArgs) {
        this._super(...initArgs);

        if (init) {
          init.apply(this, initArgs);
        }

        this[key] = run.bind(this, value);
      };

      return value;
    }
  };
}

export function debounce(wait = 0, immediate = false) {
  return (target, key, desc) => {
    const { value } = desc;

    return {
      ...desc,

      initializer() {
        const { init, isComponent } = this;

        this.init = function(...initArgs) {
          const pidKey = `_${key}PID`;

          this._super(...initArgs);

          if (init) {
            init.apply(this, initArgs);
          }

          if (isComponent) {
            this.one('willDestroyElement', () => {
              run.cancel(this[pidKey]);
            });
          } else {
            this.destroy = (...args) => {
              this._super(...args);

              run.cancel(this[pidKey]);
            };
          }

          this[key] = (...args) => {
            const fnCall = run.debounce(this, value, ...args, wait, immediate);

            this[pidKey] = fnCall;

            return fnCall;
          };
        };

        return value;
      }
    };
  };
}

export function later(wait = 0) {
  return (target, key, desc) => {
    const { value } = desc;

    return {
      ...desc,

      initializer() {
        const { init, isComponent } = this;

        this.init = function(...initArgs) {
          const pidKey = `_${key}PID`;

          this._super(...initArgs);

          if (init) {
            init.apply(this, initArgs);
          }

          if (isComponent) {
            this.one('willDestroyElement', () => {
              run.cancel(this[pidKey]);
            });
          } else {
            this.destroy = (...args) => {
              this._super(...args);

              run.cancel(this[pidKey]);
            };
          }

          this[key] = (...args) => {
            const fnCall = run.later(this, value, ...args, wait);

            this[pidKey] = fnCall;

            return fnCall;
          };
        };

        return value;
      }
    };
  };
}

export function throttle(wait = 0, immediate = false) {
  return (target, key, desc) => {
    const { value } = desc;

    return {
      ...desc,

      initializer() {
        const { init, isComponent } = this;

        this.init = function(...initArgs) {
          const pidKey = `_${key}PID`;

          this._super(...initArgs);

          if (init) {
            init.apply(this, initArgs);
          }

          if (isComponent) {
            this.one('willDestroyElement', () => {
              run.cancel(this[pidKey]);
            });
          } else {
            this.destroy = (...args) => {
              this._super(...args);

              run.cancel(this[pidKey]);
            };
          }

          this[key] = (...args) => {
            const fnCall = run.throttle(this, value, ...args, wait, immediate);

            this[pidKey] = fnCall;

            return fnCall;
          };
        };

        return value;
      }
    };
  };
}

export default {
  bind,
  later,
  debounce,
  throttle
};
