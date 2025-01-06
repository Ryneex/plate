import { type Path, type SlateEditor, PathApi } from '@udecode/plate-common';

import type { TTableCellElement } from '../types';

import { getCellTypes } from '../utils';

// Get cell to the left of the current cell
export const getLeftTableCell = (
  editor: SlateEditor,
  {
    at: cellPath,
  }: {
    at?: Path;
  } = {}
) => {
  if (!cellPath) {
    cellPath = editor.api.find<TTableCellElement>({
      match: { type: getCellTypes(editor) },
    })?.[1];

    if (!cellPath) return;
  }

  const cellIndex = cellPath.at(-1);

  if (!cellIndex) return;

  const prevCellPath = PathApi.previous(cellPath);

  return editor.api.node<TTableCellElement>(prevCellPath);
};
