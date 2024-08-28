import { useContext, useEffect } from 'react';
import { SignalClientContext } from '@/hooks/useSignalClient.ts';

/**
 * Hook to use data channel messages
 * @param onMessage
 */
export function useDataChannel(onMessage?: (event: MessageEvent) => void) {
  const { dataChannel } = useContext(SignalClientContext);
  function onError(...args: any[]) {
    console.error('Data channel error', args);
  }
  useEffect(() => {
    if (!dataChannel || !onMessage) return;
    dataChannel.addEventListener('message', onMessage);
    dataChannel.addEventListener('error', onError)
    return () => {
      dataChannel.removeEventListener('message', onMessage);
      dataChannel.removeEventListener('error', onError);
    }
  }, [dataChannel, onMessage]);

  return dataChannel;
}
