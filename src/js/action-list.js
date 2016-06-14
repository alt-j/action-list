const FIELDS = ['type', 'price'];

class ActionList {
    /**
     * @param {HTMLElement} node
     */
    constructor(node) {
        if (!(node instanceof HTMLElement)) {
            throw new Error('node must be instance of HTMLElement');
        }

        this._node = node;
        this._items = this._getItems();
    }

    /**
     * @param {String} [field]
     * @param {Strign} [value]
     *
     * @returns {ActionList}
     */
    filter(field, value) {
        // Reset filter.
        if (!field) {
            this._render(this._items);
            return;
        }

        if (FIELDS.indexOf(field) === -1) {
            throw new Error('Incorrect field');
        }

        const items = this._items.filter((item) => item.dataset[field] === value.toString());
        this._render(items);
    }

    /**
     * @param {String} field
     * @param {Strign} [order]
     *
     * @returns {ActionList}
     */
    sort(field, order) {
        if (FIELDS.indexOf(field) === -1) {
            throw new Error('Incorrect field');
        }

        const factor = order === 'desc' ? -1 : 1;
        // Sort selected elements.
        const items = this._getItems().sort(
            (item1, item2) => item1.dataset[field] > item2.dataset[field] ? factor : -factor
        );
        this._render(items);
    }

    /**
     * @returns {HTMLElement[]}
     */
    _getItems() {
        return [].slice.call(this._node.children);
    }

    /**
     * @param {HtmlElement[]} items
     */
    _render(items) {
        this._node.innerHTML = items.map((item) => item.outerHTML).join('');
    }
}

export default ActionList;
