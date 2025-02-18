import type { JSHandle } from '@playwright/test';
import type { NodeApi } from '@udecode/plate';
import type { PlateEditor } from '@udecode/plate/react';

export interface TPlatePlaywrightAdapter {
  EDITABLE_TO_EDITOR: WeakMap<HTMLElement, PlateEditor>;
  getNode: typeof NodeApi.get;
}

export type EditorHandle<E extends PlateEditor = PlateEditor> = JSHandle<E>;
