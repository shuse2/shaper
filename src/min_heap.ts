import { Node } from './node';

/**
 * Heap structure class
 * reference: https://github.com/google/closure-library/blob/master/closure/goog/structs/heap.js
 * reference: https://www.geeksforgeeks.org/binary-heap/
 * reference: https://runestone.academy/runestone/books/published/pythonds/Trees/BinaryHeapImplementation.html
 */
export class MinHeap<T> {
    protected _nodes: Array<Node<T>>;

    constructor(heap?: MinHeap<T> | object) {
        this._nodes = [];
        if (heap) {
            this.insertAll(heap);
        }
    }

    public insert(key: number, value: T) {
        const node = new Node<T>(key, value);
        this._nodes.push(node);
        this._moveUp(this._nodes.length - 1);
    }

    public remove(): T | undefined {
        if (this.count <= 0) {
            return undefined;
        }
        if (this.count === 1) {
            const node = this._nodes[0];
            this.clear();
            return node.value;
        }
        const rootNode = this._nodes[0];
        this._nodes[0] = this._nodes.pop() as Node<T>;
        this._moveDown(0);

        return rootNode.value;
    }

    public peek(): T | undefined {
        if (this._nodes.length <= 0) {
            return undefined;
        }
        return this._nodes[0].value;
    }

    public peekKey(): number | undefined {
        if (this._nodes.length <= 0) {
            return undefined;
        }
        return this._nodes[0].key;
    }

    public insertAll(heap: MinHeap<T> | object): void {
        if (heap instanceof MinHeap) {
            this._insertAllFromHeap(heap);
            return;
        }
        this._insertAllFromObject(heap);
    }

    public clone(): MinHeap<T> {
        return new MinHeap(this);
    }

    public clear(): void {
        this._nodes = [];
    }

    public get count(): number {
        return this._nodes.length;
    }

    public get keys(): ReadonlyArray<number> {
        return this._nodes.map(n => n.key);
    }

    public get values(): ReadonlyArray<T> {
        return this._nodes.map(n => n.value);
    }

    private _insertAllFromHeap(heap: MinHeap<T>): void {
        const keys = heap.keys;
        const values = heap.values;
        if (this.count <= 0) {
            // assume that the order of input heap is correct
            for (let i = 0; i < heap.count; i++) {
                this._nodes.push(new Node(keys[i], values[i]));
            }
            return;
        }
        for (let i = 0; i < heap.count; i++) {
            this.insert(keys[i], values[i]);
        }
    }

    private _insertAllFromObject(heap: object): void {
        for (const [key, value] of Object.entries(heap)) {
            this.insert(parseInt(key, 10), value);
        }
    }

    protected _moveUp(index: number): void {
        const node = this._nodes[index];
        while(index > 0) {
            const parentIndex = this._parentIndex(index);
            if (this._nodes[parentIndex].key > node.key) {
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
                this._nodes[rightChild].key < this._nodes[leftChild].key ? rightChild : leftChild;

            if (this._nodes[nextPath].key > node.key) {
                break;
            }

            this._nodes[index] = this._nodes[nextPath];
            index = nextPath;
        }
        this._nodes[index] = node;
    }

    protected _parentIndex(index: number): number {
        // equivalent to index / 2 when index is integer
        return (index - 1) >> 1;
    }

    protected _leftIndex(index: number): number {
        return 2 * index + 1;
    }

    protected _rightIndex(index: number): number {
        return 2 * index + 2;
    }
}