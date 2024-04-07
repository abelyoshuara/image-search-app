/**
 * test scenario for photosReducer
 *
 * - photosReducer function:
 *  - should return the initial state
 *  - should return the photos with the update state when given by SUCCESS_SEARCH_PHOTO action
 *  - should return the photos with the update state when given by FAIL_SEARCH_PHOTO action
 *  - should return the photos with the update state when given by SET_IS_LOADING action
 *  - should return the photos with the update state when given by CLEAR action
 *
 */

import { Action, initialPhotos, photosReducer } from "./photos";

describe("photosReducer function", () => {
  it("should return the initial state", () => {
    const initialState = {
      data: [],
      totalPages: 0,
      isLoading: false,
      error: "",
    };
    expect(initialPhotos).toEqual(initialState);
  });

  it("should return the photos with the update state when given by SUCCESS_SEARCH_PHOTO action", () => {
    const action = {
      type: "SUCCESS_SEARCH_PHOTO",
      payload: {
        data: [
          {
            id: "cssvEZacHvQ",
            urls: {
              small:
                "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjEyNjB8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNzEyNDUxNjc4fDA&ixlib=rb-4.0.3&q=80&w=400",
            },
            alt_description:
              "gray concrete bridge and waterfalls during daytime",
          },
          {
            id: "01_igFr7hd4",
            urls: {
              small:
                "https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjEyNjB8MHwxfHNlYXJjaHwyfHxuYXR1cmV8ZW58MHx8fHwxNzEyNDUxNjc4fDA&ixlib=rb-4.0.3&q=80&w=400",
            },
            alt_description: "bird's eye view photograph of green mountains",
          },
        ],
        totalPages: 2,
      },
    } as Action;

    const nextState = photosReducer(initialPhotos, action);

    if (action.type === "SUCCESS_SEARCH_PHOTO" && action.payload) {
      expect(nextState).toEqual({
        ...initialPhotos,
        data: action.payload.data,
        totalPages: action.payload.totalPages,
      });
    } else {
      assert.fail("Invalid action type or missing payload");
    }
  });

  it("should return the photos with the update state when given by FAIL_SEARCH_PHOTO action", () => {
    const action = {
      type: "FAIL_SEARCH_PHOTO",
      payload: {
        error: "Something went wrong!",
      },
    } as Action;

    const nextState = photosReducer(initialPhotos, action);

    if (action.type === "FAIL_SEARCH_PHOTO" && action.payload) {
      expect(nextState).toEqual({
        ...initialPhotos,
        error: action.payload.error,
      });
    } else {
      assert.fail("Invalid action type or missing payload");
    }
  });

  it("should return the photos with the update state when given by SET_IS_LOADING action", () => {
    const action = {
      type: "SET_IS_LOADING",
      payload: {
        isLoading: true,
      },
    } as Action;

    const nextState = photosReducer(initialPhotos, action);

    if (action.type === "SET_IS_LOADING" && action.payload) {
      expect(nextState).toEqual({
        ...initialPhotos,
        isLoading: action.payload.isLoading,
      });
    } else {
      assert.fail("Invalid action type or missing payload");
    }
  });

  it("should return the photos with the update state when given by CLEAR action", () => {
    const initialState = {
      data: [
        {
          id: "cssvEZacHvQ",
          urls: {
            small:
              "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjEyNjB8MHwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNzEyNDUxNjc4fDA&ixlib=rb-4.0.3&q=80&w=400",
          },
          alt_description: "gray concrete bridge and waterfalls during daytime",
        },
        {
          id: "01_igFr7hd4",
          urls: {
            small:
              "https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjEyNjB8MHwxfHNlYXJjaHwyfHxuYXR1cmV8ZW58MHx8fHwxNzEyNDUxNjc4fDA&ixlib=rb-4.0.3&q=80&w=400",
          },
          alt_description: "bird's eye view photograph of green mountains",
        },
      ],
      totalPages: 2,
      isLoading: true,
      error: "Something went wrong!",
    };
    const action = { type: "CLEAR" } as Action;

    const nextState = photosReducer(initialState, action);

    if (action.type === "CLEAR") {
      expect(nextState).toEqual(initialPhotos);
    } else {
      assert.fail("Invalid action type");
    }
  });
});
