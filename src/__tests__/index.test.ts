import { authorize } from '../index';

test('Authorize', () => {
  expect(authorize()).toBe('test');
});
