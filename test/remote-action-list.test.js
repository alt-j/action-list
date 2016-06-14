import chai from 'chai';
import sinon from 'sinon';

import {RemoteActionListInner} from 'src/js/remote-action-list';

import provider from 'src/js/mocks/provider';
import templates from 'src/js/mocks/templates';

chai.should();

describe('RemoteActionList', () => {
    const PAGE_SIZE = 2;

    let node;
    const options = {
        provider: provider,
        templates: templates
    };

    beforeEach(() => {
        node = document.createElement('ul');

        node.dataset.template = 'my_template';
        node.dataset.source = './';
    });

    describe('#constructor()', () => {
        it('should pass instance of HtmlElement', () => {
            (() => new RemoteActionListInner()).should.throw(Error);
        });

        it('should pass data-attribute `template`', () => {
            delete node.dataset.template;

            (() => new RemoteActionListInner(node, options)).should.throw(Error);
        });

        it('should pass existing template in data-attribute `template`', () => {
            node.dataset.template = 'some_template';

            (() => new RemoteActionListInner(node, options)).should.throw(Error);
        });

        it('should pass data-attribute `source`', () => {
            delete node.dataset.source;

            (() => new RemoteActionListInner(node, options)).should.throw(Error);
        });

        it('should create instance', () => {
            const remoteActionList = new RemoteActionListInner(node, options);
            remoteActionList.should.be.an.instanceOf(RemoteActionListInner);
        });
    });

    describe('methods', () => {
        let spy;
        let remoteActionList;

        beforeEach(() => {
            spy = sinon.spy();

            remoteActionList = new RemoteActionListInner(node, {
                templates: options.templates,
                provider: (url, params) => {
                    spy(url, params);
                    return options.provider(url, params);
                }
            });
        });

        describe('#nextPage()', () => {
            it('should append next page to dom node', () => {
                return remoteActionList.nextPage().then(() => {
                    getItems(node).should.have.length(PAGE_SIZE);
                });
            });

            it('should call provider', () => {
                return remoteActionList.nextPage().then(() => {
                    spy.callCount.should.eq(1);
                });
            });

            it('should has next page', () => {
                return remoteActionList.nextPage().then((data) => {
                    data.isLastPage.should.equal(false);
                });
            });

            it('should cancel previous request', () => {
                remoteActionList.nextPage().catch(() => {});

                return remoteActionList.nextPage().then(() => {
                    spy.callCount.should.eq(2);
                    getItems(node).should.have.length(PAGE_SIZE);
                });
            });

            it('should hasn\'t next page', () => {
                return remoteActionList.nextPage()
                    .then(() => remoteActionList.nextPage())
                    .then(() => remoteActionList.nextPage())
                    .then((data) => {
                        spy.callCount.should.eq(3);
                        data.isLastPage.should.equal(true);
                    });
            });

            it('should doesn\'t make a request, if received last page', () => {
                return remoteActionList.nextPage()
                    .then(() => remoteActionList.nextPage())
                    .then(() => remoteActionList.nextPage())
                    .then(() => remoteActionList.nextPage())
                    .catch(() => {
                        spy.callCount.should.eq(3);
                    });
            });
        });

        describe('#filter()', () => {
            it('should filter by value', () => {
                return remoteActionList.filter('type', 'food').then((data) => {
                    const values = getValuesbByFiled(node, 'type');
                    values.should.have.length(2);

                    values[0].should.equal('food');
                    values[1].should.equal('food');

                    data.isLastPage.should.equal(true);
                });
            });

            it('should pass existing field', () => {
                (() => {
                    remoteActionList.filter('incorrect', 'food');
                }).should.throw(Error);
            });

            it('should pass existing value', () => {
                return remoteActionList.filter('type', 'incorrect').then((data) => {
                    spy.callCount.should.eq(1);

                    getItems(node).should.have.length(0);
                    data.isLastPage.should.equal(true);
                });
            });

            it('should reset filters', () => {
                return remoteActionList.filter(null).then((data) => {
                    spy.callCount.should.eq(1);

                    getItems(node).should.have.length(PAGE_SIZE);
                    data.isLastPage.should.equal(false);
                });
            });

            it('should append selected items from next page', () => {
                return remoteActionList.filter('type', 'common').then(() => {
                    return remoteActionList.nextPage().then((data) => {
                        spy.callCount.should.eq(2);

                        const values = getValuesbByFiled(node, 'type');
                        values.should.have.length(3);

                        values[0].should.equal('common');
                        values[1].should.equal('common');
                        values[2].should.equal('common');

                        data.isLastPage.should.equal(true);
                    });
                });
            });
        });

        describe('#sort()', () => {
            it('should pass field', () => {
                (() => {
                    remoteActionList.sort();
                }).should.throw(Error);
            });

            it('should pass existing field', () => {
                (() => {
                    remoteActionList.sort('key');
                }).should.throw(Error);
            });

            it('should sort asc by default', () => {
                return remoteActionList.sort('price').then((data) => {
                    spy.callCount.should.eq(1);

                    const values = getValuesbByFiled(node, 'price');
                    values.should.have.length(PAGE_SIZE);

                    values[0].should.equal('20');
                    values[1].should.equal('50');

                    data.isLastPage.should.equal(false);
                });
            });

            it('should sort desc', () => {
                return remoteActionList.sort('price', 'desc').then((data) => {
                    spy.callCount.should.eq(1);

                    const values = getValuesbByFiled(node, 'price');
                    values.should.have.length(PAGE_SIZE);

                    values[0].should.equal('15000');
                    values[1].should.equal('1000');

                    data.isLastPage.should.equal(false);
                });
            });

            it('should ignore incorrect `order` value', () => {
                return remoteActionList.sort('price', 'custom').then((data) => {
                    spy.callCount.should.eq(1);

                    const values = getValuesbByFiled(node, 'price');
                    values.should.have.length(PAGE_SIZE);

                    values[0].should.equal('20');
                    values[1].should.equal('50');

                    data.isLastPage.should.equal(false);
                });
            });

            it('should append sorted items from next page', () => {
                return remoteActionList.sort('price').then(() => {
                    return remoteActionList.nextPage().then((data) => {
                        spy.callCount.should.eq(2);

                        const values = getValuesbByFiled(node, 'price');
                        values.should.have.length(2 * PAGE_SIZE);

                        values[0].should.equal('20');
                        values[1].should.equal('50');
                        values[2].should.equal('60');
                        values[3].should.equal('1000');

                        data.isLastPage.should.equal(false);
                    });
                });
            });

            it('should sort items without request if is last page', () => {
                return remoteActionList.filter('type', 'food').then((data) => {
                    data.isLastPage.should.equal(true);

                    return remoteActionList.sort('price', 'desc').then((data) => {
                        spy.callCount.should.eq(1);

                        const values = getValuesbByFiled(node, 'price');
                        values.should.have.length(2);

                        values[0].should.equal('60');
                        values[1].should.equal('20');

                        data.isLastPage.should.equal(true);
                    });
                });
            });

            it('should ignore filter if isn\'t last page', () => {
                return remoteActionList.filter('type', 'common').then((data) => {
                    const values = getValuesbByFiled(node, 'price');

                    values[0].should.equal('50');
                    values[1].should.equal('1000');

                    data.isLastPage.should.equal(false);

                    return remoteActionList.sort('price', 'desc').then((data) => {
                        spy.callCount.should.eq(2);

                        const values = getValuesbByFiled(node, 'price');
                        values.should.have.length(PAGE_SIZE);

                        values[0].should.equal('15000');
                        values[1].should.equal('1000');

                        data.isLastPage.should.equal(false);
                    });
                });
            });
        });
    });
});

// Helpers.

function getItems(node) {
    return [].slice.call(node.children);
}

function getValuesbByFiled(node, filed) {
    return getItems(node).map((item) => item.dataset[filed]);
}
