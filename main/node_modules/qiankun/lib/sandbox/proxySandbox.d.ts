/**
 * @author Kuitos
 * @since 2020-3-31
 */
import type { SandBox } from '../interfaces';
import { SandBoxType } from '../interfaces';
/**
 * 基于 Proxy 实现的沙箱
 */
export default class ProxySandbox implements SandBox {
    /** window 值变更记录 */
    private updatedValueSet;
    name: string;
    type: SandBoxType;
    proxy: WindowProxy;
    globalContext: typeof window;
    sandboxRunning: boolean;
    latestSetProp: PropertyKey | null;
    private registerRunningApp;
    active(): void;
    inactive(): void;
    constructor(name: string, globalContext?: Window & typeof globalThis);
}
