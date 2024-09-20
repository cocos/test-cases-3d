import { _decorator, AssetManager, assetManager, Component, director, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineSharedTest')
export class SpineSharedTest extends Component {

    private _childCount: number = 0;

    @property({type: Prefab})
    prefab: Prefab = null!;

    private _nodeArr: Node[] = [];

    start() {
        this._childCount = this.node.children.length;
    }

    update(deltaTime: number) {

    }

    onClick() {
        assetManager.loadBundle("SpineSharedTest", (err: Error, bundle: AssetManager.Bundle) => {
            if (err) {
                console.error(err);
                return;
            }

            bundle.load("SharedCacheBundle", Prefab, (err: Error, res: Prefab) => {
                if (err) {
                    console.error(err);
                    return;
                }

                const node = instantiate(res);
                this.node.addChild(node);
            });
        });
    }

    onAdd() {
        const node = instantiate(this.prefab);
        this.node.addChild(node);
        this._nodeArr.push(node);
    }

    onRemove() {
        for (const node of this._nodeArr) {
            node.destroy();
        }
        this._nodeArr.length = 0;
    }
}

