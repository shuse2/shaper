/**
 * Basic structure to hold key value pair
 */
export class Node<V=object, K=number> {
    public key: K;
    public value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    clone(): Node<V, K> {
        return new Node(this.key, this.value);
    }
}