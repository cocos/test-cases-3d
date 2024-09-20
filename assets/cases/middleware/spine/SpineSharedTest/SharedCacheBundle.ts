import { _decorator, assetManager, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SharedCacheBundle')
export class SharedCacheBundle extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onClick() {
        this.node.destroy()
        const bundle = assetManager.getBundle("SpineSharedTest");
        if (bundle) {
            bundle.releaseAll()
            assetManager.removeBundle(bundle)
        }
    }
}

