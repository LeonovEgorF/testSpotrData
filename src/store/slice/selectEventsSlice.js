import { createSlice } from "@reduxjs/toolkit";

const selectEventsSlice = createSlice({
  name: "selectEvents",
  initialState: {
    selectEvents: {},
  },
  reducers: {
    setSelectEvents: (state, action) => {
      const { tournament, checked } = action.payload;
      const updSelect = { ...state.selectEvents };
      if (!checked) {
        for (let key in updSelect) {
          if (tournament[key] || key === tournament.titleTourId) {
            delete updSelect[key];
          }
        }
      } else {
        if (tournament.titleTourId) {
          updSelect[tournament.titleTourId] = tournament;
        } else {
          Object.assign(updSelect, tournament);
        }
      }
      state.selectEvents = updSelect;
    },
    setStatusStake(state, action) {
      state.selectEvents = Object.entries(state.selectEvents).map(
        ([sport, sportValue]) => {
          return {
            ...sportValue,
            events: sportValue.events.map((item) => {
              return {
                ...item,
                group_markets: {
                  ...item.group_markets,
                  stakesSort: Object.entries(
                    item.group_markets.stakesSort
                  ).reduce((acc, [key, value]) => {
                    acc[key] = Object.entries(value).reduce(
                      (innerAcc, [key1, item1]) => {
                        if (action.payload.idStake === "all") {
                          innerAcc[key1] = {
                            ...item1,
                            isActive: action.payload.statusStake,
                          };
                          return innerAcc;
                        }
                        if (item1.id === action.payload.idStake) {
                          innerAcc[key1] = {
                            ...item1,
                            isActive: action.payload.statusStake,
                          };
                          return innerAcc;
                        }
                        innerAcc[key1] = { ...item1 };
                        return innerAcc;
                      },
                      {}
                    );
                    return acc;
                  }, {}),
                },
              };
            }),
          };
        }
      );
    },
    clearSelectedEvents: (state) => {
      state.selectEvents = {};
    },
  },
});

export const { setSelectEvents, clearSelectedEvents, setStatusStake } =
  selectEventsSlice.actions;

export default selectEventsSlice.reducer;
