/**
 * @author Kuitos
 * @since 2020-10-13
 */
import type { Freer } from '../../../interfaces';
import type { ContainerConfig } from './common';
declare global {
    interface Window {
        __proxyAttachContainerConfigMap__: WeakMap<WindowProxy, ContainerConfig>;
    }
}
export declare function patchStrictSandbox(appName: string, appWrapperGetter: () => HTMLElement | ShadowRoot, proxy: Window, mounting?: boolean, scopedCSS?: boolean, excludeAssetFilter?: CallableFunction): Freer;
