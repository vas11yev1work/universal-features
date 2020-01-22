const IndexedArray = new Proxy(Array, {
    construct(target, [args]) {
        const index = {}
        args.forEach(item => (index[item.id] = item));
  
        return new Proxy(new target(...args), {
            get(arr, prop) {
                switch (prop) {
                    case 'push':
                        return item => {
                            index[item.id] = item;
                            arr[prop].call(arr, item);
                        }
                    case 'findById':
                        return id => index[id];
                    default:
                        return arr[prop];
                };
            }
        });
    }
})
  
const users = new IndexedArray([
    { id: 'id499394', name: 'Lena', age: 25 },
    { id: 'id499395', name: 'Oled', age: 22 },
    { id: 'id499396', name: 'Dima', age: 23 },
    { id: 'id499397', name: 'Vika', age: 24 }
]);