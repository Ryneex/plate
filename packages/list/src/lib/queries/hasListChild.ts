import { type Ancestor, type SlateEditor, match } from '@udecode/plate-common';

import { getListTypes } from './getListTypes';

/** Is there a list child in the node. */
export const hasListChild = (editor: SlateEditor, node: Ancestor) =>
  node.children.some((n) => match(n, [], { type: getListTypes(editor) }));
