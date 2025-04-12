import { serverDataToState } from './serverDataToState.js';

test('serverDataToState()', () => {
  const state = serverDataToState({ balance: 1000, my_var: 'test', my_list: [1, 2, 3] });
  expect(state.balance).toBe(1000);
  expect(state.myVar).toBe('test');
  expect(state.myList[0]).toBe(1);
});
