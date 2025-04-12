import { serverDataToState } from './serverDataToState.js';

test('serverDataToState()', () => {
  const state = serverDataToState({
    my_array: [{ key_a: 'value1' }],
    my_data: { key_a: 'value1' },
    my_list: [1, 2, 3],
    my_null: null,
    my_number: 1000,
    my_string: 'a',
    my_var: 'test',
  });
  expect(state.myArray[0].keyA).toBe('value1');
  expect(state.myData.keyA).toBe('value1');
  expect(state.myList[0]).toBe(1);
  expect(state.myNull).toBe(null);
  expect(state.myNumber).toBe(1000);
  expect(state.myString).toBe('a');
  expect(state.myVar).toBe('test');
});
