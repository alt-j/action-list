import chai from 'chai';
import sinon from 'sinon';

import {RemoteActionListInner} from 'src/js/remote-action-list.js';

import provider from 'src/js/provider-mock';
import templates from 'src/js/templates-mock';

chai.should();

describe('RemoteActionList', () => {
    let node;
    let options = {
        provider: provider,
        templates: templates
    };

    beforeEach(() => {
        node = document.createElement('ul');

        node.dataset.template = 'my_template';
        node.dataset.source = './';
    });

    describe('#constructor()', () => {
        it('should requires instance of HtmlElement', () => {
            () => {
                new RemoteActionListInner();
            }.should.throw(Error);
        });

        it('should requires data-attribute `template`', () => {
            delete node.dataset.template;

            () => {
                new RemoteActionListInner(node, options);
            }.should.throw(Error);
        });

        it('should requires existing template in data-attribute `template`', () => {
            node.dataset.template = 'some_template';

            () => {
                new RemoteActionListInner(node, options);
            }.should.throw(Error);
        });

        it('should requires data-attribute `source`', () => {
            delete node.dataset.source;

            () => {
                new RemoteActionListInner(node, options);
            }.should.throw(Error);
        });

        it('should create instance', () => {
            let remoteActionList = new RemoteActionListInner(node, options);
            remoteActionList.should.be.an.instanceOf(RemoteActionListInner);
        });
    });

    describe('#nextPage()', () => {
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

        it('should append next page to dom node', () => {
            return remoteActionList.nextPage().then((data) => {
                getItems(node).should.have.length(2);
            });
        });

        it('should call provider', () => {
            return remoteActionList.nextPage().then((data) => {
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

            return remoteActionList.nextPage().then((data) => {
                spy.callCount.should.eq(2);
                getItems(node).should.have.length(2);
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
        let remoteActionList;

        beforeEach(() => {
        });
    });

    describe('#sort()', () => {
        let remoteActionList;

        beforeEach(() => {
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
