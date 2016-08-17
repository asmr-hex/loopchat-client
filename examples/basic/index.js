import {test, TestClass} from '../../src/lib.core.js'


export function Basic() {
    (()=>{console.log(__dirname + "Testing ")})()
    test()


    console.log(new TestClass())
    // instantiate hands
    let testClass = new TestClass();
}
