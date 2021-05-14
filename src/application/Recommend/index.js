import React, { useEffect } from "react";
import Slider from "../../components/Slider";
import RecommendList from "../../components/RecommendList";
import { Content, EnterLoading } from "./style";
import Scroll from "../../baseUI/scroll";
import { connect } from "react-redux";
import * as actionTypes from "./store/actionCreators";
import Loading from "../../baseUI/loading";

const Recommend = (props) => {
  const { bannerList, recommendList, enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];
  return (
    <div>
      <Content>
        <Scroll>
          <div>
            <Slider bannerList={bannerListJS} />
            <RecommendList recommendList={recommendListJS} />
          </div>
        </Scroll>
        {enterLoading ? (
          <EnterLoading>
            <Loading />
          </EnterLoading>
        ) : null}
      </Content>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
  enterLoading: state.getIn(["recommend", "enterLoading"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
