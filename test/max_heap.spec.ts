import { MaxHeap } from '../src/max_heap';

describe('Min heap', () => {
    let heap: MaxHeap<string>;

    beforeEach(() => {
        heap = new MaxHeap<string>();
        heap.insert(1, 'a');
        heap.insert(5, 'b');
        heap.insert(2, 'c');
        heap.insert(0, 'd');
    });

    describe('insert', () => {
        it('should insert into correct order', () => {
            expect(heap.keys).toEqual([5,1,2,0]);
            expect(heap.values).toEqual(['b', 'a', 'c', 'd']);
        });
    });

    describe('remove', () => {
        it('should remove minimal key', () => {
            const root = heap.remove();
            expect(heap.count).toEqual(3);
            expect(heap.keys).toEqual([2,1,0]);
            expect(heap.values).toEqual(['c', 'a', 'd']);

            expect(root).toEqual('b');
        });
    });

    describe('peek', () => {
        it('should return root value', () => {
            expect(heap.peek()).toEqual('b');
        });
    });

    describe('peekKey', () => {
        it('should return root key', () => {
            expect(heap.peekKey()).toEqual(5);
        });
    });
});