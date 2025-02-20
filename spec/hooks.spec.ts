import SampleComponent from '@spec/SampleComponent.vue';
import NoMethodComponent from '@spec/NoMethodComponent.vue';
import PlaneObjectComponent from '@spec/PlaneObjectComponent.vue';
import { hooks } from '@src/index';

describe('Methods', () => {
  describe('extraction', () => {
    it('extracts hooks', () => {
      const { created } = hooks(SampleComponent);
      expect(typeof created).toBe('function');
      expect(typeof created()).toBe('object');
    });
  });

  describe('mock', () => {
    const { created, updated } = hooks(SampleComponent);

    describe('mock methods', () => {
      it('calls other method', () => {
        expect(created().run().otherMethod).toBeCalled();
      });
    });

    describe('return', () => {
      it('returns value', () => {
        const { created } = hooks(SampleComponent);
        expect(created().run().return).toBe(undefined);
      });
    });

    describe('context', () => {
      it('chaneges context value', () => {
        const result = updated().run({ updatedCount: 0 });
        expect(result.updatedCount).toBe(1);
      });
    });
  });

  // TODO: resolve typescript issue
  // describe('additional hooks', () => {
  //   describe('register additional hooks', () => {
  //     it('returns mock function', () => {
  //       const { beforeRouteEnter } = hooks(SampleComponent, [
  //         'beforeRouteEnter'
  //       ]);
  //       const next = jest.fn();
  //       expect(typeof beforeRouteEnter).toBe('function');
  //       beforeRouteEnter('', '', next).run();
  //       expect(next).toBeCalled();
  //     });
  //   });

  //   describe('no additional hooks', () => {
  //     it('returns undefined', () => {
  //       const { beforeRouteEnter } = hooks(SampleComponent);
  //       expect(typeof beforeRouteEnter).toBe('undefined');
  //     });
  //   });
  // });

  describe('no method', () => {
    it('throws no hook error', () => {
      expect(() => {
        hooks(NoMethodComponent);
      }).toThrow('Not exists hook.');
    });
  });

  describe('plane object', () => {
    it('returns mock function', () => {
      const { created } = hooks(PlaneObjectComponent);
      expect(typeof created).toBe('function');
      expect(created().run().return).toBe(undefined);
    });
  });
});
