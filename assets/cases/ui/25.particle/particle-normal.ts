
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('ParticleControl')
export class ParticleControl extends Component {

    @type(Prefab)
    public spritePrefab: Prefab = null!;
    private totalNum = 20;
    private i = 0.1;
    start () {
        this.schedule(this.addParticle, 1);
    }

    addParticle () {
        if (this.totalNum > 0) {
            const particle = instantiate(this.spritePrefab);
            particle!.parent = this.node;
            particle!.setPosition(this.i * 100, this.i * 100);
            this.i += 0.1;
            this.totalNum--;
        }
    }
}
