import * as actionTypes from "./constants";
import { fromJS } from "immutable";
import {
  getBannerRequest,
  getRecommendListRequest,
} from "../../../api/request";

const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data),
});

const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data),
});

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
});

const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest()
      .then((data) => {
        const action = changeBannerList(data.banners);
        dispatch(action);
      })
      .catch((err) => {
        console.log("轮播图数据传输错误");
      });
  };
};

const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then((data) => {
      dispatch(changeRecommendList(data.result));
      dispatch(changeEnterLoading(false));
    });
  };
};

export {
  getBannerList,
  getRecommendList,
  getBannerRequest,
  getRecommendListRequest,
};
