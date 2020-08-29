## 问题：为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

## 解析

定义： ::first-line CSS pseudo-element （CSS 伪元素）在某 block-level element （块级元素）的第一行应用样式。第一行的长度取决于很多因素，包括元素宽度，文档宽度和文本的文字大小。

1、因为诸如 display,float 这样的属性，会破坏围文档流，而 first-line，是要找到块级元素第一行的元素，设置之后，原第一行就可能会存在重叠问题
