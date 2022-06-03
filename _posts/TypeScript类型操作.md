---
title: TypeScript类型操作
date: 2022-05-28
excerpt: 根据TypeScript官方文档学习TS类型操作的笔记。
category: Tech
tags: 
  - TypeScript
---

TypeScript的类型系统非常强大，因为它允许用其他类型来表达类型。 这个想法最简单的形式是泛型，我们实际上有各种各样的类型运算符可供使用。也可以用我们已经拥有的值来表示类型。 通过组合各种类型的操作符，我们可以用简洁、可维护的方式表达复杂的操作和值。

## 泛型

### Hello World

用一个恒等函数来展示泛型，返回输入的任何任何类型的参数。

```ts
function identity<Type>(arg: Type): Type {
  return arg
}
```

虽然使用`any`也是可行的，它能接受任何类型的参数，但是在返回时却丢失了类型信息。如果传入的参数是`number`，我们所知的只是返回值可能是任意类型。

使用泛型，可以让我们捕捉到参数类型，并用它来表示返回值。这里我们使用了 _类型变量_: 一种特殊的变量，作用于类型而不是值，变量名称可以为任意。

这样在恒等函数里输入的参数类型为`number`，返回值类型便为`number`，参数类型为`string`，返回值类型便为`string`。

### 泛型类型

下面会展示函数自身的类型和如何创建泛型接口（generic interface）。

泛型函数的类型和非泛型函数一样，类型参数在前，类似于函数声明：

```ts
function identity<Type>(arg: Type): Type {
  return arg
}
let myIdentity: <Type>(arg: Type) => Type = identity
```

或者已对象字面量类型：

```ts
function identity<Type>(arg: Type): Type {
  return arg
}
let myIdentity: { <Input>(arg: Input): Input } = identity
```

接下来根据上面示例写第一个泛型接口：

```ts
interface GenericIdentityFn {
  <Type>(arg: Type): Type
}

function identity<Type>(arg: Type): Type {
  return arg
}

let myIdentity: GenericIdentityFn = identity

let yourIdentity: GenericIdentityFn<number> = identity  // 指定类型
```

### 泛型类

泛型类具有与泛型接口相似，泛型类在类名称后面的尖括号 (<>) 中有一个泛型类型参数列表。

```ts
class GenericNumber<NumType> {
  zeroValue: NumType
  add: (x: NumType, y: NumType) => NumType
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {
  return x + y
}
```

### 泛型约束

```ts
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length)
  //报错 Property 'length' does not exist on type 'Type'.
  return arg
}
```

在上面的例子中，我们想获取arg的`length`属性，但编译器认为不是所有的类型都有`length`属性，所以警告我们不能做出这个假设。

我们不想使用任何类型，而是希望将此函数限制为使用具有`length`属性的属性。可以使用`interface`接口和`extends`关键字来表示约束。

```ts
interface Lengthwise {
  length: number
}

function logginIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length)
  return arg
}

loggingIdentity(3)
// 报错，Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.

loggingIdentity({ length: 10, value: 3 })
```

### 在泛型约束中使用类型参数

你可以声明受另一个类型参数约束的类型参数。比如：我们想从一个对象中获取指定名称的属性，并确保不会抓取到在`obj`上不存在属性，所以在这两个类型间放置一个约束：

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}
let x = { a: 1, b: 2, c: 3 }
getProperty(x, 'a')   // 1
getProperty(x, 'm')   // 报错，Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c".
```

### 在泛型中使用Class类型

在 TypeScript 中使用泛型创建工厂时，需要通过其构造函数引用类类型。例如:

```ts
function create<Type>(c: { new (): Type }): Type {
  return new c()
}
```
使用原型属性来推断和约束构造函数和类类型的实例之间的关系。

```ts
class BeeKeeper {
  hasMask: boolean = true
}
 
class ZooKeeper {
  nametag: string = "Mikle"
}
 
class Animal {
  numLegs: number = 4
}
 
class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper()
}
 
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper()
}
 
function createInstance<A extends Animal>(c: new () => A): A {
  return new c()
}
 
createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask
```

## `keyof` 类型操作符

`keyof` 操作符接收一个对象类型中，并产生根据其键（key）的字符串或数字
的联合（union）类型。

```ts
type Point = { x: number, y: number }
type P = keyof Point  
// type P = 'x' | 'y'

type Arrayish = { [n: number]: unknown }
type A = keyof Arrayish
// type A = number

type Mapish = { [k: string]: boolean }
type M = keyof Mapish
// type M = string | number
```

上面例子中，`M`是`string | number`，这是因为JavaScript对象的键总是会被转成一个字符串，所以`obj[0]`与`obj['0']`是一样的。

当与映射类型结合使用时，keyof 类型变得特别有用。

## `typeof`类型操作符

