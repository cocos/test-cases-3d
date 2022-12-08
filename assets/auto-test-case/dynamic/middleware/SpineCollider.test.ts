// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('SpineCollider')
@testClass('SpineCollider')
export class SpineCollider {
    _delay = 0.5;
    _dt = 10;

    @testCase
    async startPlay() {
        await screenshot_custom();
        for (let i = 0; i < 4; i++) {
            await screenshot_custom(this._dt);
        };
    }
}