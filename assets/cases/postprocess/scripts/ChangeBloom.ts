import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeBloom')
export class ChangeBloom extends Component {
    public postprocessSetting: any;
    protected start(): void {
        this.postprocessSetting = this.getComponent("BuiltinPipelineSettings");
    }
    changeBloom(eve: any) {
        this.postprocessSetting.bloomThreshold = eve.progress
    }
}


