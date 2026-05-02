import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useAsyncError,
  useRouteError,
} from 'react-router';

import {
  Component,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import './global.css';
import { Toaster } from 'sonner';
import type { Route } from './+types/root';

export const links = () => [];

function InternalErrorBoundary({ error: errorArg }: Route.ErrorBoundaryProps) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred.';

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAF8] text-[#1C2030]">
      <div className="max-w-md w-full border border-[#D8CDB8] rounded-lg p-6 bg-white">
        <h1 className="text-lg font-semibold mb-2">Something went wrong</h1>
        <pre className="whitespace-pre-wrap text-sm text-[#5C5345]">{message}</pre>
      </div>
    </div>
  );
}

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean; error: unknown | null };

class ErrorBoundaryWrapper extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <InternalErrorBoundary error={this.state.error} params={{}} />;
    }
    return this.props.children;
  }
}

function LoaderWrapper({ loader }: { loader: () => React.ReactNode }) {
  return <>{loader()}</>;
}

type ClientOnlyProps = { loader: () => React.ReactNode };

export const ClientOnly: React.FC<ClientOnlyProps> = ({ loader }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ErrorBoundaryWrapper>
      {isMounted ? <LoaderWrapper loader={loader} /> : null}
    </ErrorBoundaryWrapper>
  );
};

export function Layout({ children }: { children: ReactNode }) {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ClientOnly loader={() => children} />
        <Toaster position={isMobile ? 'top-center' : 'bottom-right'} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const ErrorBoundary = InternalErrorBoundary;

export default function App() {
  return <Outlet />;
}
