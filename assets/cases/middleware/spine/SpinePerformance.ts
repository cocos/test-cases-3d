import { _decorator, CCInteger, Component, instantiate, Label, Node, Prefab, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpinePerformance')
export class SpinePerformance extends Component {

    @property({ type: CCInteger, min: 1 })
    dynamicAddCount: number = 1;

    @property({ type: Prefab })
    spinePrefab: Prefab = null!;

    @property({ type: Label })
    dynamicCountLabel: Label = null!;

    private _initialChildCount: number = 0;

    start() {
        this._initialChildCount = this.node.children.length;
    }

    update(deltaTime: number) {

    }

    private _createSpine(): sp.Skeleton {
        const node = instantiate(this.spinePrefab);
        this.node.addChild(node);
        return node.getComponent(sp.Skeleton)!;
    }

    onClear() {
        const children = this.node.children;
        let index = this._initialChildCount;
        for (; index < children.length; index++) {
            children[index].destroy();
        }
        this.scheduleOnce(()=>{
            this._updateDynamicCount();
        }, 0.1);
    }

    private _updateDynamicCount() {
        const count = this.node.children.length - this._initialChildCount;
        this.dynamicCountLabel.string = "" + count;
    }

    private _addTimelineAnimation(animationName: string, create: Function) {
        const count = this.node.children.length - this._initialChildCount;
        for (let i = 0; i < this.dynamicAddCount; ++i) {
            const skeleton = this._createSpine();
            skeleton.clearAnimation();
            const pos = skeleton.node.getPosition();
            pos.x += count / 10 * 40 - i * 20 - 150;
            pos.y += count / 20 * 20 - i * 20 - 110;
            skeleton.node.setPosition(pos);

            const spData = skeleton.skeletonData?.getRuntimeData();
            const length = spData ? spData.bones.length : 0;
            let timelineArr = [];
            for (let boneIndex = 0; boneIndex < length; ++boneIndex) {
                const timeLine = create(i, skeleton);
                if (timeLine.setBoneIndex !== undefined) {
                    timeLine.setBoneIndex(boneIndex);
                    timelineArr.push(timeLine);
                } else {
                    timelineArr.push(timeLine);
                    break;
                }
            }
            const animation = new sp.spine.Animation(animationName, timelineArr, 0.8 * (i + 1));
            const state = skeleton.getState();
            state?.addAnimationWith(0, animation, true, 0);
        }
    }

    onRotate() {
        let createTimeLine = (i: number) => {
            const frameCount = 60 * (i + 2);
            const timeLine = new sp.spine.RotateTimeline(frameCount);
            timeLine.setFrame(0, 0, 180);
            timeLine.setFrame(15 * (i + 2), 0.15, 90);
            timeLine.setFrame(30 * (i + 2), 0.15, 60);
            timeLine.setFrame(45 * (i + 2), 0.15, 45);
            timeLine.setFrame(frameCount - 3, 0.15, 0);
            timeLine.setFrame(frameCount - 2, 0.15, 0);
            timeLine.setFrame(frameCount - 1, 0.15, 0);
            return timeLine;
        };
        this._addTimelineAnimation("rotate", createTimeLine);
        this._updateDynamicCount();
    }

    onTranslate() {
        let createTimeLine = (i: number) => {
            const frameCount = 60 * (i + 2);
            const timeLine = new sp.spine.TranslateTimeline(frameCount);
            timeLine.setFrame(0, 0, 0, 0);
            timeLine.setFrame(10, 0.5, -50, -50);
            timeLine.setFrame(50, 1, 150, 150);
            timeLine.setFrame(frameCount - 3, 1.49, 149, 149);
            timeLine.setFrame(frameCount - 2, 1.499, 149, 150);
            timeLine.setFrame(frameCount - 1, 1.5, 250, 50);
            return timeLine;
        };
        this._addTimelineAnimation("translate", createTimeLine);
        this._updateDynamicCount();
    }

    onScale() {
        let createTimeLine = (i: number) => {
            const frameCount = 60 * (i + 2);
            const timeLine = new sp.spine.ScaleTimeline(frameCount);
            timeLine.setFrame(0, 0, 0, 0);
            timeLine.setFrame(10, 0.5, 0.4, 0.4);
            timeLine.setFrame(50, 1, 0.7, 0.7);
            timeLine.setFrame(frameCount - 3, 1.49, 0.9, 0.9);
            timeLine.setFrame(frameCount - 2, 1.499, 0.9, 0.9);
            timeLine.setFrame(frameCount - 1, 1.5, 0.99, 1);
            return timeLine;
        };
        this._addTimelineAnimation("scale", createTimeLine);
        this._updateDynamicCount();
    }

    onShear() {
        let createTimeLine = (i: number) => {
            const frameCount = 60 * (i + 2);
            const timeLine = new sp.spine.ShearTimeline(frameCount);
            timeLine.setFrame(0, 0, 0, 0);
            timeLine.setFrame(10, 0.5, 1, 4);
            timeLine.setFrame(50, 1, 20, 10);
            timeLine.setFrame(frameCount - 3, 1.49, 49, 50);
            timeLine.setFrame(frameCount - 2, 1.499, 49.9, 50);
            timeLine.setFrame(frameCount - 1, 1.5, 50, 50);
            return timeLine;
        };
        this._addTimelineAnimation("shear", createTimeLine);
        this._updateDynamicCount();
    }

    onTransformConstraint() {
        let createTimeLine = (i: number) => {
            const frameCount = 300;
            const timeLine = new sp.spine.TransformConstraintTimeline(frameCount);
            timeLine.setFrame(0, 0, 0, 0, 0.1, 0);
            timeLine.setFrame(10, 0.5, 10, 0, 0.5, 0.5);
            timeLine.setFrame(50, 1, 50, 50, 0.8, 0.9);
            timeLine.setFrame(frameCount - 1, 1.5, 50, 50, 10, 10);
            return timeLine;
        };
        this._addTimelineAnimation("TransformConstraint", createTimeLine);
        this._updateDynamicCount();
    }

    onPathConstraintPosition() {
        let createTimeLine = (i: number) => {
            const frameCount = 300;
            const timeLine = new sp.spine.PathConstraintPositionTimeline(frameCount);
            for (let index = 0; index < frameCount; index++) {
                timeLine.setFrame(index, index * 1.5 / frameCount, index);
            }
            return timeLine;
        };
        this._addTimelineAnimation("PathConstraintPosition", createTimeLine);
        this._updateDynamicCount();
    }
    onPathConstraintMix() {
        let createTimeLine = (i: number) => {
            const frameCount = 300;
            const timeLine = new sp.spine.PathConstraintMixTimeline(frameCount);
            timeLine.setFrame(0, 0, 0, 10);
            timeLine.setFrame(10, 0.5, 10, 20);
            timeLine.setFrame(50, 1, 20, 50);
            timeLine.setFrame(frameCount - 1, 1.5, 50, 60);
            return timeLine;
        };
        this._addTimelineAnimation("PathConstraintMix", createTimeLine);
        this._updateDynamicCount();
    }
}
