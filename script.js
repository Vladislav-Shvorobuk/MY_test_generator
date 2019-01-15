function sum(a, b) {
    return a + b;
}

let val_2 = new Promise(res => setTimeout(res(10), 1000));
let val_3 = 20;
let val_4 = { name: 'Ivan' };

function* gen() {
    const a = yield () => sum(1, 2);
    const b = yield val_2;
    const c = yield val_3;
    const d = yield val_4;
    console.log(a, b, c, d);
}

let iterator = gen();

function runner(iterator) {

    let arr = [];
    let item = null;
    let data = iterator.next();

    while (!data.done) {
        if (typeof data.value === 'function') {
            item = data.value();
        } else {
            item = data.value;
        }

        arr.push(item);
        data = iterator.next(item);
    }

    arr.forEach((item, i) => {
        if (item instanceof Promise) {
            item.then(data => arr[i] = data);
        }
    });

    return Promise.resolve(arr);
}

runner(iterator).then(data => console.log(data)); // 3, 10, 20, {name: 'ivan'}

