const PAGE_SIZE = 2;

const data = [
    {id: 1, type: 'food', name: 'Батон', price: 20},
    {id: 2, type: 'food', name: 'Молоко', price: 60},
    {id: 3, type: 'common', name: 'Батарейки', price: 50},
    {id: 4, type: 'pet', name: 'Кошачий корм', price: 1000},
    {id: 5, type: 'luxary', name: 'Черная икра', price: 15000}
];

const provider = (url, params) => {
    let items = [].concat(data);

    if (params.filterBy) {
        items = items.filter((item) => item[params.filterBy] === params.filterValue);
    }

    if (params.sortKey) {
        const factor = params.sortOrder === 'desc' ? -1 : 1;
        items.sort((item1, item2) => item1[params.sortKey] > item2[params.sortKey] ? factor : -factor);
    }

    let page = params.page || 1;
    const totalCount = items.length;

    return new Promise((resolve) => {
        resolve({
            items: items.splice((page - 1) * PAGE_SIZE, PAGE_SIZE),
            pagination: {
                currentPage: page,
                nextPage: page * PAGE_SIZE < totalCount ? ++page : null,
                totalPages: Math.ceil(totalCount / PAGE_SIZE),
                totalEntries: totalCount
            }
        });
    });
};

export default provider;
