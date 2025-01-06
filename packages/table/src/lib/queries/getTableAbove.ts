import type { EditorAboveOptions, SlateEditor } from '@udecode/plate-common';

import { BaseTablePlugin } from '../BaseTablePlugin';

export const getTableAbove = (
  editor: SlateEditor,
  options?: EditorAboveOptions
) =>
  editor.api.block({
    match: {
      type: editor.getType(BaseTablePlugin),
    },
    ...options,
  });
