import {
  type ChildOf,
  type Editor,
  type ElementOrTextOf,
  type NodeEntry,
  type TNode,
  NodeApi,
} from '../../interfaces/index';

const getLastChild = <N extends ChildOf<R>, R extends TNode>(
  node: R,
  level: number
): N | R => {
  if (!(level + 1) || !NodeApi.isAncestor(node)) return node;

  const { children } = node;

  const lastNode = children.at(-1)!;

  return getLastChild(lastNode, level - 1) as N;
};

export const getLastNodeByLevel = <
  N extends ElementOrTextOf<E>,
  E extends Editor = Editor,
>(
  editor: E,
  level: number
): NodeEntry<N> | undefined => {
  const { children } = editor;

  const lastNode = children.at(-1);

  if (!lastNode) return;

  const [, lastPath] = editor.api.last([])!;

  return [getLastChild(lastNode, level - 1) as N, lastPath.slice(0, level + 1)];
};
