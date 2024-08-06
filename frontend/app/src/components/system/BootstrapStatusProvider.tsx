'use client';

import type { BootstrapStatus, RequiredBootstrapStatus } from '@/api/system';
import { createContext, type ReactNode, useContext } from 'react';

const BootstrapStatusContext = createContext<BootstrapStatus>({
  required: {
    datasource: false,
    default_embedding_model: false,
    default_llm: false,
  },
  optional: {
    langfuse: false,
  },
});

export function BootstrapStatusProvider ({ bootstrapStatus, children }: { bootstrapStatus: BootstrapStatus, children: ReactNode }) {
  return <BootstrapStatusContext.Provider value={bootstrapStatus}>{children}</BootstrapStatusContext.Provider>;
}

export function useBootstrapStatus () {
  return useContext(BootstrapStatusContext);
}