import { MinHeap } from '../src/min_heap';

describe('Min heap', () => {
    let heap: MinHeap<string>;

    beforeEach(() => {
        heap = new MinHeap<string>();
        heap.insert(1, 'a');
        heap.insert(5, 'b');
        heap.insert(2, 'c');
        heap.insert(0, 'd');
    });

    describe('constructor', () => {
        it('should initialize count as zero', () => {
            const heap2 = new MinHeap<string>();
            expect(heap2.count).toBe(0);
        });

        it('should insert input to the heap', () => {
            const heap2 = new MinHeap<string>(heap);
            expect(heap2.count).toBe(4);
        });

        it('should insert input object to the heap', () => {
            const heap2 = new MinHeap<string>({
                10: 'omg',
                15: 'sample',
            });
            expect(heap2.count).toBe(2);
        });
    });

    describe('insert', () => {
        it('should insert into correct order', () => {
            expect(heap.keys).toEqual([0,1,2,5]);
            expect(heap.values).toEqual(['d', 'a', 'c', 'b']);
        });
    });

    describe('insertAll', () => {
        it('should insert from heap instance', () => {
            const heap2 = new MinHeap();
            heap2.insertAll(heap);
            expect(heap2.keys).toEqual([0,1,2,5]);
            expect(heap2.values).toEqual(['d', 'a', 'c', 'b']);
        });

        it('should insert from object', () => {
            const heap2 = new MinHeap();
            const keys = heap.keys;
            const values = heap.values;
            const obj: { [key: number]: string } = {};
            for (let i = 0; i < heap.count; i++) {
                obj[keys[i]] = values[i];
            }
            heap2.insertAll(obj);

            expect(heap2.keys).toEqual([0,1,2,5]);
            expect(heap2.values).toEqual(['d', 'a', 'c', 'b']);
        });
    });

    describe('remove', () => {
        it('should remove minimal key', () => {
            const root = heap.remove();
            expect(heap.count).toEqual(3);
            expect(heap.keys).toEqual([1,5,2]);
            expect(heap.values).toEqual(['a', 'b', 'c']);

            expect(root).toEqual('d');
        });

        it('should remove all', () => {
            heap.remove();
            heap.remove();
            heap.remove();
            heap.remove();
            expect(heap.count).toEqual(0);
            expect(heap.keys).toEqual([]);
            expect(heap.values).toEqual([]);
        });

        it('should not throw error when over remove', () => {
            heap.remove();
            heap.remove();
            heap.remove();
            heap.remove();
            heap.remove();
            expect(heap.count).toEqual(0);
            expect(heap.keys).toEqual([]);
            expect(heap.values).toEqual([]);
        });
    });

    describe('peek', () => {
        it('should return root value', () => {
            expect(heap.peek()).toEqual('d');
        });
    });

    describe('peekKey', () => {
        it('should return root key', () => {
            expect(heap.peekKey()).toEqual(0);
        });
    });

    describe('clone', () => {
        it('should create clone instance', () => {
            const newHeap = heap.clone();
            newHeap.insert(20, 'x');
            expect(newHeap.count).not.toEqual(heap.count);
        });
    });

    describe('clear', () => {
        it('should clear all the instance', () => {
            heap.clear();
            expect(heap.count).toEqual(0);
        });
    });
});