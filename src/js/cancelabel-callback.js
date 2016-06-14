/**
 * @param callback
 * @returns {Function}
 */
const cancelabelCallback = function (callback) {
    let wrapper = function () {
        if (!callback) {
            return;
        }

        switch (arguments.length) {
            case 0:
                return callback.call(this);
            case 1:
                return callback.call(this, arguments[0]);
            default:
                return callback.apply(this, arguments);
        }
    };

    wrapper.cancel = () => {
        callback = () => {
            throw new Error('Canceled');
        };
    };

    wrapper.isCancelled = (() => callback === null);

    return wrapper;
};

export default cancelabelCallback;
