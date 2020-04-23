const mockReady = {
  fsblReadyAdapter: jest.fn(() => {
    return {
      onFsblReady: jest.fn((cb) => {
        setTimeout(cb, 30);
      }),
    };
  }),
};

jest.mock('../ready', () => mockReady);

import React from 'react';
import { mount } from 'enzyme';

import { FSBLLoader } from './react';

describe('React Adapter', () => {
  it('should show the fallback by default', () => {
    const wrapper = mount(
      <FSBLLoader fallback={<>LOADING</>}>MY APP</FSBLLoader>
    );
    expect(wrapper.html()).toEqual('LOADING');
  });
  it('should show the children when done', (done) => {
    const wrapper = mount(<FSBLLoader>MY APP</FSBLLoader>);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.html()).toEqual('MY APP');
      done();
    }, 100);
  });
  it('should pass on props to fsblReadyAdapter', () => {
    const wrapper = mount(
      <FSBLLoader forceResize={false} waitForFinsembleToolbar={false}>
        MY APP
      </FSBLLoader>
    );
    expect(mockReady.fsblReadyAdapter).toHaveBeenCalledWith({
      forceResize: false,
      waitForFinsembleToolbar: false,
    });
  });
});
