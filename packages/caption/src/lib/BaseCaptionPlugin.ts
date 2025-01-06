import {
  type Path,
  type PluginConfig,
  type WithRequiredKey,
  createTSlatePlugin,
} from '@udecode/plate-common';

import { withCaption } from './withCaption';

export type CaptionConfig = PluginConfig<
  'caption',
  {
    /** When defined, focus end of caption textarea with the same path. */
    focusEndPath: Path | null;
    /** When defined, focus start of caption textarea with the same path. */
    focusStartPath: Path | null;
    // isVisible?: (elementId: string) => boolean;
    /** Plugins to enable caption. */
    plugins: WithRequiredKey[];

    visibleId: string | null;
  } & CaptionSelectors
>;

type CaptionSelectors = {
  isVisible?: (elementId: string) => boolean;
};

/** Enables support for caption. */
export const BaseCaptionPlugin = createTSlatePlugin<CaptionConfig>({
  key: 'caption',
  extendEditor: withCaption,
  options: {
    focusEndPath: null,
    focusStartPath: null,
    plugins: [],
    visibleId: null,
  },
}).extendOptions<CaptionSelectors>(({ getOptions }) => ({
  isVisible: (elementId) => getOptions().visibleId === elementId,
}));
