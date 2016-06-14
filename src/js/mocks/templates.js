const template = (items) => {
    return items
        .map((item) => {
            const li = document.createElement('li');

            li.dataset.type = item.type;
            li.dataset.price = item.price;

            li.innerHTML = item.name;

            return li.outerHTML;
        })
        .join('');
};

/* eslint camelcase: "off" */
export default {my_template: template};
