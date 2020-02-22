import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wapper;
  beforeEach(() => {
    wapper = shallow(<BurgerBuilder />);
  });

  it("should render <BuildControls /> when received ingredients", () => {
    wapper.setProps({ ingredients: { salad: 0 } });
    expect(wapper.find(BuildControls)).toHaveLength(1);
  });
});
