const variables = require("../variables");

describe("variables", () => {
  it("rounds correctly", () => {
    checkVariableValues({ watch: 1500 }, "0", "00", "01", "500");
  });

  it("pads correctly", () => {
    checkVariableValues({ watch: 42 }, "0", "00", "00", "042");
  });
});

function checkVariableValues(initial, hours, minutes, seconds, milliseconds) {
  let variableValues = runCheckVariables(initial);

  expect(variableValues.hours).toBe(hours);
  expect(variableValues.minutes).toBe(minutes);
  expect(variableValues.seconds).toBe(seconds);
  expect(variableValues.milliseconds).toBe(milliseconds);
  expect(variableValues.hms).toBe(
    `${hours}:${minutes}:${seconds}`
  );
  expect(variableValues.hmsms).toBe(
    `${hours}:${minutes}:${seconds}.${milliseconds}`
  );
}

function runCheckVariables(initial) {
  let variableValues = null;

  Object.assign(
    {
      ...initial,
      setVariableValues: (v) => {
        variableValues = v;
      },
    },
    { ...variables }
  ).checkVariables();
  
  return variableValues;
}
