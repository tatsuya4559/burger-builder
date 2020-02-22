import React from "react";
import { configure, shallow } from "enzyme";
// shallowはコンポーネントの中まではrenderしない
// 例えばNavigationItemsをrenderしてもNavigationItemはmockされる
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  it("should render two <NavigationItem /> elements", () => {
    const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});
