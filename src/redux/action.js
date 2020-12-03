export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

//https://www.jianshu.com/p/99d5f3046dd5  redux学习
export const increment = (val) => ({type: INCREMENT, val})
export const decrement = () => ({type: DECREMENT})
export const addRoute = (value) => ({type: 'ADD-ROUTERS', value})