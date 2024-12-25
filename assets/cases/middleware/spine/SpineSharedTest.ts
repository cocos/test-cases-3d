import { _decorator, AssetManager, assetManager, Component, director, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineSharedTest')
export class SpineSharedTest extends Component {

    private _childCount: number = 0;

    @property({type: Prefab})
    prefab: Prefab = null!;

    private _nodeArr: Node[] = [];
    private _bundleNode: Node = null!;

    start() {
        this._childCount = this.node.children.length;
        this.node.on(Node.EventType.CHILD_REMOVED, this._onChildRemove, this);
        this._bundleNode = this.node.getChildByName("Bundle");
    }

    update(deltaTime: number) {

    }

    onClick() {
        // The texture shared with multi instances at shared-cache mode, after close the bundle UI, the texture will be released. If instantiate multi instance, After bundle UI close, other instances still use the texture.
        // Here we prevent instantiate multi times.
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
                this._bundleNode.active = false;
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

    private _onChildRemove(child: Node) {
        if (child.name !== "SharedCacheBundle") return;
        this._bundleNode.active = true;
    }
}

