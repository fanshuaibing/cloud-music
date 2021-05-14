import React, { useEffect, useRef, useState } from "react";
import Scroll from "../scroll";
import { List, ListItem } from "./style";

export const Horizen = (props) => {
  const [refreshCategoryScroll, setRefreshCategoryScroll] = useState(false);
  const Category = useRef(null);
  const { list, oldVal, title } = props;
  const { handleClick } = props;

  useEffect(() => {
    let categoryDOM = Category.current;
    let tagElems = categoryDOM.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElems).forEach((ele) => {
      totalWidth += ele.offsetWidth;
    });
    totalWidth += 2;
    categoryDOM.style.width = `${totalWidth}px`;
    setRefreshCategoryScroll(true);
  }, [refreshCategoryScroll]);

  return (
    <Scroll direction="horizental">
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {list.map((item) => {
            return (
              <ListItem
                key={item.key}
                className={`${oldVal === item.key ? "selected" : ""}`}
                onClick={() => handleClick(item.key)}
              >
                {item.name}
              </ListItem>
            );
          })}
        </List>
      </div>
    </Scroll>
  );
};

// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法

Horizen.defaultProps = {
  list: [],
  oldVal: "",
  title: "",
  handleClick: null,
};

Horizen.propTypes = {};
