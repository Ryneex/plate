import {
  type ExtendEditor,
  type TRange,
  RangeApi,
} from '@udecode/plate-common';

import type { TableConfig } from '.';

import { overrideSelectionFromCell } from './transforms/overrideSelectionFromCell';

// TODO: tests

/**
 * Selection table:
 *
 * - If anchor is in table, focus in a block before: set focus to start of table
 * - If anchor is in table, focus in a block after: set focus to end of table
 * - If focus is in table, anchor in a block before: set focus to end of table
 * - If focus is in table, anchor in a block after: set focus to the point before
 *   start of table
 */
export const withSelectionTable: ExtendEditor<TableConfig> = ({
  editor,
  type,
}) => {
  const { apply } = editor;

  editor.apply = (op) => {
    if (op.type === 'set_selection' && op.newProperties) {
      const newSelection = {
        ...editor.selection,
        ...op.newProperties,
      } as TRange | null;

      if (
        RangeApi.isRange(newSelection) &&
        editor.api.isAt({
          at: newSelection,
          blocks: true,
          match: (n) => n.type === type,
        })
      ) {
        const anchorEntry = editor.api.block({
          at: newSelection.anchor,
          match: (n) => n.type === type,
        });

        if (anchorEntry) {
          const [, anchorPath] = anchorEntry;

          const isBackward = RangeApi.isBackward(newSelection);

          if (isBackward) {
            op.newProperties.focus = editor.api.start(anchorPath);
          } else {
            const pointBefore = editor.api.before(anchorPath);

            // if the table is the first block
            if (pointBefore) {
              op.newProperties.focus = editor.api.end(anchorPath);
            }
          }
        } else {
          const focusEntry = editor.api.block({
            at: newSelection.focus,
            match: (n) => n.type === type,
          });

          if (focusEntry) {
            const [, focusPath] = focusEntry;

            const isBackward = RangeApi.isBackward(newSelection);

            if (isBackward) {
              const startPoint = editor.api.start(focusPath)!;
              const pointBefore = editor.api.before(startPoint);
              op.newProperties.focus = pointBefore ?? startPoint;
            } else {
              op.newProperties.focus = editor.api.end(focusPath);
            }
          }
        }
      }

      overrideSelectionFromCell(editor, newSelection);
    }

    apply(op);
  };

  return editor;
};
