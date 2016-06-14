import ActionList from './action-list';

import config from './config';

import cancelabelCallback from './utils/cancelabel-callback';

import provider from './mocks/provider';
import templates from './mocks/templates';

const isLastPage = ((response) => response.pagination.nextPage === null);

class RemoteActionListInner {
    /**
     * @param {HTMLElement} node
     * @param {Object} options
     * @param {Function} options.provider
     * @param {Object} options.templates
     */
    constructor(node, options) {
        if (!(node instanceof HTMLElement)) {
            throw new Error('node must be instance of HTMLElement');
        }
        this._node = node;

        this._items = [];

        const templateName = node.dataset.template;
        if (!options.templates[templateName]) {
            throw new Error(`Cann't find temaplte ${templateName}`);
        }
        this._template = options.templates[templateName];

        const url = node.dataset.source;
        if (!url) {
            throw new Error('Source not passed');
        }
        this._provider = options.provider;
        this._url = url;
        this._params = {};

        this._currentPage = null;
        this._nextPage = null;
    }

    /**
     * @param {String} [field]
     * @param {Strign} [value]
     *
     * @returns {Promise}
     */
    nextPage() {
        if (this._currentPage && !this._nextPage) {
            return Promise.reject(new Error('Next page not found'));
        }

        this._params.page = this._nextPage;
        return this._request().then((response) => {
            this._render(response.items, {addToEnd: true});
            return {isLastPage: isLastPage(response)};
        });
    }

    /**
     * @param {String} [field]
     * @param {Strign} [value]
     *
     * @returns {Promise}
     */
    filter(field, value) {
        if (field && config.fields.indexOf(field) === -1) {
            throw new Error('Incorrect field');
        }

        this._params = {
            filterBy: field,
            filterValue: value
        };

        return this._request().then((response) => {
            this._render(response.items);
            return {isLastPage: isLastPage(response)};
        });
    }

    /**
     * @param {String} field
     * @param {Strign} [order]
     *
     * @returns {Promise}
     */
    sort(field, order) {
        if (config.fields.indexOf(field) === -1) {
            throw new Error('Incorrect field for sorting');
        }

        if (this._currentPage && !this._nextPage) {
            const actionList = new ActionList(this._node);
            actionList.sort(field, order);

            return Promise.resolve({isLastPage: true});
        }

        this._params = {
            sortKey: field,
            sortOrder: order
        };
        return this._request().then((response) => {
            this._render(response.items);
            return {isLastPage: isLastPage(response)};
        });
    }

    _request() {
        if (this._requestCallback) {
            this._requestCallback.cancel();
            this._requestCallback = null;
        }

        this._requestCallback = cancelabelCallback((response) => {
            this._currentPage = response.pagination.currentPage;
            this._nextPage = response.pagination.nextPage;

            return response;
        });

        return this._provider(this._url, this._params).then(this._requestCallback);
    }

    _render(items, options) {
        this._items = options && options.addToEnd ? this._items.concat(items) : items;
        this._node.innerHTML = this._template(this._items);
    }
}

class RemoteActionList extends RemoteActionListInner {
    constructor(node) {
        super(node, {
            provider: provider,
            templates: templates
        });
    }
}

export {RemoteActionList, RemoteActionListInner};
