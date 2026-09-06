import { serverDataToState } from './state.js';

interface RecursiveState {
  myArray: { keyA: string }[];
  myData: { keyA: string };
  myList: number[];
  myNull: null;
  myNumber: number;
  myString: string;
  myVar: string;
}

interface ShallowState {
  myArray: { key_a: string }[];
  myData: { key_a: string };
  myList: number[];
  myNull: null;
  myNumber: number;
  myString: string;
  myVar: string;
}

describe('state', () => {
  test('serverDataToState() recursive', () => {
    const state = serverDataToState(
      {
        my_array: [{ key_a: 'value1' }],
        my_data: { key_a: 'value1' },
        my_list: [1, 2, 3],
        my_null: null,
        my_number: 1000,
        my_string: 'a',
        my_var: 'test',
      },
      true
    ) as RecursiveState;
    expect(state.myArray[0]?.keyA).toBe('value1');
    expect(state.myData.keyA).toBe('value1');
    expect(state.myList[0]).toBe(1);
    expect(state.myNull).toBe(null);
    expect(state.myNumber).toBe(1000);
    expect(state.myString).toBe('a');
    expect(state.myVar).toBe('test');
  });

  test('serverDataToState() non-recursive', () => {
    const state = serverDataToState(
      {
        my_array: [{ key_a: 'value1' }],
        my_data: { key_a: 'value1' },
        my_list: [1, 2, 3],
        my_null: null,
        my_number: 1000,
        my_string: 'a',
        my_var: 'test',
      },
      false
    ) as ShallowState;
    expect(state.myArray[0]?.key_a).toBe('value1');
    expect(state.myData.key_a).toBe('value1');
    expect(state.myList[0]).toBe(1);
    expect(state.myNull).toBe(null);
    expect(state.myNumber).toBe(1000);
    expect(state.myString).toBe('a');
    expect(state.myVar).toBe('test');
  });
});
