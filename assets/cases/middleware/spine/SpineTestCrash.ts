import { _decorator, Component, sp, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineTestCrash')
export class SpineTestCrash extends Component {

    @property({ type: sp.Skeleton })
    firstSpine!: sp.Skeleton;

    @property({ type: sp.Skeleton })
    secondSpine!: sp.Skeleton;

    @property({ type: sp.Skeleton })
    thirdSpine!: sp.Skeleton;

    @property({
        type: Prefab
    })
    spineBoyPrefab: Prefab = null!;

    start() {

        this.firstSpine.setCompleteListener((trackEntry) => {
            const node = instantiate(this.spineBoyPrefab);
            this.node.addChild(node);
        });
    }

    update(deltaTime: number) {
        
    }
}

