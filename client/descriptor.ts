// // 测试装饰器
//
// function ClassTest(s: string) {
//     return target => {
//         console.log("类装饰器:", s)
//     }
// }
//
// function ChengTest(s: string) {
//     return (target, name) => {
//         console.log("成员装饰器:", s)
//     }
// }
//
//
// function FunTest(s: string) {
//     return (target, method, descriptor) => {
//         console.log("拿参数装饰器的",target.param)
//         let value = descriptor.value;
//         console.log("方法装饰器:", s)
//         descriptor.value = function (a, b){
//             if(target.param.lenght > 0){
//                 target.param.forEach(f => {
//                     f(a)
//                 })
//             }
//
//             console.log("运行：方法装饰器", s)
//             return value.call(this,a,b)
//         }
//     }
// }
//
//
// function ParamTest(s: string) {
//     return (target, method, index) => {
//         console.log("参数装饰器:", s)
//         target.param = function NumberADD(n){
//             return n + 1;
//         };
//     }
// }
//
// @ClassTest("Test类")
// class Test {
//
//     @ChengTest("成员1-顺位1")
//     @ChengTest("成员1-顺位2")
//     props: string
//
//     @ChengTest("成员2-顺位1")
//     props2: string
//
//     @FunTest("方法1-顺位1")
//     @FunTest("方法1-顺位2")
//     fn1(@ParamTest("方法1-参数顺位1") a: any, @ParamTest("方法1-参数顺位2") b: any) {
//         console.log("结果", a, b)
//     }
//
//     @FunTest("方法2-顺位1")
//     fn2(@ParamTest("函数2- 参数顺位1") a: any) {
//
//     }
// }
//
// const a = new Test();
// console.log("---------------------------------------")
// a.fn1(1,2);
//
