function match(selector, element) {
  const selectorArr = selector.split(" ");
  const dom = element;
  // 获得element 的层级数组
  const domArr = getDOMTree(dom, []);
  let flag = true;
  for (let i = 0; i < domArr.length; i++) {
    let selectorItem = null;
    if (selectorArr.length > 0) {
      selectorItem = selectorArr.pop();
      let parseSimple = parserSelector(selectorItem);
      //去重，看是否是包含关系
      let comClass = new Set(domArr[i].class.concat(parseSimple.class));
      if (
        parseSimple.tagName &&
        parseSimple.tagName.toUpperCase() !== domArr[i].tagName
      ) {
        flag = false;
      }
      if (
        (parseSimple.id && parseSimple.id !== domArr[i].id) ||
        comClass.size !== domArr[i].class.length
      ) {
        flag = false;
      }
    } else {
      break;
    }
  }

  return flag;
}
// 构造父级数组
const getDOMTree = (dom, tree) => {
  if (dom.tagName === "HTML") {
    tree.push({ tagName: dom.tagName });
  } else {
    const className = [];

    for (let item of dom.classList.values()) {
      className.push(item);
    }

    tree.push({
      tagName: dom.tagName,
      id: dom.id,
      class: className,
    });
    getDOMTree(dom.parentNode, tree);
  }
  return tree;
};
// 解析每一个层级筛选器，和属性是否完全匹配
const parserSelector = (selector) => {
  const simple = selector.match(/([#.a-zA-z]\w+)/g);
  let item = { id: null, class: [], tagName: "" };
  simple &&
    simple.forEach((it) => {
      if (it.charAt(0) === "#") {
        item.id = it.slice(1);
      } else if (it.charAt(0) === ".") {
        item.class.push(it.slice(1));
      } else {
        item.tagName = it;
      }
    });

  return item;
};
console.log(match("div #id.class", document.getElementById("id")));
