import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Setting default implementations for layout related functions in jsdom

// remock those in the test files scope when testing scroll effects
// this default implementation will announce warnings when it gets called
// in case of any missed scroll calls

window.scrollTo = jest.fn().mockImplementation((...args) =>
  // eslint-disable-next-line no-console
  console.warn(
    `window.scrollTo was called with arguments ${JSON.stringify(
      args,
    )}, see jest.setup for details`,
  ),
);

window.HTMLElement.prototype.scrollIntoView = jest
  .fn()
  .mockImplementation((...args) =>
    // eslint-disable-next-line no-console
    console.warn(
      `scrollIntoView was called with arguments ${JSON.stringify(
        args,
      )}, see jest.setup for details`,
    ),
  );

jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());
