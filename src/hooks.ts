import { getPreferenceValues } from "@raycast/api";
import { Connector, PluggyClient } from "pluggy-sdk";
import { useEffect, useState } from "react";
import { Preferences } from "./config";

export function useConnectors(): Connector[] {
  const { clientId, clientSecret } = getPreferenceValues<Preferences>();
  const [connectors, setConnectors] = useState<Connector[]>([]);

  useEffect(() => {
    if (!clientId || !clientSecret) {
      return;
    }

    const client = new PluggyClient({ clientId, clientSecret });
    client.fetchConnectors().then((connectors) => setConnectors(connectors.results));
  }, [clientId, clientSecret]);

  return connectors;
}
