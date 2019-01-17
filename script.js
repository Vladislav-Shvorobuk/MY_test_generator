function sum() {
    console.log(1);
    return [].reduce.call(arguments, (acc, el) => acc+=el);
  }
  
  const prom = x => new Promise(res => {
    console.log(2);
    setTimeout(res,2000,x);
  })
  
  function pow() {
    console.log(3);
    return [].reduce.call(arguments, (acc, el) => acc*=el);
  }
  
  const arr = [1,2,3,4]
  
  function *gen() {
    const a = yield sum.bind(null, ...arr);
    const b = yield prom(a);
    const c = yield pow.bind(null, ...arr);
    const d = yield arr;
    yield a + b + c + d;
  }




function runner(iterator) {
    const arr = [];
  
    return new Promise( (resolve) => {


        execute(iterator);


       function execute(iterator, value){
        const next = iterator.next(value);
  
        if (!next.done) {
          if (next.value instanceof Promise) {
            next.value.then(
              result => {
                arr.push(result);
                execute(iterator, result)
              })
          } else if (typeof next.value === 'function') {
            arr.push(next.value());
            execute(iterator, next.value())
          } else {
            arr.push(next.value);
            execute(iterator, next.value);
          }
        } 
        else {
          resolve(arr);
        }
      }


    });
  }

  runner(gen()).then(data => console.log(data.pop() === '441,2,3,4' ? "Good Job" : "You are fail this task"))
