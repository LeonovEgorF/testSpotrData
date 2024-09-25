import { v4 as uuidv4 } from "uuid";
export function getEventsBySport(sport, events) {
  return events.filter((event) => event.data.sport.id === sport);
}

export function findObjectByKey(data, key) {
  const found = data.find((item) => item.hasOwnProperty(key));
  return found ? found[key] : null;
}

export function createCustomEvnet(events) {
  return events.map((event) => {
    return {
      id: event.id,
      group_markets: {
        ["full_event|0"]: event.group_markets["full_event|0"],
        stakesSort: sortSetStakes(
          event.data.name.split("-"),
          event.group_markets["full_event|0"],
          event.data.name
        ),
      },
      data: {
        country: event.data.country,
        emc: event.data.emc,
        id: event.data.id,
        name: event.data.name,
        sport: event.data.sport,
        time: event.data.time,
        time_ts: event.data.time_ts,
        tournament: {
          name: event.data.tournament.name,
          id: event.data.tournament.id,
          isSelected: false,
        },
      },
    };
  });
}

export function getActiveEventsBySport(sport, events) {
  const eventsSelect = {};
  getEventsBySport(sport, events).forEach((event) => {
    const country = event.data.country.name;
    const tour = event.data.tournament.id;
    if (!eventsSelect[country]) {
      eventsSelect[country] = {
        titleCountry: country,
        tournament: {},
      };
    }
    if (!eventsSelect[country].tournament[tour]) {
      eventsSelect[country].tournament[tour] = {
        titleTour: event.data.tournament.name,
        titleTourId: tour,
        titleCountry: country,
        titleSport: event.data.sport.name,
        time: event.data.time,
        isSelected: event.data.tournament.isSelected,
        events: [],
      };
    }

    eventsSelect[country].tournament[tour].events.push({
      ...event,
    });
  });
  return eventsSelect;
}

export function getSortedSelectedEvents(selectedEvents) {
  const sort = {};
  for (let key in selectedEvents) {
    const event = selectedEvents[key];
    const sport = event.titleSport;
    const country = event.titleCountry;
    const tournamentTitle = event.titleTour;
    if (!sort[sport]) {
      sort[sport] = {};
    }
    if (!sort[sport][country]) {
      sort[sport][country] = {};
    }
    if (!sort[sport][country][tournamentTitle]) {
      sort[sport][country][tournamentTitle] = {};
    }
    sort[sport][country][tournamentTitle][key] = event;
  }
  return sort;
}

export function setSortedDaysEvents(items) {
  const objDaysEvents = {};
  Object.values(items)[0].events.forEach((item) => {
    const dayEvent = item.data.time.split("-")[2].split(" ")[0];
    if (!objDaysEvents[dayEvent]) {
      objDaysEvents[dayEvent] = [];
    }
    objDaysEvents[dayEvent].push(item);
  });
  return objDaysEvents;
}

export function setDateCorrectly(dat) {
  const date = new Date(dat * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const days = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  function validatedate(numbers) {
    if (numbers < 10) {
      return `0${numbers}`;
    }
    return numbers;
  }

  return {
    hours: validatedate(hours),
    minutes: validatedate(minutes),
    days: validatedate(days),
    month: validatedate(month),
    year,
  };
}
export function sortEventsTime(events) {
  return events.sort((a, b) => {
    return new Date(a.data.time).getTime() - new Date(b.data.time).getTime();
  });
}

export function extractValue(inputString, key) {
  const regex = new RegExp(`~${key}~(\\d+\\.\\d+)~~~`);
  const match = inputString.match(regex);
  const num = parseFloat(match[1]).toString();

  return match ? num : null;
}

export function sortSetStakes(arrName, arr, nameGame) {
  if (!arr) return null;
  const objEvent = {};
  arr.forEach((el) => {
    if (el.includes("|ah|")) {
      const kes = el.split("|")[2];
      objEvent["Asian Handicap"] = {
        over: {
          titleGameType: "Asian Handicap",
          factor: extractValue(el, "away"),
          stake: kes,
          title: "Over",
          playerName: arrName[0],
          id: uuidv4(),
          isActive: false,
          nameGame,
        },
        under: {
          titleGameType: "Asian Handicap",
          factor: extractValue(el, "home"),
          stake: kes < 0 ? kes.slice(1) : kes,
          title: "Under",
          playerName: arrName[1],
          id: uuidv4(),
          isActive: false,
          nameGame,
        },
      };
    }
    if (el.includes("|12||1||213|4|")) {
      objEvent["Draw No Bet"] = {
        over: {
          titleGameType: "Draw No Bet",
          factor: extractValue(el, "home"),
          stake: null,
          title: 1,
          playerName: arrName[0],
          id: uuidv4(),
          isActive: false,
          nameGame,
        },
        under: {
          titleGameType: "Draw No Bet",
          factor: extractValue(el, "away"),
          stake: null,
          title: 2,
          playerName: arrName[1],
          id: uuidv4(),
          isActive: false,
          nameGame,
        },
      };
    }
    if (el.includes("|ou|")) {
      objEvent["Over/Under"] = {
        over: {
          titleGameType: "Over/Under",
          factor: extractValue(el, "over"),
          stake: el.split("|")[2],
          title: "Over",
          playerName: arrName[0],
          id: uuidv4(),
          isActive: false,
          nameGame,
        },
        under: {
          titleGameType: "Over/Under",
          factor: extractValue(el, "under"),
          stake: el.split("|")[2],
          title: "Under",
          playerName: arrName[1],
          id: uuidv4(),
          isActive: false,
          nameGame,
        },
      };
    }
    if (el.includes("|ou_home|")) {
      objEvent["Over/Under Home Team"] = {
        over: {
          titleGameType: "Over/Under Home Team",
          factor: extractValue(el, "over"),
          stake: el.split("|")[2],
          title: "Over",
          playerName: arrName[0],
          id: uuidv4(),
          isActive: false,
          nameGame,
        },
        under: {
          titleGameType: "Over/Under Home Team",
          factor: extractValue(el, "under"),
          stake: el.split("|")[2],
          title: "Under",
          playerName: arrName[1],
          id: uuidv4(),
          isActive: false,
          nameGame,
        },
      };
    }
    if (el.includes("|ou_away|")) {
      objEvent["Over/Under Away Team"] = {
        over: {
          titleGameType: "Over/Under Away Team",
          factor: extractValue(el, "over"),
          stake: el.split("|")[2],
          title: "Over",
          playerName: arrName[0],
          id: uuidv4(),
          isActive: false,
          nameGame,
        },
        under: {
          titleGameType: "Over/Under Away Team",
          factor: extractValue(el, "under"),
          stake: el.split("|")[2],
          title: "Under",
          playerName: arrName[1],
          id: uuidv4(),
          isActive: false,
          nameGame,
        },
      };
    }
  });
  return objEvent;
}
