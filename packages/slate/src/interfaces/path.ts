import { Path as SlatePath } from 'slate';

import type {
  InsertNodeOperation,
  MergeNodeOperation,
  MoveNodeOperation,
  Operation,
  RemoveNodeOperation,
  SplitNodeOperation,
} from '../interfaces/operation';
import type { TextDirection } from '../types';
import type { Descendant } from './node';

/**
 * `Path` arrays are a list of indexes that describe a node's exact position in
 * a Slate node tree. Although they are usually relative to the root `Editor`
 * object, they can be relative to any `Node` object.
 */
export type Path = number[];

/** Path retrieval, check and transform methods. */
export const PathApi: {
  /**
   * Returns whether this operation can affect paths or not. Used as an
   * optimization when updating dirty paths during normalization
   *
   * NOTE: This _must_ be kept in sync with the implementation of 'transform'
   * below
   */
  operationCanTransformPath: <N extends Descendant>(
    operation: Operation<N>
  ) => operation is
    | InsertNodeOperation<N>
    | MergeNodeOperation<N>
    | MoveNodeOperation
    | RemoveNodeOperation<N>
    | SplitNodeOperation<N>;

  /** Transform a path by an operation. */
  transform: (
    path: Path,
    operation: Operation,
    options?: PathTransformOptions
  ) => Path | null;

  /**
   * Get a list of ancestor paths for a given path.
   *
   * The paths are sorted from shallowest to deepest ancestor. However, if the
   * `reverse: true` option is passed, they are reversed.
   */
  ancestors: (path: Path, options?: PathAncestorsOptions) => Path[];

  /** Get the common ancestor path of two paths. */
  common: (path: Path, another: Path) => Path;

  /**
   * Compare a path to another, returning an integer indicating whether the path
   * was before, at, or after the other.
   *
   * Note: Two paths of unequal length can still receive a `0` result if one is
   * directly above or below the other. If you want exact matching, use
   * [[PathApi.equals]] instead.
   */
  compare: (path: Path, another: Path) => -1 | 0 | 1;

  /** Check if a path ends after one of the indexes in another. */
  endsAfter: (path: Path, another: Path) => boolean;

  /** Check if a path ends at one of the indexes in another. */
  endsAt: (path: Path, another: Path) => boolean;

  /** Check if a path ends before one of the indexes in another. */
  endsBefore: (path: Path, another: Path) => boolean;

  /** Check if a path is exactly equal to another. */
  equals: (path: Path, another: Path) => boolean;

  /** Check if the path of previous sibling node exists */
  hasPrevious: (path: Path) => boolean;

  /** Check if a path is after another. */
  isAfter: (path: Path, another: Path) => boolean;

  /** Check if a path is an ancestor of another. */
  isAncestor: (path: Path, another: Path) => boolean;

  /** Check if a path is before another. */
  isBefore: (path: Path, another: Path) => boolean;

  /** Check if a path is a child of another. */
  isChild: (path: Path, another: Path) => boolean;

  /** Check if a path is equal to or an ancestor of another. */
  isCommon: (path: Path, another: Path) => boolean;

  /** Check if a path is a descendant of another. */
  isDescendant: (path: Path, another: Path) => boolean;

  /** Check if a path is the parent of another. */
  isParent: (path: Path, another: Path) => boolean;

  /** Check is a value implements the `Path` interface. */
  isPath: (value: any) => value is Path;

  /** Check if a path is a sibling of another. */
  isSibling: (path: Path, another: Path) => boolean;

  /**
   * Get a list of paths at every level down to a path. Note: this is the same
   * as `PathApi.ancestors`, but including the path itself.
   *
   * The paths are sorted from shallowest to deepest. However, if the `reverse:
   * true` option is passed, they are reversed.
   */
  levels: (path: Path, options?: PathLevelsOptions) => Path[];

  /** Given a path, get the path to the next sibling node. */
  next: (path: Path) => Path;

  /** Given a path, return a new path referring to the parent node above it. */
  parent: (path: Path) => Path;

  /** Given a path, get the path to the previous sibling node. */
  previous: (path: Path) => Path;

  /** Get a path relative to an ancestor. */
  relative: (path: Path, ancestor: Path) => Path;
} = SlatePath as any;

/**
 * `Path` arrays are a list of indexes that describe a node's exact position in
 * a Slate node tree. Although they are usually relative to the root `Editor`
 * object, they can be relative to any `Node` object.
 */
export type TPath = SlatePath;

export interface PathAncestorsOptions {
  /** If true, the paths are returned in reverse order. */
  reverse?: boolean;
}

export interface PathLevelsOptions {
  /** If true, the paths are returned in reverse order. */
  reverse?: boolean;
}

export interface PathTransformOptions {
  /** The affinity of the transform. */
  affinity?: TextDirection | null;
}
