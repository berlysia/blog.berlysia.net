import { Component } from "react";

type State = {
  hasError: boolean;
};

type Props = any;

export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(_error?: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: any): void {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
