import chai from 'chai';

import ActionList from 'src/js/action-list.js';

chai.should();

describe('ActionList', () => {
    describe('#constructor()', () => {
        it('requires instance of HtmlElement', () => {
            () => {
                new ActionList();
            }.should.throw(Error);
        });
    });

    describe('#filter()', () => {
        let node;
        let actionList;

        beforeEach(() => {
            node = createActionListNode();
            actionList = new ActionList(node);
        });

        it('filter by value', () => {
            actionList.filter('type', 'food');

            var values = getValuesbByFiled(node, 'type');
            values.should.have.length(2);

            values[0].should.equal('food');
            values[1].should.equal('food');
        });

        it('incorrect field', () => {
            () => {
                actionList.filter('incorrect', 'food');
            }.should.throw(Error);
        });

        it('incorrect value', () => {
            actionList.filter('type', 'incorrect');
            getItems(node).should.have.length(0);
        });

        it('reset filters', () => {
            actionList.filter('type', 'food');
            getItems(node).should.have.length(2);

            actionList.filter(null);
            getItems(node).should.have.length(3);
        });
    });

    describe('#sort()', () => {
        let node;
        let actionList;

        beforeEach(() => {
            node = createActionListNode();
            actionList = new ActionList(node);
        });

        it('requires field for sorting', () => {
            () => {
                actionList.sort();
            }.should.throw(Error);
        });

        it('requires existing field for sorting', () => {
            () => {
                actionList.sort('key');
            }.should.throw(Error);
        });

        it('sort asc by default', () => {
            actionList.sort('price');

            var values = getValuesbByFiled(node, 'price');
            values.should.have.length(3);

            values[0].should.equal('20');
            values[1].should.equal('50');
            values[2].should.equal('65');
        });

        it('sort desc', () => {
            actionList.sort('price', 'desc');

            var values = getValuesbByFiled(node, 'price');
            values.should.have.length(3);

            values[0].should.equal('65');
            values[1].should.equal('50');
            values[2].should.equal('20');
        });

        it('ignore incorrect `order` value', () => {
            actionList.sort('price', 'custom');

            var values = getValuesbByFiled(node, 'price');
            values.should.have.length(3);

            values[0].should.equal('20');
            values[1].should.equal('50');
            values[2].should.equal('65');
        });

        it('sort selected items', () => {
            actionList.filter('type', 'food');

            var prices = getValuesbByFiled(node, 'price');
            prices.should.have.length(2);

            prices[0].should.equal('20');
            prices[1].should.equal('65');

            actionList.sort('price', 'desc');

            prices = getValuesbByFiled(node, 'price');
            prices.should.have.length(2);

            prices[0].should.equal('65');
            prices[1].should.equal('20');
        });
    });
});

// Helpers.

function createActionListNode() {
    let node = document.createElement('li');
    node.innerHTML = `
        <li data-type="food" data-price="20">Батон</li>
        <li data-type="common" data-price="50">Батарейки</li>
        <li data-type="food" data-price="65">Молоко</li>
    `;

    return node;
}

function getItems(node) {
    return [].slice.call(node.children);
}

function getValuesbByFiled(node, filed) {
    return getItems(node).map((item) => item.dataset[filed]);
}
