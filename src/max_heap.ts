import { MinHeap } from "./min_heap";


export class MaxHeap<T> extends MinHeap<T> {
    protected _moveUp(index: number): void {
        const node = this._nodes[index];
        while(index > 0) {
            const parentIndex = this._parentIndex(index);
            if (this._nodes[parentIndex].key < node.key) {
                this._nodes[index] = this._nodes[parentIndex];
                index = parentIndex;
                continue;
            }
            break;
        }
        this._nodes[index] = node;
    }

    protected _moveDown(index: number): void {
        const node = this._nodes[index];
        const halfCount = this.count >> 1;

        while(index < halfCount) {
            const leftChild = this._leftIndex(index);
            const rightChild = this._rightIndex(index);
            // choose smaller path
            const nextPath = rightChild < this.count &&
                this._nodes[rightChild].key > this._nodes[leftChild].key ? rightChild : leftChild;

            if (this._nodes[nextPath].key < node.key) {
                break;
            }

            this._nodes[index] = this._nodes[nextPath];
            index = nextPath;
        }
        this._nodes[index] = node;
    }
}