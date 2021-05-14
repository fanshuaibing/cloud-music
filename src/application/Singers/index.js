import React, { useEffect, useRef, useState } from "react";
import { Horizen } from "../../baseUI/horizen-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import Scroll from "../../baseUI/scroll";
import { List, ListContainer, ListItem, NavContainer } from "./style";
import LazyLoad, { forceCheck } from "react-lazyload";
import { renderRoutes } from "react-router-config";
import {
  changeAlpha,
  changeCategory,
  changeListOffset,
  changePullDownLoading,
  changePullUpLoading,
  getHotSingerList,
  getSingerList,
  refreshMoreHotSingerList,
  refreshMoreSingerList,
} from "./store/actionCreators";
import { connect } from "react-redux";
import { EnterLoading } from "../Recommend/style";
import Loading from "../../baseUI/loading";

const Singers = (props) => {
  const scrollRef = useRef(null);

  const {
    singerList,
    category,
    alpha,
    pageCount,
    pullUpLoading,
    pullDownLoading,
    enterLoading,
  } = props;
  console.log(pageCount);
  const {
    getHotSinger,
    updateCategory,
    updateAlpha,
    pullUpRefresh,
    pullDownRefresh,
  } = props;
  useEffect(() => {
    if (!singerList.length && !category && !alpha) {
      getHotSinger();
    }
    // eslint-disable-next-line
  }, []);

  const enterDetail = (id) => {
    props.history.push(`/singers/${id}`);
  };

  const handlePullUp = () => {
    pullUpRefresh(category === "", alpha);
  };

  const handlePullDown = () => {
    pullDownRefresh(category, alpha);
  };

  const handleUpdateCategory = (newVal) => {
    if (category === newVal) return;
    updateCategory(newVal);
    scrollRef.current.refresh();
  };

  const handleUpdateAlpha = (newVal) => {
    if (alpha === newVal) return;
    updateAlpha(newVal);
    scrollRef.current.refresh();
  };

  const renderSingerList = () => {
    console.log(props.singerList);
    const singerList = props.singerList.toJS();
    return (
      <List>
        {singerList.map((item, index) => {
          return (
            <ListItem key={item.accountId + "" + index}>
              <div className="img_wrapper">
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          oldVal={category}
          handleClick={(val) => handleUpdateCategory(val)}
          title={"分类 (默认热门):"}
        />
        <Horizen
          list={alphaTypes}
          oldVal={alpha}
          handleClick={(val) => handleUpdateAlpha(val)}
          title={"首字母:"}
        />
      </NavContainer>
      <ListContainer>
        <Scroll
          onScroll={forceCheck}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          ref={scrollRef}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
      {/* 入场加载动画 */}
      {enterLoading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}
      {renderRoutes(props.route.routes)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  alpha: state.getIn(["singers", "alpha"]),
  category: state.getIn(["singers", "category"]),
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSinger() {
      dispatch(getHotSingerList());
    },
    updateCategory(newVal) {
      dispatch(changeCategory(newVal));
      dispatch(getSingerList());
    },
    updateAlpha(newVal) {
      dispatch(changeAlpha(newVal));
      dispatch(getSingerList());
    },
    // 滑到最底部刷新部分的处理
    pullUpRefresh(hot) {
      dispatch(changePullUpLoading(true));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList());
      }
    },
    //顶部下拉刷新
    pullDownRefresh(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changeListOffset(0));
      if (category === "" && alpha === "") {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList());
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
