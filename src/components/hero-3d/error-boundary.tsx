"use client";

import { Component, type ReactNode } from "react";

// Catches errors thrown while the 3D scene renders or compiles shaders, and
// shows the fallback instead. The page's text is outside this boundary, so it
// stays visible either way.
export class SceneErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
