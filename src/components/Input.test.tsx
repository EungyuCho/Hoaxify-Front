import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Layout Test', () => {
  const testLabel = 'Test label';
  const testType = 'password';
  const testPlaceholder = 'Test Placeholder';
  const testValue = 'Test Value';
  const testOnChange = jest.fn();
  const testChangedValue = 'Test Changed Value';
  const testClassNameWithError = 'form-control is-invalid';
  const testClassNameWithNoError = 'form-control is-valid';
  const testClassNameWithDefault = 'form-control';
  const testError = 'Cannot be null';

  test('optional props 가 주어진 Case', () => {
    const { container, queryByText } = render(
      <Input
        label={testLabel}
        type={testType}
        placeholder={testPlaceholder}
        value={testValue}
        onChange={testOnChange}
      />
    );
    const input = container.querySelector('input');

    // render Test
    expect(input).toBeInTheDocument();

    // props 를 받아 label render
    const label = queryByText(testLabel);
    expect(label).toBeInTheDocument();

    // props.type 에 따라 input type 지정
    expect(input!.type).toBe(testType);

    // props.placeholder 에 따라 input placeholder 지정
    expect(input!.placeholder).toBe(testPlaceholder);

    // props.value 에 따라 input value 지정
    expect(input!.value).toBe(testValue);

    // change event 발생
    const event = {
      target: {
        value: testChangedValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    fireEvent.change(input!, event);

    // change event 발생됨에 따라 props.onChange fn 1회 호출
    expect(testOnChange).toHaveBeenCalledTimes(1);

    // props.hasError 가 주어지지 않았으므로 default className
    expect(input!.className).toBe(testClassNameWithDefault);
  });

  test('optional props 가 주어지지 않은 Case', () => {
    const { container } = render(<Input value="" onChange={testOnChange} />);
    const input = container.querySelector('input');

    // props 에 label 이 없으므로 label render 되지 않음
    const label = container.querySelector('label');
    expect(label).not.toBeInTheDocument();

    // props 에 type 이 없으므로 default 인 text
    expect(input!.type).toBe('text');

    // props 에 placeholder 가 없으므로 placeholder 가 비어있어야함
    expect(input!.placeholder).toBe('');
  });

  describe('props.hasError & props.error Test', () => {
    test('hasError = true 인  Case', () => {
      const { container, queryByText } = render(
        <Input
          hasError={true}
          error={testError}
          value=""
          onChange={testOnChange}
        />
      );
      const input = container.querySelector('input');

      // className Test
      expect(input!.className).toBe(testClassNameWithError);

      // error message render 되어야 함
      const message = queryByText('Cannot be null');
      expect(message).toBeInTheDocument();
    });

    test('hasError = false 인  Case', () => {
      const { container, queryByText } = render(
        <Input
          hasError={false}
          error={testError}
          value=""
          onChange={testOnChange}
        />
      );
      const input = container.querySelector('input');

      // className Test
      expect(input!.className).toBe(testClassNameWithNoError);

      // error message render 되면 안됨
      const message = queryByText('Cannot be null');
      expect(message).not.toBeInTheDocument();
    });
  });
});
