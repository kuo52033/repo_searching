import { useEffect, useReducer, useRef } from "react";
import axios from "axios";

import { ACTION } from "../Constants";

const initialState = {
  repos: [],
  loading: false,
  error: false,
  noMore: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOADING:
      return { ...state, loading: true, error: false, noMore: false };
    case ACTION.GET_REPOS:
      return {
        ...state,
        repos: [...state.repos, ...action.payload],
        loading: false,
      };
    case ACTION.NOT_FOUND:
      return { ...state, loading: false, error: true };
    case ACTION.CLEAN:
      return initialState;
    case ACTION.NO_MORE_REPO:
      return { ...state, loading: false, noMore: true };
    default:
      return state;
  }
};

const useFetchRepo = (searchTerm, params, page) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const preSearchTerm = useRef();

  useEffect(() => {
    //if searchTerm or filters change, clean the repos
    dispatch({ type: ACTION.CLEAN });
  }, [searchTerm, params]);

  useEffect(() => {
    const controller = new AbortController();
    let timer;

    const fetchRepo = async () => {
      try {
        dispatch({ type: ACTION.LOADING });
        const { data } = await axios.get(
          `https://api.github.com/orgs/${searchTerm}/repos`,
          {
            headers: {
              accept: "application/vnd.github.v3+json",
              authorization: `token ${process.env.REACT_APP_AUTHTOKEN}`,
            },
            params: {
              per_page: 15,
              page,
              ...params,
            },
            signal: controller.signal,
          }
        );
        if (data.length === 0) {
          dispatch({ type: ACTION.NO_MORE_REPO });
        } else {
          dispatch({ type: ACTION.GET_REPOS, payload: data });
        }
      } catch (error) {
        if (error.message !== "canceled") dispatch({ type: ACTION.NOT_FOUND });
      }
    };

    if (searchTerm) {
      if (preSearchTerm.current === searchTerm) {
        //if filters change, no debounce
        fetchRepo();
      } else {
        //debounce
        timer = setTimeout(() => {
          fetchRepo();
        }, 500);
      }
    }

    preSearchTerm.current = searchTerm;

    return () => {
      clearTimeout(timer);
      //abort previous request
      controller.abort();
    };
  }, [page, params, searchTerm]);

  return state;
};

export default useFetchRepo;
