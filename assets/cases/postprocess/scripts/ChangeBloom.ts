import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeBloom')
export class ChangeBloom extends Component {
    public bloomSetting: any;
    protected start(): void {
        this.bloomSetting = this.getComponent("BuiltinBloomPass");
    }
    changeBloom(eve: any) {
        if(this.bloomSetting) {
            this.bloomSetting.enableBloom = true;
            this.bloomSetting.bloomThreshold = eve.progress
        }
    }
}


