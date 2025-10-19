import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('App error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="section py-10">
          <div className="glass p-6">
            <h2 className="h2">Something went wrong</h2>
            <p className="muted mt-2">Please reload the page or check the console for details.</p>
            <pre className="mt-4 text-xs whitespace-pre-wrap text-neutral/80">{String(this.state.error)}</pre>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
