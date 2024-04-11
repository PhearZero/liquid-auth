import { useState, useMemo } from 'react';

import {
  ColorModeContext,
  DataChannelContext,
  PeerConnectionContext,
  SnackbarContext,
  StateContext,
} from './Contexts';
import Layout from './Layout';

import { GetStartedCard } from './pages/home/GetStarted';
import { RegisteredCard } from './pages/dashboard/Registered';
import { createTheme, CssBaseline } from '@mui/material';
import { DEFAULT_THEME } from './theme.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { createHashRouter, RouterProvider } from 'react-router-dom';
import { WaitForPeersCard } from './pages/peering/WaitForPeers.tsx';
import ConnectedPage from './pages/connected.tsx';
const queryClient = new QueryClient();

const DEFAULT_CONFIG: RTCConfiguration = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

const router = createHashRouter([
  {
    path: '/',
    element: (
      <Layout>
        <GetStartedCard />
      </Layout>
    ),
  },
  {
    path: '/peering',
    element: (
      <Layout>
        <WaitForPeersCard />
      </Layout>
    ),
  },
  {
    path: '/connected',
    element: (
      <Layout>
        <ConnectedPage />
      </Layout>
    ),
  },
  {
    path: '/registered',
    element: (
      <Layout>
        <RegisteredCard />
      </Layout>
    ),
  },
]);
export default function ProviderApp() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [state, setState] = useState('peering');
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);

  const peerConnection = useMemo(
    () => new RTCPeerConnection(DEFAULT_CONFIG),
    [],
  );
  const [mode, setMode] = useState<'light' | 'dark'>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
      ? 'dark'
      : 'light',
  );
  const colorMode = useMemo(
    () => ({
      toggle: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        ...DEFAULT_THEME,
        palette: {
          ...DEFAULT_THEME.palette,
          mode,
        },
      }),
    [mode],
  );
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarContext.Provider value={{ open, setOpen, message, setMessage }}>
        <StateContext.Provider value={{ state, setState }}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <PeerConnectionContext.Provider value={{ peerConnection }}>
                <DataChannelContext.Provider
                  value={{ dataChannel, setDataChannel }}
                >
                  <RouterProvider router={router} />
                </DataChannelContext.Provider>
              </PeerConnectionContext.Provider>
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </ColorModeContext.Provider>
        </StateContext.Provider>
      </SnackbarContext.Provider>
    </QueryClientProvider>
  );
}
