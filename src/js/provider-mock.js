const PAGE_SIZE = 2;

const data = [
    { id: 1, type: 'food', name: 'Батон', price: 20},
    { id: 2, type: 'food', name: 'Молоко', price: 60},
    { id: 3, type: 'common', name: 'Батарейки', price: 50},
    { id: 4, type: 'pet', name: 'Кошачий корм', price: 1000},
    { id: 5, type: 'luxary', name:  'Черная икра', price: 15000}
];

const provider = (url, params) => {
    var items = [].concat(data);

    if (params.filter_by) {
        items = items.filter((item) => item[params.filter_by] === params.filter_value);
    }

    if (params.sort_key) {
        const factor = params.sort_order === 'desc' ? -1 : 1;
        items.sort((item1, item2) => item1[params.sort_key] > item2[params.sort_key] ? factor : -factor);
    }

    var page = params.page || 1;
    var totalCount = items.length;

    return new Promise((resolve) => {
        resolve({
            items: items.splice((page - 1) * PAGE_SIZE, PAGE_SIZE),
            pagination: {
                current_page: page,
                next_page: page * PAGE_SIZE < totalCount ? ++page : null,
                total_pages: Math.ceil(totalCount / PAGE_SIZE),
                total_entries: totalCount
            }
        });
    });
};

export default provider;



