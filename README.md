# Words-away-simplified
## 这个东西是干什么的？
一个文本处理工具，用于防止对文本的敏感词检测。主要是因为酷安的折叠词太过蜜汁，**例如“申诉”也会被折叠（doge）**所以就有了这个工具。

设计目标为酷安，理论上所有完整支持Unicode的社区等 都能够使用，但效果不确定。实测对[网易易盾](https://dun.163.com/product/text-detection)的文本检测API有一定效果。

这是网页版，目前还有处于开发阶段的[Android版本](https://github.com/NitroRCr/WordsAway_Android)

## 注意
这是二刺螈化的精简版本，适合嵌入式系统部署。[演示站点](https://pan.fumiama.top:8845)

## 原理：
以下是不同选项的原理

+ 普通模式：在相隔的两个字符之间插入Unicode零宽间隔符（[U+200B](https://unicode.org/cldr/utility/character.jsp?a=200B)）以规避检测。
+ 每行双重反转模式：将一行内所有文字顺序反转（物理）再加入Unicode反转控制符([U+202E](https://unicode.org/cldr/utility/character.jsp?a=202E))从而实现增强的规避检测。
+ 每两字反转模式：另一种增强模式，这里不作过多解释~~（其实是懒）~~
+ 转为竖向排列：纯“物理”的处理方法，不使用`Unicode`控制符，仅把文本转为竖向排列。
+ 规避中括号和链接：遇到中括号和链接时不进行处理，以兼容表情符号和链接。
+ 同形字母替换：将部分普通拉丁文字母替换为其他语言中外形相同的字母
+ 链接转短链接：使用[is.gd](https://is.gd)的`API`，将文本中的`http/https`链接替换短连接，以避开对链接的域名检测



### Example

以下展示了大致的处理方法

- 零宽间隔

```
"ABCD" => "A\u200bB\u200bC\u200bD\u200b"
```

- 每行双重反转

```
"ABCD" => "\u202eDCBA"
```

- 每两字双重反转

```
"ABCDEF" => "\u200eA\u202eC\u200bB\u202c\u200eD\u202eF\u200bE\u202c"
```

看详细原理的话，翻源码吧（没写注释别打我）

## 隐私：

基于JavaScript的网页实现，仅运行在浏览器端，不会将数据传到服务器~可以放心使用
## 已实现/将实现的功能：
+ [x] 增强模式
+ [x] 自动判断链接并绕行
+ [x] 竖向排列模式
+ [x] 更好看的界面
+ [x] Android APP
+ [x] 还原模式
## 已知的问题：
+ 由于U+202E的特性，用每行双重反转模式处理之后，当一行文本以多行的形式显示时，那几行的顺序会反转，暂时无法解决
+ 由于U+202E的特性，用每两字双重反转模式处理之后，当一行文本以多行的形式显示时，有三分之一的概率 上一行的最后一字与下一行的第一个字位置交换。暂时无法解决
## 使用：
+ [在线网页](https://wordsaway.krytro.com)
+ [Android应用](https://github.com/NitroRCr/WordsAway_Android)
>1. 打开网页或应用
>2. 输入或粘贴需要处理的文本  
>3. 根据需要选中相应的选项。  
>4. 处理，复制  
>5. 粘贴到酷安，能够正常发布（大多数情况）  
## 免责声明：
**过于敏感的词语即使反转也会被检测到**，因此这个工具并不是万能的  
另外虽然Unicode控制符不会被机器检测，**但是酷安小编本人说过用Unicode控制符发送严重违规消息直接永封不解。**  
因此虽然这是个好东西但是切勿滥用，*不然到时候某一天酷安算法可以识别控制符了对谁都不好*  

