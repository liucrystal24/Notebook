# 剑指Offer
## Easy :star:
### 1. 构建乘积数组

>给定一个数组A[0,1,...,n-1],请构建一个数组B[0,1,...,n-1]。  
>其中B中的元素B[i]=A[0] * A[1] * ... * A[i-1] * A[i+1] * ... * A[n-1]。不能使用除法。  
>（注意：规定B[0] = A[1] * A[2] * ... * A[n-1]，B[n-1] = A[0] * A[1] * ... * A[n-2];）  

- 思路1:

  !['构建乘积数组'](img/E1.jpg)

  **将B[ i ] 以 A[ i ] 为中间值，拆解为两边的乘积, B[ i ] = C[ i ] * D[ i ]**
  **:pushpin: C[ i ] :**
  C[ 0 ] = 1
  C[ 1 ] = A[ 0 ]
  C[ 2 ] = A[ 0 ] * A[ 1 ] = C[ 1 ] * A[ 1 ]
  C[ 3 ] = A[ 0 ] * ... * A[ 2 ] = C[ 2 ] * A[ 2 ]
  ……
  :point_right: C[ i ] = C [ i-1 ] * A[ i-1 ]

  **:pushpin: D[ i ] :**
  D[ n-1 ] = 1
  D[ n-2 ] = A[ n-1 ]
  D[ n-3 ] = A[ n-1 ] * A[ n-2 ] = D[ n-2 ] * A[ n-2 ]
  D[ n-4 ] = A[ n-1 ] * ... * A[ n-3 ] = D[ n-3 ] * A[ n-3 ]
  ……
  :point_right: D[ n-i ] = D[ n-i+1 ] * A [ n-i+1 ]
  
  ```js
  function multiply(array) {
  // 计算 C[i] -> res
  let res = [];
  res[0] = 1;
  for (let i = 1; i < array.length; i++) {
    res[i] = res[i - 1] * array[i - 1];
  }
  // 计算 D[i] -> temp
  let temp = 1;
  for (let j = array.length - 2; j >= 0; j--) {
    temp *= array[j + 1];
    res[j] *= temp;
  }
  return res;
  }
  ```
- 思路2:

  **B[ i ]是除了 A[ i ]的A数组其他元素乘积，隐私筛选出 A[ i ]**

  ```js
  function multiply(array) {
    let res = [];
    for (let i = 0; i < array.length; i++) {
      let temArr = array.filter((val, index) => index !== i);
      let temp = 1;
      temArr.map((val) => (temp *= val));
      res.push(temp);
    }
    return res;
  }
  ```

### 2. 正则表达式匹配
>请实现一个函数用来匹配包括 ' . ' 和 ' * ' 的正则表达式。  
>模式中的字符 ' . ' 表示任意一个字符，而 ' * ' 表示它前面的字符可以出现任意次（包含0次）。   
>在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配。

- 思路:
  看匹配字符的下一位是否是 ' * ', 利用递归思想，比较当前位置字符。

  假设 `s` : 完整字符串, `p` : 匹配字符串 , `si` : s 当前位置, `pi` : p 当前位置。
  
  1. 如果 p 下一位是 ' * '
     - 如果 s, p 当前位置字符相同 或 ( p 当前位置是 ' . ' 且 s 此时不是最后一位)  
     
      :point_right: `si + 1`, `pi + 1` (s 中 有多位和 p 中 * 前字符相同)  
      
      :point_right: `si` 不变, `pi + 2` (s 中 已找完所有与 p 中 * 前相同字符)
      
     - 否则 `si` 不变, `pi + 2` (s 中有 0 位 和 p 中 * 前字符相同)
     
  2. 如果 p 下一位不是 ' * '
  
     - 如果 s, p 当前位置字符相同 或 ( p 当前位置是 ' . ' 且 s 此时不是最后一位)  
     
      :point_right: `si + 1`, `pi + 1` ( 直接比较下一位 )
      
     - 否则 返回 false;  


  ```js
  function match(s, p) {
    if (s == null || p == null) return false;
    return matchCore(s, p, 0, 0);
  }

  function matchCore(s, p, si, pi) {
    // 比到最后一位都相同，返回 true
    if (s.length == si && p.length == pi) return true;
    // 比到 s后还有字符,p 已经空，则肯定不匹配，返回 false
    if (s.length != si && p.length == pi) return false;
    if (p[pi + 1] == "*") {
      if ( p[pi] == s[si] || (p[pi] == "." && si != s.length) ) {
        // 比完 * 前多位相同字符，则 p 中 pi + 2
        return (
          matchCore(s, p, si + 1, pi) ||
          matchCore(s, p, si, pi + 2)
        );
      } else {
        // * 前为 0 位相同是，直接 pi + 2
        return matchCore(s, p, si, pi + 2);
      }
    }
    if ( s[si] == p[pi] || (p[pi] == "." && si != s.length) )
      //相同直接 各进一位
      return matchCore(s, p, si + 1, pi + 1);
    return false;
  }
  ```
