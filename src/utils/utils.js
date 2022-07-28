import _ from "lodash";

const MILLISECONDS_IN_SECOND = 1000;

export function convertSToMs(durationInS) {
  return durationInS * MILLISECONDS_IN_SECOND;
}

export function convertBooleanToBinary(value) {
  return value ? 1 : 0;
}

export function convertBinaryToBoolean(value) {
  return value ? true : false;
}

export function randomise(list) {
  var randomisedList = [];
  while (list.length) {
    randomisedList.push(list.splice(Math.floor(Math.random() * list.length), 1)[0]);
  }
  return randomisedList;
}

export function devMode() {
  const args = process.argv;
  var isDevMode = false;
  if (args[2] == "--mode" && args[3] == "dev") {
    isDevMode = true;
  }
  return isDevMode;
}

function alternateMediaType(media) {
  return media[0]
    .map((el, i) => media.reduce((a, b) => a.concat(b[i]), []))
    .reduce((a, b) => a.concat(b), [])
    .filter((el) => el != undefined);
}

function convertVideoDurationToS(videoDuration) {
  let [hours, minutes, seconds] = videoDuration.split(":");
  hours = parseInt(hours) * 3600;
  minutes = parseInt(minutes) * 60;
  return hours + minutes + parseInt(seconds);
}

const utils = {
  randomise: randomise,
  alternateMediaType: alternateMediaType,
  convertVideoDurationToS: convertVideoDurationToS,
};

export default utils;
