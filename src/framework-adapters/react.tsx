import React, { Component, ReactElement } from 'react';

import { fsblReadyAdapter, FsblReadyAdapter } from '../ready';

export declare type FSBLLoaderProps = {
  fallback: ReactElement;
  forceResize: boolean;
  onReady: () => void;
  waitForFinsembleToolbar: boolean;
};
export declare type FSBLLoaderState = {
  finsembleIsReady: boolean;
};

// tslint:disable-next-line: no-empty
const noop = () => {};

export class FSBLLoader extends Component<FSBLLoaderProps, FSBLLoaderState> {
  static defaultProps = {
    fallback: <div className="fsbl-loader" />,
    forceResize: true,
    onReady: noop,
    waitForFinsembleToolbar: true,
  };

  readyAdapter: FsblReadyAdapter;

  constructor(props: FSBLLoaderProps) {
    super(props);
    const { forceResize, waitForFinsembleToolbar } = props;
    this.readyAdapter = fsblReadyAdapter({
      forceResize,
      waitForFinsembleToolbar,
    });
    this.state = {
      finsembleIsReady: false,
    };
  }

  onReady = () => {
    this.setState({ finsembleIsReady: true }, () => {
      this.props.onReady();
    });
  };

  componentDidMount() {
    this.readyAdapter.onFsblReady(this.onReady);
  }

  render() {
    const { children, fallback } = this.props;
    return this.state.finsembleIsReady ? children : fallback;
  }
}
