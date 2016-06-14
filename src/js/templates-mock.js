const template = (items) => {
    return items
        .map((item) => {
            let li = document.createElement('li');

            li.dataset.type = item.type;
            li.dataset.price = item.price;

            li.innerHTML = item.name;

            return li.outerHTML;
        })
        .join('');
};

export default {my_template: template};
