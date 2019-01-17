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

       function execute(iterator, data){
        const {done, value} = iterator.next(data);
  
        if (!done) {
          if (value instanceof Promise) {
            value.then(
              result => {
                arr.push(result);
                execute(iterator, result);
              });
          } else if (typeof value === 'function') {
            const data = value();
            arr.push(data);
            execute(iterator, data);
          } else {
            arr.push(value);
            execute(iterator, value);
          }
        } 
        else {
          resolve(arr);
        }
      }

    });
  }

  runner(gen()).then(data => console.log(data.pop() === '441,2,3,4' ? "Good Job" : "You are fail this task"));
