import React, { ReactChildren, Component, ReactElement } from 'react';

// tslint:disable-next-line: no-empty
const noop = () => {};

export declare type FSBLLoaderProps = {
  children: ReactChildren | ReactElement;
  fallback: React.ReactElement;
  finsembleHeaderSelector: string;
  forceResize: boolean;
  isFinsembleAvailable: () => boolean;
  onReady: () => void;
  waitForChromeHeader: boolean;
};

export declare type FSBLLoaderState = {
  finsembleIsReady: boolean;
  finsembleIsAvailable: boolean;
};

export class FSBLLoader extends Component<FSBLLoaderProps, FSBLLoaderState> {
  static defaultProps = {
    fallback: <div className="fsbl-loader" />,
    finsembleHeaderSelector: '#FSBLHeader',
    forceResize: true,
    isFinsembleAvailable: () => 'FSBL' in window,
    onReady: () => noop,
    waitForChromeHeader: true,
  };

  constructor(props: FSBLLoaderProps) {
    super(props);
    this.state = {
      finsembleIsAvailable: this.props.isFinsembleAvailable(),
      finsembleIsReady: false,
    };
  }

  componentDidMount() {
    if (!this.props.isFinsembleAvailable()) {
      return;
    }
    FSBL.addEventListener('onReady', this.fsblOnReadyCallback);
  }

  fsblOnReadyCallback = () => {
    const { waitForChromeHeader, finsembleHeaderSelector } = this.props;
    if (
      !waitForChromeHeader ||
      document.querySelector(finsembleHeaderSelector)
    ) {
      // just get to it, either we aren't going to wait for the
      // header or it already exists
      this.finishLoading();
    } else {
      // continue to wait for the header to appear
      const resizeObserver = new ResizeObserver(() => {
        this.finishLoading();
        resizeObserver.unobserve(document.body);
      });
      resizeObserver.observe(document.body);
    }
  };

  finishLoading = () => {
    this.setState({ finsembleIsReady: true }, () => {
      // trigger a resize event, useful for example where an application
      // uses Golden Layout, which needs this to "know" that a resize happened
      if (this.props.forceResize) {
        window.requestAnimationFrame(() => {
          window.dispatchEvent(new Event('resize'));
        });
      }
      this.props.onReady();
    });
  };

  render() {
    const { children, fallback } = this.props;
    const { finsembleIsReady, finsembleIsAvailable } = this.state;
    // just for ease of comprehension
    const finsembleIsNotAvailable = !finsembleIsAvailable;
    // If there is no FSBL in the window, or if it is ready, render the children
    if (finsembleIsNotAvailable || finsembleIsReady) {
      return <>{children}</>;
    }
    return fallback;
  }
}
