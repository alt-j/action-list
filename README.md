## Action List

Пример использования:

```html
# index.html

<ul id="action-list">
  <li data-type="food" data-price="20">Батон</li>
  <li data-type="common" data-price="50">Батарейки</li>
  <li data-type="food" data-price="65">Молоко</li>
</ul>

<ul id="remote-action-list" data-source="//api.example.com/items" data-template="my_template">
</ul>

# app.js

let action_list = new ActionList(document.getElementById("action-list"))

let remote_action_list = new ActionList(document.getElementById("remote-action-list"))
```

При работе с внешними данными (remote-action-list) для рендеринга элементов используется функция-шаблонизатор, имя шаблона передается через `data-template`.

Сервер возвращает JSON массив объектов и поддерживает постраничную выдачу результатов.

### Возможности

1. Сортировка элементов по одному ключу.

```js
action_list.sort('price', 'asc')
```

2. Фильтрация элементов.

```js
action_list.filter('type', 'food')
```

Операции можно комбинировать.

### Работа с _постраничными_ данными

Метод `action_list.next_page` должен загружать следующую страницу с данными.

В случае, когда данные загружаются с сервера, сортировка и фильтрация происходит на стороне сервера (запросы `?sort_key=price&sort_order=asc` и `?filter_by=type&filter_value=food`).

При этом необходимо отслеживать, когда загружены все страницы, и _переключать_ список на локальную работу с данными.

**Пример.**

Пусть есть 5 элементов:

```js
data =[
{ id: 1, type: 'food', name: 'Батон', price: 20},
{ id: 2, type: 'food', name: 'Молоко', price: 60},
{ id: 3, type: 'common', name: 'Батарейки', price: 50},
{ id: 4, type: 'pet', name: 'Кошачий корм', price: 1000},
{ id: 5, type: 'luxary', name:  'Черная икра', price: 15000}
]
```

и размер страницы 2 элемента. Тогда

```js

// инициализируем список и загружаем первые два элемента
action_list = new ActionList(...)

// загружаем следующую страницу
action_list.next_page()

// в списке теперь 4 элемента

// делаем сортировку – происходит запрос на сервер
action_list.sort('price', 'desc')
// в списке снова два элемента (с id 5 и 4)

// делаем фильтрацию – снова запрос на сервер
action_list.filter('type', 'food')

// в списке два элемента (id 2 и id 1), больше страниц нет
// снова делаем сортировку – в этот раз запрос не происходит, так как у нас есть все элементы, удовлетворяющие условиям
action_list.sort('price', 'asc')

// отменяем фильтр – происходит запрос
action_list.filter(null)

// в списке два элемента (id 1 и id 3)
```
