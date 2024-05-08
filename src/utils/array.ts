// 数组移动方法
export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArray = array.slice(); // 深拷贝数组
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]) // splice方法允许反向操作

  return newArray;

  // var arr = [1, 2];
  // arrayMove(arr, 1, 0);
  // 先执行第二个splice方法（此时会返回新数组），最后执行：[1].splice(0,0,2)

}

