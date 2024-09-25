import { createSlice } from "@reduxjs/toolkit";

const tournamentSlice = createSlice({
  name: "selectTour",
  initialState: {
    tour: [],
  },
  reducers: {
    setTour: (state, action) => {
      const newState = [...state.tour, action.payload];
      const uniqueItems = [
        ...new Map(
          newState.map((item) => [JSON.stringify(item), item])
        ).values(),
      ];
      state.tour = uniqueItems;
    },
    editTourStatus: (state, action) => {
      console.log(action.payload);
      const { tournament, itemSport, checked } = action.payload;
      const tournamentId = tournament.titleTourId;
      const country = tournament.titleCountry;
      state.tour = state.tour.map((item) => {
        if (!item[itemSport]) {
          return item;
        }
        const sportKey = item[itemSport];
        if (sportKey[country] && sportKey[country].tournament[tournamentId]) {
          const tournamentUpdate = {
            ...sportKey[country].tournament[tournamentId],
            isSelected: checked,
          };
          return {
            ...item,
            [itemSport]: {
              ...sportKey,
              [country]: {
                ...sportKey[country],
                tournament: {
                  ...sportKey[country].tournament,
                  [tournamentId]: tournamentUpdate,
                },
              },
            },
          };
        }

        return item;
      });
    },

    clearTourActive: (state) => {
      state.tour = state.tour.map((item) => {
        const sportKey = Object.keys(item)[0];
        const updatedSport = {
          [sportKey]: Object.keys(item[sportKey]).reduce((acc, countryKey) => {
            const country = item[sportKey][countryKey];
            const updatedTournament = Object.keys(country.tournament).reduce(
              (tAcc, tournamentId) => {
                tAcc[tournamentId] = {
                  ...country.tournament[tournamentId],
                  isSelected: false,
                };
                return tAcc;
              },
              {}
            );
            acc[countryKey] = {
              ...country,
              tournament: updatedTournament,
            };
            return acc;
          }, {}),
        };

        return updatedSport;
      });
    },
    clearTour: (state) => {
      state.tour = [];
    },
  },
});

export const { setTour, editTourStatus, clearTourActive, clearTour } =
  tournamentSlice.actions;

export default tournamentSlice.reducer;
