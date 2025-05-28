import { useEffect, useState } from 'react';

// Local development configuration
const tokenEndpoint = 'http://10.0.2.2:3000/getToken';
const hardcodedUrl = 'wss://zero1buddy-y4k4tjlm.livekit.cloud';

type ConnectionDetails = {
  url: string;
  token: string;
};

/**
 * Retrieves a LiveKit token from the local token server.
 */
export function useConnectionDetails(): ConnectionDetails | undefined {
  const [details, setDetails] = useState<ConnectionDetails | undefined>(undefined);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(tokenEndpoint);
        const token = await response.text();

        if (token) {
        setDetails({
            url: hardcodedUrl,
            token: token,
        });
        }
      } catch (error) {
        console.error('Failed to fetch token:', error);
      }
    };

    fetchToken();
  }, []);

  return details;
}
